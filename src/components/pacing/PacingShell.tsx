import { useEffect, useRef, useState } from 'react';
import type * as React from 'react';
import { toPng } from 'html-to-image';
import { useProject } from '../../store/project';
import { usePacing, undoPacing, redoPacing } from '../../store/pacing';
import { downloadJSON } from '../../store/persistence';
import { PacingCanvas, PacingMapPanel, segColor, type PacTool } from './PacingCanvas';
import { PacingSide } from './PacingSide';
import { PACING_PRESETS } from './pacing-presets';
import { topdownToDataURL } from '../topdown/topdown-utils';
import type { Project } from '../../types';
import '../topdown/TopdownShell.css';
import './PacingShell.css';

/* ─────────────────────────────────────────────────────────
   페이싱 곡선 에디터 셸 — FlowShell 골격 승계 (50·51강)
   탭 · 도구 · undo · 맵 불러오기/내보내기(자리) · 캔버스+사이드 · 상태바
   ───────────────────────────────────────────────────────── */

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
  const projects = useProject((s) => s.projects);
  const docsAll = usePacing((s) => s.docs);
  const activeId = usePacing((s) => s.currentId);
  const setActive = usePacing((s) => s.setActive);
  const addDoc = usePacing((s) => s.addDoc);
  const removeDoc = usePacing((s) => s.removeDoc);
  const renameDoc = usePacing((s) => s.renameDoc);
  const addSegment = usePacing((s) => s.addSegment);
  const setMap = usePacing((s) => s.setMap);

  const [tool, setTool] = useState<PacTool>('select');
  const [status, setStatus] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [history, setHistory] = useState({ past: 0, future: 0 });
  /** 핀이 붙을 구간 — 곡선 하단 구간 이름 클릭 또는 사이드 목록 클릭으로 갱신 */
  const [selSeg, setSelSeg] = useState<string | null>(null);
  const mapInputRef = useRef<HTMLInputElement | null>(null);
  /** 곡선 + 맵 패널을 함께 담는 내보내기 컨테이너 — PNG는 이 범위 그대로 캡처 */
  const exportRef = useRef<HTMLDivElement | null>(null);
  const [exportBusy, setExportBusy] = useState(false);

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

  /** 문서 전환·구간 삭제 등으로 selSeg가 무효화되면 첫 구간으로 되돌림 */
  useEffect(() => {
    if (!doc) return;
    if (!doc.segments.some((s) => s.id === selSeg)) setSelSeg(doc.segments[0]?.id ?? null);
  }, [doc?.id, doc?.segments, selSeg]);

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

  /** PNG 내보내기 — 곡선 캔버스 + 맵 패널을 나란히 담은 .pac-export 컨테이너를 화면 배치 그대로 캡처 (과제 제출 서식) */
  const handleExportPNG = async () => {
    if (!exportRef.current) return;
    setExportBusy(true);
    try {
      const paper100 = getComputedStyle(document.body).getPropertyValue('--paper-100')?.trim();
      const dataUrl = await toPng(exportRef.current, {
        pixelRatio: 2,
        backgroundColor: paper100 || '#fff',
      });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `pacing-${doc.name}.png`;
      a.click();
      setStatus('PNG 저장 완료');
    } catch (e) {
      setStatus(`PNG 내보내기 실패: ${(e as Error).message ?? e}`);
    } finally {
      setExportBusy(false);
    }
  };

  /** JSON 내보내기 — 현재 페이싱 문서를 원본 그대로 저장 (백업·공유용) */
  const handleExportJSON = () => {
    downloadJSON(doc as unknown as Project, `${doc.name}.json`);
    setStatus('JSON 저장 완료');
  };

  /** 맵 불러오기 — FileReader로 dataURL 변환 후 Image로 원본 w/h 측정, setMap에 반영 */
  const handleMapFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // 같은 파일 재선택 허용
    if (!file) return;
    const fr = new FileReader();
    fr.onload = () => {
      const img = new Image();
      img.onload = () => {
        setMap(doc.id, { dataUrl: img.src, w: img.naturalWidth, h: img.naturalHeight });
        setStatus('맵 불러옴');
      };
      img.src = fr.result as string;
    };
    fr.readAsDataURL(file);
  };

  // 이전에 만든 평면도(Top-down) 목록 — 모든 프로젝트의 topdowns를 평탄화
  const topdownEntries = projects.flatMap((p) =>
    p.topdowns.map((t) => ({ id: t.id, label: `${p.name} · ${t.name}`, doc: t })),
  );

  /** 내 평면도에서 불러오기 — 선택한 Top-down 문서를 이미지로 렌더해 배경 맵으로 설정 */
  const handleTopdownPick = (topId: string) => {
    const entry = topdownEntries.find((e) => e.id === topId);
    if (!entry) return;
    try {
      const { dataUrl, w, h } = topdownToDataURL(entry.doc);
      setMap(doc.id, { dataUrl, w, h });
      setStatus(`평면도 불러옴 — ${entry.label}`);
    } catch (e) {
      setStatus(`평면도 불러오기 실패: ${(e as Error).message ?? e}`);
    }
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
            onClick={() => setSelSeg(addSegment(doc.id))}
            title="구간 추가 — 곡선 가로축에 새 구간을 덧붙이고 바로 선택(오른쪽에서 편집)"
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
          <input
            ref={mapInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleMapFile}
          />
          <select
            className="td-select"
            value=""
            data-testid="pac-map-topdown"
            disabled={topdownEntries.length === 0}
            onChange={(e) => { if (e.target.value) handleTopdownPick(e.target.value); e.target.value = ''; }}
            title="내 평면도에서 — 이전에 만든 Top-down 맵을 배경으로 불러온다"
          >
            <option value="">
              {topdownEntries.length === 0 ? '평면도 없음' : '내 평면도에서…'}
            </option>
            {topdownEntries.map((e) => (
              <option key={e.id} value={e.id}>{e.label}</option>
            ))}
          </select>
          <button
            className="td-btn"
            onClick={() => mapInputRef.current?.click()}
            title="맵 불러오기 — 외부 이미지 파일을 배경 맵으로 불러온다"
          >이미지 파일…</button>
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

        <div className="td-group" aria-label="내보내기">
          <button
            className="td-btn"
            onClick={handleExportPNG}
            disabled={exportBusy}
            title="PNG 내보내기 — 곡선과 맵을 화면 배치 그대로 이미지 한 장으로 저장 (과제 제출용)"
          >{exportBusy ? '저장 중…' : 'PNG 내보내기'}</button>
          <button
            className="td-btn"
            onClick={handleExportJSON}
            title="JSON 내보내기 — 현재 페이싱 문서 원본 저장 (백업·공유용)"
          >JSON 내보내기</button>
        </div>
      </div>

      {/* ── 곡선 캔버스 + 맵 패널 (세로로 쌓임) — PNG 내보내기 캡처 범위 ── */}
      <div className="pac-body pac-export" ref={exportRef}>
        <div className="pac-main">
          <PacingCanvas
            doc={doc}
            tool={tool}
            mapMode={tool === 'pin'}
            selSeg={selSeg}
            onSelectSeg={setSelSeg}
            onStatus={setStatus}
          />
          <PacingSide doc={doc} selectedSegId={selSeg} onSelectSeg={setSelSeg} />
        </div>

        <div className="pac-map">
          <div className="pac-main">
            <PacingMapPanel doc={doc} tool={tool} selSeg={selSeg} onStatus={setStatus} />
            <div className="pac-side">
              <div className="pac-side-title">핀 {doc.pins.length}</div>
              {doc.pins.length === 0 ? (
                <p className="pac-side-hint">아직 배치된 핀이 없습니다.</p>
              ) : (
                <ul className="pac-pin-list">
                  {doc.pins.map((p) => {
                    const seg = doc.segments.find((s) => s.id === p.segId);
                    return (
                      <li key={p.id} className="pac-pin-item">
                        <span className="pac-seg-swatch" style={{ background: segColor(doc, p.segId) }} />
                        {seg?.name ?? '구간 없음'}
                      </li>
                    );
                  })}
                </ul>
              )}
              <p className="pac-side-hint">핀 드래그: 이동 · Alt+클릭/우클릭: 삭제</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 상태바 ── */}
      <div className="td-status">
        <span className="td-status-doc">{doc.name}</span>
        <span>구간 {doc.segments.length} · 점 {doc.points.length} · 핀 {doc.pins.length}</span>
        <span className="td-status-hover">{status}</span>
        <span className="td-status-hint">점 도구: 빈 곳 클릭해 추가 · 점 드래그: 이동 · Alt+클릭/우클릭: 삭제 · 구간+: 가로축 구간 추가 · 핀 도구: 구간 선택 후 맵 클릭해 추가</span>
      </div>
    </div>
  );
}
