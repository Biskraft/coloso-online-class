import { useMemo, useRef } from 'react';
import type * as React from 'react';
import type { PacingDoc, PacingMarker, PacingSegment } from '../../types';
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

/** 구간 id → 팔레트 색(구간 배열 내 인덱스 기준 순환). 핀·범례에서 공용으로 사용 */
export function segColor(doc: PacingDoc, segId: string): string {
  const i = doc.segments.findIndex((s) => s.id === segId);
  return SEG_COLORS[(i < 0 ? 0 : i) % SEG_COLORS.length];
}

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

/** 곡선 위 진행률(at, 0~1) 지점의 tension(0~100) 조회 — 표기를 곡선에 앵커할 때 사용 */
export function curveTensionAt(doc: PacingDoc, at: number): number {
  const f = monotoneCubic(sortedSamples(doc));
  return f(Math.max(0, Math.min(1, at)));
}

/** at 좌우 미세 샘플로 정점(+1)/저점(-1) 판정 — 산/골 표기 자동 분류에 사용 */
export function curvatureSign(doc: PacingDoc, at: number): 1 | -1 {
  const f = monotoneCubic(sortedSamples(doc));
  const a = Math.max(0, Math.min(1, at));
  const eps = 0.02;
  const c = f(a);
  const l = f(Math.max(0, a - eps));
  const r = f(Math.min(1, a + eps));
  return c >= (l + r) / 2 ? 1 : -1;
}

/** peakvalley 도구에서 곡선 근처로 판정할 세로 허용 오차(px) */
const MARKER_NEAR_PX = 24;

export interface PacingCanvasProps {
  doc: PacingDoc;
  tool: PacTool;
  mapMode: boolean;
  /** 핀이 붙을 구간(맵 패널과 공유) — 곡선 하단 구간 이름 클릭으로 갱신 */
  selSeg?: string | null;
  onSelectSeg?: (segId: string) => void;
  onStatus: (msg: string) => void;
}

/** 긴장 눈금(세로축) — 0·50·100 */
const TENSION_TICKS = [0, 50, 100];

/**
 * SVG 캔버스 골격 — 청사진 그리드, 긴장 눈금, 구간 경계·이름, 곡선, 포인트, 표기.
 * 포인트 생성(빈 곳 클릭, point 도구)·드래그·삭제(Alt+클릭/우클릭)는 Task 6에서 구현됨.
 * 표기(산/골/번개/깃발) 부착·드래그·삭제는 Task 8에서 구현됨.
 * 맵 패널·핀은 `PacingMapPanel`(이 파일 하단)이 담당 — 구간 이름 클릭으로 `selSeg`를 갱신해 연결된다.
 * `mapMode`는 곡선 캔버스 자체에는 쓰이지 않음(맵 패널에서 tool==='pin' 여부로 대체 판정).
 */
export function PacingCanvas({ doc, tool, mapMode: _mapMode, selSeg, onSelectSeg, onStatus }: PacingCanvasProps) {
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

    if (tool === 'peakvalley' || tool === 'gap' || tool === 'flag') {
      const { x, y } = toLocal(e, svg);
      const at = Math.max(0, Math.min(1, xToProgress(x)));
      const tension = curveTensionAt(doc, at);

      if (tool === 'peakvalley') {
        const curveY = py(tension);
        if (Math.abs(y - curveY) > MARKER_NEAR_PX) return; // 곡선 근처가 아니면 무시
        const kind: PacingMarker['kind'] = curvatureSign(doc, at) === 1 ? 'peak' : 'valley';
        addMarker(doc.id, { id: uid('pc-m'), kind, at, tension });
        onStatus(kind === 'peak' ? '산 표기 추가' : '골 표기 추가');
        return;
      }

      const kind: PacingMarker['kind'] = tool === 'gap' ? 'gap' : 'flag';
      addMarker(doc.id, { id: uid('pc-m'), kind, at, tension });
      onStatus(kind === 'gap' ? '번개 표기 추가' : '깃발 표기 추가');
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

  /** 표기 아이콘(SVG) — 컬러 이모지 대신 직접 그린 도형만 사용 */
  const renderMarkerIcon = (kind: PacingMarker['kind'], cx: number, cy: number) => {
    const GAP = 6; // 곡선과 아이콘 사이 여백
    switch (kind) {
      case 'peak': {
        // 산 — 옐로우(ochre) 삼각형, 곡선 위쪽
        const baseY = cy - GAP;
        const apexY = baseY - 14;
        return (
          <polygon
            points={`${cx - 9},${baseY} ${cx + 9},${baseY} ${cx},${apexY}`}
            fill="var(--ochre)"
            stroke="var(--ochre-deep)"
            strokeWidth={1}
          />
        );
      }
      case 'valley': {
        // 골 — 회색(ink-500) 삼각형, 곡선 아래쪽
        const baseY = cy + GAP;
        const apexY = baseY + 14;
        return (
          <polygon
            points={`${cx - 9},${baseY} ${cx + 9},${baseY} ${cx},${apexY}`}
            fill="var(--ink-500)"
            stroke="var(--ink-700)"
            strokeWidth={1}
          />
        );
      }
      case 'gap': {
        // 번개 — 옐로우 지그재그 폴리라인(이모지 금지)
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
        // 깃발 — 흰(paper) 깃대 + 옐로우(ochre) 삼각 페넌트
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
      case 'peak':
      case 'gap':
        return { x: cx, y: cy - 13, r: 20 };
      case 'valley':
        return { x: cx, y: cy + 13, r: 20 };
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

        {/* 가로축 구간 경계 세로선 + 구간 이름(클릭으로 selSeg 갱신 — 핀이 붙을 구간 선택) */}
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

        {/* 표기(marker) — 산·골·번개·깃발. 곡선 위 py(tension) 지점에 앵커, 아이콘은 위/아래 오프셋 */}
        {doc.markers.map((m) => {
          const cx = px(m.at);
          const cy = py(m.tension);
          const hit = markerHitCenter(m.kind, cx, cy);
          return (
            <g
              key={m.id}
              className={`pac-marker pac-marker--${m.kind}`}
              onPointerDown={handleMarkerPointerDown(m.id)}
              onContextMenu={handleMarkerContextMenu(m.id)}
              style={{ cursor: 'grab', touchAction: 'none' }}
            >
              <circle cx={hit.x} cy={hit.y} r={hit.r} fill="transparent" />
              <circle
                cx={cx}
                cy={cy}
                r={3}
                fill={m.kind === 'valley' ? 'var(--ink-500)' : 'var(--ochre)'}
                stroke="var(--paper-50)"
                strokeWidth={1}
              />
              {renderMarkerIcon(m.kind, cx, cy)}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export interface PacingMapPanelProps {
  doc: PacingDoc;
  tool: PacTool;
  /** 새 핀이 붙을 구간 — 없으면 첫 구간으로 대체 */
  selSeg: string | null;
  onStatus: (msg: string) => void;
}

/**
 * 맵 패널 — 배경 이미지(viewBox = 맵 원본 픽셀) 위에 구간색 핀을 배치·드래그·삭제.
 * `doc.map`이 없으면 안내 문구만 표시. 핀 생성은 tool==='pin'일 때 빈 곳 클릭,
 * 기존 핀의 드래그·Alt+클릭/우클릭 삭제는 도구와 무관하게 항상 가능(점·표기와 동일 규칙).
 */
export function PacingMapPanel({ doc, tool, selSeg, onStatus }: PacingMapPanelProps) {
  const addPin = usePacing((s) => s.addPin);
  const movePin = usePacing((s) => s.movePin);
  const removePin = usePacing((s) => s.removePin);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const draggingPinId = useRef<string | null>(null);

  if (!doc.map) {
    return (
      <div className="pac-canvas pac-map-canvas pac-map-empty">
        맵 불러오기 — 상단 [맵 불러오기] 버튼으로 배경 이미지를 선택하면 이 곳에 표시됩니다.
      </div>
    );
  }

  const { dataUrl, w, h } = doc.map;
  /** 핀 표시 반경 — 맵 원본 해상도에 대한 비율이라 표시 크기가 이미지 크기와 무관하게 일정 */
  const r = Math.max(4, Math.min(w, h) * 0.012);

  const localMxMy = (e: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current!;
    const { x, y } = toLocal(e, svg);
    return { mx: Math.max(0, Math.min(1, x / w)), my: Math.max(0, Math.min(1, y / h)) };
  };

  /** 빈 곳(배경) pointerdown — pin 도구일 때만 새 핀 생성, 선택 구간 없으면 첫 구간으로 */
  const handleBgPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (tool !== 'pin') return;
    const svg = svgRef.current;
    if (!svg) return;
    const segId = selSeg ?? doc.segments[0]?.id;
    if (!segId) return;
    const { mx, my } = localMxMy(e);
    addPin(doc.id, { id: uid('pc-pin'), segId, mx, my });
    onStatus('핀 추가');
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!draggingPinId.current) return;
    const { mx, my } = localMxMy(e);
    movePin(doc.id, draggingPinId.current, mx, my);
  };

  const endDrag = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!draggingPinId.current) return;
    draggingPinId.current = null;
    const svg = svgRef.current;
    if (svg && svg.hasPointerCapture(e.pointerId)) svg.releasePointerCapture(e.pointerId);
  };

  /** 핀 pointerdown — Alt+클릭은 즉시 삭제, 아니면 드래그 시작 */
  const handlePinPointerDown = (id: string) => (e: React.PointerEvent<SVGGElement>) => {
    e.stopPropagation();
    if (e.altKey) {
      removePin(doc.id, id);
      onStatus('핀 삭제');
      return;
    }
    const svg = svgRef.current;
    if (!svg) return;
    draggingPinId.current = id;
    svg.setPointerCapture(e.pointerId);
  };

  const handlePinContextMenu = (id: string) => (e: React.MouseEvent<SVGGElement>) => {
    e.preventDefault();
    e.stopPropagation();
    removePin(doc.id, id);
    onStatus('핀 삭제');
  };

  return (
    <div className="pac-canvas pac-map-canvas">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${w} ${h}`}
        data-testid="pacing-map"
        onPointerDown={handleBgPointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{ cursor: tool === 'pin' ? 'crosshair' : 'default', touchAction: 'none' }}
      >
        <image href={dataUrl} x={0} y={0} width={w} height={h} preserveAspectRatio="xMidYMid meet" />

        {doc.pins.map((p) => {
          const seg = doc.segments.find((s) => s.id === p.segId);
          const color = segColor(doc, p.segId);
          const cx = p.mx * w;
          const cy = p.my * h;
          return (
            <g
              key={p.id}
              className="pac-pin"
              onPointerDown={handlePinPointerDown(p.id)}
              onContextMenu={handlePinContextMenu(p.id)}
              style={{ cursor: 'grab', touchAction: 'none' }}
            >
              <circle cx={cx} cy={cy} r={r * 3} fill="transparent" />
              <circle cx={cx} cy={cy} r={r} fill={color} stroke="var(--paper-50)" strokeWidth={Math.max(1, r * 0.3)} />
              <text
                x={cx + r + r * 0.6}
                y={cy + r * 0.4}
                className="pac-pin-label"
                style={{ fontSize: r * 1.8 }}
                fill={color}
              >
                {seg?.name ?? '?'}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
