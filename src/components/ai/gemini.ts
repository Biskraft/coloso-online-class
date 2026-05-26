/* ─────────────────────────────────────────────────────────
   Google Gemini API 어댑터 (브라우저 직호출)
   - Pro 우선, 한도 소진 시 Flash 자동 폴백
   - 사용량 카운터 자동 반영
   - 무료 등급: Pro ~50/일, Flash ~1500/일
   ───────────────────────────────────────────────────────── */

import { useProject } from '../../store/project';

export type GeminiModel = 'gemini-2.5-pro' | 'gemini-2.5-flash';

const BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

interface CallOpts {
  system: string;
  user: string;
  maxTokens?: number;
  responseSchema?: object;   // JSON 모드용
  signal?: AbortSignal;
}

export interface CallResult {
  text: string;
  modelUsed: GeminiModel;
  fallback?: boolean;
}

export class QuotaError extends Error {
  constructor(public model: GeminiModel) {
    super(`Quota exceeded for ${model}`);
  }
}

/** 503/502/504 — 일시적 모델 혼잡. 재시도/폴백 대상 */
export class TransientError extends Error {
  constructor(public model: GeminiModel, public status: number) {
    super(`Transient ${status} on ${model}`);
  }
}

export class NoKeyError extends Error {
  constructor() { super('Gemini API key가 설정되지 않았습니다.'); }
}

async function callOnce(
  model: GeminiModel,
  apiKey: string,
  opts: CallOpts,
): Promise<string> {
  const url = `${BASE}/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const body: any = {
    systemInstruction: { parts: [{ text: opts.system }] },
    contents: [{ role: 'user', parts: [{ text: opts.user }] }],
    generationConfig: {
      maxOutputTokens: opts.maxTokens ?? 1024,
      temperature: 0.8,
    },
  };
  if (opts.responseSchema) {
    body.generationConfig.responseMimeType = 'application/json';
    body.generationConfig.responseSchema = opts.responseSchema;
    // JSON 모드는 temperature 낮춰서 schema 위반 줄임
    body.generationConfig.temperature = 0.4;
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
    signal: opts.signal,
  });
  if (!res.ok) {
    if (res.status === 429) throw new QuotaError(model);
    if (res.status === 503 || res.status === 502 || res.status === 504) {
      throw new TransientError(model, res.status);
    }
    const t = await res.text();
    throw new Error(`Gemini ${model} ${res.status}: ${t.slice(0, 200)}`);
  }
  const data = await res.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.map((p: any) => p.text ?? '').join('') ??
    '';
  if (!text) throw new Error('Gemini 응답이 비어 있습니다.');
  return text;
}

/** 일시적 에러는 지수 백오프 재시도 (max 2회) */
async function callWithRetry(
  model: GeminiModel, apiKey: string, opts: CallOpts,
  maxRetries = 2,
): Promise<string> {
  let lastErr: unknown;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await callOnce(model, apiKey, opts);
    } catch (e) {
      lastErr = e;
      if (e instanceof TransientError && i < maxRetries) {
        const wait = 500 * Math.pow(2, i); // 500, 1000, 2000
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      throw e;
    }
  }
  throw lastErr ?? new Error('재시도 실패');
}

/**
 * 자동 폴백 호출
 * preferPro=true이면 Pro 시도 → 한도/혼잡 시 Flash 시도
 * Flash 우선 모드는 그 반대
 */
export async function geminiCall(
  opts: CallOpts & { preferModel?: GeminiModel },
): Promise<CallResult> {
  const st = useProject.getState();
  const key = st.project.ai.apiKey;
  if (!key) throw new NoKeyError();

  const order: GeminiModel[] = opts.preferModel === 'gemini-2.5-flash'
    ? ['gemini-2.5-flash', 'gemini-2.5-pro']
    : ['gemini-2.5-pro', 'gemini-2.5-flash'];

  let lastErr: unknown;
  for (let i = 0; i < order.length; i++) {
    const m = order[i];
    try {
      const text = await callWithRetry(m, key, opts);
      st.bumpUsage(m === 'gemini-2.5-pro' ? 'pro' : 'flash');
      return { text, modelUsed: m, fallback: i > 0 };
    } catch (e) {
      lastErr = e;
      // 한도 또는 일시적 혼잡 → 다음 모델로 폴백
      if (e instanceof QuotaError || e instanceof TransientError) {
        continue;
      }
      throw e;
    }
  }
  throw lastErr ?? new Error('알 수 없는 오류');
}

export function extractJSON<T = unknown>(text: string): T | null {
  if (!text) return null;
  // 1) 모든 코드펜스(시작/중간/끝)를 전역 제거
  let cleaned = text
    .replace(/```(?:json|JSON)?\s*/g, '')
    .replace(/\s*```/g, '')
    .trim();

  // 2) 그대로 파싱 시도
  try { return JSON.parse(cleaned) as T; } catch { /* 다음 단계 */ }

  // 3) 첫 { 또는 [ 부터 마지막 매칭 } 또는 ] 까지 (greedy)
  const firstObj = cleaned.indexOf('{');
  const firstArr = cleaned.indexOf('[');
  const firstIdx =
    firstObj < 0 ? firstArr :
    firstArr < 0 ? firstObj :
    Math.min(firstObj, firstArr);
  if (firstIdx < 0) return null;
  const openChar = cleaned[firstIdx];
  const closeChar = openChar === '{' ? '}' : ']';
  const lastIdx = cleaned.lastIndexOf(closeChar);
  if (lastIdx <= firstIdx) return null;

  const candidate = cleaned.slice(firstIdx, lastIdx + 1);
  try { return JSON.parse(candidate) as T; } catch { /* 다음 단계 */ }

  // 4) trailing comma 제거 후 재시도
  const noTrailing = candidate.replace(/,\s*([}\]])/g, '$1');
  try { return JSON.parse(noTrailing) as T; } catch { return null; }
}
