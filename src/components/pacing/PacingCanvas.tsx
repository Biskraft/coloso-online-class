import { useMemo, useRef } from 'react';
import type * as React from 'react';
import type { PacingDoc, PacingSegment } from '../../types';
import { curvePath, segmentBounds, globalX } from './pacing-utils';
import { usePacing } from '../../store/pacing';
import { uid } from '../../utils/id';
import './PacingShell.css';

/** 페이싱 캔버스 도구 — select(기본) / point(추가) / peakvalley·gap·flag(마커) / pin(맵 핀) */
export type PacTool = 'select' | 'point' | 'peakvalley' | 'gap' | 'flag' | 'pin';

/** SVG viewBox 고정 크기 + 축 여백 */
export const VIEW = { W: 900, H: 460, pad: 44 };

/** 포인터 이벤트 → SVG 로컬 좌표 (getScreenCTM 역행렬) */
export function toLocal(e: React.PointerEvent, svg: SVGSVGElement) {
  const pt = svg.createSVGPoint();
  pt.x = e.clientX;
  pt.y = e.clientY;
  const p = pt.matrixTransform(svg.getScreenCTM()!.inverse());
  return { x: p.x, y: p.y };
}

/** SVG 로컬 x → 진행률(0~1) */
export const xToProgress = (x: number) => (x - VIEW.pad) / (VIEW.W - 2 * VIEW.pad);
/** SVG 로컬 y → 긴장도(0~100) */
export const yToTension = (y: number) =>
  ((VIEW.H - VIEW.pad - y) / (VIEW.H - 2 * VIEW.pad)) * 100;

/** 전체 진행률(progress, 0~1) → 소속 구간 id + 구간 내 상대 위치(t, 0~1) 역산 */
export function resolveSeg(progress: number, segments: PacingSegment[]): { segId: string; t: number } {
  const bounds = segmentBounds(segments);
  const p = Math.max(0, Math.min(1, progress));
  const b = bounds.find((x) => p >= x.x0 && p < x.x1) ?? bounds[bounds.length - 1];
  const span = b.x1 - b.x0 || 1e-6;
  const t = Math.max(0, Math.min(1, (p - b.x0) / span));
  return { segId: b.id, t };
}

export interface PacingCanvasProps {
  doc: PacingDoc;
  tool: PacTool;
  mapMode: boolean;
  onStatus: (msg: string) => void;
}

/** 긴장 눈금(세로축) — 0·50·100 */
const TENSION_TICKS = [0, 50, 100];

/**
 * SVG 캔버스 골격 — 청사진 그리드, 긴장 눈금, 구간 경계·이름, 곡선, 포인트.
 * 포인트 생성(빈 곳 클릭, point 도구)·드래그·삭제(Alt+클릭/우클릭)는 Task 6에서 구현됨.
 * 마커·맵 오버레이는 Task 8·9. `mapMode`는 이후 단계에서 사용.
 */
export function PacingCanvas({ doc, tool, mapMode: _mapMode, onStatus }: PacingCanvasProps) {
  const { W, H, pad } = VIEW;

  const addPoint = usePacing((s) => s.addPoint);
  const movePoint = usePacing((s) => s.movePoint);
  const removePoint = usePacing((s) => s.removePoint);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const draggingId = useRef<string | null>(null);

  const bounds = useMemo(() => segmentBounds(doc.segments), [doc.segments]);
  const path = useMemo(() => curvePath(doc, W, H, pad), [doc, W, H, pad]);

  const px = (t: number) => pad + t * (W - 2 * pad);
  const py = (tension: number) => H - pad - (tension / 100) * (H - 2 * pad);

  /** 로컬 SVG 좌표 → (진행률, 긴장도) 클램프된 쌍 */
  const localToPT = (svg: SVGSVGElement, e: React.PointerEvent) => {
    const { x, y } = toLocal(e, svg);
    const progress = Math.max(0, Math.min(1, xToProgress(x)));
    const tension = Math.max(0, Math.min(100, yToTension(y)));
    return { progress, tension };
  };

  /** 빈 캔버스 pointerdown — point 도구일 때만 새 점 생성 */
  const handleSvgPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (tool !== 'point') return;
    const svg = svgRef.current;
    if (!svg) return;
    const { progress, tension } = localToPT(svg, e);
    const { segId, t } = resolveSeg(progress, doc.segments);
    addPoint(doc.id, { id: uid('pc-p'), segId, t, tension });
    onStatus('점 추가');
  };

  /** 점 드래그 중 — 캡처된 pointerId의 이동을 store에 반영(요소 재생성 없이) */
  const handleSvgPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const id = draggingId.current;
    if (!id) return;
    const svg = svgRef.current;
    if (!svg) return;
    const { progress, tension } = localToPT(svg, e);
    const { segId, t } = resolveSeg(progress, doc.segments);
    movePoint(doc.id, id, segId, t, tension);
  };

  const endDrag = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!draggingId.current) return;
    draggingId.current = null;
    const svg = svgRef.current;
    if (svg && svg.hasPointerCapture(e.pointerId)) svg.releasePointerCapture(e.pointerId);
  };

  /** 점 원 pointerdown — Alt+클릭은 즉시 삭제, 아니면 드래그 시작 */
  const handlePointPointerDown = (id: string) => (e: React.PointerEvent<SVGCircleElement>) => {
    e.stopPropagation();
    if (e.altKey) {
      removePoint(doc.id, id);
      onStatus('점 삭제');
      return;
    }
    const svg = svgRef.current;
    if (!svg) return;
    draggingId.current = id;
    svg.setPointerCapture(e.pointerId);
  };

  const handlePointContextMenu = (id: string) => (e: React.MouseEvent<SVGCircleElement>) => {
    e.preventDefault();
    e.stopPropagation();
    removePoint(doc.id, id);
    onStatus('점 삭제');
  };

  return (
    <div className="pac-canvas">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="pac-svg"
        data-testid="pacing-canvas"
        onPointerDown={handleSvgPointerDown}
        onPointerMove={handleSvgPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <defs>
          <pattern id="pac-grid-soft" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--grid-line-soft)" strokeWidth={1} />
          </pattern>
          <pattern id="pac-grid-hard" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="var(--grid-line-hard)" strokeWidth={1} />
          </pattern>
        </defs>

        {/* 청사진 그리드 배경 */}
        <rect x={0} y={0} width={W} height={H} fill="var(--paper-100)" />
        <rect x={0} y={0} width={W} height={H} fill="url(#pac-grid-soft)" />
        <rect x={0} y={0} width={W} height={H} fill="url(#pac-grid-hard)" />

        {/* 세로 긴장 눈금 — 0·50·100 */}
        {TENSION_TICKS.map((t) => {
          const y = py(t);
          return (
            <g key={`tick-${t}`}>
              <line
                x1={pad}
                y1={y}
                x2={W - pad}
                y2={y}
                stroke="var(--grid-line-hard)"
                strokeWidth={1}
                strokeDasharray={t === 0 || t === 100 ? undefined : '3 3'}
              />
              <text x={pad - 8} y={y + 3} textAnchor="end" className="pac-tick-label">
                {t}
              </text>
            </g>
          );
        })}

        {/* 가로축 구간 경계 세로선 + 구간 이름 */}
        {bounds.map((b, i) => {
          const x0 = px(b.x0);
          const x1 = px(b.x1);
          return (
            <g key={b.id}>
              {i > 0 && (
                <line
                  x1={x0}
                  y1={pad}
                  x2={x0}
                  y2={H - pad}
                  stroke="var(--blueprint)"
                  strokeOpacity={0.5}
                  strokeWidth={1}
                  strokeDasharray="4 3"
                />
              )}
              <text x={(x0 + x1) / 2} y={H - pad + 18} textAnchor="middle" className="pac-seg-label">
                {doc.segments[i]?.name ?? ''}
              </text>
            </g>
          );
        })}

        {/* 페이싱 곡선 */}
        <path d={path} stroke="var(--ochre)" fill="none" strokeWidth={2.5} />

        {/* 포인트 — 히트 원(투명, r16) + 표시 원(r6) */}
        {doc.points.map((p) => {
          const gx = globalX(p.segId, p.t, doc.segments);
          const cx = px(gx);
          const cy = py(p.tension);
          return (
            <g key={p.id} className="pac-point">
              <circle
                cx={cx}
                cy={cy}
                r={16}
                fill="transparent"
                onPointerDown={handlePointPointerDown(p.id)}
                onContextMenu={handlePointContextMenu(p.id)}
                style={{ cursor: 'grab', touchAction: 'none' }}
              />
              <circle cx={cx} cy={cy} r={6} fill="var(--paper-50)" stroke="var(--ochre)" strokeWidth={2} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
