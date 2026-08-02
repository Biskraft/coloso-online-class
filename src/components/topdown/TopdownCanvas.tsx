import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { select } from 'd3-selection';
import { zoom, zoomIdentity, type ZoomTransform } from 'd3-zoom';
import type {
  TopdownDoc, GeoPoly, GeoShape, StructShape, ZoneObj, ZoneKind, DoorObj, StairObj, TextObj,
  MarkerObj, MarkerKind, TdImage, StrokeColor,
} from '../../types';
import { useProject } from '../../store/project';
import { NODE_STYLES, nodeRadii } from '../canvas/node-shapes';
import { uid } from '../../utils/id';
import { fileToTdImage } from '../../utils/image';
import {
  mergeGeo, mergeStruct, clipToFloor, rectPoly, ellipsePoly, corridorPoly, roughenPoly,
  hitShape, polyToPath, snapToWall, hitDoor, hitStair, hitText, hitMarker, hitZone, textBoxW,
  distToPolyEdge, renderScrawl, readTdColors, gridFade, GRID_MAJOR, MARKER_R, ZONE_RGB,
  tdImagePoly, hitTdImage, drawStrokes, strokeColorOf, hitStroke, strokeBBox,
  type TdColors, type WallHit,
} from './topdown-utils';
import './TopdownCanvas.css';

/* ─────────────────────────────────────────────────────────
   평면도 캔버스 — Scrawl 지오메트리 방식
   도형을 그리면 union/subtract로 바닥이 병합되고
   벽·그림자·해칭·내부 그리드는 스타일로 자동 렌더
   ───────────────────────────────────────────────────────── */

export type TdTool = 'select' | 'rect' | 'ellipse' | 'polygon' | 'draw' | 'corridor' | 'door' | 'stair' | 'text' | 'marker' | 'zone';
export type SnapStep = 0 | 0.25 | 0.5 | 1;
/** 그리기 대상 레이어 — 바닥 / 내부 구조(잉크) / 낮은 엄폐 / 동선(드로잉 전용) */
export type TdTarget = 'floor' | 'struct' | 'cover' | 'path';

const CELL = 16;
const FIT_MARGIN = 48;
const KNOB_PX = 24;              // 회전 손잡이 — 위 변에서 띄우는 화면 px
const HANDLE_PX = 8;             // 크기 핸들 한 변 화면 px
const XF_TOL_PX = 10;            // 핸들 픽킹 허용 화면 px
const ROT_SNAP = Math.PI / 12;   // 회전 스냅 15°

/** 배경 이미지 드롭 시 긴 변이 차지할 작업 범위 비율 */
const IMG_DROP_RATIO = 0.25;
/** 동선 드로잉 — 이 간격(셀)보다 촘촘한 점은 버린다 (데이터·렌더 비용 절감) */
const STROKE_MIN_STEP = 0.4;

/** 단일 도형 변환(크기·회전) 드래그 상태 — 스케일은 도형의 로컬(회전된) 축 기준 */
interface XformDrag {
  id: string;
  kind: 'geo' | 'struct' | 'zone' | 'image';
  mode: 'scale' | 'rotate';
  base: GeoPoly;
  rot0: number;                  // 시작 시점 도형 방향
  flx: number; fly: number;      // scale — 고정 모서리 (로컬 좌표)
  glx: number; gly: number;      // scale — 잡은 모서리 (로컬 좌표)
  sx: number; sy: number;        // scale — 현재 배율 (문 보정용)
  cwx: number; cwy: number;      // rotate — 회전 중심 (월드)
  newRot: number;                // rotate — 현재 절대 방향
}

/** 원점 기준 회전 */
const rotP = (rot: number, x: number, y: number): [number, number] =>
  [x * Math.cos(rot) - y * Math.sin(rot), x * Math.sin(rot) + y * Math.cos(rot)];

const polyBBox = (poly: GeoPoly) => {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const ring of poly) {
    for (const [x, y] of ring) {
      x0 = Math.min(x0, x!); x1 = Math.max(x1, x!);
      y0 = Math.min(y0, y!); y1 = Math.max(y1, y!);
    }
  }
  return { x0, y0, x1, y1 };
};

/** 도형 방향(rot)을 제거한 로컬 좌표계의 bbox — 핸들·스케일 축의 기준 */
const localBBox = (poly: GeoPoly, rot: number) => {
  if (!rot) return polyBBox(poly);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  const c = Math.cos(-rot), s = Math.sin(-rot);
  for (const ring of poly) {
    for (const [x, y] of ring) {
      const lx = x! * c - y! * s, ly = x! * s + y! * c;
      x0 = Math.min(x0, lx); x1 = Math.max(x1, lx);
      y0 = Math.min(y0, ly); y1 = Math.max(y1, ly);
    }
  }
  return { x0, y0, x1, y1 };
};

const mapPoly = (poly: GeoPoly, fn: (x: number, y: number) => [number, number]): GeoPoly =>
  poly.map((ring) => ring.map(([x, y]) => fn(x!, y!))) as GeoPoly;

interface Props {
  doc: TopdownDoc;
  tool: TdTool;
  erase: boolean;          // E — 빼기(subtract) 모드
  rough: boolean;          // F — 러프(동굴) 외곽선
  snap: SnapStep;
  corridorW: number;       // 복도 폭 (m)
  doorW: number;           // 문 폭 (셀)
  stairW: number;          // 계단 폭 (셀)
  textSize: number;        // 텍스트 크기 (셀)
  markerKind: MarkerKind;  // 마커 종류
  zoneKind: ZoneKind;      // 구역 종류 — 안전/위험
  strokeColor: StrokeColor; // 동선 색
  strokeWidth: number;     // 동선 두께 (m)
  target: TdTarget;        // 그리기 대상 레이어 (1/2/3)
  calibrating: boolean;    // 버블 오버레이 조정 모드 — 드래그로 오버레이 이동
  onStatus?: (text: string) => void;
}

interface TextEdit {
  wx: number;              // 월드(셀) 좌표
  wy: number;
  sx: number;              // 화면(px) — 에디터 위치
  sy: number;
  value: string;
  id?: string;             // 기존 텍스트 라벨 수정 시
  markerId?: string;       // 마커 라벨 수정 시
}

export function TopdownCanvas({ doc, tool, erase, rough, snap, corridorW, doorW, stairW, textSize, markerKind, zoneKind, strokeColor, strokeWidth, target, calibrating, onStatus }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tRef = useRef<ZoomTransform>(zoomIdentity);
  const colorsRef = useRef<TdColors | null>(null);
  const rafRef = useRef(0);
  const spaceRef = useRef(false);

  // 드래그형 (rect/ellipse)
  const dragStartRef = useRef<[number, number] | null>(null);
  const dragCurRef = useRef<[number, number] | null>(null);
  // 클릭형 (polygon/corridor)
  const [pts, setPts] = useState<number[][]>([]);
  const cursorRef = useRef<[number, number] | null>(null);
  // 선택/이동 — 다중 선택 (클릭 = 단일, 빈 곳 드래그 = 마퀴)
  const [selIds, setSelIds] = useState<string[]>([]);
  const moveStartRef = useRef<[number, number] | null>(null);
  const moveDeltaRef = useRef<[number, number]>([0, 0]);
  const marqueeRef = useRef<{ a: [number, number]; b: [number, number] } | null>(null);
  // 오버레이 조정 드래그
  const calStartRef = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  // 단일 도형 크기·회전 핸들 드래그
  const xformRef = useRef<XformDrag | null>(null);
  const xformPolyRef = useRef<GeoPoly | null>(null);
  // 복사 클립보드 — 문서 전환 후에도 유지 (평면도 간 붙여넣기 허용)
  const clipRef = useRef<{
    geo: GeoShape[]; struct: StructShape[]; zones: ZoneObj[]; doors: DoorObj[];
    stairs: StairObj[]; texts: TextObj[]; markers: MarkerObj[]; pastes: number;
  } | null>(null);
  // 문 배치 미리보기 (벽 스냅 결과)
  const doorHitRef = useRef<WallHit | null>(null);
  // 동선 드로잉 — 진행 중인 획 (스냅 없이 원시 좌표)
  const strokeRef = useRef<number[][] | null>(null);
  // 텍스트 인라인 에디터
  const [textEdit, setTextEdit] = useState<TextEdit | null>(null);
  // 배경 이미지 — 디코드 캐시(src → <img>) + 파일 드래그 오버 표시
  const imgCacheRef = useRef(new Map<string, HTMLImageElement>());
  const [dropHover, setDropHover] = useState(false);
  // Ctrl+V 조정 — 마지막 paste 이벤트 시각. keydown보다 이르면 이벤트가 안 온 것으로 보고
  // 폴백으로 도형을 붙여넣는다 (연속 입력에서도 서로 간섭하지 않도록 불리언 대신 시각)
  const pasteSeenAtRef = useRef(0);

  const addGeo = useProject((s) => s.addGeo);
  const removeGeo = useProject((s) => s.removeGeo);
  const translateGeo = useProject((s) => s.translateGeo);
  const addStruct = useProject((s) => s.addStruct);
  const removeStruct = useProject((s) => s.removeStruct);
  const translateStruct = useProject((s) => s.translateStruct);
  const addZone = useProject((s) => s.addZone);
  const removeZone = useProject((s) => s.removeZone);
  const translateZones = useProject((s) => s.translateZones);
  const addDoor = useProject((s) => s.addDoor);
  const removeDoor = useProject((s) => s.removeDoor);
  const addStair = useProject((s) => s.addStair);
  const removeStair = useProject((s) => s.removeStair);
  const addText = useProject((s) => s.addText);
  const updateText = useProject((s) => s.updateText);
  const removeText = useProject((s) => s.removeText);
  const translateObject = useProject((s) => s.translateObject);
  const addTdImage = useProject((s) => s.addTdImage);
  const updateTdImage = useProject((s) => s.updateTdImage);
  const removeTdImage = useProject((s) => s.removeTdImage);
  const addStroke = useProject((s) => s.addStroke);
  const removeStroke = useProject((s) => s.removeStroke);
  const addMarker = useProject((s) => s.addMarker);
  const updateMarker = useProject((s) => s.updateMarker);
  const removeMarker = useProject((s) => s.removeMarker);
  const addMany = useProject((s) => s.addMany);
  const transformShape = useProject((s) => s.transformShape);
  const updateTopdown = useProject((s) => s.updateTopdown);
  const bubbleNodes = useProject((s) => s.project.nodes);
  const bubbleEdges = useProject((s) => s.project.edges);
  const [cols, rows] = doc.grid;
  /** 동선 표시 — 꺼져 있으면 렌더·선택 모두에서 빠진다 (없는 것처럼 취급) */
  const visibleStrokes = useMemo(
    () => (doc.pathVisible !== false ? (doc.strokes ?? []) : []),
    [doc.pathVisible, doc.strokes],
  );

  const merged = useMemo(() => mergeGeo(doc.geo), [doc.geo]);
  /* 구조·엄폐 — 바닥에 클립하지 않는다.
     외벽·다리·독립 구조물처럼 바닥이 깔리지 않은 곳에도 세울 수 있어야 한다 */
  const structHigh = useMemo(
    () => mergeStruct(doc.struct ?? [], false),
    [doc.struct],
  );
  const structLow = useMemo(
    () => mergeStruct(doc.struct ?? [], true),
    [doc.struct],
  );
  /* 문 스냅 대상 — 바닥 경계 + 구조(high) 경계 */
  const wallSrc = useMemo(() => [...merged, ...structHigh], [merged, structHigh]);

  /* 버블 → 그리드 자동 맞춤 변환 — 노드 경계 박스를 작업 범위 안에 비례 배치 */
  const overlayFit = useMemo(() => {
    if (bubbleNodes.length === 0) return null;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const n of bubbleNodes) {
      const { rx, ry } = nodeRadii(n.type, n.size ?? 1, n.aspect ?? 1);
      minX = Math.min(minX, n.x - rx); maxX = Math.max(maxX, n.x + rx);
      minY = Math.min(minY, n.y - ry); maxY = Math.max(maxY, n.y + ry);
    }
    const bw = Math.max(maxX - minX, 1), bh = Math.max(maxY - minY, 1);
    const W = cols * CELL, H = rows * CELL;
    const s = Math.min((W * 0.84) / bw, (H * 0.84) / bh);
    return {
      s,
      tx: (W - bw * s) / 2 - minX * s,
      ty: (H - bh * s) / 2 - minY * s,
      minX, minY, bw, bh,
    };
  }, [bubbleNodes, cols, rows]);

  /* 자동 맞춤 + 수동 캘리브레이션(overlay.scale/tx/ty) 합성 —
     스케일은 작업 범위 중심 기준, 이동은 월드 px */
  const overlayXf = useMemo(() => {
    if (!overlayFit) return null;
    const u = doc.overlay;
    const k = u.scale || 1;
    const W = cols * CELL, H = rows * CELL;
    return {
      s: overlayFit.s * k,
      tx: (overlayFit.tx - W / 2) * k + W / 2 + (u.tx || 0),
      ty: (overlayFit.ty - H / 2) * k + H / 2 + (u.ty || 0),
      minX: overlayFit.minX, minY: overlayFit.minY,
      bw: overlayFit.bw, bh: overlayFit.bh,
    };
  }, [overlayFit, doc.overlay, cols, rows]);

  /* ── 좌표 ── */

  const worldAt = (e: { clientX: number; clientY: number }): [number, number] | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const r = canvas.getBoundingClientRect();
    const t = tRef.current;
    return [t.invertX(e.clientX - r.left) / CELL, t.invertY(e.clientY - r.top) / CELL];
  };

  const snapPt = useCallback((p: [number, number]): [number, number] => {
    if (snap === 0) return p;
    const clamp = (v: number, max: number) => Math.max(0, Math.min(max, v));
    return [
      clamp(Math.round(p[0] / snap) * snap, cols),
      clamp(Math.round(p[1] / snap) * snap, rows),
    ];
  }, [snap, cols, rows]);

  /* ── 메인 드로우 ── */

  /* draw는 deps가 바뀔 때마다 새 클로저가 된다. d3-zoom 핸들러나 이미지 onload처럼
     오래 사는 콜백이 낡은 draw를 붙잡지 않도록 ref로 항상 최신을 가리킨다 */
  const drawRef = useRef<() => void>(() => {});

  const scheduleDraw = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      drawRef.current();
    });
  }, []);

  /** 배경 이미지 디코드 캐시 — 같은 src는 <img> 하나를 재사용, 로드되면 다시 그린다 */
  const getImg = useCallback((src: string) => {
    const cache = imgCacheRef.current;
    let el = cache.get(src);
    if (!el) {
      el = new Image();
      el.onload = () => scheduleDraw();
      el.src = src;
      cache.set(src, el);
    }
    return el;
  }, [scheduleDraw]);

  /** 이미지의 현재 사각형 — 크기·회전 핸들을 잡고 있는 중이면 미리보기 값 */
  const imgRect = (im: TdImage): { x: number; y: number; w: number; h: number; rot: number } => {
    const X = xformRef.current;
    const poly = xformPolyRef.current;
    if (!X || X.kind !== 'image' || X.id !== im.id || !poly) return im;
    const rot = X.mode === 'rotate' ? X.newRot : X.rot0;
    const bb = localBBox(poly, rot);
    const [cx, cy] = rotP(rot, (bb.x0 + bb.x1) / 2, (bb.y0 + bb.y1) / 2);
    return { x: cx, y: cy, w: bb.x1 - bb.x0, h: bb.y1 - bb.y0, rot };
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const c = colorsRef.current ?? (colorsRef.current = readTdColors());
    const dpr = window.devicePixelRatio || 1;
    const w = wrap.clientWidth, h = wrap.clientHeight;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }
    const ctx = canvas.getContext('2d')!;
    const t = tRef.current;
    const W = cols * CELL, H = rows * CELL;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = c.paper;
    ctx.fillRect(0, 0, w, h);

    ctx.setTransform(dpr * t.k, 0, 0, dpr * t.k, dpr * t.x, dpr * t.y);

    // 배경 참조 이미지 — 가장 아래 레이어. 그리드·도형이 모두 이 위에 얹힌다
    {
      const [idx, idy] = moveDeltaRef.current;
      for (const im of doc.images ?? []) {
        const el = getImg(im.src);
        if (!el.complete || !el.naturalWidth) continue;
        const r = imgRect(im);
        const off = selIds.includes(im.id) ? [idx, idy] : [0, 0];
        ctx.save();
        ctx.translate((r.x + off[0]!) * CELL, (r.y + off[1]!) * CELL);
        ctx.rotate(r.rot);
        ctx.drawImage(el, (-r.w / 2) * CELL, (-r.h / 2) * CELL, r.w * CELL, r.h * CELL);
        ctx.restore();
      }
    }

    // 작업 범위 + 에디터용 옅은 전역 그리드 (내보내기엔 없음) — 줌 페이드
    const gridLines = (step: number, style: string) => {
      ctx.strokeStyle = style;
      ctx.lineWidth = 1 / t.k;
      ctx.beginPath();
      for (let x = 0; x <= cols; x += step) { ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, H); }
      for (let y = 0; y <= rows; y += step) { ctx.moveTo(0, y * CELL); ctx.lineTo(W, y * CELL); }
      ctx.stroke();
    };
    const gridA = gridFade(t.k * CELL, 3.5, 7);
    if (gridA > 0) {
      ctx.globalAlpha = gridA;
      gridLines(1, c.gridSoft);
      ctx.globalAlpha = 1;
    }
    // 10m 기준선 — 1m 격자보다 한 단계 진하게, 더 멀리 줌아웃해도 남는다
    const majorA = gridFade(t.k * CELL * GRID_MAJOR, 6, 12);
    if (majorA > 0) {
      ctx.globalAlpha = majorA;
      gridLines(GRID_MAJOR, c.gridMajor);
      ctx.globalAlpha = 1;
    }
    ctx.strokeStyle = c.gridHard;
    ctx.lineWidth = 1.2 / t.k;
    ctx.strokeRect(0, 0, W, H);

    // Scrawl 본체
    renderScrawl(ctx, merged, {
      CELL, cols, rows, zoomK: t.k,
      wallM: doc.style.wallM,
      hatch: doc.style.hatch, shadow: doc.style.shadow, colors: c,
      doors: doc.doors, stairs: doc.stairs, texts: doc.texts,
      markers: doc.markers,
      structHigh, structLow,
      zones: doc.zones,
    });

    // 동선 레이어 — renderScrawl은 바닥이 비면 조기 반환하므로 바깥에서 얹는다.
    // 선택된 획은 이동 미리보기 델타를 반영해 그린다
    {
      const [sdx, sdy] = moveDeltaRef.current;
      const list = visibleStrokes.map((s) => (
        selIds.includes(s.id) && (sdx !== 0 || sdy !== 0)
          ? { ...s, pts: s.pts.map(([x, y]) => [x! + sdx, y! + sdy]) }
          : s));
      drawStrokes(ctx, list, { CELL, zoomK: t.k, colors: c });
    }

    // 진행 중인 획 — 커밋 전 미리보기 (같은 색·두께)
    if (strokeRef.current && strokeRef.current.length > 0) {
      drawStrokes(ctx, [{ id: '_live', pts: strokeRef.current, color: strokeColor, width: strokeWidth }],
        { CELL, zoomK: t.k, colors: c });
    }

    // 버블 오버레이 — 도면 위 반투명 트레이싱 (자동 맞춤 + 수동 보정)
    if (doc.overlay.visible && overlayXf) {
      const { s, tx, ty } = overlayXf;
      const bx = (x: number) => x * s + tx;
      const by = (y: number) => y * s + ty;
      ctx.save();
      ctx.globalAlpha = doc.overlay.opacity;
      for (const e of bubbleEdges) {
        const a = bubbleNodes.find((n) => n.id === e.from);
        const b = bubbleNodes.find((n) => n.id === e.to);
        if (!a || !b) continue;
        ctx.strokeStyle = e.type === 'locked' ? '#B85450' : e.type === 'ability' ? '#2C5F7C' : '#1A1814';
        ctx.lineWidth = 2.4 * s;
        ctx.setLineDash(e.type === 'vista' ? [8 * s, 6 * s] : []);
        ctx.beginPath();
        ctx.moveTo(bx(a.x), by(a.y));
        ctx.lineTo(bx(b.x), by(b.y));
        ctx.stroke();
      }
      ctx.setLineDash([]);
      for (const n of bubbleNodes) {
        const st = NODE_STYLES[n.type];
        const { rx, ry } = nodeRadii(n.type, n.size ?? 1, n.aspect ?? 1);
        ctx.beginPath();
        ctx.ellipse(bx(n.x), by(n.y), rx * s, ry * s, 0, 0, Math.PI * 2);
        ctx.fillStyle = st.fill;
        ctx.fill();
        ctx.strokeStyle = st.stroke;
        ctx.lineWidth = st.strokeWidth * s;
        ctx.stroke();
        const fontPx = 20 * s;
        const textA = gridFade(fontPx * t.k, 5, 9);
        if (textA > 0 && n.name) {
          ctx.globalAlpha = doc.overlay.opacity * textA;
          ctx.fillStyle = st.textColor;
          ctx.font = `600 ${fontPx}px Pretendard, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(n.name, bx(n.x), by(n.y));
          ctx.globalAlpha = doc.overlay.opacity;
        }
      }
      // 조정 모드 — 오버레이 경계 점선 표시
      if (calibrating) {
        ctx.globalAlpha = 1;
        ctx.strokeStyle = 'rgba(44,95,124,0.85)';
        ctx.lineWidth = 1.4 / t.k;
        ctx.setLineDash([8 / t.k, 5 / t.k]);
        ctx.strokeRect(bx(overlayXf.minX), by(overlayXf.minY), overlayXf.bw * s, overlayXf.bh * s);
        ctx.setLineDash([]);
      }
      ctx.restore();
    }

    // 문 사각형 치수 (선택 표시·미리보기 공용)
    const doorDims = (w: number): [number, number] => [
      w * CELL,
      Math.max(doc.style.wallM * CELL * 2.6, CELL * 0.34),
    ];

    // 선택 표시 (+ 이동 미리보기) — 다중 선택 지원
    if (selIds.length > 0) {
      const [mdx, mdy] = moveDeltaRef.current;
      const marker = () => {
        ctx.strokeStyle = 'rgba(44,95,124,0.9)';
        ctx.lineWidth = 1.6 / t.k;
        ctx.setLineDash([6 / t.k, 4 / t.k]);
      };
      // 도형 치수 라벨 — 로컬(회전 제거) 가로×세로, 1셀=1m. 화면 고정 크기.
      const fmtM = (v: number) => {
        const r = Math.round(v * 10) / 10;
        return Number.isInteger(r) ? r.toFixed(0) : r.toFixed(1);
      };
      const dimLabel = (poly: GeoPoly, rot: number) => {
        const b = localBBox(poly, rot);
        const wM = b.x1 - b.x0, hM = b.y1 - b.y0;
        if (!(wM > 0) || !(hM > 0)) return;
        const label = `${fmtM(wM)} × ${fmtM(hM)} m`;
        const [lcx, lcy] = rotP(rot, (b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2);
        const k = t.k;
        const fpx = 12.5 / k;
        const cx = lcx * CELL, cy = lcy * CELL;
        ctx.setLineDash([]);
        ctx.font = `600 ${fpx}px Pretendard, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const tw = ctx.measureText(label).width;
        const padX = 7 / k, padY = 4 / k;
        const rw = tw + padX * 2, rh = fpx + padY * 2;
        ctx.fillStyle = 'rgba(250,246,238,0.92)';
        ctx.fillRect(cx - rw / 2, cy - rh / 2, rw, rh);
        ctx.strokeStyle = 'rgba(44,95,124,0.55)';
        ctx.lineWidth = 1 / k;
        ctx.strokeRect(cx - rw / 2, cy - rh / 2, rw, rh);
        ctx.fillStyle = '#2c5f7c';
        ctx.fillText(label, cx, cy);
      };
      for (const sid of selIds) {
        // 동선 획 — 획 자체를 감싸는 점선 하이라이트 (획보다 조금 굵게)
        const stk = visibleStrokes.find((s) => s.id === sid);
        if (stk) {
          ctx.save();
          ctx.translate(mdx * CELL, mdy * CELL);
          ctx.strokeStyle = 'rgba(44,95,124,0.9)';
          ctx.lineWidth = Math.max(stk.width * CELL, 1.2 / t.k) + 4 / t.k;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.setLineDash([7 / t.k, 5 / t.k]);
          ctx.beginPath();
          stk.pts.forEach(([x, y], i) => (i
            ? ctx.lineTo(x! * CELL, y! * CELL)
            : ctx.moveTo(x! * CELL, y! * CELL)));
          if (stk.pts.length === 1) ctx.lineTo(stk.pts[0]![0]! * CELL, stk.pts[0]![1]! * CELL);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.restore();
          continue;
        }
        const im = (doc.images ?? []).find((s) => s.id === sid);
        if (im) {
          const r = imgRect(im);
          const ipoly = tdImagePoly({ ...im, ...r });
          ctx.save();
          ctx.translate(mdx * CELL, mdy * CELL);
          marker();
          ctx.stroke(polyToPath(ipoly, CELL));
          dimLabel(ipoly, r.rot);
          ctx.restore();
          continue;
        }
        const g = doc.geo.find((s) => s.id === sid)
          ?? (doc.struct ?? []).find((s) => s.id === sid)
          ?? (doc.zones ?? []).find((s) => s.id === sid);
        if (g) {
          ctx.save();
          ctx.translate(mdx * CELL, mdy * CELL);
          marker();
          ctx.stroke(polyToPath(g.poly, CELL));
          dimLabel(g.poly, (g as { rot?: number }).rot ?? 0);
          ctx.restore();
          continue;
        }
        const d = (doc.doors ?? []).find((x) => x.id === sid);
        const st = (doc.stairs ?? []).find((x) => x.id === sid);
        const tx = (doc.texts ?? []).find((x) => x.id === sid);
        if (d) {
          const [lenPx, thickPx] = doorDims(d.w);
          ctx.save();
          ctx.translate((d.x + mdx) * CELL, (d.y + mdy) * CELL);
          ctx.rotate(d.angle);
          marker();
          ctx.strokeRect(-lenPx / 2 - 2 / t.k, -thickPx / 2 - 2 / t.k, lenPx + 4 / t.k, thickPx + 4 / t.k);
          ctx.restore();
        } else if (st) {
          const ddx = st.x2 - st.x1, ddy = st.y2 - st.y1;
          const len = Math.hypot(ddx, ddy) || 1;
          ctx.save();
          ctx.translate((st.x1 + mdx) * CELL, (st.y1 + mdy) * CELL);
          ctx.rotate(Math.atan2(ddy, ddx));
          marker();
          ctx.strokeRect(-3 / t.k, (-st.w / 2) * CELL - 3 / t.k, len * CELL + 6 / t.k, st.w * CELL + 6 / t.k);
          ctx.restore();
        } else if (tx) {
          const wBox = textBoxW(tx) * CELL;
          ctx.save();
          ctx.translate((tx.x + mdx) * CELL, (tx.y + mdy) * CELL);
          marker();
          ctx.strokeRect(-3 / t.k, -tx.size * 0.7 * CELL - 3 / t.k, wBox + 6 / t.k, tx.size * 1.4 * CELL + 6 / t.k);
          ctx.restore();
        } else {
          const mk = (doc.markers ?? []).find((x) => x.id === sid);
          if (mk) {
            ctx.save();
            marker();
            ctx.beginPath();
            ctx.arc((mk.x + mdx) * CELL, (mk.y + mdy) * CELL, MARKER_R * CELL + 3 / t.k, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      ctx.setLineDash([]);

      // 단일 도형 — 크기 모서리 4개 + 회전 손잡이 (도형 방향을 따라 도는 프레임)
      const sh = (() => {
        if (selIds.length !== 1) return null;
        const sid = selIds[0]!;
        const g = doc.geo.find((s) => s.id === sid)
          ?? (doc.struct ?? []).find((s) => s.id === sid)
          ?? (doc.zones ?? []).find((s) => s.id === sid);
        if (g) return { poly: g.poly, rot: g.rot ?? 0 };
        const im = (doc.images ?? []).find((s) => s.id === sid);
        if (im) {
          const r = imgRect(im);
          return { poly: tdImagePoly({ ...im, ...r }), rot: r.rot };
        }
        return null;
      })();
      if (sh && !moveStartRef.current && !marqueeRef.current) {
        const X = xformRef.current;
        const poly = xformPolyRef.current ?? sh.poly;
        const rotF = X ? (X.mode === 'rotate' ? X.newRot : X.rot0) : sh.rot;
        if (xformPolyRef.current) {
          marker();
          ctx.stroke(polyToPath(xformPolyRef.current, CELL));
          ctx.setLineDash([]);
        }
        const bb = localBBox(poly, rotF);
        const k = t.k;
        const hs = HANDLE_PX / k / 2;     // 화면 px 반변 → 월드 px는 /k
        const sq = (wx: number, wy: number) => {
          ctx.fillStyle = '#FAF6EE';
          ctx.strokeStyle = 'rgba(44,95,124,0.95)';
          ctx.lineWidth = 1.4 / k;
          ctx.fillRect(wx * CELL - hs, wy * CELL - hs, hs * 2, hs * 2);
          ctx.strokeRect(wx * CELL - hs, wy * CELL - hs, hs * 2, hs * 2);
        };
        for (const [lx, ly] of [[bb.x0, bb.y0], [bb.x1, bb.y0], [bb.x1, bb.y1], [bb.x0, bb.y1]]) {
          const [hx, hy] = rotP(rotF, lx!, ly!);
          sq(hx, hy);
        }
        // 회전 손잡이 — 로컬 위 변 중앙에서 줄기 + 원 (도형과 함께 회전)
        const mlx = (bb.x0 + bb.x1) / 2;
        const [sx0, sy0] = rotP(rotF, mlx, bb.y0);
        const [kxW, kyW] = rotP(rotF, mlx, bb.y0 - KNOB_PX / k / CELL);
        ctx.strokeStyle = 'rgba(44,95,124,0.7)';
        ctx.lineWidth = 1.2 / k;
        ctx.beginPath();
        ctx.moveTo(sx0 * CELL, sy0 * CELL);
        ctx.lineTo(kxW * CELL, kyW * CELL);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(kxW * CELL, kyW * CELL, HANDLE_PX * 0.7 / k, 0, Math.PI * 2);
        ctx.fillStyle = '#FAF6EE';
        ctx.fill();
        ctx.strokeStyle = 'rgba(44,95,124,0.95)';
        ctx.lineWidth = 1.4 / k;
        ctx.stroke();
        // 회전 중 각도 라벨
        if (X?.mode === 'rotate') {
          const deg = Math.round((X.newRot * 180) / Math.PI);
          ctx.fillStyle = 'rgba(44,95,124,0.95)';
          ctx.font = `${12 / k}px "JetBrains Mono", monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(`${deg}°`, kxW * CELL, kyW * CELL - 12 / k);
        }
      }
    }

    // 마퀴(드래그 다중 선택) 사각형
    if (marqueeRef.current) {
      const { a, b } = marqueeRef.current;
      ctx.fillStyle = 'rgba(44,95,124,0.08)';
      ctx.strokeStyle = 'rgba(44,95,124,0.8)';
      ctx.lineWidth = 1.2 / t.k;
      ctx.setLineDash([5 / t.k, 4 / t.k]);
      const x = Math.min(a[0], b[0]) * CELL, y = Math.min(a[1], b[1]) * CELL;
      const w2 = Math.abs(b[0] - a[0]) * CELL, h2 = Math.abs(b[1] - a[1]) * CELL;
      ctx.fillRect(x, y, w2, h2);
      ctx.strokeRect(x, y, w2, h2);
      ctx.setLineDash([]);
    }

    // 계단 드래그 미리보기
    if (dragStartRef.current && dragCurRef.current && tool === 'stair') {
      const [x0, y0] = dragStartRef.current;
      const [x1, y1] = dragCurRef.current;
      const ddx = x1 - x0, ddy = y1 - y0;
      const len = Math.hypot(ddx, ddy);
      if (len > 0.01) {
        ctx.save();
        ctx.translate(x0 * CELL, y0 * CELL);
        ctx.rotate(Math.atan2(ddy, ddx));
        ctx.fillStyle = 'rgba(44,95,124,0.16)';
        ctx.strokeStyle = 'rgba(44,95,124,0.9)';
        ctx.lineWidth = 1.6 / t.k;
        ctx.setLineDash([6 / t.k, 4 / t.k]);
        ctx.fillRect(0, (-stairW / 2) * CELL, len * CELL, stairW * CELL);
        ctx.strokeRect(0, (-stairW / 2) * CELL, len * CELL, stairW * CELL);
        ctx.setLineDash([]);
        ctx.restore();
      }
    }

    // 문 배치 미리보기 — 벽 스냅 자리에 청사진 점선 사각형
    if (tool === 'door' && doorHitRef.current) {
      const dh = doorHitRef.current;
      const [lenPx, thickPx] = doorDims(doorW);
      ctx.save();
      ctx.translate(dh.x * CELL, dh.y * CELL);
      ctx.rotate(dh.angle);
      ctx.fillStyle = 'rgba(44,95,124,0.16)';
      ctx.strokeStyle = 'rgba(44,95,124,0.9)';
      ctx.lineWidth = 1.6 / t.k;
      ctx.setLineDash([6 / t.k, 4 / t.k]);
      ctx.fillRect(-lenPx / 2, -thickPx / 2, lenPx, thickPx);
      ctx.strokeRect(-lenPx / 2, -thickPx / 2, lenPx, thickPx);
      ctx.setLineDash([]);
      ctx.restore();
    }

    // 진행 중 미리보기
    const previewStyle = () => {
      const tc = tool === 'zone' ? ZONE_RGB[zoneKind]      // 구역 = 종류 색
        : erase ? '184,84,80'                              // 빼기 = 벽돌
        : target === 'struct' ? '26,24,20'                 // 구조 = 잉크
        : target === 'cover' ? '201,169,97'                // 엄폐 = 오크르
        : '44,95,124';                                     // 바닥 = 청사진
      ctx.fillStyle = `rgba(${tc},0.18)`;
      ctx.strokeStyle = `rgba(${tc},0.9)`;
      ctx.lineWidth = 1.6 / t.k;
      ctx.setLineDash([6 / t.k, 4 / t.k]);
    };
    if (dragStartRef.current && dragCurRef.current && (tool === 'rect' || tool === 'ellipse')) {
      const [x0, y0] = dragStartRef.current;
      const [x1, y1] = dragCurRef.current;
      const poly = tool === 'rect' ? rectPoly(x0, y0, x1, y1) : ellipsePoly(x0, y0, x1, y1);
      previewStyle();
      const path = polyToPath(poly, CELL);
      ctx.fill(path, 'evenodd');
      ctx.stroke(path);
      ctx.setLineDash([]);
    }
    if (pts.length > 0 && (tool === 'polygon' || tool === 'corridor' || tool === 'zone')) {
      previewStyle();
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x * CELL, y * CELL) : ctx.moveTo(x * CELL, y * CELL)));
      const cur = cursorRef.current;
      if (cur) ctx.lineTo(cur[0] * CELL, cur[1] * CELL);
      if ((tool === 'polygon' || tool === 'zone') && pts.length >= 2) ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);
      // 점 표시
      for (const [x, y] of pts) {
        ctx.beginPath();
        ctx.arc(x * CELL, y * CELL, 3.5 / t.k, 0, Math.PI * 2);
        ctx.fillStyle = '#2C5F7C';
        ctx.fill();
      }
    }

    // 스냅 커서 십자 (문 도구는 벽 스냅 미리보기가 커서 역할)
    const cur = cursorRef.current;
    if (cur && tool !== 'select' && tool !== 'door' && t.k * CELL >= 4) {
      ctx.strokeStyle = 'rgba(26,24,20,0.55)';
      ctx.lineWidth = 1.2 / t.k;
      const s = 5 / t.k;
      ctx.beginPath();
      ctx.moveTo(cur[0] * CELL - s, cur[1] * CELL);
      ctx.lineTo(cur[0] * CELL + s, cur[1] * CELL);
      ctx.moveTo(cur[0] * CELL, cur[1] * CELL - s);
      ctx.lineTo(cur[0] * CELL, cur[1] * CELL + s);
      ctx.stroke();
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cols, rows, tool, erase, target, zoneKind, strokeColor, strokeWidth, merged, structHigh, structLow, doc.geo, doc.struct, doc.zones, doc.doors, doc.stairs, doc.texts, doc.markers, doc.images, visibleStrokes, doc.style, doc.overlay, selIds, pts, doorW, stairW, calibrating, bubbleNodes, bubbleEdges, overlayXf, getImg]);

  drawRef.current = draw;

  useEffect(() => { scheduleDraw(); }, [draw, scheduleDraw]);

  /* ── 문서 전환 시 진행 상태 초기화 ── */
  useEffect(() => {
    setPts([]);
    setSelIds([]);
    setTextEdit(null);
    dragStartRef.current = null;
    dragCurRef.current = null;
    marqueeRef.current = null;
    calStartRef.current = null;
    xformRef.current = null;
    xformPolyRef.current = null;
    strokeRef.current = null;
  }, [doc.id]);

  /* ── 동선 도구는 선택 개념이 없다 — 남아 있던 선택·핸들을 정리 ── */
  useEffect(() => {
    if (tool !== 'draw') return;
    setSelIds([]);
    xformRef.current = null;
    xformPolyRef.current = null;
  }, [tool]);

  /* ── d3-zoom ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const w = wrap.clientWidth, h = wrap.clientHeight;
    const W = cols * CELL, H = rows * CELL;
    const fitK = Math.max(0.02, Math.min(12, Math.min(
      (w - FIT_MARGIN * 2) / W,
      (h - FIT_MARGIN * 2) / H,
    )));
    const zm = zoom<HTMLCanvasElement, unknown>()
      // 줌 아웃 하한 = 화면 맞춤의 절반 — 맵이 점으로 사라지지 않게
      .scaleExtent([fitK * 0.5, 12])
      // 패닝 범위 = 맵 주변 반 칸 여유 — 맵을 화면 밖으로 잃어버리지 않게
      .translateExtent([[-W * 0.5, -H * 0.5], [W * 1.5, H * 1.5]])
      .filter((e: any) => {
        if (e.type === 'wheel') return true;
        if (e.type === 'dblclick') return false;
        return spaceRef.current || e.button === 1;
      })
      .on('zoom', (e) => {
        tRef.current = e.transform;
        scheduleDraw();
      });
    const sel = select(canvas);
    sel.call(zm as any);
    sel.call(zm.transform as any, zoomIdentity
      .translate((w - W * fitK) / 2, (h - H * fitK) / 2)
      .scale(fitK));
    return () => { sel.on('.zoom', null); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc.id, cols, rows]);

  /* ── 키보드: 스페이스 패닝 / Enter·Esc / Delete ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.code === 'Space') {
        if (e.type === 'keydown') { spaceRef.current = true; e.preventDefault(); }
        else spaceRef.current = false;
        if (wrapRef.current) wrapRef.current.dataset.panning = String(spaceRef.current);
        return;
      }
      if (e.type !== 'keydown') return;

      // 복사/붙여넣기 — 선택 요소를 2셀 오프셋으로 복제 (연속 붙여넣기는 누적)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
        if (selIds.length === 0) {
          // 선택 없이 복사 = 도형 클립보드 비우기.
          // 이후 Ctrl+V는 다시 시스템 클립보드(이미지)를 붙인다
          if (clipRef.current) {
            clipRef.current = null;
            onStatus?.('도형 클립보드를 비웠습니다 — 이제 Ctrl+V로 클립보드 이미지를 붙입니다');
          }
          return;
        }
        const inSel = (id: string) => selIds.includes(id);
        clipRef.current = {
          geo: doc.geo.filter((g) => inSel(g.id))
            .map((g) => ({ ...g, poly: g.poly.map((r) => r.map(([x, y]) => [x!, y!])) as GeoPoly })),
          struct: (doc.struct ?? []).filter((g) => inSel(g.id))
            .map((g) => ({ ...g, poly: g.poly.map((r) => r.map(([x, y]) => [x!, y!])) as GeoPoly })),
          zones: (doc.zones ?? []).filter((z) => inSel(z.id))
            .map((z) => ({ ...z, poly: z.poly.map((r) => r.map(([x, y]) => [x!, y!])) as GeoPoly })),
          doors: (doc.doors ?? []).filter((d) => inSel(d.id)).map((d) => ({ ...d })),
          stairs: (doc.stairs ?? []).filter((s) => inSel(s.id)).map((s) => ({ ...s })),
          texts: (doc.texts ?? []).filter((x) => inSel(x.id)).map((x) => ({ ...x })),
          markers: (doc.markers ?? []).filter((m) => inSel(m.id)).map((m) => ({ ...m })),
          pastes: 0,
        };
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
        // 실제 붙여넣기는 paste 이벤트에서 처리한다 — 시스템 클립보드의 이미지가
        // 도형 클립보드보다 우선해야 하는데, keydown 시점엔 클립보드를 읽을 수 없다.
        // paste 이벤트가 오지 않는 환경(권한·포커스)만 이 타이머가 대신 처리한다.
        const pressedAt = performance.now();
        window.setTimeout(() => {
          if (pasteSeenAtRef.current < pressedAt) pasteShapes();
        }, 0);
        return;
      }

      if (e.key === 'Enter' && pts.length > 0) {
        commitPts();
      }
      if (e.key === 'Escape' && pts.length > 0) {
        e.stopPropagation();
        setPts([]);
        scheduleDraw();
      } else if (e.key === 'Escape' && selIds.length > 0) {
        // Esc 1회: 선택 해제 (한 번 더 누르면 버블로 복귀)
        e.stopPropagation();
        setSelIds([]);
        scheduleDraw();
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selIds.length > 0) {
        const has = (arr: { id: string }[] | undefined, id: string) => (arr ?? []).some((x) => x.id === id);
        const doorIds = selIds.filter((id) => has(doc.doors, id));
        const stairIds = selIds.filter((id) => has(doc.stairs, id));
        const textIds = selIds.filter((id) => has(doc.texts, id));
        const markerIds = selIds.filter((id) => has(doc.markers, id));
        const structIds = selIds.filter((id) => has(doc.struct, id));
        const zoneIds = selIds.filter((id) => has(doc.zones, id));
        const imageIds = selIds.filter((id) => has(doc.images, id));
        const strokeIds = selIds.filter((id) => has(doc.strokes, id));
        const geoIds = selIds.filter((id) => doc.geo.some((g) => g.id === id));
        if (strokeIds.length) removeStroke(doc.id, strokeIds);
        if (imageIds.length) removeTdImage(doc.id, imageIds);
        if (doorIds.length) removeDoor(doc.id, doorIds);
        if (stairIds.length) removeStair(doc.id, stairIds);
        if (textIds.length) removeText(doc.id, textIds);
        if (markerIds.length) removeMarker(doc.id, markerIds);
        if (structIds.length) removeStruct(doc.id, structIds);
        if (zoneIds.length) removeZone(doc.id, zoneIds);
        if (geoIds.length) removeGeo(doc.id, geoIds);
        setSelIds([]);
      }
    };

    /** 도형 클립보드 붙여넣기 — 2셀씩 누적 오프셋 */
    const pasteShapes = () => {
      const clip = clipRef.current;
      if (!clip) return;
      clip.pastes += 1;
      const off = clip.pastes * 2;
      const newIds: string[] = [];
      const geo = clip.geo.map((g) => {
        const id = uid('geo');
        newIds.push(id);
        return { id, op: g.op, poly: g.poly.map((r) => r.map(([x, y]) => [x! + off, y! + off])) as GeoPoly };
      });
      const struct = clip.struct.map((g) => {
        const id = uid('st');
        newIds.push(id);
        return { id, op: g.op, low: g.low, poly: g.poly.map((r) => r.map(([x, y]) => [x! + off, y! + off])) as GeoPoly };
      });
      const zones = clip.zones.map((z) => {
        const id = uid('zn');
        newIds.push(id);
        return { id, kind: z.kind, poly: z.poly.map((r) => r.map(([x, y]) => [x! + off, y! + off])) as GeoPoly };
      });
      const doors = clip.doors.map((d) => {
        const id = uid('door');
        newIds.push(id);
        return { ...d, id, x: d.x + off, y: d.y + off };
      });
      const stairs = clip.stairs.map((s) => {
        const id = uid('str');
        newIds.push(id);
        return { ...s, id, x1: s.x1 + off, y1: s.y1 + off, x2: s.x2 + off, y2: s.y2 + off };
      });
      const texts = clip.texts.map((x) => {
        const id = uid('txt');
        newIds.push(id);
        return { ...x, id, x: x.x + off, y: x.y + off };
      });
      const markers = clip.markers.map((m) => {
        const id = uid('mk');
        newIds.push(id);
        return { ...m, id, x: m.x + off, y: m.y + off };
      });
      if (newIds.length) {
        addMany(doc.id, { geo, struct, zones, doors, stairs, texts, markers });
        setSelIds(newIds);
      }
    };

    /** 시스템 클립보드 붙여넣기 — 이미지가 있으면 배경 레이어로, 없으면 도형 클립보드 */
    const onPaste = (e: ClipboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      pasteSeenAtRef.current = performance.now();
      // 도형 클립보드가 있으면 언제나 그쪽이 우선.
      // 스크린샷 등으로 시스템 클립보드에 이미지가 들어 있어도 도형 복제가 가로채이지 않는다.
      // 이미지를 붙이려면 선택 없이 Ctrl+C로 도형 클립보드를 비우거나 파일을 드래그&드롭한다.
      if (clipRef.current) { pasteShapes(); return; }
      const items = e.clipboardData?.items;
      const fileItem = items
        ? Array.from(items).find((it) => it.kind === 'file' && it.type.startsWith('image/'))
        : undefined;
      const blob = fileItem?.getAsFile();
      if (!blob) { pasteShapes(); return; }
      e.preventDefault();
      // 커서가 캔버스 위면 그 자리, 아니면 화면 중앙
      const t = tRef.current;
      const wrap = wrapRef.current;
      const at: [number, number] = cursorRef.current ?? (wrap
        ? [t.invertX(wrap.clientWidth / 2) / CELL, t.invertY(wrap.clientHeight / 2) / CELL]
        : [cols / 2, rows / 2]);
      void placeImage(blob, at, 0);
    };

    window.addEventListener('keydown', onKey, true);
    window.addEventListener('keyup', onKey);
    window.addEventListener('paste', onPaste);
    const ro = new ResizeObserver(() => scheduleDraw());
    if (wrapRef.current) ro.observe(wrapRef.current);
    const mo = new MutationObserver(() => {
      colorsRef.current = null;
      scheduleDraw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => {
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('keyup', onKey);
      window.removeEventListener('paste', onPaste);
      ro.disconnect();
      mo.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pts, selIds, doc.id, doc.grid, doc.geo, doc.struct, doc.zones, doc.doors, doc.stairs, doc.texts, doc.markers, doc.images, scheduleDraw]);

  /* ── 도형 커밋 ── */

  const op = erase ? 'subtract' as const : 'union' as const;
  /** 러프 모드면 커밋 시점에 외곽선을 거칠게 — 데이터에 구워진다 */
  const finalize = (poly: GeoPoly): GeoPoly => (rough ? roughenPoly(poly) : poly);

  /** 도형 커밋 — 타깃 레이어로 라우팅 (바닥 / 구조 / 엄폐) */
  const commitPoly = (poly: GeoPoly) => {
    if (target === 'floor') {
      addGeo(doc.id, { id: uid('geo'), op, poly });
    } else {
      addStruct(doc.id, { id: uid('st'), op, low: target === 'cover', poly });
    }
  };

  const commitDrag = () => {
    const a = dragStartRef.current, b = dragCurRef.current;
    dragStartRef.current = null;
    dragCurRef.current = null;
    if (!a || !b) return;
    if (tool === 'stair') {
      if (Math.hypot(b[0] - a[0], b[1] - a[1]) >= 0.5) {
        addStair(doc.id, { id: uid('str'), x1: a[0], y1: a[1], x2: b[0], y2: b[1], w: stairW });
      }
      scheduleDraw();
      return;
    }
    if (Math.abs(a[0] - b[0]) < 0.01 || Math.abs(a[1] - b[1]) < 0.01) { scheduleDraw(); return; }
    const poly = tool === 'rect' ? rectPoly(a[0], a[1], b[0], b[1]) : ellipsePoly(a[0], a[1], b[0], b[1]);
    commitPoly(finalize(poly));
  };

  /* ── 텍스트 인라인 에디터 ── */

  const openTextEditor = (wx: number, wy: number, id?: string, value = '') => {
    const t = tRef.current;
    setTextEdit({ wx, wy, sx: t.applyX(wx * CELL), sy: t.applyY(wy * CELL), value, id });
  };

  const commitText = () => {
    const te = textEdit;
    setTextEdit(null);
    if (!te) return;
    const v = te.value.trim();
    if (te.markerId) {
      updateMarker(doc.id, te.markerId, { label: v });
    } else if (te.id) {
      if (v) updateText(doc.id, te.id, { text: v });
      else removeText(doc.id, [te.id]);
    } else if (v) {
      addText(doc.id, { id: uid('txt'), x: te.wx, y: te.wy, text: v, size: textSize });
    }
  };

  const commitPts = () => {
    // 더블클릭 마무리 시 같은 자리에 연속으로 찍힌 점 제거
    const cur: number[][] = [];
    for (const pt of pts) {
      const last = cur[cur.length - 1];
      if (!last || Math.abs(last[0]! - pt[0]!) > 1e-6 || Math.abs(last[1]! - pt[1]!) > 1e-6) cur.push(pt);
    }
    setPts([]);
    if (tool === 'polygon') {
      if (cur.length >= 3) commitPoly(finalize([cur] as GeoPoly));
    } else if (tool === 'zone') {
      if (cur.length >= 3) addZone(doc.id, { id: uid('zn'), kind: zoneKind, poly: [cur] as GeoPoly });
    } else if (tool === 'corridor') {
      if (cur.length >= 2) {
        const wGrid = corridorW;   // 1셀 = 1m 고정
        const poly = corridorPoly(cur, wGrid);
        if (poly) commitPoly(finalize(poly));
      }
    }
    scheduleDraw();
  };

  /* ── 단일 도형 크기·회전 핸들 ── */

  const singleShape = (): { id: string; kind: XformDrag['kind']; poly: GeoPoly; rot: number } | null => {
    if (selIds.length !== 1) return null;
    const id = selIds[0]!;
    const g = doc.geo.find((s) => s.id === id);
    if (g) return { id, kind: 'geo', poly: g.poly, rot: g.rot ?? 0 };
    const st = (doc.struct ?? []).find((s) => s.id === id);
    if (st) return { id, kind: 'struct', poly: st.poly, rot: st.rot ?? 0 };
    const z = (doc.zones ?? []).find((s) => s.id === id);
    if (z) return { id, kind: 'zone', poly: z.poly, rot: z.rot ?? 0 };
    // 배경 이미지도 같은 핸들을 쓴다 — 회전 사각형을 폴리곤으로 표현
    const im = (doc.images ?? []).find((s) => s.id === id);
    if (im) return { id, kind: 'image', poly: tdImagePoly(im), rot: im.rot };
    return null;
  };

  const hitXformHandle = (raw: [number, number]): XformDrag | null => {
    const sh = singleShape();
    if (!sh) return null;
    const k = tRef.current.k;
    const tol = XF_TOL_PX / k / CELL;
    const rot = sh.rot;
    const bb = localBBox(sh.poly, rot);
    const mlx = (bb.x0 + bb.x1) / 2;
    // 회전 손잡이 — 로컬 위 변 중앙 위 (도형 방향을 따라 돈다)
    const [kx, ky] = rotP(rot, mlx, bb.y0 - KNOB_PX / k / CELL);
    if (Math.hypot(raw[0] - kx, raw[1] - ky) <= tol) {
      const [cwx, cwy] = rotP(rot, mlx, (bb.y0 + bb.y1) / 2);
      return {
        id: sh.id, kind: sh.kind, mode: 'rotate', base: sh.poly, rot0: rot,
        flx: 0, fly: 0, glx: 0, gly: 0, sx: 1, sy: 1, cwx, cwy, newRot: rot,
      };
    }
    // 모서리 4개 (로컬) — 반대 모서리가 고정점
    const corners: [number, number][] = [[bb.x0, bb.y0], [bb.x1, bb.y0], [bb.x1, bb.y1], [bb.x0, bb.y1]];
    for (const [lx, ly] of corners) {
      const [hx, hy] = rotP(rot, lx, ly);
      if (Math.hypot(raw[0] - hx, raw[1] - hy) <= tol) {
        const flx = lx === bb.x0 ? bb.x1 : bb.x0;
        const fly = ly === bb.y0 ? bb.y1 : bb.y0;
        return {
          id: sh.id, kind: sh.kind, mode: 'scale', base: sh.poly, rot0: rot,
          flx, fly, glx: lx, gly: ly, sx: 1, sy: 1, cwx: 0, cwy: 0, newRot: rot,
        };
      }
    }
    return null;
  };

  /* ── 포인터 ── */

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || spaceRef.current) return;
    const raw = worldAt(e);
    if (!raw) return;
    const p = snapPt(raw);

    if (textEdit) { commitText(); return; }
    // 동선 드로잉 — 다른 어떤 판정보다 먼저. 스냅 없이 원시 좌표를 모은다
    if (tool === 'draw') {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      strokeRef.current = [raw];
      scheduleDraw();
      return;
    }
    // 오버레이 조정 모드 — 드래그로 오버레이 이동 (도구 무시)
    if (calibrating && doc.overlay.visible) {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      calStartRef.current = {
        x: raw[0], y: raw[1],
        tx: doc.overlay.tx || 0, ty: doc.overlay.ty || 0,
      };
      return;
    }
    // 단일 선택 도형의 크기·회전 핸들 — 어느 도구에서나
    if (pts.length === 0) {
      const xh = hitXformHandle(raw);
      if (xh) {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        xformRef.current = xh;
        xformPolyRef.current = null;
        scheduleDraw();
        return;
      }
    }

    // 직접 조작 — 어느 도구에서나 오브젝트(문·계단·텍스트·마커·구역)는 드래그로 이동.
    // 도형(바닥·구조·엄폐)은 겹쳐 그리기가 병합 워크플로의 핵심이라 선택(V)에서만 이동.
    if (tool !== 'select' && pts.length === 0) {
      const hitObj =
        hitText(raw[0], raw[1], doc.texts ?? []) ??
        hitMarker(raw[0], raw[1], doc.markers ?? []) ??
        hitDoor(raw[0], raw[1], doc.doors ?? []) ??
        hitStair(raw[0], raw[1], doc.stairs ?? []) ??
        hitZone(raw[0], raw[1], doc.zones ?? []);
      if (hitObj) {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        if (!selIds.includes(hitObj)) setSelIds([hitObj]);
        moveStartRef.current = raw;
        moveDeltaRef.current = [0, 0];
        scheduleDraw();
        return;
      }
      // 도형도 직접 조작 — 사각형·원형 도구에서 현재 대상 레이어의 도형을 잡으면 이동.
      // 예외: 빼기 모드(E)는 도형 내부에서 시작해야 하므로 그리기 우선,
      //       대상이 구조/엄폐면 바닥은 잡지 않음(방 안에 구조를 그리는 흐름 보존).
      if ((tool === 'rect' || tool === 'ellipse') && !erase) {
        const hitSh = target === 'floor'
          ? hitShape(raw[0], raw[1], doc.geo)
          : hitShape(raw[0], raw[1], doc.struct ?? []);
        if (hitSh) {
          (e.target as HTMLElement).setPointerCapture(e.pointerId);
          if (!selIds.includes(hitSh)) setSelIds([hitSh]);
          moveStartRef.current = raw;
          moveDeltaRef.current = [0, 0];
          scheduleDraw();
          return;
        }
      }
    }

    // 빈 곳 클릭 — 기존 선택 해제 (그리기 도구에서도). 위 적중 판정은 모두 early-return 하므로 여기 도달 = 빈 곳.
    if (tool !== 'select' && pts.length === 0 && selIds.length > 0) {
      setSelIds([]);
      scheduleDraw();
    }

    if (tool === 'door') {
      const hit = snapToWall(raw[0], raw[1], wallSrc, 1.2, doorW);
      if (hit) addDoor(doc.id, { id: uid('door'), x: hit.x, y: hit.y, angle: hit.angle, w: doorW });
      return;
    }
    if (tool === 'text') {
      // 에디터는 pointerup에서 연다 — mousedown의 포커스 이동이 input을 즉시 blur시키지 않게
      return;
    }
    if (tool === 'marker') {
      addMarker(doc.id, { id: uid('mk'), x: p[0], y: p[1], kind: markerKind });
      return;
    }
    if (tool === 'select') {
      // 위에 그려지는 것 먼저 판정: 텍스트 → 마커 → 문 → 계단 → 도형
      const hit =
        hitText(raw[0], raw[1], doc.texts ?? []) ??
        hitMarker(raw[0], raw[1], doc.markers ?? []) ??
        hitDoor(raw[0], raw[1], doc.doors ?? []) ??
        hitStair(raw[0], raw[1], doc.stairs ?? []) ??
        // 동선 획 — 도면 위 주석이라 도형·구역보다 먼저 잡힌다 (숨김 상태면 제외)
        hitStroke(raw[0], raw[1], visibleStrokes) ??
        hitZone(raw[0], raw[1], doc.zones ?? []) ??
        hitShape(raw[0], raw[1], doc.struct ?? []) ??
        hitShape(raw[0], raw[1], doc.geo) ??
        // 배경 이미지는 가장 아래 레이어 — 다른 것이 없을 때만 잡힌다
        hitTdImage(raw[0], raw[1], doc.images ?? []);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      if (hit) {
        // 이미 선택된 묶음 안을 잡으면 그룹 이동 시작, 아니면 단일 선택
        if (!selIds.includes(hit)) setSelIds([hit]);
        moveStartRef.current = raw;
        moveDeltaRef.current = [0, 0];
      } else {
        // 빈 곳 — 마퀴 다중 선택 시작
        setSelIds([]);
        marqueeRef.current = { a: raw, b: raw };
      }
      scheduleDraw();
      return;
    }
    if (tool === 'rect' || tool === 'ellipse' || tool === 'stair') {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragStartRef.current = p;
      dragCurRef.current = p;
      scheduleDraw();
      return;
    }
    // polygon / corridor — 클릭으로 점 추가, 더블클릭은 onDoubleClick에서 종료
    setPts((prev) => [...prev, p]);
    scheduleDraw();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const raw = worldAt(e);
    if (!raw) return;
    const p = snapPt(raw);
    cursorRef.current = tool === 'select' || tool === 'door' || tool === 'draw' ? raw : p;

    // 동선 드로잉 진행 — 일정 간격 이상 움직였을 때만 점 추가
    if (strokeRef.current) {
      const last = strokeRef.current[strokeRef.current.length - 1]!;
      if (Math.hypot(raw[0] - last[0]!, raw[1] - last[1]!) >= STROKE_MIN_STEP) {
        strokeRef.current.push(raw);
        scheduleDraw();
      }
      return;
    }

    // 오버레이 조정 드래그 — 월드 px 단위 이동
    if (calibrating && calStartRef.current) {
      const cs = calStartRef.current;
      updateTopdown(doc.id, {
        overlay: {
          ...doc.overlay,
          tx: cs.tx + (raw[0] - cs.x) * CELL,
          ty: cs.ty + (raw[1] - cs.y) * CELL,
        },
      });
      return;
    }

    // 크기·회전 핸들 드래그 — 미리보기 폴리곤 갱신
    const X = xformRef.current;
    if (X) {
      if (X.mode === 'scale') {
        // 도형의 로컬(회전된) 축에서 배율 계산 — 찌그러짐 없음.
        // 로컬 치수를 스냅 격자에 맞춘다 (방향 0이면 월드 그리드 스냅과 동일)
        const lp = rotP(-X.rot0, raw[0], raw[1]);
        let qlx = lp[0], qly = lp[1];
        if (snap) {
          qlx = X.flx + Math.round((lp[0] - X.flx) / snap) * snap;
          qly = X.fly + Math.round((lp[1] - X.fly) / snap) * snap;
        }
        let sx = (qlx - X.flx) / ((X.glx - X.flx) || 1);
        let sy = (qly - X.fly) / ((X.gly - X.fly) || 1);
        sx = Math.max(0.05, Math.min(40, sx));
        sy = Math.max(0.05, Math.min(40, sy));
        X.sx = sx; X.sy = sy;
        xformPolyRef.current = mapPoly(X.base, (x, y) => {
          const l = rotP(-X.rot0, x, y);
          return rotP(X.rot0, X.flx + (l[0] - X.flx) * sx, X.fly + (l[1] - X.fly) * sy);
        });
      } else {
        const ang = Math.atan2(raw[1] - X.cwy, raw[0] - X.cwx) + Math.PI / 2;
        X.newRot = Math.round(ang / ROT_SNAP) * ROT_SNAP;
        const d = X.newRot - X.rot0;
        const c = Math.cos(d), s = Math.sin(d);
        xformPolyRef.current = mapPoly(X.base, (x, y) => [
          X.cwx + (x - X.cwx) * c - (y - X.cwy) * s,
          X.cwy + (x - X.cwx) * s + (y - X.cwy) * c,
        ]);
      }
      scheduleDraw();
      return;
    }

    if (tool === 'door' && !moveStartRef.current) {
      doorHitRef.current = snapToWall(raw[0], raw[1], wallSrc, 1.2, doorW);
    } else if (doorHitRef.current) {
      doorHitRef.current = null;
    }

    if (onStatus) {
      const inFloor = merged.length > 0;
      onStatus(
        `(${p[0].toFixed(2)}, ${p[1].toFixed(2)}) · ${cols}m × ${rows}m · 벽 ${doc.style.wallM}m` +
        (target !== 'floor'
          ? (target === 'struct' ? ' · 대상: 구조'
            : target === 'cover' ? ' · 대상: 엄폐'
            : ` · 대상: 동선 · 두께 ${strokeWidth}m`)
          : '') +
        (erase ? ' · 빼기 모드' : '') +
        (rough ? ' · 러프' : '') +
        (snap ? ` · 스냅 ${snap}셀` : ' · 스냅 끔') +
        (tool === 'draw' ? ' · 드래그로 자유 드로잉' : inFloor ? '' : ' · 사각형(R)으로 첫 방을 그려보세요') +
        (tool === 'door' && inFloor && !doorHitRef.current ? ' · 벽 가까이에서 클릭하면 문이 놓입니다' : '') +
        (calibrating ? ' · 오버레이 조정 — 드래그로 이동' : '') +
        (selIds.length > 1 ? ` · 선택 ${selIds.length}개` : ''),
      );
    }

    if (tool === 'select' && marqueeRef.current) {
      marqueeRef.current.b = raw;
    } else if (moveStartRef.current && selIds.length > 0) {
      const [sx, sy] = moveStartRef.current;
      let dx = raw[0] - sx, dy = raw[1] - sy;
      if (snap) { dx = Math.round(dx / snap) * snap; dy = Math.round(dy / snap) * snap; }
      moveDeltaRef.current = [dx, dy];
    } else if (dragStartRef.current) {
      dragCurRef.current = p;
    }
    scheduleDraw();
  };

  const onPointerUp = (e: React.PointerEvent) => {
    // 동선 드로잉 커밋 — 1획 = undo 1단계
    if (strokeRef.current) {
      const pts2 = strokeRef.current;
      strokeRef.current = null;
      const raw = worldAt(e);
      if (raw) {
        const last = pts2[pts2.length - 1]!;
        if (Math.hypot(raw[0] - last[0]!, raw[1] - last[1]!) > 1e-6) pts2.push(raw);
      }
      addStroke(doc.id, { id: uid('stk'), pts: pts2, color: strokeColor, width: strokeWidth });
      scheduleDraw();
      return;
    }
    if (calibrating && calStartRef.current) {
      calStartRef.current = null;
      return;
    }
    // 크기·회전 핸들 — 변환 커밋 (부착 문 보정 포함, undo 1단계)
    if (xformRef.current) {
      const X = xformRef.current;
      const poly = xformPolyRef.current;
      xformRef.current = null;
      xformPolyRef.current = null;
      if (poly) {
        // 배경 이미지 — 폴리곤을 다시 사각형(중심·크기·방향)으로 환원해 저장
        if (X.kind === 'image') {
          const rot = X.mode === 'rotate' ? X.newRot : X.rot0;
          const bb = localBBox(poly, rot);
          const [cx, cy] = rotP(rot, (bb.x0 + bb.x1) / 2, (bb.y0 + bb.y1) / 2);
          updateTdImage(doc.id, X.id, {
            x: cx, y: cy, w: bb.x1 - bb.x0, h: bb.y1 - bb.y0, rot,
          });
          scheduleDraw();
          return;
        }
        let doors: { id: string; x: number; y: number; angle: number }[] | undefined;
        if (X.kind !== 'zone') {
          const attached = (doc.doors ?? []).filter((d) => distToPolyEdge(d.x, d.y, X.base) <= 0.45);
          if (attached.length) {
            doors = attached.map((d) => {
              if (X.mode === 'scale') {
                // 도형과 같은 로컬 축 스케일을 문 위치에도 적용
                const l = rotP(-X.rot0, d.x, d.y);
                const [nx, ny] = rotP(X.rot0, X.flx + (l[0] - X.flx) * X.sx, X.fly + (l[1] - X.fly) * X.sy);
                return { id: d.id, x: nx, y: ny, angle: d.angle };
              }
              const delta = X.newRot - X.rot0;
              const c = Math.cos(delta), s = Math.sin(delta);
              return {
                id: d.id,
                x: X.cwx + (d.x - X.cwx) * c - (d.y - X.cwy) * s,
                y: X.cwy + (d.x - X.cwx) * s + (d.y - X.cwy) * c,
                angle: d.angle + delta,
              };
            });
          }
        }
        transformShape(doc.id, {
          kind: X.kind, id: X.id, poly, doors,
          rot: X.mode === 'rotate' ? X.newRot : undefined,
        });
      }
      scheduleDraw();
      return;
    }
    if (tool === 'text' && !moveStartRef.current) {
      const raw = worldAt(e);
      if (raw) {
        const p = snapPt(raw);
        openTextEditor(p[0], p[1]);
      }
      return;
    }
    if (tool === 'select' && marqueeRef.current) {
      // 마퀴 확정 — 겹치는 도형·오브젝트 전부 선택
      const { a, b } = marqueeRef.current;
      marqueeRef.current = null;
      const x0 = Math.min(a[0], b[0]), x1 = Math.max(a[0], b[0]);
      const y0 = Math.min(a[1], b[1]), y1 = Math.max(a[1], b[1]);
      if (x1 - x0 > 0.05 || y1 - y0 > 0.05) {
        const ids: string[] = [];
        for (const g of [...doc.geo, ...(doc.struct ?? []), ...(doc.zones ?? [])]) {
          let gx0 = Infinity, gy0 = Infinity, gx1 = -Infinity, gy1 = -Infinity;
          for (const ring of g.poly) {
            for (const [x, y] of ring) {
              gx0 = Math.min(gx0, x!); gx1 = Math.max(gx1, x!);
              gy0 = Math.min(gy0, y!); gy1 = Math.max(gy1, y!);
            }
          }
          if (gx1 >= x0 && gx0 <= x1 && gy1 >= y0 && gy0 <= y1) ids.push(g.id);
        }
        for (const d of doc.doors ?? []) {
          if (d.x >= x0 && d.x <= x1 && d.y >= y0 && d.y <= y1) ids.push(d.id);
        }
        for (const s of doc.stairs ?? []) {
          const mx = (s.x1 + s.x2) / 2, my = (s.y1 + s.y2) / 2;
          if (mx >= x0 && mx <= x1 && my >= y0 && my <= y1) ids.push(s.id);
        }
        for (const tx of doc.texts ?? []) {
          const w = textBoxW(tx);
          if (tx.x + w >= x0 && tx.x <= x1 && tx.y + tx.size * 0.7 >= y0 && tx.y - tx.size * 0.7 <= y1) ids.push(tx.id);
        }
        for (const mk of doc.markers ?? []) {
          if (mk.x >= x0 && mk.x <= x1 && mk.y >= y0 && mk.y <= y1) ids.push(mk.id);
        }
        for (const s of visibleStrokes) {
          const bb = strokeBBox(s);
          if (bb.x1 >= x0 && bb.x0 <= x1 && bb.y1 >= y0 && bb.y0 <= y1) ids.push(s.id);
        }
        for (const im of doc.images ?? []) {
          const ring = tdImagePoly(im)[0]!;
          const xs = ring.map((p) => p[0]!), ys = ring.map((p) => p[1]!);
          if (Math.max(...xs) >= x0 && Math.min(...xs) <= x1
            && Math.max(...ys) >= y0 && Math.min(...ys) <= y1) ids.push(im.id);
        }
        setSelIds(ids);
      }
      scheduleDraw();
      return;
    }
    if (moveStartRef.current && selIds.length > 0) {
      const [dx, dy] = moveDeltaRef.current;
      moveStartRef.current = null;
      moveDeltaRef.current = [0, 0];
      if (dx !== 0 || dy !== 0) {
        const geoIds = selIds.filter((id) => doc.geo.some((g) => g.id === id));
        const structIds = selIds.filter((id) => (doc.struct ?? []).some((g) => g.id === id));
        const zoneIds = selIds.filter((id) => (doc.zones ?? []).some((z) => z.id === id));
        if (geoIds.length) translateGeo(doc.id, geoIds, dx, dy);
        if (structIds.length) translateStruct(doc.id, structIds, dx, dy);
        if (zoneIds.length) translateZones(doc.id, zoneIds, dx, dy);
        const movedPolys = [
          ...doc.geo.filter((g) => geoIds.includes(g.id)),
          ...(doc.struct ?? []).filter((g) => structIds.includes(g.id)),
        ];
        for (const id of selIds) {
          if (geoIds.includes(id) || structIds.includes(id) || zoneIds.includes(id)) continue;
          // 이동한 도형의 벽 위 문은 translateGeo/translateStruct가 이미 옮겼다 — 이중 이동 방지
          const d = (doc.doors ?? []).find((x) => x.id === id);
          if (d && movedPolys.some((g) => distToPolyEdge(d.x, d.y, g.poly) <= 0.45)) continue;
          translateObject(doc.id, id, dx, dy);
        }
      }
      scheduleDraw();
      return;
    }
    if (dragStartRef.current) commitDrag();
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    // 모든 자유 도형(다각형·복도·구역)은 더블클릭으로 닫는다
    if ((tool === 'polygon' || tool === 'corridor' || tool === 'zone') && pts.length > 0) { commitPts(); return; }
    if (tool === 'select') {
      const raw = worldAt(e);
      if (!raw) return;
      const id = hitText(raw[0], raw[1], doc.texts ?? []);
      const target = id ? (doc.texts ?? []).find((x) => x.id === id) : null;
      if (target) {
        openTextEditor(target.x, target.y, target.id, target.text);
        return;
      }
      // 마커 더블클릭 — 라벨 인라인 편집
      const mkId = hitMarker(raw[0], raw[1], doc.markers ?? []);
      const mk = mkId ? (doc.markers ?? []).find((m) => m.id === mkId) : null;
      if (mk) {
        const t = tRef.current;
        setTextEdit({
          wx: mk.x, wy: mk.y,
          sx: t.applyX((mk.x + MARKER_R + 0.3) * CELL),
          sy: t.applyY(mk.y * CELL),
          value: mk.label ?? '',
          markerId: mk.id,
        });
      }
    }
  };

  const onPointerLeave = () => {
    cursorRef.current = null;
    doorHitRef.current = null;
    scheduleDraw();
  };

  /* ── 이미지 가져오기 — 드래그&드롭 / Ctrl+V 공용 ── */

  /** 이미지 파일 1장을 배경 참조 레이어에 배치. seq는 여러 장일 때의 계단식 오프셋 */
  const placeImage = async (file: Blob, at: [number, number], seq = 0) => {
    try {
      const sized = await fileToTdImage(file);
      if (!sized) return;
      // 긴 변 = 작업 범위의 IMG_DROP_RATIO
      const longCells = Math.max(8, Math.round(Math.max(cols, rows) * IMG_DROP_RATIO));
      const k = longCells / Math.max(sized.w, sized.h);
      const id = uid('tdimg');
      addTdImage(doc.id, {
        id,
        x: at[0] + seq * 2, y: at[1] + seq * 2,
        w: sized.w * k, h: sized.h * k,
        rot: 0,
        src: sized.src,
        createdAt: Date.now(),
      });
      setSelIds([id]);
      onStatus?.(`이미지 배치 — ${Math.round(sized.w * k)}m × ${Math.round(sized.h * k)}m · 선택(V)에서 이동·모서리 크기·손잡이 회전`);
    } catch (err) {
      onStatus?.(`이미지 불러오기 실패 — ${(err as Error).message ?? err}`);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    if (!e.dataTransfer.types.includes('Files')) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (!dropHover) setDropHover(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    // 자식으로 이동하는 중이면 무시
    if (e.currentTarget.contains(e.relatedTarget as Node)) return;
    setDropHover(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDropHover(false);
    const files = Array.from(e.dataTransfer.files ?? []).filter((f) => f.type.startsWith('image/'));
    if (files.length === 0) return;
    const raw = worldAt(e);
    if (!raw) return;
    files.forEach((file, i) => void placeImage(file, raw, i));
  };

  return (
    <div
      ref={wrapRef}
      className={`td-canvas-wrap${dropHover ? ' is-drop-hover' : ''}`}
      data-tool={tool}
      data-erase={erase}
      data-calibrating={calibrating}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <canvas
        ref={canvasRef}
        className="td-canvas"
        data-testid="topdown-canvas"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDoubleClick={onDoubleClick}
        onPointerLeave={onPointerLeave}
        onContextMenu={(e) => e.preventDefault()}
      />
      {textEdit && (
        <input
          className="td-text-input"
          data-testid="td-text-input"
          autoFocus
          placeholder="라벨 입력…"
          style={{
            left: textEdit.sx,
            top: textEdit.sy,
            fontSize: Math.max(15, textSize * CELL * tRef.current.k),
          }}
          value={textEdit.value}
          onChange={(e) => setTextEdit({ ...textEdit, value: e.target.value })}
          onBlur={commitText}
          onKeyDown={(e) => {
            if (e.key === 'Enter') commitText();
            if (e.key === 'Escape') { e.stopPropagation(); setTextEdit(null); }
          }}
        />
      )}
    </div>
  );
}
