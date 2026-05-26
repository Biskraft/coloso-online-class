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
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
    signal: opts.signal,
  });
  if (!res.ok) {
    if (res.status === 429) throw new QuotaError(model);
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

/**
 * 자동 폴백 호출
 * preferPro=true 이면 Pro 시도 → 한도/에러 시 Flash 시도
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
      const text = await callOnce(m, key, opts);
      st.bumpUsage(m === 'gemini-2.5-pro' ? 'pro' : 'flash');
      return { text, modelUsed: m, fallback: i > 0 };
    } catch (e) {
      lastErr = e;
      if (e instanceof QuotaError) {
        // 다음 모델 시도
        continue;
      }
      throw e;
    }
  }
  throw lastErr ?? new Error('알 수 없는 오류');
}

export function extractJSON<T = unknown>(text: string): T | null {
  // 코드펜스 제거
  const cleaned = text.replace(/^```(?:json)?\s*/i, '').replace(/```$/i, '').trim();
  try {
    return JSON.parse(cleaned) as T;
  } catch {
    // 본문에서 첫 JSON 블록 추출
    const m = text.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    if (m) {
      try { return JSON.parse(m[0]) as T; } catch { return null; }
    }
    return null;
  }
}
