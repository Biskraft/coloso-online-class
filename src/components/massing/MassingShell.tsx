import { useEffect, useState } from 'react';
import { useProject } from '../../store/project';
import { useMassing, undoMassing, redoMassing } from '../../store/massing';
import { MassingCanvas, type MsTool } from './MassingCanvas';
import { TONES } from './massing-utils';
import { MASSING_PRESETS } from './massing-presets';
import { uid } from '../../utils/id';
import '../topdown/TopdownShell.css';
import './MassingShell.css';

/* ─────────────────────────────────────────────────────────
   매싱 스케처 셸 — 등각 화이트박스 사고 스케치 (점·선·면)
   평면도 셸의 토큰·클래스 체계를 그대로 승계
   ───────────────────────────────────────────────────────── */

const TOOLS: { id: MsTool; label: string; key: string; title: string }[] = [
  { id: 'select',   label: '선택',     key: 'V', title: '선택 (V) — 클릭 선택 · 빈 곳 드래그 = 마퀴 다중 선택 · 드래그 이동 · Delete 삭제' },
  { id: 'box',      label: '박스',     key: 'B', title: '박스 (B) — 바닥 드래그로 풋프린트, 높이는 프리셋. 질량(mass)' },
  { id: 'column',   label: '기둥',     key: 'C', title: '기둥 (C) — 클릭 배치, 1×1m. 점→선 실습' },
  { id: 'wall',     label: '벽판',     key: 'W', title: '벽판 (W) — 드래그 방향의 얇은 판 (두께 0.25m). 면 실습' },
  { id: 'base',     label: '바닥판',   key: 'G', title: '바닥판 (G) — 드래그. 올림(elevate) = 0.5m 단 / 파임(inset) = 0.5m 함몰' },
  { id: 'overhead', label: '머리판',   key: 'O', title: '머리위판 (O) — 드래그. 높이 프리셋만큼 띄운 얇은 판 (두께 0.25m)' },
  { id: 'stone',    label: '점',       key: 'P', title: '점 (P) — 클릭 배치, 1×1×1m 돌. 띄움 프리셋으로 부유석' },
  { id: 'tone',     label: '명도',     key: 'T', title: '명도 (T) — 견본 선택 후 블록 클릭. Value Differentiation 실습' },
];

const HEIGHTS = [1, 2, 3, 4, 6];
const STONE_Z = [0, 1, 2, 3];

export function MassingShell() {
  const exitMassing = useProject((s) => s.exitMassing);
  const docsAll = useMassing((s) => s.docs);
  const activeId = useMassing((s) => s.currentId);
  const setActiveMassing = useMassing((s) => s.setActive);
  const addMassing = useMassing((s) => s.addDoc);
  const removeMassing = useMassing((s) => s.removeDoc);
  const renameMassing = useMassing((s) => s.renameDoc);
  const updateMassing = useMassing((s) => s.updateDoc);
  const addBlocks = useMassing((s) => s.addBlocks);

  const [tool, setTool] = useState<MsTool>('box');
  const [heightM, setHeightM] = useState(3);
  const [baseMode, setBaseMode] = useState<'elevate' | 'inset'>('elevate');
  const [stoneZ, setStoneZ] = useState(0);
  const [toneSel, setToneSel] = useState(2);
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [history, setHistory] = useState({ past: 0, future: 0 });

  useEffect(() => {
    const t = useMassing.temporal as any;
    const update = () => {
      const s = t.getState();
      setHistory({ past: s.pastStates.length, future: s.futureStates.length });
    };
    update();
    const unsub = t.subscribe(update);
    return () => unsub();
  }, []);

  const docs = docsAll;
  const doc = docs.find((m) => m.id === activeId) ?? docs[0] ?? null;
  const dir = doc?.view?.dir ?? 0;

  const rotate = (delta: number) => {
    if (!doc) return;
    updateMassing(doc.id, { view: { dir: (((dir + delta) % 4) + 4) % 4 as 0 | 1 | 2 | 3 } });
  };

  /* 단축키 — 도구 + Q/E 회전 */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.ctrlKey || e.metaKey || e.altKey) return;
      const k = e.key.toUpperCase();
      const t = TOOLS.find((x) => x.key === k);
      if (t) { setTool(t.id); return; }
      if (k === 'Q') rotate(-1);
      if (k === 'E') rotate(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc?.id, dir]);

  if (!doc) {
    return (
      <div className="td-shell td-shell-empty">
        <p>매싱 스케치가 없습니다.</p>
        <button className="td-btn" onClick={() => addMassing()}>+ 매싱 만들기</button>
      </div>
    );
  }

  const finishRename = () => {
    if (editingId && editName.trim()) renameMassing(editingId, editName.trim());
    setEditingId(null);
  };

  const onRemove = (id: string, name: string) => {
    const target = docs.find((m) => m.id === id);
    const n = target ? target.blocks.length : 0;
    if (n > 0 && !window.confirm(`'${name}'에 블록 ${n}개가 있습니다. 삭제할까요?`)) return;
    removeMassing(id);
  };

  return (
    <div className="td-shell" data-testid="massing-shell">
      {/* ── 상단 바 ── */}
      <div className="td-bar">
        <button className="td-btn td-back" onClick={exitMassing} title="버블 다이어그램으로 (Esc)">
          ← 버블
        </button>

        <div className="td-tabs" role="tablist">
          {docs.map((m) => (
            <div
              key={m.id}
              role="tab"
              aria-selected={m.id === doc.id}
              className={`td-tab ${m.id === doc.id ? 'is-active' : ''}`}
              onClick={() => setActiveMassing(m.id)}
              onDoubleClick={() => { setEditingId(m.id); setEditName(m.name); }}
              title="더블클릭: 이름 바꾸기"
            >
              {editingId === m.id ? (
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
                  <span className="td-tab-name">{m.name}</span>
                  {docs.length > 1 && (
                    <button
                      className="td-tab-close"
                      onClick={(e) => { e.stopPropagation(); onRemove(m.id, m.name); }}
                      title="삭제"
                    >×</button>
                  )}
                </>
              )}
            </div>
          ))}
          <button className="td-btn td-tab-add" onClick={() => addMassing()} title="매싱 추가">＋</button>
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
            onClick={() => undoMassing()}
            disabled={history.past === 0}
            title={`되돌리기 (Ctrl+Z) · ${history.past}`}
          >↶</button>
          <button
            className="td-btn td-redo"
            onClick={() => redoMassing()}
            disabled={history.future === 0}
            title={`다시 실행 (Ctrl+Shift+Z / Ctrl+Y) · ${history.future}`}
          >↷</button>
        </div>
      </div>

      {/* ── 옵션 바 (고정 2행) ── */}
      <div className="td-bar td-bar-sub">
        {/* 높이 프리셋 — 박스/기둥/벽판 높이, 머리위판 띄움 */}
        {tool !== 'stone' && tool !== 'tone' && tool !== 'select' && tool !== 'base' && (
          <div className="td-group" aria-label="블록 높이">
            {HEIGHTS.map((hm) => (
              <button
                key={hm}
                className={`td-btn ${heightM === hm ? 'is-active' : ''}`}
                onClick={() => setHeightM(hm)}
                title={tool === 'overhead' ? `머리위판 띄움 ${hm}m` : `새 블록 높이 ${hm}m`}
              >{hm}m</button>
            ))}
          </div>
        )}

        {/* 바닥판 — 올림/파임 */}
        {tool === 'base' && (
          <div className="td-group" aria-label="바닥판 모드">
            <button
              className={`td-btn ${baseMode === 'elevate' ? 'is-active' : ''}`}
              onClick={() => setBaseMode('elevate')}
              title="올림(elevate) — 바닥 위 0.5m 단"
            >올림</button>
            <button
              className={`td-btn ${baseMode === 'inset' ? 'is-active' : ''}`}
              onClick={() => setBaseMode('inset')}
              title="파임(inset) — 바닥 아래 0.5m 함몰"
            >파임</button>
          </div>
        )}

        {/* 점 — 띄움 높이 */}
        {tool === 'stone' && (
          <div className="td-group" aria-label="점 띄움">
            {STONE_Z.map((z) => (
              <button
                key={z}
                className={`td-btn ${stoneZ === z ? 'is-active' : ''}`}
                onClick={() => setStoneZ(z)}
                title={z === 0 ? '바닥에 놓기' : `공중 ${z}m — 부유석`}
              >{z === 0 ? '바닥' : `${z}m`}</button>
            ))}
          </div>
        )}

        {/* 명도 견본 */}
        {tool === 'tone' && (
          <div className="td-group" aria-label="명도 견본">
            {TONES.map((t, i) => (
              <button
                key={i}
                className={`td-btn ms-tone ${toneSel === i ? 'is-active' : ''}`}
                onClick={() => setToneSel(i)}
                title={`명도 ${i} — 블록을 클릭해 적용`}
              >
                <span className="ms-tone-chip" style={{ background: t[0], borderColor: t[2] }} />
                {i}
              </button>
            ))}
          </div>
        )}

        {/* 학습 가이드 — 선택하면 새 매싱 탭으로 생성 */}
        <div className="td-group" aria-label="학습 가이드">
          <select
            className="td-select"
            value=""
            data-testid="ms-preset"
            onChange={(e) => {
              const preset = MASSING_PRESETS.find((p) => p.id === e.target.value);
              if (!preset) return;
              const id = addMassing(preset.name);
              addBlocks(id, preset.blocks.map((b) => ({ ...b, id: uid('blk') })));
            }}
            title="학습 가이드 — CGMA 3주차 점·선·면 단계와 공간 정의 비교 장면을 새 탭으로"
          >
            <option value="">학습 가이드…</option>
            {MASSING_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* 카메라 회전 */}
        <div className="td-group" aria-label="카메라 회전">
          <button className="td-btn" onClick={() => rotate(-1)} title="반시계 회전 (Q)">⟲</button>
          <span className="ms-dir" data-testid="ms-dir">뷰 {dir + 1}/4</span>
          <button className="td-btn" onClick={() => rotate(1)} title="시계 회전 (E)">⟳</button>
        </div>

        <div className="td-spacer" />
      </div>

      {/* ── 캔버스 ── */}
      <MassingCanvas
        doc={doc}
        tool={tool}
        heightM={heightM}
        baseMode={baseMode}
        stoneZ={stoneZ}
        toneSel={toneSel}
        onStatus={setStatus}
      />

      {/* ── 상태바 ── */}
      <div className="td-status">
        <span className="td-status-doc">{doc.name}</span>
        <span>{doc.grid[0]}×{doc.grid[1]}m · 블록 {doc.blocks.length} · 뷰 {dir + 1}/4</span>
        <span className="td-status-hover">{status}</span>
        <span className="td-status-hint">휠: 줌 · 스페이스+드래그: 이동 · Q/E: 회전 · Ctrl+Z: 실행취소</span>
      </div>
    </div>
  );
}
