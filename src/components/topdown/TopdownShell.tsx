import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { TOPDOWN_GRID_PRESETS, type MarkerKind, type ZoneKind, type StrokeColor } from '../../types';
import { useProject, undoProject, redoProject } from '../../store/project';
import { downloadJSON } from '../../store/persistence';
import { TopdownCanvas, type TdTool, type SnapStep, type TdTarget } from './TopdownCanvas';
import { exportTopdownPNG, MARKER_DEFS, STROKE_COLORS, STROKE_WIDTHS } from './topdown-utils';
import './TopdownShell.css';

/* ─────────────────────────────────────────────────────────
   평면도 셸 — Scrawl 지오메트리 도구 막대 · 평면도 탭 · 상태바
   ───────────────────────────────────────────────────────── */

const TOOLS: { id: TdTool; label: string; key: string; title: string }[] = [
  { id: 'select',   label: '선택',   key: 'V', title: '선택 (V) — 클릭으로 도형 선택, 드래그로 이동, Delete 삭제' },
  { id: 'rect',     label: '사각형', key: 'R', title: '사각형 방 (R) — 드래그. 겹치면 자동 병합' },
  { id: 'ellipse',  label: '원형',   key: 'O', title: '원형/타원 방 (O) — 드래그' },
  { id: 'polygon',  label: '다각형', key: 'P', title: '다각형 방 (P) — 클릭으로 점, 더블클릭/Enter 완성, Esc 취소' },
  { id: 'draw',     label: '드로잉', key: 'B', title: '드로잉 (B) — 드래그로 자유롭게 그리는 동선. 색·두께 설정 가능' },
  { id: 'corridor', label: '복도',   key: 'C', title: '복도 (C) — 클릭으로 경로, 더블클릭/Enter 완성. 폭 설정 가능' },
  { id: 'door',     label: '문',     key: 'D', title: '문 (D) — 벽 가까이 클릭하면 벽에 스냅되어 배치. 선택(V) 후 Delete로 삭제' },
  { id: 'stair',    label: '계단',   key: 'S', title: '계단 (S) — 드래그. 드래그 방향이 올라가는 방향 (끝이 좁아짐)' },
  { id: 'text',     label: '텍스트', key: 'T', title: '텍스트 (T) — 클릭 후 입력, Enter 확정. 선택(V) 더블클릭으로 수정' },
  { id: 'marker',   label: '마커',   key: 'M', title: '마커 (M) — 종류 선택 후 클릭 배치. 선택(V) 더블클릭으로 라벨 편집' },
  { id: 'zone',     label: '구역',   key: 'Z', title: '구역 (Z) — 클릭으로 다각형, Enter 완성. 안전(파랑)/위험(빨강) 반투명 채움' },
];

export function TopdownShell() {
  const project = useProject((s) => s.project);
  const activeId = useProject((s) => s.activeTopdownId);
  const exitTopdown = useProject((s) => s.exitTopdown);
  const setActiveTopdown = useProject((s) => s.setActiveTopdown);
  const addTopdown = useProject((s) => s.addTopdown);
  const removeTopdown = useProject((s) => s.removeTopdown);
  const renameTopdown = useProject((s) => s.renameTopdown);
  const updateTopdown = useProject((s) => s.updateTopdown);
  const clearStrokes = useProject((s) => s.clearStrokes);

  const [tool, setTool] = useState<TdTool>('rect');
  const [erase, setErase] = useState(false);
  const [rough, setRough] = useState(false);
  const [snap, setSnap] = useState<SnapStep>(1);
  const [corridorW, setCorridorW] = useState(6);   // m — 두께 그대로 (6m = 폭 6m)
  const [doorW, setDoorW] = useState(2);           // 셀 — 문 폭
  const [stairW, setStairW] = useState(2);         // 셀 — 계단 폭
  const [textSize, setTextSize] = useState(2);     // 셀 — 텍스트 높이
  const [markerKind, setMarkerKind] = useState<MarkerKind>('start');
  const [target, setTarget] = useState<TdTarget>('floor');   // 그리기 대상 — 바닥/구조/엄폐/동선
  const [zoneKind, setZoneKind] = useState<ZoneKind>('safe');
  const [strokeColor, setStrokeColor] = useState<StrokeColor>('moss');
  const [strokeWidth, setStrokeWidth] = useState(2);          // m — 동선 두께
  const [calibrating, setCalibrating] = useState(false);   // 오버레이 조정 모드
  const [confirmExit, setConfirmExit] = useState(false);   // Esc 나가기 확인창
  const [history, setHistory] = useState({ past: 0, future: 0 });

  /* undo/redo 가능 카운트 구독 */
  useEffect(() => {
    const t = useProject.temporal as any;
    const update = () => {
      const s = t.getState();
      setHistory({ past: s.pastStates.length, future: s.futureStates.length });
    };
    update();
    const unsub = t.subscribe(update);
    return () => unsub();
  }, []);
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const docs = project.topdowns ?? [];
  const doc = docs.find((t) => t.id === activeId) ?? docs[0] ?? null;

  /* 도구 ↔ 대상 레이어 연동 —
     동선 레이어에서는 드로잉만 쓸 수 있고, 드로잉을 고르면 대상이 동선으로 간다.
     두 진입점(도구 버튼 / 레이어 버튼)이 항상 같은 상태로 수렴하게 한 곳에서 처리한다. */
  /** 동선 레이어에서 쓸 수 있는 도구 — 그리기는 드로잉만, 지우기용 선택은 허용 */
  const pathAllows = (t: TdTool) => t === 'draw' || t === 'select';

  const chooseTool = (t: TdTool) => {
    if (target === 'path' && !pathAllows(t)) return;
    setTool(t);
    if (t === 'draw') setTarget('path');
  };
  const chooseTarget = (t: TdTarget) => {
    setTarget(t);
    setTool((cur) => (t === 'path' ? 'draw' : cur === 'draw' ? 'rect' : cur));
  };

  /* 단축키 — V/R/O/P/B/C 도구, E 빼기 토글, 1~4 대상 레이어 */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.ctrlKey || e.metaKey || e.altKey) return;
      // Esc — 버블로 나가기 확인. 캔버스가 먼저 선택 해제·작도 취소를 소비하고
      // stopPropagation 하므로, 더 되돌릴 게 없을 때만 여기까지 온다
      if (e.key === 'Escape') {
        setConfirmExit((open) => !open);   // 열려 있으면 Esc가 취소로 동작
        return;
      }
      const k = e.key.toUpperCase();
      const t = TOOLS.find((x) => x.key === k);
      if (t) { chooseTool(t.id); return; }
      if (k === 'E') setErase((v) => !v);
      if (k === 'F') setRough((v) => !v);
      if (k === '1') chooseTarget('floor');
      if (k === '2') chooseTarget('struct');
      if (k === '3') chooseTarget('cover');
      if (k === '4') chooseTarget('path');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  if (!doc) {
    return (
      <div className="td-shell td-shell-empty">
        <p>평면도가 없습니다.</p>
        <button className="td-btn" onClick={() => addTopdown()}>+ 평면도 만들기</button>
      </div>
    );
  }

  const meters = doc.grid[0];   // 1셀 = 1m 고정

  const startRename = (id: string, current: string) => {
    setEditingId(id);
    setEditName(current);
  };
  const finishRename = () => {
    if (editingId && editName.trim()) renameTopdown(editingId, editName.trim());
    setEditingId(null);
  };

  const onRemove = (id: string, name: string) => {
    const target = docs.find((t) => t.id === id);
    const n = target ? target.geo.length : 0;
    if (n > 0 && !window.confirm(`'${name}'에 도형 ${n}개가 있습니다. 삭제할까요?`)) return;
    removeTopdown(id);
  };

  return (
    <div className="td-shell" data-testid="topdown-shell">
      {/* ── 상단 바 ── */}
      <div className="td-bar">
        <button className="td-btn td-back" onClick={exitTopdown} title="버블 다이어그램으로 (Esc)">
          ← 버블
        </button>

        <div className="td-tabs" role="tablist">
          {docs.map((t) => (
            <div
              key={t.id}
              role="tab"
              aria-selected={t.id === doc.id}
              className={`td-tab ${t.id === doc.id ? 'is-active' : ''}`}
              onClick={() => setActiveTopdown(t.id)}
              onDoubleClick={() => startRename(t.id, t.name)}
              title="더블클릭: 이름 바꾸기"
            >
              {editingId === t.id ? (
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
                  <span className="td-tab-name">{t.name}</span>
                  {docs.length > 1 && (
                    <button
                      className="td-tab-close"
                      onClick={(e) => { e.stopPropagation(); onRemove(t.id, t.name); }}
                      title="삭제"
                    >×</button>
                  )}
                </>
              )}
            </div>
          ))}
          <button className="td-btn td-tab-add" onClick={() => addTopdown()} title="평면도 추가">＋</button>
        </div>

        <div className="td-spacer" />

        {/* 도구 */}
        <div className="td-group" role="toolbar" aria-label="도구">
          {TOOLS.map((t) => {
            const locked = target === 'path' && !pathAllows(t.id);
            return (
              <button
                key={t.id}
                className={`td-btn td-tool ${tool === t.id ? 'is-active' : ''}`}
                onClick={() => chooseTool(t.id)}
                disabled={locked}
                title={locked ? '동선 레이어에서는 드로잉·선택만 사용합니다 — 바닥/구조/엄폐로 전환하세요' : t.title}
              >{t.label}</button>
            );
          })}
        </div>

        {/* 빼기·러프 모드 — Dungeon Scrawl의 E 토글 / rough 모드 */}
        <div className="td-group">
          <button
            className={`td-btn td-erase ${erase ? 'is-active' : ''}`}
            onClick={() => setErase((v) => !v)}
            title="빼기 모드 (E) — 켜면 도형이 바닥을 파냄 (비밀통로·기둥·동굴 굴곡)"
          >빼기</button>
          <button
            className={`td-btn td-rough ${rough ? 'is-active' : ''}`}
            onClick={() => setRough((v) => !v)}
            title="러프 모드 (F) — 켜면 새 도형의 외곽선이 거칠어짐 (동굴·자연 지형)"
          >러프</button>
        </div>

        {/* 실행취소 / 다시 실행 */}
        <div className="td-group">
          <button
            className="td-btn td-undo"
            data-testid="td-undo"
            onClick={() => undoProject()}
            disabled={history.past === 0}
            title={`되돌리기 (Ctrl+Z) · ${history.past}`}
          >↶</button>
          <button
            className="td-btn td-redo"
            data-testid="td-redo"
            onClick={() => redoProject()}
            disabled={history.future === 0}
            title={`다시 실행 (Ctrl+Shift+Z / Ctrl+Y) · ${history.future}`}
          >↷</button>
        </div>
      </div>

      {/* ── 옵션 바 (고정 2행 — 도구 전환 시 캔버스가 출렁이지 않게) ── */}
      <div className="td-bar td-bar-sub">
        {/* 그리기 대상 — 바닥(기본) / 내부 구조(잉크 솔리드) / 낮은 엄폐 */}
        <div className="td-group" aria-label="그리기 대상">
          <button
            className={`td-btn ${target === 'floor' ? 'is-active' : ''}`}
            onClick={() => chooseTarget('floor')}
            title="바닥 (1) — 플레이 공간. 그림자·해칭·외벽 자동"
          >바닥</button>
          <button
            className={`td-btn td-target-struct ${target === 'struct' ? 'is-active' : ''}`}
            onClick={() => chooseTarget('struct')}
            title="구조 (2) — 내부 벽·기둥·검은 질량. 잉크 솔리드, 문 부착 가능"
          >구조</button>
          <button
            className={`td-btn td-target-cover ${target === 'cover' ? 'is-active' : ''}`}
            onClick={() => chooseTarget('cover')}
            title="엄폐 (3) — 낮은 상자·난간·둔덕. 어두운 종이톤 채움"
          >엄폐</button>
          <button
            className={`td-btn td-target-path ${target === 'path' ? 'is-active' : ''}`}
            onClick={() => chooseTarget('path')}
            title="동선 (4) — 자유 드로잉 전용 레이어. 도형 병합에 관여하지 않는 주석"
          >동선</button>
        </div>

        {/* 동선 색·두께 — 드로잉 도구일 때만 */}
        {tool === 'draw' && (
          <>
            <div className="td-group" aria-label="동선 색">
              {STROKE_COLORS.map((c) => (
                <button
                  key={c.key}
                  className={`td-btn td-stroke-swatch ${strokeColor === c.key ? 'is-active' : ''}`}
                  data-stroke={c.key}
                  onClick={() => setStrokeColor(c.key)}
                  title={c.label}
                  aria-label={c.label}
                ><span className="td-stroke-dot" />{c.label}</button>
              ))}
            </div>
            <div className="td-group" aria-label="동선 두께">
              {STROKE_WIDTHS.map((w) => (
                <button
                  key={w}
                  className={`td-btn ${strokeWidth === w ? 'is-active' : ''}`}
                  onClick={() => setStrokeWidth(w)}
                  title={`선 두께 ${w}m (${w * 100}uu)`}
                >{w}m</button>
              ))}
              <button
                className="td-btn td-stroke-clear"
                data-testid="td-stroke-clear"
                onClick={() => clearStrokes(doc.id)}
                disabled={(doc.strokes ?? []).length === 0}
                title={`이 평면도의 동선 ${(doc.strokes ?? []).length}획을 모두 지웁니다 (Ctrl+Z로 복구)`}
              >비우기 {(doc.strokes ?? []).length}</button>
            </div>
          </>
        )}

        {/* 복도 폭 — 복도 도구일 때만. 값 = 실제 두께 */}
        {tool === 'corridor' && (
          <div className="td-group" aria-label="복도 폭">
            {[2, 4, 6, 8].map((w) => (
              <button
                key={w}
                className={`td-btn ${corridorW === w ? 'is-active' : ''}`}
                onClick={() => setCorridorW(w)}
                title={`복도 두께 ${w}m (${w * 100}uu)`}
              >{w}m</button>
            ))}
          </div>
        )}

        {/* 문 폭 — 문 도구일 때만. 셀 단위 */}
        {tool === 'door' && (
          <div className="td-group" aria-label="문 폭">
            {[2, 4, 6].map((w) => (
              <button
                key={w}
                className={`td-btn ${doorW === w ? 'is-active' : ''}`}
                onClick={() => setDoorW(w)}
                title={`문 폭 ${w}셀 = ${w}m`}
              >{w}셀</button>
            ))}
          </div>
        )}

        {/* 계단 폭 — 계단 도구일 때만 */}
        {tool === 'stair' && (
          <div className="td-group" aria-label="계단 폭">
            {[2, 4, 6].map((w) => (
              <button
                key={w}
                className={`td-btn ${stairW === w ? 'is-active' : ''}`}
                onClick={() => setStairW(w)}
                title={`계단 폭 ${w}셀 = ${w}m`}
              >{w}셀</button>
            ))}
          </div>
        )}

        {/* 마커 종류 — 마커 도구일 때만 */}
        {tool === 'marker' && (
          <div className="td-group" aria-label="마커 종류">
            {(Object.keys(MARKER_DEFS) as MarkerKind[]).map((k) => (
              <button
                key={k}
                className={`td-btn ${markerKind === k ? 'is-active' : ''}`}
                onClick={() => setMarkerKind(k)}
                title={MARKER_DEFS[k].label}
              >{MARKER_DEFS[k].glyph} {MARKER_DEFS[k].label}</button>
            ))}
          </div>
        )}

        {/* 구역 종류 — 구역 도구일 때만 */}
        {tool === 'zone' && (
          <div className="td-group" aria-label="구역 종류">
            <button
              className={`td-btn td-zone-safe ${zoneKind === 'safe' ? 'is-active' : ''}`}
              onClick={() => setZoneKind('safe')}
              title="안전 지역 — 파란 반투명 채움"
            >안전</button>
            <button
              className={`td-btn td-zone-danger ${zoneKind === 'danger' ? 'is-active' : ''}`}
              onClick={() => setZoneKind('danger')}
              title="위험 지역 — 빨간 반투명 채움"
            >위험</button>
          </div>
        )}

        {/* 텍스트 크기 — 텍스트 도구일 때만 */}
        {tool === 'text' && (
          <div className="td-group" aria-label="텍스트 크기">
            {[1, 2, 4].map((s) => (
              <button
                key={s}
                className={`td-btn ${textSize === s ? 'is-active' : ''}`}
                onClick={() => setTextSize(s)}
                title={`글자 높이 ${s}셀`}
              >{s}셀</button>
            ))}
          </div>
        )}

        {/* 스냅 */}
        <div className="td-group">
          <select
            className="td-select"
            value={snap}
            onChange={(e) => setSnap(Number(e.target.value) as SnapStep)}
            title="스냅 단위 (셀)"
          >
            <option value={1}>스냅 1</option>
            <option value={0.5}>스냅 ½</option>
            <option value={0.25}>스냅 ¼</option>
            <option value={0}>스냅 끔</option>
          </select>
        </div>

        {/* 그리드·벽 스타일 */}
        <div className="td-group">
          <select
            className="td-select"
            value={doc.grid[0]}
            onChange={(e) => {
              const n = Number(e.target.value);
              updateTopdown(doc.id, { grid: [n, n] });
            }}
            title="작업 범위 (셀)"
          >
            {TOPDOWN_GRID_PRESETS.map((n) => (
              <option key={n} value={n}>{n}×{n}</option>
            ))}
          </select>
          <select
            className="td-select"
            value={doc.style.wallM}
            onChange={(e) => updateTopdown(doc.id, { style: { ...doc.style, wallM: Number(e.target.value) } })}
            title="벽 두께 (실척)"
          >
            <option value={0.25}>벽 0.25m</option>
            <option value={0.5}>벽 0.5m</option>
          </select>
          <button
            className={`td-btn ${doc.style.hatch ? 'is-active' : ''}`}
            onClick={() => updateTopdown(doc.id, { style: { ...doc.style, hatch: !doc.style.hatch } })}
            title="외곽 해칭 켜기/끄기"
          >해칭</button>
        </div>

        {/* 동선 레이어 표시 — 버블 토글과 같은 문법. 끄면 렌더·선택·내보내기에서 함께 빠진다 */}
        <div className="td-group" aria-label="동선 표시">
          <button
            className={`td-btn td-path-toggle ${doc.pathVisible !== false ? 'is-active' : ''}`}
            data-testid="td-path-toggle"
            onClick={() => updateTopdown(doc.id, { pathVisible: doc.pathVisible === false })}
            title={`동선 레이어 표시 — 끄면 획 ${(doc.strokes ?? []).length}개가 도면·내보내기에서 숨겨집니다 (데이터는 보존)`}
          >동선</button>
        </div>

        {/* 버블 오버레이 — 투명도 50% 시작, 숨김·조정(이동/스케일) 가능 */}
        <div className="td-group" aria-label="버블 오버레이">
          <button
            className={`td-btn td-overlay ${doc.overlay.visible ? 'is-active' : ''}`}
            onClick={() => {
              const next = !doc.overlay.visible;
              updateTopdown(doc.id, { overlay: { ...doc.overlay, visible: next } });
              if (!next) setCalibrating(false);
            }}
            title="버블 오버레이 — 버블 다이어그램을 도면 위에 반투명으로 표시 (노드가 없으면 빈 화면)"
          >버블</button>
          {doc.overlay.visible && (
            <>
              <input
                className="td-overlay-range"
                type="range"
                min={10}
                max={90}
                step={5}
                value={Math.round(doc.overlay.opacity * 100)}
                onChange={(e) => updateTopdown(doc.id, { overlay: { ...doc.overlay, opacity: Number(e.target.value) / 100 } })}
                title={`오버레이 투명도 ${Math.round(doc.overlay.opacity * 100)}%`}
              />
              <button
                className={`td-btn td-cal ${calibrating ? 'is-active' : ''}`}
                onClick={() => setCalibrating((v) => !v)}
                title="오버레이 조정 — 켜면 캔버스 드래그로 오버레이 이동, 슬라이더로 스케일"
              >조정</button>
              {calibrating && (
                <>
                  <input
                    className="td-overlay-range td-cal-range"
                    type="range"
                    min={30}
                    max={300}
                    step={5}
                    value={Math.round((doc.overlay.scale || 1) * 100)}
                    onChange={(e) => updateTopdown(doc.id, { overlay: { ...doc.overlay, scale: Number(e.target.value) / 100 } })}
                    title={`오버레이 스케일 ${Math.round((doc.overlay.scale || 1) * 100)}%`}
                  />
                  <button
                    className="td-btn"
                    onClick={() => updateTopdown(doc.id, { overlay: { ...doc.overlay, tx: 0, ty: 0, scale: 1 } })}
                    title="오버레이 위치·스케일을 자동 맞춤으로 되돌리기"
                  >리셋</button>
                </>
              )}
            </>
          )}
        </div>

        <div className="td-spacer" />

        {/* 내보내기 */}
        <div className="td-group">
          <button
            className="td-btn"
            onClick={() => exportTopdownPNG(doc, `${project.name}_${doc.name}.png`)}
            title="현재 평면도를 PNG로"
          >PNG</button>
          <button
            className="td-btn"
            onClick={() => downloadJSON(project, `${project.name}.map.json`)}
            title="맵 전체(버블+평면도)를 JSON으로"
          >맵 JSON</button>
        </div>
      </div>

      {/* ── 캔버스 ── */}
      <TopdownCanvas
        doc={doc}
        tool={tool}
        erase={erase}
        rough={rough}
        snap={snap}
        corridorW={corridorW}
        doorW={doorW}
        stairW={stairW}
        textSize={textSize}
        markerKind={markerKind}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
        zoneKind={zoneKind}
        target={target}
        calibrating={calibrating && doc.overlay.visible}
        onStatus={setStatus}
      />

      {/* ── 상태바 ── */}
      <div className="td-status">
        <span className="td-status-doc">{doc.name}</span>
        <span>
          {doc.grid[0]}×{doc.grid[1]}셀 · {meters}m ({meters * 100}uu) · 도형 {doc.geo.length} · 구조 {(doc.struct ?? []).length} · 구역 {(doc.zones ?? []).length} · 문 {(doc.doors ?? []).length} · 계단 {(doc.stairs ?? []).length} · 텍스트 {(doc.texts ?? []).length} · 마커 {(doc.markers ?? []).length}
        </span>
        <span className="td-status-hover">{status}</span>
        <span className="td-status-hint">휠: 줌 · 스페이스+드래그: 이동 · E: 빼기 · F: 러프 · Ctrl+Z: 실행취소</span>
      </div>

      {/* Esc 나가기 확인 — 작도 중 실수로 눌러 화면이 바뀌는 것을 막는다 */}
      {confirmExit && createPortal(
        <div className="pt-confirm-backdrop" onClick={() => setConfirmExit(false)}>
          <div
            className="pt-confirm"
            data-testid="td-exit-confirm"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="pt-confirm-msg">
              평면도를 닫고 <strong>버블 다이어그램</strong>으로 돌아갈까요?<br />
              작업 내용은 그대로 저장되어 있습니다.
            </p>
            <div className="pt-confirm-actions">
              <button
                className="pt-btn"
                data-testid="td-exit-cancel"
                autoFocus
                onClick={() => setConfirmExit(false)}
              >취소</button>
              <button
                className="pt-btn pt-btn--danger"
                data-testid="td-exit-ok"
                onClick={() => { setConfirmExit(false); exitTopdown(); }}
              >나가기</button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </div>
  );
}
