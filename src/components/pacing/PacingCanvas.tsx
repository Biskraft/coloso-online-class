import { useMemo, useRef } from 'react';
import type * as React from 'react';
import type { PacingDoc, PacingMarker, PacingNodeKind, PacingSegment } from '../../types';
import { curvePath, segmentBounds, globalX, monotoneCubic, sortedSamples } from './pacing-utils';
import { usePacing } from '../../store/pacing';
import { uid } from '../../utils/id';
import './PacingShell.css';

/** 구간 색 팔레트 — 네이비(blueprint)/옐로우(ochre) 계열 + 잉크 회색만 순환 사용(제3색 금지) */
const SEG_COLORS = [
  'var(--blueprint)',
  'var(--ochre)',
  'var(--blueprint-deep)',
  'var(--ochre-deep)',
  'var(--ink-500)',
  'var(--blueprint-soft)',
  'var(--ochre-soft)',
];

/** 구간 id → 팔레트 색(구간 배열 내 인덱스 기준 순환). 곡선 구간 범례에서 사용 */
export function segColor(doc: PacingDoc, segId: string): string {
  const i = doc.segments.findIndex((s) => s.id === segId);
  return SEG_COLORS[(i < 0 ? 0 : i) % SEG_COLORS.length];
}

/** 페이싱 캔버스 도구 — select(기본) / point(추가) / node·gap·flag(표기) */
export type PacTool = 'select' | 'point' | 'node' | 'gap' | 'flag';

/** 노드 7유형 메타 — 라벨과 계열. 사이드 패널·상태줄에서 공용 */
export const NODE_META: Record<PacingNodeKind, { label: string; family: '확인' | '부정' | '선택' }> = {
  continue: { label: '연속',      family: '확인' },
  deviate:  { label: '편차',      family: '확인' },
  redirect: { label: '방향 전환', family: '부정' },
  reverse:  { label: '반전',      family: '부정' },
  deadend:  { label: '막다른 길', family: '부정' },
  diverge:  { label: '발산',      family: '선택' },
  converge: { label: '수렴',      family: '선택' },
};

/** 계열별 색 — 확인은 차분, 부정은 벽돌, 선택은 청사진 */
const NODE_COLOR: Record<'확인' | '부정' | '선택', string> = {
  '확인': 'var(--ink-500)', '부정': 'var(--brick)', '선택': 'var(--blueprint)',
};

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

/** 곡선 위 진행률(at, 0~1) 지점의 tension(0~100) 조회 — 표기를 곡선에 앵커할 때 사용 */
export function curveTensionAt(doc: PacingDoc, at: number): number {
  const f = monotoneCubic(sortedSamples(doc));
  return f(Math.max(0, Math.min(1, at)));
}

/** at 좌우 미세 샘플로 정점(+1)/저점(-1) 판정 — 곡선 위/아래 배치 판정에 사용 */
export function curvatureSign(doc: PacingDoc, at: number): 1 | -1 {
  const f = monotoneCubic(sortedSamples(doc));
  const a = Math.max(0, Math.min(1, at));
  const eps = 0.02;
  const c = f(a);
  const l = f(Math.max(0, a - eps));
  const r = f(Math.min(1, a + eps));
  return c >= (l + r) / 2 ? 1 : -1;
}

/** 표기 도구에서 곡선 근처로 판정할 세로 허용 오차(px) */
const MARKER_NEAR_PX = 24;

export interface PacingCanvasProps {
  doc: PacingDoc;
  tool: PacTool;
  /** 편집 중인 구간 — 곡선 하단 구간 이름 클릭 또는 사이드 목록 클릭으로 갱신 */
  selSeg?: string | null;
  onSelectSeg?: (segId: string) => void;
  onStatus: (msg: string) => void;
}

/** 긴장 눈금(세로축) — 0·50·100 */
const TENSION_TICKS = [0, 50, 100];

/**
 * SVG 캔버스 골격 — 청사진 그리드, 긴장 눈금, 구간 경계·이름, 곡선, 포인트, 표기.
 * 포인트 생성(빈 곳 클릭, point 도구)·드래그·삭제(Alt+클릭/우클릭)는 Task 6에서 구현됨.
 * 표기(노드/간극/도착) 부착·드래그·삭제는 Task 8에서 구현됨.
 * 곡선 하단 구간 이름 클릭으로 `selSeg`가 갱신되어 사이드 구간 편집칸과 연결된다.
 */
export function PacingCanvas({ doc, tool, selSeg, onSelectSeg, onStatus }: PacingCanvasProps) {
  const { W, H, pad } = VIEW;

  const addPoint = usePacing((s) => s.addPoint);
  const movePoint = usePacing((s) => s.movePoint);
  const removePoint = usePacing((s) => s.removePoint);
  const addMarker = usePacing((s) => s.addMarker);
  const moveMarker = usePacing((s) => s.moveMarker);
  const removeMarker = usePacing((s) => s.removeMarker);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const draggingId = useRef<string | null>(null);
  const draggingMarkerId = useRef<string | null>(null);

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

  /** 빈 캔버스 pointerdown — point 도구는 새 점, 표기 도구(peakvalley/gap/flag)는 새 표기 생성 */
  const handleSvgPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;

    if (tool === 'point') {
      const { progress, tension } = localToPT(svg, e);
      const { segId, t } = resolveSeg(progress, doc.segments);
      addPoint(doc.id, { id: uid('pc-p'), segId, t, tension });
      onStatus('점 추가');
      return;
    }

    if (tool === 'node' || tool === 'gap' || tool === 'flag') {
      const { x, y } = toLocal(e, svg);
      const at = Math.max(0, Math.min(1, xToProgress(x)));
      const tension = curveTensionAt(doc, at);

      if (tool === 'node') {
        const curveY = py(tension);
        if (Math.abs(y - curveY) > MARKER_NEAR_PX) return; // 곡선 근처가 아니면 무시
        // 기본값은 '연속' — 유형 변경은 사이드 패널에서
        addMarker(doc.id, { id: uid('pc-m'), kind: 'node', node: 'continue', at, tension });
        onStatus('노드 추가 — 연속 (유형은 오른쪽에서 변경)');
        return;
      }

      const kind: PacingMarker['kind'] = tool === 'gap' ? 'gap' : 'flag';
      addMarker(doc.id, { id: uid('pc-m'), kind, at, tension });
      onStatus(kind === 'gap' ? '간극 표기 추가' : '도착 표기 추가');
    }
  };

  /** 드래그 중 — 캡처된 pointerId의 이동을 store에 반영(요소 재생성 없이). 점/표기 각각 처리 */
  const handleSvgPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;

    if (draggingId.current) {
      const { progress, tension } = localToPT(svg, e);
      const { segId, t } = resolveSeg(progress, doc.segments);
      movePoint(doc.id, draggingId.current, segId, t, tension);
      return;
    }

    if (draggingMarkerId.current) {
      const { x } = toLocal(e, svg);
      const at = Math.max(0, Math.min(1, xToProgress(x)));
      const tension = curveTensionAt(doc, at); // 표기는 항상 곡선을 추종
      moveMarker(doc.id, draggingMarkerId.current, at, tension);
    }
  };

  const endDrag = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!draggingId.current && !draggingMarkerId.current) return;
    draggingId.current = null;
    draggingMarkerId.current = null;
    const svg = svgRef.current;
    if (svg && svg.hasPointerCapture(e.pointerId)) svg.releasePointerCapture(e.pointerId);
  };

  /** 점 그룹 pointerdown — Alt+클릭은 즉시 삭제, 아니면 드래그 시작 */
  const handlePointPointerDown = (id: string) => (e: React.PointerEvent<SVGGElement>) => {
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

  const handlePointContextMenu = (id: string) => (e: React.MouseEvent<SVGGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    removePoint(doc.id, id);
    onStatus('점 삭제');
  };

  /** 표기 pointerdown — Alt+클릭은 즉시 삭제, 아니면 드래그 시작 */
  const handleMarkerPointerDown = (id: string) => (e: React.PointerEvent<SVGGElement>) => {
    e.stopPropagation();
    if (e.altKey) {
      removeMarker(doc.id, id);
      onStatus('표기 삭제');
      return;
    }
    const svg = svgRef.current;
    if (!svg) return;
    draggingMarkerId.current = id;
    svg.setPointerCapture(e.pointerId);
  };

  const handleMarkerContextMenu = (id: string) => (e: React.MouseEvent<SVGGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    removeMarker(doc.id, id);
    onStatus('표기 삭제');
  };

  /** 노드 7유형 글리프 — 곡선 위쪽에 그린다. 모두 직접 그린 선/도형(이모지 금지) */
  const renderNodeGlyph = (nk: PacingNodeKind, cx: number, cy: number) => {
    const col = NODE_COLOR[NODE_META[nk].family];
    const y = cy - 20;                    // 글리프 기준선
    const P = { fill: 'none', stroke: col, strokeWidth: 2.4, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
    switch (nk) {
      case 'continue':  // → 직진
        return <g><line x1={cx - 10} y1={y} x2={cx + 8} y2={y} {...P} /><polyline points={`${cx + 3},${y - 5} ${cx + 9},${y} ${cx + 3},${y + 5}`} {...P} /></g>;
      case 'deviate':   // 살짝 굽어 나갔다 제자리로 — 직진에서 벗어난 한 번의 흔들림
        return (
          <g>
            <path d={`M ${cx - 12} ${y + 3} q 6 -12 11 0`} {...P} />
            <line x1={cx - 1} y1={y + 3} x2={cx + 7} y2={y + 3} {...P} />
            <polyline points={`${cx + 3},${y - 1} ${cx + 8},${y + 3} ${cx + 3},${y + 7}`} {...P} strokeWidth={2} />
          </g>
        );
      case 'redirect':  // ⤷ 전진 정지 후 옆걸음
        return <g><polyline points={`${cx - 9},${y - 7} ${cx - 9},${y + 4} ${cx + 7},${y + 4}`} {...P} /><polyline points={`${cx + 2},${y - 1} ${cx + 8},${y + 4} ${cx + 2},${y + 9}`} {...P} /></g>;
      case 'reverse':   // ↩ 목표에서 멀어짐
        return <g><path d={`M ${cx + 10} ${y + 5} q 0 -11 -11 -11 h -6`} {...P} /><polyline points={`${cx - 2},${y - 11} ${cx - 8},${y - 6} ${cx - 2},${y - 1}`} {...P} /></g>;
      case 'deadend':   // ⊣ 막힘
        return <g><line x1={cx - 11} y1={y} x2={cx + 5} y2={y} {...P} /><line x1={cx + 6} y1={y - 8} x2={cx + 6} y2={y + 8} {...P} strokeWidth={3.2} /></g>;
      case 'diverge':   // 하나에서 둘로 — 위 두 끝에 화살촉
        return (
          <g>
            <line x1={cx} y1={y + 9} x2={cx} y2={y} {...P} />
            <line x1={cx} y1={y} x2={cx - 10} y2={y - 10} {...P} />
            <line x1={cx} y1={y} x2={cx + 10} y2={y - 10} {...P} />
            <polyline points={`${cx - 10},${y - 4} ${cx - 11},${y - 11} ${cx - 4},${y - 10}`} {...P} strokeWidth={2} />
            <polyline points={`${cx + 10},${y - 4} ${cx + 11},${y - 11} ${cx + 4},${y - 10}`} {...P} strokeWidth={2} />
          </g>
        );
      case 'converge':  // 둘에서 하나로 — 아래 줄기 끝에 화살촉
        return (
          <g>
            <line x1={cx - 10} y1={y - 10} x2={cx} y2={y} {...P} />
            <line x1={cx + 10} y1={y - 10} x2={cx} y2={y} {...P} />
            <line x1={cx} y1={y} x2={cx} y2={y + 9} {...P} />
            <polyline points={`${cx - 5},${y + 4} ${cx},${y + 10} ${cx + 5},${y + 4}`} {...P} strokeWidth={2} />
          </g>
        );
      default:
        return null;
    }
  };

  /** 표기 아이콘(SVG) — 컬러 이모지 대신 직접 그린 도형만 사용 */
  const renderMarkerIcon = (m: PacingMarker, cx: number, cy: number) => {
    const GAP = 6; // 곡선과 아이콘 사이 여백
    switch (m.kind) {
      case 'node':
        return renderNodeGlyph(m.node ?? 'continue', cx, cy);
      case 'gap': {
        // 간극 — 옐로우 지그재그 폴리라인(이모지 금지)
        const topY = cy - GAP - 14;
        const botY = cy - GAP;
        const midY1 = topY + (botY - topY) * 0.33;
        const midY2 = topY + (botY - topY) * 0.66;
        return (
          <polyline
            points={`${cx - 4},${topY} ${cx + 4},${midY1} ${cx - 4},${midY2} ${cx + 4},${botY}`}
            fill="none"
            stroke="var(--ochre)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      }
      case 'flag': {
        // 도착 — 흰(paper) 깃대 + 옐로우(ochre) 삼각 페넌트
        const poleTop = cy - GAP - 26;
        return (
          <g>
            <line x1={cx} y1={cy} x2={cx} y2={poleTop} stroke="var(--ink-700)" strokeWidth={3.5} strokeLinecap="round" />
            <line x1={cx} y1={cy} x2={cx} y2={poleTop} stroke="var(--paper-50)" strokeWidth={1.5} strokeLinecap="round" />
            <polygon
              points={`${cx},${poleTop} ${cx + 13},${poleTop + 5} ${cx},${poleTop + 10}`}
              fill="var(--ochre)"
              stroke="var(--ochre-deep)"
              strokeWidth={1}
            />
          </g>
        );
      }
      default:
        return null;
    }
  };

  /** 표기별 히트존(넉넉한 원) 중심 — 아이콘이 곡선 위/아래로 치우친 만큼 따라 이동 */
  const markerHitCenter = (kind: PacingMarker['kind'], cx: number, cy: number) => {
    switch (kind) {
      case 'node':
        return { x: cx, y: cy - 18, r: 22 };
      case 'gap':
        return { x: cx, y: cy - 13, r: 20 };
      case 'flag':
        return { x: cx + 3, y: cy - 16, r: 24 };
      default:
        return { x: cx, y: cy, r: 20 };
    }
  };

  return (
    <div className="pac-canvas">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
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

        {/* 가로축 구간 경계 세로선 + 구간 이름(클릭으로 selSeg 갱신 — 사이드 구간 편집칸 연동) */}
        {bounds.map((b, i) => {
          const x0 = px(b.x0);
          const x1 = px(b.x1);
          const seg = doc.segments[i];
          const isActive = !!seg && seg.id === selSeg;
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
              <text
                x={(x0 + x1) / 2}
                y={H - pad + 18}
                textAnchor="middle"
                className={`pac-seg-label${isActive ? ' is-active' : ''}`}
                style={{ cursor: onSelectSeg ? 'pointer' : 'default' }}
                onClick={() => { if (seg) onSelectSeg?.(seg.id); }}
              >
                {seg?.name ?? ''}
              </text>
            </g>
          );
        })}

        {/* 페이싱 곡선 */}
        <path d={path} stroke="var(--ochre)" fill="none" strokeWidth={2.5} />

        {/* 표기(marker) — 산·골·번개·깃발. 곡선 위 py(tension) 지점에 앵커, 아이콘은 위/아래 오프셋.
            점보다 먼저 그려 점 히트존이 표기 히트존 위에 오도록 함(표기가 점을 가리면 점을 못 잡던 결함 수정). */}
        {doc.markers.map((m) => {
          const cx = px(m.at);
          const cy = py(m.tension);
          const hit = markerHitCenter(m.kind, cx, cy);
          return (
            <g
              key={m.id}
              className={`pac-marker pac-marker--${m.kind}${m.kind === 'node' ? ' pac-node--' + (m.node ?? 'continue') : ''}`}
              onPointerDown={handleMarkerPointerDown(m.id)}
              onContextMenu={handleMarkerContextMenu(m.id)}
              style={{ cursor: 'grab', touchAction: 'none' }}
            >
              <circle cx={hit.x} cy={hit.y} r={hit.r} fill="transparent" />
              <circle
                cx={cx}
                cy={cy}
                r={3}
                fill={m.kind === 'node' ? NODE_COLOR[NODE_META[m.node ?? 'continue'].family] : 'var(--ochre)'}
                stroke="var(--paper-50)"
                strokeWidth={1}
              />
              {renderMarkerIcon(m, cx, cy)}
            </g>
          );
        })}

        {/* 포인트 — 표기 뒤(위)에 그려 항상 최상단 히트 대상. 히트 원(투명, r20) + 표시 원(r6).
            핸들러는 반드시 <g>에 둔다: 정중앙(가시 r6 원) 클릭도 버블링으로 잡히게 함
            (안쪽 히트 원에만 핸들러를 두면 r6가 중앙 클릭을 가로채 드래그가 간헐적으로 안 됨).
            클릭=드래그는 도구와 무관(빈 곳 클릭의 새 점 생성보다 stopPropagation으로 우선). */}
        {doc.points.map((p) => {
          const gx = globalX(p.segId, p.t, doc.segments);
          const cx = px(gx);
          const cy = py(p.tension);
          return (
            <g
              key={p.id}
              className="pac-point"
              onPointerDown={handlePointPointerDown(p.id)}
              onContextMenu={handlePointContextMenu(p.id)}
              style={{ cursor: 'grab', touchAction: 'none' }}
            >
              <circle cx={cx} cy={cy} r={20} fill="transparent" />
              <circle cx={cx} cy={cy} r={6} fill="var(--paper-50)" stroke="var(--ochre)" strokeWidth={2} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
