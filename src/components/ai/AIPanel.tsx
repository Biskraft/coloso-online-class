import { useState } from 'react';
import { useProject } from '../../store/project';
import { geminiCall, extractJSON, NoKeyError } from './gemini';
import {
  SYSTEM_CONCEPT, SYSTEM_CRITIQUE, SYSTEM_SEED_POSTITS,
  userMessageForConcept, userMessageForCritique, userMessageForSeedPostits,
} from './prompts';
import type { Concept, PostitColor } from '../../types';
import './AIPanel.css';

export function AIPanel() {
  const ai = useProject((s) => s.project.ai);
  const setApiKey = useProject((s) => s.setApiKey);
  const setConcept = useProject((s) => s.setConcept);
  const project = useProject((s) => s.project);
  const addPostit = useProject((s) => s.addPostit);
  const updatePostit = useProject((s) => s.updatePostit);

  const [seedText, setSeedText] = useState('');
  const [busy, setBusy] = useState<'concept' | 'critique' | 'seed' | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [critique, setCritique] = useState<any>(null);
  const [keyInput, setKeyInput] = useState('');

  const hasKey = !!ai.apiKey;

  const generateConcept = async () => {
    if (!seedText.trim()) {
      setNote('시드를 입력해 주세요.');
      return;
    }
    setBusy('concept'); setNote(null);
    try {
      const r = await geminiCall({
        system: SYSTEM_CONCEPT,
        user: userMessageForConcept(seedText.trim()),
        responseSchema: {
          type: 'object',
          properties: {
            theme: { type: 'string' },
            intent: { type: 'string' },
            coreMechanic: { type: 'string' },
            learningGoals: { type: 'array', items: { type: 'string' } },
            pacing: { type: 'string' },
            fantasyHook: { type: 'string' },
          },
          required: ['theme', 'intent', 'coreMechanic', 'learningGoals', 'pacing'],
        },
        maxTokens: 800,
      });
      const c = extractJSON<Partial<Concept>>(r.text);
      if (c) {
        setConcept(c);
        setNote(`컨셉 생성 완료 (${r.modelUsed}${r.fallback ? ' · 폴백' : ''})`);
      } else {
        setNote('응답을 JSON으로 해석하지 못함');
      }
    } catch (e: any) {
      setNote(e instanceof NoKeyError ? '키를 먼저 등록하세요.' : `실패: ${e.message ?? e}`);
    } finally { setBusy(null); }
  };

  const runCritique = async () => {
    setBusy('critique'); setNote(null); setCritique(null);
    try {
      const r = await geminiCall({
        system: SYSTEM_CRITIQUE,
        user: userMessageForCritique(project),
        maxTokens: 1200,
      });
      const c = extractJSON(r.text);
      if (c) {
        setCritique(c);
        setNote(`비평 완료 (${r.modelUsed}${r.fallback ? ' · 폴백' : ''})`);
      } else {
        setNote('응답을 JSON으로 해석하지 못함');
      }
    } catch (e: any) {
      setNote(e instanceof NoKeyError ? '키를 먼저 등록하세요.' : `실패: ${e.message ?? e}`);
    } finally { setBusy(null); }
  };

  const seedPostits = async () => {
    setBusy('seed'); setNote(null);
    try {
      const r = await geminiCall({
        system: SYSTEM_SEED_POSTITS,
        user: userMessageForSeedPostits(project),
        maxTokens: 1200,
      });
      const data = extractJSON<{ postits: Array<{ text: string; type?: string; color?: PostitColor; tags?: string[] }> }>(r.text);
      const items = data?.postits ?? [];
      items.forEach((p) => {
        const id = addPostit(p.text, p.color ?? 'yellow');
        if (p.tags?.length) updatePostit(id, { tags: p.tags });
      });
      setNote(`포스트잇 ${items.length}장 추가 (${r.modelUsed}${r.fallback ? ' · 폴백' : ''})`);
    } catch (e: any) {
      setNote(e instanceof NoKeyError ? '키를 먼저 등록하세요.' : `실패: ${e.message ?? e}`);
    } finally { setBusy(null); }
  };

  return (
    <div className="ai-panel">
      {!hasKey && (
        <div className="ai-key-prompt">
          <p className="caption">AI 키 미등록 — 오프라인 모드</p>
          <p className="ai-hint">
            아래에 Gemini API 키를 붙여넣으면 AI 기능이 활성화됩니다.
          </p>
          <div className="ai-key-row">
            <input
              type="password"
              placeholder="AIzaSy…"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="ai-key-input"
            />
            <button
              onClick={() => { if (keyInput.trim()) setApiKey(keyInput.trim()); }}
              disabled={!keyInput.trim()}
              className="ai-key-btn"
            >등록</button>
          </div>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noreferrer"
            className="ai-key-link caption"
          >키 발급 → aistudio.google.com/app/apikey</a>
        </div>
      )}

      {hasKey && (
        <div className="ai-key-prompt is-on">
          <p className="caption">AI 활성화됨 · Gemini</p>
          <button onClick={() => { setApiKey(undefined); }} className="ai-key-remove">키 제거</button>
        </div>
      )}

      <section className="ai-section">
        <h4>① 컨셉 생성</h4>
        <p className="ai-section-hint">시드 한 줄을 던지면 AI가 테마·의도·메커닉·학습목표·페이싱을 구조화해 채웁니다.</p>
        <textarea
          rows={3}
          value={seedText}
          onChange={(e) => setSeedText(e.target.value)}
          placeholder="예: 메트로배니아 풍의 침수된 우주 정거장, 중력 조절 능력 획득"
          className="ai-textarea"
        />
        <button
          onClick={generateConcept}
          disabled={busy !== null}
          className="ai-action"
        >
          {busy === 'concept' ? '생성 중…' : '컨셉 생성 (Pro)'}
        </button>
      </section>

      <section className="ai-section">
        <h4>② 비평 받기</h4>
        <p className="ai-section-hint">현재 컨셉을 평가합니다.</p>
        <button
          onClick={runCritique}
          disabled={busy !== null || !project.concept.theme}
          className="ai-action"
        >
          {busy === 'critique' ? '평가 중…' : '비평 (Pro)'}
        </button>
        {critique && <CritiqueResult c={critique} />}
      </section>

      <section className="ai-section">
        <h4>③ 포스트잇 시드</h4>
        <p className="ai-section-hint">컨셉으로부터 8~12장의 포스트잇 후보를 만들어 패드에 추가합니다.</p>
        <button
          onClick={seedPostits}
          disabled={busy !== null || !project.concept.theme}
          className="ai-action"
        >
          {busy === 'seed' ? '생성 중…' : '시드 추가 (Pro)'}
        </button>
      </section>

      {note && <p className="ai-note">{note}</p>}
    </div>
  );
}

function CritiqueResult({ c }: { c: any }) {
  return (
    <div className="ai-critique">
      {c.strengths?.length > 0 && (
        <div className="ai-critique-block">
          <span className="caption ai-critique-label ai-critique-label--ok">강점</span>
          <ul>{c.strengths.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
        </div>
      )}
      {c.weaknesses?.length > 0 && (
        <div className="ai-critique-block">
          <span className="caption ai-critique-label ai-critique-label--warn">약점</span>
          <ul>{c.weaknesses.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
        </div>
      )}
      {c.risks?.length > 0 && (
        <div className="ai-critique-block">
          <span className="caption ai-critique-label ai-critique-label--risk">위험</span>
          <ul>{c.risks.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
        </div>
      )}
      {c.suggestions?.length > 0 && (
        <div className="ai-critique-block">
          <span className="caption ai-critique-label">제안</span>
          <ul>
            {c.suggestions.map((s: any, i: number) => (
              <li key={i}>
                <strong>{s.principle}:</strong> {s.action}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
