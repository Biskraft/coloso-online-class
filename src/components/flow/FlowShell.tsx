import { useEffect, useState } from 'react';
import { useProject } from '../../store/project';
import { useFlow, undoFlow, redoFlow } from '../../store/flow';
import { FlowCanvas, type FlTool, type FlowView } from './FlowCanvas';
import { FLOW_PRESETS } from './flow-presets';
import '../topdown/TopdownShell.css';

/* ─────────────────────────────────────────────────────────
   흐름 실험실 셸 — push & pull 벡터장 실습 (week2-02)
   평면도 셸의 토큰·클래스 체계를 그대로 승계 (2행 고정 옵션바)
   ───────────────────────────────────────────────────────── */

const TOOLS: { id: FlTool; label: string; key: string; title: string }[] = [
  { id: 'select', label: '선택', key: 'V', title: '선택 (V) — 빈 곳을 드래그해도 아무것도 만들지 않는 안전 모드. 질량 이동·크기·회전은 어느 도구에서나 가능' },
  { id: 'box',    label: '박스', key: 'B', title: '박스 (B) — 빈 곳 드래그로 질량 배치. 기존 질량은 그냥 드래그하면 이동' },
  { id: 'pillar', label: '기둥', key: 'C', title: '기둥 (C) — 클릭·드래그로 반경. 단단한 원 — 난류·머무름 실습' },
  { id: 'hill',   label: '언덕', key: 'H', title: '언덕 (H) — 클릭·드래그로 반경. 소프트 반발 — 부분 각도, 흐름이 둘레로 비켜간다' },
];

export function FlowShell() {
  const exitFlow = useProject((s) => s.exitFlow);
  const docsAll = useFlow((s) => s.docs);
  const activeId = useFlow((s) => s.currentId);
  const setActive = useFlow((s) => s.setActive);
  const addDoc = useFlow((s) => s.addDoc);
  const removeDoc = useFlow((s) => s.removeDoc);
  const renameDoc = useFlow((s) => s.renameDoc);

  const [tool, setTool] = useState<FlTool>('box');
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [history, setHistory] = useState({ past: 0, future: 0 });

  /* 시각화 옵션 — 보기 설정이므로 문서·undo와 분리 */
  const [normals, setNormals] = useState(false);
  const [pressure, setPressure] = useState(false);
  const [lineGap, setLineGap] = useState(1.5);
  const [lineAlpha, setLineAlpha] = useState(0.3);
  const view: FlowView = { normals, pressure, lineGap, lineAlpha };

  useEffect(() => {
    const t = useFlow.temporal as any;
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
        <p>흐름 문서가 없습니다.</p>
        <button className="td-btn" onClick={() => addDoc()}>+ 흐름 만들기</button>
      </div>
    );
  }

  const finishRename = () => {
    if (editingId && editName.trim()) renameDoc(editingId, editName.trim());
    setEditingId(null);
  };

  const onRemove = (id: string, name: string) => {
    const target = docs.find((d) => d.id === id);
    const n = target ? target.boxes.length + target.discs.length : 0;
    if (n > 0 && !window.confirm(`'${name}'에 질량 ${n}개가 있습니다. 삭제할까요?`)) return;
    removeDoc(id);
  };

  return (
    <div className="td-shell" data-testid="flow-shell">
      {/* ── 상단 바 1행 — 탭 · 도구 · undo ── */}
      <div className="td-bar">
        <button className="td-btn td-back" onClick={exitFlow} title="버블 다이어그램으로 (Esc)">
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
          <button className="td-btn td-tab-add" onClick={() => addDoc()} title="흐름 추가">＋</button>
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
        </div>

        {/* 실행취소 / 다시 실행 */}
        <div className="td-group">
          <button
            className="td-btn td-undo"
            onClick={() => undoFlow()}
            disabled={history.past === 0}
            title={`되돌리기 (Ctrl+Z) · ${history.past}`}
          >↶</button>
          <button
            className="td-btn td-redo"
            onClick={() => redoFlow()}
            disabled={history.future === 0}
            title={`다시 실행 (Ctrl+Shift+Z / Ctrl+Y) · ${history.future}`}
          >↷</button>
        </div>
      </div>

      {/* ── 상단 바 2행 — 시각화 토글 · 유선 슬라이더 · 학습 프리셋 ── */}
      <div className="td-bar td-bar-sub">
        <div className="td-group" aria-label="시각화">
          <button
            className={`td-btn td-zone-danger ${normals ? 'is-active' : ''}`}
            data-testid="fl-normals"
            onClick={() => setNormals((v) => !v)}
            title="법선 화살표 — 질량 표면에서 수직으로 밀어내는 힘 (강의 normals 도해)"
          >법선</button>
          <button
            className={`td-btn td-overlay ${pressure ? 'is-active' : ''}`}
            data-testid="fl-pressure"
            onClick={() => setPressure((v) => !v)}
            title="압력 그라디언트 — 질량 주변의 파란 농도, 가까울수록 강한 push (강의 magnetic lines 도해)"
          >압력</button>
        </div>

        <div className="td-group" aria-label="유선">
          <span className="td-bar-label">간격</span>
          <input
            type="range" className="td-overlay-range"
            min={0.75} max={4} step={0.25}
            value={lineGap}
            onChange={(e) => setLineGap(Number(e.target.value))}
            title={`유선 간격 ${lineGap}m`}
          />
          <span className="td-bar-label">진하기</span>
          <input
            type="range" className="td-overlay-range"
            min={0.1} max={0.6} step={0.05}
            value={lineAlpha}
            onChange={(e) => setLineAlpha(Number(e.target.value))}
            title={`유선 진하기 ${Math.round(lineAlpha * 100)}%`}
          />
        </div>

        {/* 학습 프리셋 — 선택하면 새 탭으로 생성 */}
        <div className="td-group" aria-label="학습 프리셋">
          <select
            className="td-select"
            value=""
            data-testid="fl-preset"
            onChange={(e) => {
              const preset = FLOW_PRESETS.find((p) => p.id === e.target.value);
              if (!preset) return;
              addDoc(preset.name, preset.seed());
              setTool('select');
            }}
            title="학습 프리셋 — week2-02 강의 장면 4종을 새 탭으로"
          >
            <option value="">학습 프리셋…</option>
            {FLOW_PRESETS.map((p) => (
              <option key={p.id} value={p.id} title={p.lesson}>{p.name}</option>
            ))}
          </select>
        </div>

        <div className="td-spacer" />
      </div>

      {/* ── 캔버스 ── */}
      <FlowCanvas doc={doc} tool={tool} view={view} onStatus={setStatus} />

      {/* ── 상태바 ── */}
      <div className="td-status">
        <span className="td-status-doc">{doc.name}</span>
        <span>{doc.grid}×{doc.grid}m · 질량 {doc.boxes.length + doc.discs.length}</span>
        <span className="td-status-hover">{status}</span>
        <span className="td-status-hint">질량 드래그: 이동 · 모서리 핸들: 크기 · 손잡이: 회전(15° 스냅) · 빈 곳 드래그: 생성 · 휠: 줌 · 스페이스: 패닝</span>
      </div>
    </div>
  );
}
