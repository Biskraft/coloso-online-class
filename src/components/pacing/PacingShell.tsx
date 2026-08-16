import { useEffect, useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import { useProject } from '../../store/project';
import { usePacing, undoPacing, redoPacing } from '../../store/pacing';
import { downloadJSON } from '../../store/persistence';
import { PacingCanvas, type PacTool } from './PacingCanvas';
import { PacingSide } from './PacingSide';
import { PACING_PRESETS } from './pacing-presets';
import type { Project } from '../../types';
import '../topdown/TopdownShell.css';
import './PacingShell.css';

/* ─────────────────────────────────────────────────────────
   페이싱 곡선 에디터 셸 — FlowShell 골격 승계 (50·51강)
   탭 · 도구 · undo · 내보내기 · 캔버스+사이드 · 상태바
   페이싱은 시간축(긴장 곡선)만 다룬다 — 공간(평면도·핀)은 Top-down 모드 담당.
   ───────────────────────────────────────────────────────── */

const TOOLS: { id: PacTool; label: string; key: string; title: string }[] = [
  { id: 'select',    label: '선택', key: 'V', title: '선택 (V) — 점 이동·삭제는 도구와 무관하게 항상 가능' },
  { id: 'point',     label: '점',   key: 'P', title: '점 (P) — 빈 곳 클릭으로 곡선 위에 점 추가' },
  { id: 'flag',      label: '도착', key: 'F', title: '도착 (F) — 레벨 끝에서 도달할 감정 지점' },
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
  /** 편집 중인 구간 — 곡선 하단 구간 이름 클릭 또는 사이드 목록 클릭으로 갱신 */
  const [selSeg, setSelSeg] = useState<string | null>(null);
  /** 곡선 캔버스만 담는 내보내기 컨테이너 — PNG는 이 범위만 캡처(사이드 패널 제외) */
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
    const n = target ? target.points.length + target.markers.length : 0;
    if (n > 0 && !window.confirm(`'${name}'에 점·표기 ${n}개가 있습니다. 삭제할까요?`)) return;
    removeDoc(id);
  };

  /** PNG 내보내기 — 곡선 캔버스만 담은 .pac-export 컨테이너를 캡처. 오른쪽 사이드 패널은 포함하지 않는다 (과제 제출 서식) */
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

      {/* ── 상단 바 2행 — 학습 프리셋 · 내보내기 ── */}
      <div className="td-bar td-bar-sub">
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
            title="PNG 내보내기 — 긴장 곡선만 이미지 한 장으로 저장 (과제 제출용)"
          >{exportBusy ? '저장 중…' : 'PNG 내보내기'}</button>
          <button
            className="td-btn"
            onClick={handleExportJSON}
            title="JSON 내보내기 — 현재 페이싱 문서 원본 저장 (백업·공유용)"
          >JSON 내보내기</button>
        </div>
      </div>

      {/* ── 곡선 캔버스 + 사이드 — PNG 캡처 범위는 곡선(.pac-export)까지만 ── */}
      <div className="pac-body">
        <div className="pac-main">
          <div className="pac-export" ref={exportRef}>
            <PacingCanvas
              doc={doc}
              tool={tool}
              selSeg={selSeg}
              onSelectSeg={setSelSeg}
              onStatus={setStatus}
            />
          </div>
          <PacingSide doc={doc} selectedSegId={selSeg} onSelectSeg={setSelSeg} />
        </div>
      </div>

      {/* ── 상태바 ── */}
      <div className="td-status">
        <span className="td-status-doc">{doc.name}</span>
        <span>구간 {doc.segments.length} · 점 {doc.points.length} · 표기 {doc.markers.length}</span>
        <span className="td-status-hover">{status}</span>
        <span className="td-status-hint">점 도구: 빈 곳 클릭해 추가 · 점 드래그: 이동 · Alt+클릭/우클릭: 삭제 · 구간+: 가로축 구간 추가</span>
      </div>
    </div>
  );
}
