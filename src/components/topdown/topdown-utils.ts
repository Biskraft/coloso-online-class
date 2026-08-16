import pc from 'polygon-clipping';
import type {
  GeoPoly, GeoShape, StructShape, ZoneObj, ZoneKind, DoorObj, StairObj, TextObj,
  MarkerObj, MarkerKind, TopdownDoc, TdImage, StrokeObj, StrokeColor,
} from '../../types';

/* ─────────────────────────────────────────────────────────
   Scrawl 지오메트리 유틸 — 그리드(셀) 단위 폴리곤
   도형 목록을 순서대로 union/subtract 해서 바닥 멀티폴리곤 생성
   ───────────────────────────────────────────────────────── */

export type MultiPoly = number[][][][];   // polygon-clipping MultiPolygon

/** 도형 목록 → 바닥 멀티폴리곤 (순서대로 불리언 적용) */
export function mergeGeo(geo: GeoShape[]): MultiPoly {
  let acc: MultiPoly = [];
  for (const g of geo) {
    try {
      if (g.op === 'union') {
        acc = (acc.length
          ? pc.union(acc as any, [g.poly] as any)
          : pc.union([g.poly] as any)) as MultiPoly;
      } else if (acc.length) {
        acc = pc.difference(acc as any, [g.poly] as any) as MultiPoly;
      }
    } catch {
      // 퇴화 폴리곤(자기교차 등)은 건너뛴다 — 도형 하나가 전체를 깨지 않게
    }
  }
  return acc;
}

/** 구조 도형 목록에서 high/low를 골라 병합 */
export function mergeStruct(struct: StructShape[], low: boolean): MultiPoly {
  return mergeGeo(struct.filter((s) => s.low === low));
}

/** 구조/엄폐 멀티폴리곤을 바닥에 교집합 클립 — 바닥 밖으로 비어져 나가지 않게 */
export function clipToFloor(struct: MultiPoly, floor: MultiPoly): MultiPoly {
  if (struct.length === 0 || floor.length === 0) return [];
  try {
    return pc.intersection(struct as any, floor as any) as MultiPoly;
  } catch {
    return struct;
  }
}

/* ─── 도형 생성기 (그리드 단위) ─── */

export function rectPoly(x0: number, y0: number, x1: number, y1: number): GeoPoly {
  const minX = Math.min(x0, x1), maxX = Math.max(x0, x1);
  const minY = Math.min(y0, y1), maxY = Math.max(y0, y1);
  return [[[minX, minY], [maxX, minY], [maxX, maxY], [minX, maxY]]];
}

/** 타원 — 드래그 박스 내접, n각 근사 */
export function ellipsePoly(x0: number, y0: number, x1: number, y1: number, n = 48): GeoPoly {
  const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  const rx = Math.abs(x1 - x0) / 2, ry = Math.abs(y1 - y0) / 2;
  if (rx === 0 || ry === 0) return rectPoly(x0, y0, x1, y1);
  const ring: number[][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    ring.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
  }
  return [ring];
}

/** 정다각형 — 중심·반지름·변 수 */
export function regularPoly(cx: number, cy: number, r: number, sides: number): GeoPoly {
  const ring: number[][] = [];
  for (let i = 0; i < sides; i++) {
    const a = (i / sides) * Math.PI * 2 - Math.PI / 2;
    ring.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return [ring];
}

/** 복도 — 폴리라인을 폭 w로 두껍게. 끝과 꺾임 모두 각지게:
    각 세그먼트를 양 끝으로 half만큼 연장한 사각형들의 union (square cap/joint) */
/** 원판(정n각형) — 복도 꺾임을 둥글게 메운다. 반지름이 클수록 분할을 늘린다 */
function discPoly(cx: number, cy: number, r: number): GeoPoly {
  const n = Math.max(16, Math.min(64, Math.round(r * 12)));
  const ring: number[][] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    ring.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return [ring];
}

export function corridorPoly(points: number[][], w: number): GeoPoly | null {
  if (points.length < 2) return null;
  const half = w / 2;
  let acc: MultiPoly = [];
  const add = (poly: GeoPoly) => {
    acc = (acc.length
      ? pc.union(acc as any, [poly] as any)
      : pc.union([poly] as any)) as MultiPoly;
  };
  try {
    for (let i = 0; i < points.length - 1; i++) {
      const [x1, y1] = points[i]!;
      const [x2, y2] = points[i + 1]!;
      const dx = x2! - x1!, dy = y2! - y1!;
      const len = Math.hypot(dx, dy);
      if (len < 1e-6) continue;
      const ux = dx / len, uy = dy / len;
      const nx = -uy * half, ny = ux * half;
      // 바깥 끝만 half 연장(사각 마감 — 방 안으로 파고들게).
      // 중간 꺾임은 연장하지 않는다. 연장분이 겹치면서 뿔처럼 튀어나오던 원인.
      const sExt = i === 0 ? half : 0;
      const eExt = i === points.length - 2 ? half : 0;
      const ax = x1! - ux * sExt, ay = y1! - uy * sExt;
      const bx = x2! + ux * eExt, by = y2! + uy * eExt;
      add([[
        [ax + nx, ay + ny], [bx + nx, by + ny], [bx - nx, by - ny], [ax - nx, ay - ny],
      ]]);
    }
    // 내부 꺾임점을 원판으로 메운다 → 바깥 모서리가 반지름 half의 호로 둥글어진다
    for (let i = 1; i < points.length - 1; i++) {
      const [px, py] = points[i]!;
      add(discPoly(px!, py!, half));
    }
  } catch {
    return null;
  }
  // 멀티폴리곤이지만 복도는 연결돼 있으므로 첫 폴리곤 사용
  return (acc[0] as GeoPoly) ?? null;
}

/** 러프(동굴) 외곽선 — 변을 step(셀) 간격으로 쪼개고 법선 방향 지터.
    데이터 자체가 거칠어지므로 벽·그림자·해칭은 자동으로 따라온다 */
export function roughenPoly(poly: GeoPoly, amp = 0.22, step = 0.7): GeoPoly {
  return poly.map((ring) => {
    const out: number[][] = [];
    for (let i = 0; i < ring.length; i++) {
      const [x1, y1] = ring[i]!;
      const [x2, y2] = ring[(i + 1) % ring.length]!;
      const dx = x2! - x1!, dy = y2! - y1!;
      const len = Math.hypot(dx, dy);
      if (len < 1e-6) continue;
      const nx = -dy / len, ny = dx / len;
      const n = Math.max(1, Math.round(len / step));
      for (let j = 0; j < n; j++) {
        const t = j / n;
        // 꼭짓점은 살짝만, 중간점은 크게 — 자기교차를 피하면서 거칠게
        const jitter = (Math.random() - 0.5) * 2 * amp * (j === 0 ? 0.35 : 1);
        out.push([x1! + dx * t + nx * jitter, y1! + dy * t + ny * jitter]);
      }
    }
    return out.length >= 3 ? out : ring;
  });
}

/* ─── 판정 ─── */

/** 점이 링 안에 있는가 (ray casting) */
function inRing(x: number, y: number, ring: number[][]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]!;
    const [xj, yj] = ring[j]!;
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** 점이 폴리곤(구멍 포함) 안에 있는가 */
export function inPoly(x: number, y: number, poly: GeoPoly): boolean {
  if (!poly.length || !inRing(x, y, poly[0]!)) return false;
  for (let i = 1; i < poly.length; i++) if (inRing(x, y, poly[i]!)) return false;
  return true;
}

/** 도형 목록에서 점을 포함하는 최상단 도형 id */
export function hitShape(x: number, y: number, geo: GeoShape[]): string | null {
  for (let i = geo.length - 1; i >= 0; i--) {
    const g = geo[i]!;
    for (const ring of g.poly.length ? [g.poly[0]!] : []) {
      if (inRing(x, y, ring)) return g.id;
    }
  }
  return null;
}

/* ─── 문 — 벽 스냅·판정 ─── */

export interface WallHit {
  x: number;       // 문 중심 (그리드 단위)
  y: number;
  angle: number;   // 벽 진행 방향 (rad)
}

/** 클릭 지점에서 maxDist(셀) 안의 가장 가까운 벽 위 문 자리.
    문이 세그먼트 밖으로 삐져나가지 않게 중심을 clamp,
    축 정렬 벽에서는 중심을 ½셀 격자에 스냅한다 */
export function snapToWall(
  px: number, py: number, merged: MultiPoly, maxDist: number, doorW: number,
): WallHit | null {
  let best: { d: number; ax: number; ay: number; bx: number; by: number; t: number } | null = null;
  for (const poly of merged) {
    for (const ring of poly) {
      for (let i = 0; i < ring.length; i++) {
        const [ax, ay] = ring[i]!;
        const [bx, by] = ring[(i + 1) % ring.length]!;
        const dx = bx! - ax!, dy = by! - ay!;
        const len2 = dx * dx + dy * dy;
        if (len2 < 1e-9) continue;
        const t = Math.max(0, Math.min(1, ((px - ax!) * dx + (py - ay!) * dy) / len2));
        const qx = ax! + dx * t, qy = ay! + dy * t;
        const d = Math.hypot(px - qx, py - qy);
        if (!best || d < best.d) best = { d, ax: ax!, ay: ay!, bx: bx!, by: by!, t };
      }
    }
  }
  if (!best || best.d > maxDist) return null;
  const dx = best.bx - best.ax, dy = best.by - best.ay;
  const len = Math.hypot(dx, dy);
  const ux = dx / len, uy = dy / len;
  const half = doorW / 2;
  let s = best.t * len;
  let qx = best.ax + ux * s, qy = best.ay + uy * s;
  if (Math.abs(uy) < 1e-6) { qx = Math.round(qx * 2) / 2; s = (qx - best.ax) / ux; }
  else if (Math.abs(ux) < 1e-6) { qy = Math.round(qy * 2) / 2; s = (qy - best.ay) / uy; }
  s = len < doorW ? len / 2 : Math.max(half, Math.min(len - half, s));
  return { x: best.ax + ux * s, y: best.ay + uy * s, angle: Math.atan2(dy, dx) };
}

/** 점에서 폴리곤 변까지 최소 거리 (그리드 단위) — 문이 어느 도형 위에 있는지 판정용 */
export function distToPolyEdge(x: number, y: number, poly: GeoPoly): number {
  let best = Infinity;
  for (const ring of poly) {
    for (let i = 0; i < ring.length; i++) {
      const [ax, ay] = ring[i]!;
      const [bx, by] = ring[(i + 1) % ring.length]!;
      const dx = bx! - ax!, dy = by! - ay!;
      const len2 = dx * dx + dy * dy;
      const t = len2 < 1e-9 ? 0 : Math.max(0, Math.min(1, ((x - ax!) * dx + (y - ay!) * dy) / len2));
      best = Math.min(best, Math.hypot(x - (ax! + dx * t), y - (ay! + dy * t)));
    }
  }
  return best;
}

/* ─── 구역 채움 ─── */

/** 구역 색 — 안전(청사진 파랑)/위험(벽돌 빨강). [r,g,b] */
export const ZONE_RGB: Record<ZoneKind, string> = {
  safe: '44,95,124',
  danger: '184,84,80',
};
export const ZONE_DEFS: Record<ZoneKind, { label: string }> = {
  safe: { label: '안전' },
  danger: { label: '위험' },
};

/** 구역은 경계 근처(0.45셀)에서만 선택 — 내부 클릭이 방·구조 선택을 가리지 않게 */
export function hitZone(x: number, y: number, zones: ZoneObj[]): string | null {
  for (let i = zones.length - 1; i >= 0; i--) {
    const z = zones[i]!;
    if (distToPolyEdge(x, y, z.poly) <= 0.45) return z.id;
  }
  return null;
}

/** 점이 문 사각형 위에 있는가 (그리드 단위, 약간의 여유 포함) */
export function hitDoor(x: number, y: number, doors: DoorObj[]): string | null {
  for (let i = doors.length - 1; i >= 0; i--) {
    const d = doors[i]!;
    const cos = Math.cos(-d.angle), sin = Math.sin(-d.angle);
    const lx = (x - d.x) * cos - (y - d.y) * sin;   // 벽 방향
    const ly = (x - d.x) * sin + (y - d.y) * cos;   // 벽 수직
    if (Math.abs(lx) <= d.w / 2 + 0.15 && Math.abs(ly) <= 0.45) return d.id;
  }
  return null;
}

/** 점이 계단 사각형 위에 있는가 (그리드 단위) */
export function hitStair(x: number, y: number, stairs: StairObj[]): string | null {
  for (let i = stairs.length - 1; i >= 0; i--) {
    const s = stairs[i]!;
    const dx = s.x2 - s.x1, dy = s.y2 - s.y1;
    const len = Math.hypot(dx, dy);
    if (len < 1e-6) continue;
    const ux = dx / len, uy = dy / len;
    const lx = (x - s.x1) * ux + (y - s.y1) * uy;        // 진행 방향
    const ly = -(x - s.x1) * uy + (y - s.y1) * ux;       // 수직
    if (lx >= -0.2 && lx <= len + 0.2 && Math.abs(ly) <= s.w / 2 + 0.2) return s.id;
  }
  return null;
}

/** 텍스트 라벨 근사 폭 (셀) — 한글 전각 기준 보수적 추정 */
export function textBoxW(t: TextObj): number {
  return Math.max(t.text.length * t.size * 0.85, t.size);
}

/** 점이 텍스트 라벨 위에 있는가 — 왼쪽 정렬 박스 */
export function hitText(x: number, y: number, texts: TextObj[]): string | null {
  for (let i = texts.length - 1; i >= 0; i--) {
    const t = texts[i]!;
    if (x >= t.x - 0.2 && x <= t.x + textBoxW(t) && Math.abs(y - t.y) <= t.size * 0.7) return t.id;
  }
  return null;
}

/* ─── 동선 레이어 — 자유 드로잉 ─── */

/** 팔레트 순서 = 툴바 버튼 순서. 라벨은 세계관 색 문법을 따른다 */
export const STROKE_COLORS: { key: StrokeColor; label: string }[] = [
  { key: 'moss',      label: '의도 동선' },
  { key: 'ochre',     label: '이탈 동선' },
  { key: 'brick',     label: '위협·추격' },
  { key: 'blueprint', label: '보조·시선' },
  { key: 'ink',       label: '잉크' },
];

/** 선 두께 프리셋 (m) */
export const STROKE_WIDTHS = [1, 2, 4, 8];

export function strokeColorOf(c: TdColors, key: StrokeColor): string {
  return key === 'ink' ? c.wall : c[key];
}

/** 점 → 선분 최단거리 (그리드 단위) */
function distToSeg(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax, dy = by - ay;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(px - ax, py - ay);
  let t = ((px - ax) * dx + (py - ay) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/** 획의 바운딩 박스 (마퀴 판정용) */
export function strokeBBox(s: StrokeObj) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [x, y] of s.pts) {
    x0 = Math.min(x0, x!); x1 = Math.max(x1, x!);
    y0 = Math.min(y0, y!); y1 = Math.max(y1, y!);
  }
  const pad = s.width / 2;
  return { x0: x0 - pad, y0: y0 - pad, x1: x1 + pad, y1: y1 + pad };
}

/** 점이 획 위에 있는가 — 선 두께 절반 + 여유. 나중에 그린 획부터 판정 */
export function hitStroke(x: number, y: number, strokes: StrokeObj[], tol = 0.4): string | null {
  for (let i = strokes.length - 1; i >= 0; i--) {
    const s = strokes[i]!;
    const r = s.width / 2 + tol;
    if (s.pts.length === 1) {
      const [px, py] = s.pts[0]! as [number, number];
      if (Math.hypot(x - px, y - py) <= r) return s.id;
      continue;
    }
    for (let j = 1; j < s.pts.length; j++) {
      const a = s.pts[j - 1]!, b = s.pts[j]!;
      if (distToSeg(x, y, a[0]!, a[1]!, b[0]!, b[1]!) <= r) return s.id;
    }
  }
  return null;
}

/** 동선 스트로크 렌더 — 도면 주석이라 바닥 클립 없이 그대로 얹는다 */
export function drawStrokes(
  ctx: CanvasRenderingContext2D,
  strokes: StrokeObj[],
  o: { CELL: number; zoomK: number; colors: TdColors },
) {
  const { CELL } = o;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (const s of strokes) {
    if (!s.pts.length) continue;
    const color = strokeColorOf(o.colors, s.color);
    // 실척 두께 + 화면 최소 두께 하한 (줌 아웃에서 선이 사라지지 않게)
    const w = Math.max(s.width * CELL, 1.2 / o.zoomK);
    if (s.pts.length === 1) {
      const [x, y] = s.pts[0]! as [number, number];
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x * CELL, y * CELL, w / 2, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }
    ctx.strokeStyle = color;
    ctx.lineWidth = w;
    ctx.beginPath();
    // 손그림 느낌 — 각 점을 제어점으로, 이웃 중점을 통과시키는 2차 곡선
    const p = s.pts;
    ctx.moveTo(p[0]![0]! * CELL, p[0]![1]! * CELL);
    for (let i = 1; i < p.length - 1; i++) {
      const mx = (p[i]![0]! + p[i + 1]![0]!) / 2;
      const my = (p[i]![1]! + p[i + 1]![1]!) / 2;
      ctx.quadraticCurveTo(p[i]![0]! * CELL, p[i]![1]! * CELL, mx * CELL, my * CELL);
    }
    const last = p[p.length - 1]!;
    ctx.lineTo(last[0]! * CELL, last[1]! * CELL);
    ctx.stroke();
  }
}

/* ─── 배경 참조 이미지 ─── */

/** 이미지 네 모서리를 도형과 같은 폴리곤 표현으로 — 선택 테두리·변환 핸들이 공용으로 쓴다 */
export function tdImagePoly(im: TdImage): GeoPoly {
  const hw = im.w / 2, hh = im.h / 2;
  const c = Math.cos(im.rot), s = Math.sin(im.rot);
  const pt = (lx: number, ly: number): number[] => [im.x + lx * c - ly * s, im.y + lx * s + ly * c];
  return [[pt(-hw, -hh), pt(hw, -hh), pt(hw, hh), pt(-hw, hh)]];
}

/** 점이 이미지(회전 사각형) 안에 있는가 — 위에 얹힌 것부터 판정 */
export function hitTdImage(x: number, y: number, images: TdImage[]): string | null {
  for (let i = images.length - 1; i >= 0; i--) {
    const im = images[i]!;
    const c = Math.cos(-im.rot), s = Math.sin(-im.rot);
    const dx = x - im.x, dy = y - im.y;
    const lx = dx * c - dy * s, ly = dx * s + dy * c;
    if (Math.abs(lx) <= im.w / 2 && Math.abs(ly) <= im.h / 2) return im.id;
  }
  return null;
}

/* ─── 마커 ─── */

export const MARKER_R = 0.75;   // 마커 반지름 (셀) — 지름 1.5셀 실척 고정

export const MARKER_DEFS: Record<MarkerKind, { glyph: string; label: string; color: keyof TdColors }> = {
  start:    { glyph: '▶', label: '시작',     color: 'moss' },
  goal:     { glyph: '★', label: '목표',     color: 'wall' },
  reward:   { glyph: '◆', label: '보상',     color: 'ochre' },
  enemy:    { glyph: '✕', label: '적',       color: 'brick' },
  trigger:  { glyph: '◎', label: '트리거',   color: 'blueprint' },
  landmark: { glyph: '▲', label: '랜드마크', color: 'wall' },
  node:     { glyph: '●', label: '노드',     color: 'wall' },
};

/** 점이 마커 위에 있는가 */
export function hitMarker(x: number, y: number, markers: MarkerObj[]): string | null {
  for (let i = markers.length - 1; i >= 0; i--) {
    const m = markers[i]!;
    if (Math.hypot(x - m.x, y - m.y) <= MARKER_R + 0.15) return m.id;
  }
  return null;
}

/* ─── 캔버스 Path 변환 (CELL 곱) ─── */

export function multiToPath(multi: MultiPoly, CELL: number): Path2D {
  const p = new Path2D();
  for (const poly of multi) {
    for (const ring of poly) {
      ring.forEach(([x, y], i) => {
        if (i === 0) p.moveTo(x! * CELL, y! * CELL);
        else p.lineTo(x! * CELL, y! * CELL);
      });
      p.closePath();
    }
  }
  return p;
}

export function polyToPath(poly: GeoPoly, CELL: number): Path2D {
  return multiToPath([poly], CELL);
}

/* ─── 디자인 토큰 → 캔버스 색상 ─── */

export interface TdColors {
  paper: string;     // 그리드 밖 배경
  floor: string;     // 바닥 (플레이 영역)
  wall: string;      // 벽 잉크
  gridSoft: string;
  gridHard: string;
  gridMajor: string;  // 10m 기준선
  border: string;
  shadow: string;
  hatch: string;
  moss: string;      // 의도 동선·시작
  ochre: string;     // 이탈 동선·보상
  brick: string;     // 적·위협
  blueprint: string; // 트리거·보조
  cover: string;     // 낮은 엄폐 채움
}

export function readTdColors(): TdColors {
  const cs = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string) => cs.getPropertyValue(name).trim() || fallback;
  return {
    paper: v('--paper-200', '#ECE5D6'),
    floor: v('--paper-50', '#FAF6EE'),
    wall: v('--ink-900', '#1A1814'),
    gridSoft: v('--grid-line-soft', 'rgba(44,95,124,0.06)'),
    gridHard: v('--grid-line-hard', 'rgba(44,95,124,0.10)'),
    gridMajor: v('--grid-line-major', 'rgba(44,95,124,0.17)'),
    border: v('--ink-900', '#1A1814'),
    shadow: 'rgba(26,24,20,0.28)',
    hatch: 'rgba(42,37,32,0.35)',
    moss: v('--moss', '#6B8E5A'),
    ochre: v('--ochre', '#C9A961'),
    brick: v('--brick', '#B85450'),
    blueprint: v('--blueprint', '#2C5F7C'),
    cover: v('--paper-300', '#DCD2BD'),
  };
}

/* ─── Scrawl 스타일 렌더 — 바닥·그림자·해칭·내부 그리드·벽 ───
   ctx는 이미 월드 변환(셀 → px) 상태로 들어온다.
   호출 순서 보장: 배경은 호출측에서 먼저 칠한다. */

export interface RenderOpts {
  CELL: number;
  cols: number;
  rows: number;
  zoomK: number;            // 스크린 px 보정용
  wallM: number;
  hatch: boolean;
  shadow: boolean;
  colors: TdColors;
  doors?: DoorObj[];
  stairs?: StairObj[];
  texts?: TextObj[];
  markers?: MarkerObj[];
  /** 바닥에 클립된 병합 결과 — 구조(잉크 솔리드) / 엄폐(밝은 채움) */
  structHigh?: MultiPoly;
  structLow?: MultiPoly;
  zones?: ZoneObj[];
}

/* 해칭 패턴 캐시 — CELL·색이 같으면 재사용 */
let hatchCache: { key: string; pat: CanvasPattern | null } | null = null;
function hatchPattern(ctx: CanvasRenderingContext2D, CELL: number, color: string): CanvasPattern | null {
  const key = `${CELL}|${color}`;
  if (hatchCache?.key === key) return hatchCache.pat;
  const s = Math.max(6, Math.round(CELL * 0.45));
  const tile = document.createElement('canvas');
  tile.width = s;
  tile.height = s;
  const tc = tile.getContext('2d')!;
  tc.strokeStyle = color;
  tc.lineWidth = 1.1;
  tc.lineCap = 'square';
  tc.beginPath();
  tc.moveTo(-s * 0.25, s * 1.25);
  tc.lineTo(s * 1.25, -s * 0.25);
  tc.moveTo(-s * 0.25, s * 0.25);
  tc.lineTo(s * 0.25, -s * 0.25);
  tc.moveTo(s * 0.75, s * 1.25);
  tc.lineTo(s * 1.25, s * 0.75);
  tc.stroke();
  const pat = ctx.createPattern(tile, 'repeat');
  hatchCache = { key, pat };
  return pat;
}

/** 줌에 따른 부드러운 표시 전환 — a 이하 0, b 이상 1 */
export function gridFade(v: number, a: number, b: number): number {
  return Math.max(0, Math.min(1, (v - a) / (b - a)));
}

/** 기준선 간격 (셀 = m). 도면 관례상 10m마다 한 단계 진한 선 */
export const GRID_MAJOR = 10;

export function renderScrawl(
  ctx: CanvasRenderingContext2D,
  merged: MultiPoly,
  o: RenderOpts,
) {
  const { CELL, colors: c } = o;
  if (merged.length === 0) return;
  const floorPath = multiToPath(merged, CELL);
  // 실척 벽 두께 (월드 고정) — 잉크 선만 화면 최소 두께 하한을 가진다.
  // 그림자·해칭 폭에는 하한을 섞지 않는다 (줌 아웃 시 비대해지는 원인)
  const wallWorld = o.wallM * CELL;   // 1셀 = 1m 고정
  const wallPx = Math.max(wallWorld, 0.9 / o.zoomK);

  // 1. 그림자 — 벽 바깥쪽으로 부드럽게 퍼지는 음영 (바닥 밖에만, 실척 고정)
  if (o.shadow) {
    ctx.save();
    // 바닥 바깥 클립: 큰 사각형 + 바닥 (evenodd)
    const outside = new Path2D();
    outside.rect(-1e5, -1e5, 2e5, 2e5);
    outside.addPath(floorPath);
    ctx.clip(outside, 'evenodd');
    ctx.strokeStyle = c.shadow;
    ctx.lineJoin = 'round';
    ctx.lineWidth = Math.max(wallWorld * 4, CELL * 0.4);
    ctx.stroke(floorPath);
    ctx.restore();
  }

  // 2. 외곽 해칭 — 바닥 밖, 벽 주변 띠만 (해칭 패턴으로 경계를 두껍게 스트로크)
  if (o.hatch) {
    ctx.save();
    const outside = new Path2D();
    outside.rect(-1e5, -1e5, 2e5, 2e5);
    outside.addPath(floorPath);
    ctx.clip(outside, 'evenodd');
    const pat = hatchPattern(ctx, CELL, c.hatch);
    if (pat) {
      ctx.strokeStyle = pat;
      ctx.lineJoin = 'round';
      ctx.lineWidth = CELL * 2.2;   // 벽에서 약 1.1셀 폭의 해칭 띠
      ctx.stroke(floorPath);
    }
    ctx.restore();
  }

  // 3. 바닥 채움
  ctx.fillStyle = c.floor;
  ctx.fill(floorPath, 'evenodd');

  // 4. 바닥 내부 그리드 (클립) — 임계값 팝핑 대신 페이드 인/아웃
  ctx.save();
  ctx.clip(floorPath, 'evenodd');
  const px = o.zoomK * CELL;
  const W = o.cols * CELL, H = o.rows * CELL;
  const lines = (step: number, style: string, width: number) => {
    ctx.strokeStyle = style;
    ctx.lineWidth = width / o.zoomK;
    ctx.beginPath();
    for (let x = 0; x <= o.cols; x += step) { ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, H); }
    for (let y = 0; y <= o.rows; y += step) { ctx.moveTo(0, y * CELL); ctx.lineTo(W, y * CELL); }
    ctx.stroke();
  };
  const a1 = gridFade(px, 3.5, 7);
  if (a1 > 0) { ctx.globalAlpha = a1; lines(1, c.gridSoft, 1); }
  // 10m 기준선 — 바닥 밖 전역 그리드와 같은 위계. 화면 간격(px * 10) 기준이라
  // 1m 격자가 사라진 뒤에도 남아 축척 감각을 유지한다.
  const aM = gridFade(px * GRID_MAJOR, 6, 12);
  if (aM > 0) { ctx.globalAlpha = aM; lines(GRID_MAJOR, c.gridMajor, 1); }
  ctx.globalAlpha = 1;
  ctx.restore();

  // 5. 벽 — 실척 잉크 스트로크
  ctx.strokeStyle = c.wall;
  ctx.lineJoin = 'round';
  ctx.lineWidth = wallPx;
  ctx.stroke(floorPath);

  // 5.5 엄폐(낮은 구조) — 한 단계 어두운 채움 + 가는 잉크 테두리
  if (o.structLow?.length) {
    const p = multiToPath(o.structLow, CELL);
    ctx.fillStyle = c.cover;
    ctx.fill(p, 'evenodd');
    ctx.strokeStyle = c.wall;
    ctx.lineJoin = 'round';
    ctx.lineWidth = Math.max(wallWorld * 0.35, 0.7 / o.zoomK);
    ctx.stroke(p);
  }

  // 5.6 구조(내부 벽·기둥·질량) — 잉크 솔리드, 외벽과 같은 문법
  if (o.structHigh?.length) {
    const p = multiToPath(o.structHigh, CELL);
    ctx.fillStyle = c.wall;
    ctx.fill(p, 'evenodd');
    ctx.strokeStyle = c.wall;
    ctx.lineJoin = 'round';
    ctx.lineWidth = wallPx;
    ctx.stroke(p);
  }

  // 6. 문 — 벽 위 개구부 + 문짝 사각형 (Scrawl 스타일)
  if (o.doors?.length) {
    for (const d of o.doors) drawDoor(ctx, d, o);
  }

  // 7. 계단 — 측면 레일 + 디딤판 가로선
  if (o.stairs?.length) {
    for (const s of o.stairs) drawStair(ctx, s, o);
  }

  // 7.5 구역 채움 — 전투 주석 (바닥에 클립, 반투명)
  if (o.zones?.length) {
    for (const z of o.zones) {
      const clipped = clipToFloor([z.poly] as MultiPoly, merged);
      if (clipped.length === 0) continue;
      const p = multiToPath(clipped, CELL);
      const rgb = ZONE_RGB[z.kind] ?? ZONE_RGB.safe;
      ctx.fillStyle = `rgba(${rgb},0.13)`;
      ctx.fill(p, 'evenodd');
      ctx.strokeStyle = `rgba(${rgb},0.55)`;
      ctx.lineJoin = 'round';
      ctx.lineWidth = 1.5 / o.zoomK;
      ctx.setLineDash([6 / o.zoomK, 4 / o.zoomK]);
      ctx.stroke(p);
      ctx.setLineDash([]);
    }
  }

  // 8. 마커 — 게임플레이·린치 배지
  if (o.markers?.length) {
    for (const m of o.markers) drawMarker(ctx, m, o);
  }

  // 9. 텍스트 라벨 — 손글씨 (도면 최상단)
  if (o.texts?.length) {
    for (const tx of o.texts) drawText(ctx, tx, o);
  }
}

/** 마커 하나 — 색 원판 + 글리프 + (선택) 라벨. 실척 고정 */
export function drawMarker(ctx: CanvasRenderingContext2D, m: MarkerObj, o: RenderOpts) {
  const { CELL, colors: c } = o;
  const def = MARKER_DEFS[m.kind];
  const color = c[def.color] as string;
  const r = MARKER_R * CELL;
  ctx.save();
  ctx.translate(m.x * CELL, m.y * CELL);
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = c.wall;
  ctx.lineWidth = Math.max(0.06 * CELL, 0.8 / o.zoomK);
  ctx.stroke();
  ctx.fillStyle = c.floor;
  ctx.font = `${r * 1.15}px Pretendard, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(def.glyph, 0, r * 0.06);
  if (m.label) {
    ctx.fillStyle = c.wall;
    ctx.font = `600 ${0.9 * CELL}px Pretendard, sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText(m.label, r + 0.3 * CELL, 0);
  }
  ctx.restore();
}

/** 계단 하나 — 진행 방향 양옆 레일 + 0.5셀 간격 디딤판. 실척 고정 */
export function drawStair(ctx: CanvasRenderingContext2D, s: StairObj, o: RenderOpts) {
  const { CELL, colors: c } = o;
  const dx = s.x2 - s.x1, dy = s.y2 - s.y1;
  const len = Math.hypot(dx, dy);
  if (len < 1e-6) return;
  const ux = dx / len, uy = dy / len;
  const nx = -uy, ny = ux;
  const half = (s.w / 2) * CELL;
  const wallWorld = o.wallM * CELL;
  ctx.save();
  ctx.strokeStyle = c.wall;
  ctx.lineCap = 'butt';
  // 디딤판 — 0.5셀 간격, 끝 쪽으로 갈수록 살짝 좁아짐 (올라가는 방향 표현)
  ctx.lineWidth = Math.max(wallWorld * 0.4, 0.6 / o.zoomK);
  ctx.beginPath();
  const stepEvery = 0.5;
  for (let d = 0; d <= len + 1e-6; d += stepEvery) {
    const px = (s.x1 + ux * d) * CELL, py = (s.y1 + uy * d) * CELL;
    const t = d / len;
    const hw = half * (1 - 0.35 * t);
    ctx.moveTo(px + nx * hw, py + ny * hw);
    ctx.lineTo(px - nx * hw, py - ny * hw);
  }
  ctx.stroke();
  // 측면 레일 (테이퍼 따라)
  ctx.lineWidth = Math.max(wallWorld * 0.55, 0.7 / o.zoomK);
  ctx.beginPath();
  for (const sign of [1, -1]) {
    ctx.moveTo((s.x1 + nx * (s.w / 2) * sign) * CELL, (s.y1 + ny * (s.w / 2) * sign) * CELL);
    ctx.lineTo((s.x2 + nx * (s.w / 2) * 0.65 * sign) * CELL, (s.y2 + ny * (s.w / 2) * 0.65 * sign) * CELL);
  }
  ctx.stroke();
  ctx.restore();
}

/** 텍스트 라벨 하나 — Caveat 손글씨, 왼쪽 정렬 (입력창과 동일 기준) */
export function drawText(ctx: CanvasRenderingContext2D, t: TextObj, o: RenderOpts) {
  const { CELL, colors: c } = o;
  ctx.save();
  ctx.fillStyle = c.wall;
  ctx.font = `${t.size * CELL}px Caveat, "Gowun Batang", cursive`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(t.text, t.x * CELL, t.y * CELL);
  ctx.restore();
}

/** 문 하나 그리기 — 벽 스트로크를 덮는 바닥색 사각형 + 잉크 테두리 문짝.
    치수는 전부 실척(월드) 고정 — 줌과 무관 */
export function drawDoor(ctx: CanvasRenderingContext2D, d: DoorObj, o: RenderOpts) {
  const { CELL, colors: c } = o;
  const wallWorld = o.wallM * CELL;
  const lenPx = d.w * CELL;
  const thickPx = Math.max(wallWorld * 2.6, CELL * 0.34);
  ctx.save();
  ctx.translate(d.x * CELL, d.y * CELL);
  ctx.rotate(d.angle);
  ctx.fillStyle = c.floor;
  ctx.strokeStyle = c.wall;
  ctx.lineWidth = Math.max(wallWorld * 0.45, 0.7 / o.zoomK);
  ctx.fillRect(-lenPx / 2, -thickPx / 2, lenPx, thickPx);
  ctx.strokeRect(-lenPx / 2, -thickPx / 2, lenPx, thickPx);
  ctx.restore();
}

/* ─── PNG 렌더/내보내기 ─── */

/** 내보내기 긴 변 (px) — 여백 포함. 정사각 작업 범위면 정확히 이 값의 정사각형이 나온다 */
export const TD_EXPORT_MAX_PX = 2048;

export interface TdRenderOut {
  /** 배경(종이톤)을 칠하지 않는다 — PNG 알파 투명 */
  transparent?: boolean;
  /** 네 모서리에 ㄱ자 경계 표시 */
  cornerMarks?: boolean;
}

/** 평면도 문서를 오프스크린 캔버스에 렌더(그리드·버블 오버레이 제외, 캡션 포함).
 *  PNG 다운로드(exportTopdownPNG)가 사용하는 코어. */
export function renderTopdownCanvas(doc: TopdownDoc, out: TdRenderOut = {}): HTMLCanvasElement {
  const [cols, rows] = doc.grid;
  // 긴 변 = cellPx * (긴쪽 셀 수 + 여백 4셀)이 TD_EXPORT_MAX_PX가 되도록 셀 크기를 역산.
  // 셀 크기를 정수로 고정하지 않아야 출력 크기가 정확히 맞는다
  const pad2 = 4;                                   // 여백 = 좌우 각 2셀
  const cellPx = TD_EXPORT_MAX_PX / (Math.max(cols, rows) + pad2);
  const pad = cellPx * 2;
  const W = Math.round(cols * cellPx + pad * 2);
  const H = Math.round(rows * cellPx + pad * 2);
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext('2d')!;
  const c = readTdColors();

  // 투명 배경이면 종이톤을 깔지 않는다 (바닥 채움은 그대로 불투명하게 남는다)
  if (!out.transparent) {
    ctx.fillStyle = c.paper;
    ctx.fillRect(0, 0, W, H);
  }
  ctx.save();
  ctx.translate(pad, pad);
  const floorMerged = mergeGeo(doc.geo);
  const st = doc.struct ?? [];
  renderScrawl(ctx, floorMerged, {
    CELL: cellPx, cols, rows, zoomK: 1,
    wallM: doc.style.wallM,
    hatch: doc.style.hatch, shadow: doc.style.shadow, colors: c,
    doors: doc.doors, stairs: doc.stairs, texts: doc.texts,
    markers: doc.markers,
    // 구조·엄폐 모두 바닥 밖에도 설 수 있다 (클립 없음)
    structHigh: mergeGeo(st.filter((x) => !x.low)),
    structLow: mergeGeo(st.filter((x) => x.low)),
    zones: doc.zones,
  });
  // 동선 — renderScrawl은 바닥이 비면 조기 반환하므로 바깥에서 얹는다 (숨김이면 제외)
  if (doc.pathVisible !== false) {
    drawStrokes(ctx, doc.strokes ?? [], { CELL: cellPx, zoomK: 1, colors: c });
  }
  ctx.restore();

  ctx.fillStyle = c.border;
  ctx.font = `${Math.max(11, Math.round(cellPx * 0.9))}px "JetBrains Mono", monospace`;
  ctx.textBaseline = 'middle';
  const meters = cols;
  ctx.fillText(
    `${doc.name} — ${cols}×${rows} · 1셀=1m · ${meters}m (${meters * 100}uu) · 벽 ${doc.style.wallM}m`,
    pad, Math.round(pad / 2),
  );

  // 네 모서리 ㄱ자 표시 — 투명 배경에서 도면 범위를 알아볼 수 있게 하는 기준선
  if (out.cornerMarks) {
    const long = Math.max(W, H);
    const inset = Math.round(long * 0.02);
    const arm = Math.round(long * 0.05);
    ctx.strokeStyle = c.border;
    ctx.lineWidth = Math.max(2, Math.round(long * 0.0035));
    ctx.lineCap = 'butt';
    ctx.lineJoin = 'miter';
    const x0 = inset, y0 = inset, x1 = W - inset, y1 = H - inset;
    ctx.beginPath();
    ctx.moveTo(x0, y0 + arm); ctx.lineTo(x0, y0); ctx.lineTo(x0 + arm, y0);
    ctx.moveTo(x1 - arm, y0); ctx.lineTo(x1, y0); ctx.lineTo(x1, y0 + arm);
    ctx.moveTo(x1, y1 - arm); ctx.lineTo(x1, y1); ctx.lineTo(x1 - arm, y1);
    ctx.moveTo(x0 + arm, y1); ctx.lineTo(x0, y1); ctx.lineTo(x0, y1 - arm);
    ctx.stroke();
  }
  return cv;
}

export function exportTopdownPNG(doc: TopdownDoc, filename?: string) {
  const cv = renderTopdownCanvas(doc, { transparent: true, cornerMarks: true });
  cv.toBlob((blob) => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename ?? `${doc.name}.png`;
    a.click();
    URL.revokeObjectURL(url);
  }, 'image/png');
}
