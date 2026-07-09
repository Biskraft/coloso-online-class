import { useEffect, useState } from 'react';
import { useProject } from '../../store/project';
import { usePacing, undoPacing, redoPacing } from '../../store/pacing';
import { PacingCanvas, type PacTool } from './PacingCanvas';
import type { PacingDoc } from '../../types';
import '../topdown/TopdownShell.css';
import './PacingShell.css';

/* ─────────────────────────────────────────────────────────
   페이싱 곡선 에디터 셸 — FlowShell 골격 승계 (50·51강)
   탭 · 도구 · undo · 맵 불러오기/내보내기(자리) · 캔버스+사이드 · 상태바
   ───────────────────────────────────────────────────────── */

/** 학습 프리셋 — Task 12에서 `pacing-presets.ts`로 채워질 자리. 지금은 빈 배열이라 셀렉트는 빈 상태. */
const PACING_PRESETS: { id: string; name: string; lesson: string; seed: () => Partial<PacingDoc> }[] = [];

const TOOLS: { id: PacTool; label: string; key: string; title: string }[] = [
  { id: 'select',    label: '선택', key: 'V', title: '선택 (V) — 점 이동·삭제는 도구와 무관하게 항상 가능' },
  { id: 'point',     label: '점',   key: 'P', title: '점 (P) — 빈 곳 클릭으로 곡선 위에 점 추가' },
  { id: 'peakvalley',label: '산골', key: 'M', title: '산/골 (M) — 정점·저점 마커' },
  { id: 'gap',       label: '번개', key: 'G', title: '번개 (G) — 급전개·단절 지점 마커' },
  { id: 'flag',      label: '깃발', key: 'F', title: '깃발 (F) — 이정표 마커' },
  { id: 'pin',       label: '핀',   key: 'N', title: '핀 (N) — 맵 위 지점 연결(맵 모드)' },
];

export function PacingShell() {
  const exitPacing = useProject((s) => s.exitPacing);
  const docsAll = usePacing((s) => s.docs);
  const activeId = usePacing((s) => s.currentId);
  const setActive = usePacing((s) => s.setActive);
  const addDoc = usePacing((s) => s.addDoc);
  const removeDoc = usePacing((s) => s.removeDoc);
  const renameDoc = usePacing((s) => s.renameDoc);
  const addSegment = usePacing((s) => s.addSegment);

  const [tool, setTool] = useState<PacTool>('select');
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [history, setHistory] = useState({ past: 0, future: 0 });

  useEffect(() => {
    const t = usePacing.temporal as any;
    const update = () => {
      const s = t.getState();
      setHistory({ past: s.pastStates.length, future: s.futureStates.length });
    };
    update();
    const unsub = t.subscribe(update);
    return () => unsub();
  }, []);

  const docs = docsAll;
  const doc = docs.find((d) => d.id === activeId) ?? docs[0] ?? null;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = TOOLS.find((x) => x.key === e.key.toUpperCase());
      if (t) setTool(t.id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!doc) {
    return (
      <div className="td-shell td-shell-empty">
        <p>페이싱 문서가 없습니다.</p>
        <button className="td-btn" onClick={() => addDoc()}>+ 페이싱 만들기</button>
      </div>
    );
  }

  const finishRename = () => {
    if (editingId && editName.trim()) renameDoc(editingId, editName.trim());
    setEditingId(null);
  };

  const onRemove = (id: string, name: string) => {
    const target = docs.find((d) => d.id === id);
    const n = target ? target.points.length + target.markers.length + target.pins.length : 0;
    if (n > 0 && !window.confirm(`'${name}'에 점·마커·핀 ${n}개가 있습니다. 삭제할까요?`)) return;
    removeDoc(id);
  };

  return (
    <div className="td-shell" data-testid="pacing-shell">
      {/* ── 상단 바 1행 — 탭 · 도구 · undo ── */}
      <div className="td-bar">
        <button className="td-btn td-back" onClick={exitPacing} title="버블 다이어그램으로 (Esc)">
          ← 버블
        </button>

        <div className="td-tabs" role="tablist">
          {docs.map((d) => (
            <div
              key={d.id}
              role="tab"
              aria-selected={d.id === doc.id}
              className={`td-tab ${d.id === doc.id ? 'is-active' : ''}`}
              onClick={() => setActive(d.id)}
              onDoubleClick={() => { setEditingId(d.id); setEditName(d.name); }}
              title="더블클릭: 이름 바꾸기"
            >
              {editingId === d.id ? (
                <input
                  autoFocus
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={finishRename}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') finishRename();
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                />
              ) : (
                <>
                  <span className="td-tab-name">{d.name}</span>
                  {docs.length > 1 && (
                    <button
                      className="td-tab-close"
                      onClick={(e) => { e.stopPropagation(); onRemove(d.id, d.name); }}
                      title="삭제"
                    >×</button>
                  )}
                </>
              )}
            </div>
          ))}
          <button className="td-btn td-tab-add" onClick={() => addDoc()} title="페이싱 추가">＋</button>
        </div>

        <div className="td-spacer" />

        {/* 도구 */}
        <div className="td-group" role="toolbar" aria-label="도구">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              className={`td-btn td-tool ${tool === t.id ? 'is-active' : ''}`}
              onClick={() => setTool(t.id)}
              title={t.title}
            >{t.label}</button>
          ))}
          <button
            className="td-btn"
            onClick={() => addSegment(doc.id)}
            title="구간 추가 — 곡선 가로축에 새 구간을 덧붙인다"
          >구간+</button>
        </div>

        {/* 실행취소 / 다시 실행 */}
        <div className="td-group">
          <button
            className="td-btn td-undo"
            onClick={() => undoPacing()}
            disabled={history.past === 0}
            title={`되돌리기 (Ctrl+Z) · ${history.past}`}
          >↶</button>
          <button
            className="td-btn td-redo"
            onClick={() => redoPacing()}
            disabled={history.future === 0}
            title={`다시 실행 (Ctrl+Shift+Z / Ctrl+Y) · ${history.future}`}
          >↷</button>
        </div>
      </div>

      {/* ── 상단 바 2행 — 맵 불러오기/내보내기(자리) · 학습 프리셋 ── */}
      <div className="td-bar td-bar-sub">
        <div className="td-group" aria-label="맵">
          <button
            className="td-btn"
            onClick={() => { /* TODO(Task 9): 맵 이미지 불러오기 → setMap 연결 */ }}
            title="맵 불러오기 — 이 구간의 배경 맵 이미지를 불러온다 (연결 예정)"
          >맵 불러오기</button>
        </div>

        <div className="td-spacer" />

        {/* 학습 프리셋 — 선택하면 새 탭으로 생성 */}
        <div className="td-group" aria-label="학습 프리셋">
          <select
            className="td-select"
            value=""
            data-testid="pac-preset"
            onChange={(e) => {
              const preset = PACING_PRESETS.find((p) => p.id === e.target.value);
              if (!preset) return;
              addDoc(preset.name, preset.seed());
              setTool('select');
            }}
            title="학습 프리셋 — 50·51강 장면을 새 탭으로"
          >
            <option value="">학습 프리셋…</option>
            {PACING_PRESETS.map((p) => (
              <option key={p.id} value={p.id} title={p.lesson}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="td-group">
          <button
            className="td-btn"
            onClick={() => { /* TODO(Task 11): 곡선/맵 내보내기(PNG 등) 연결 */ }}
            title="내보내기 — 곡선과 맵을 이미지로 저장 (연결 예정)"
          >내보내기</button>
        </div>
      </div>

      {/* ── 캔버스 + 사이드 ── */}
      <div className="pac-main">
        <PacingCanvas doc={doc} tool={tool} mapMode={tool === 'pin'} onStatus={setStatus} />
        <div className="pac-side">선택 구간 없음</div>
      </div>

      {/* ── 상태바 ── */}
      <div className="td-status">
        <span className="td-status-doc">{doc.name}</span>
        <span>구간 {doc.segments.length} · 점 {doc.points.length}</span>
        <span className="td-status-hover">{status}</span>
        <span className="td-status-hint">점 도구: 빈 곳 클릭해 추가 · 점 드래그: 이동 · Alt+클릭/우클릭: 삭제 · 구간+: 가로축 구간 추가</span>
      </div>
    </div>
  );
}
