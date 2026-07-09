import type { MassingBlock, MassingDoc } from '../../types';

/* ─────────────────────────────────────────────────────────
   아이소 매싱 유틸 — 3D 엔진 없이 Canvas2D 등각 투영
   축 정렬 박스만 다루므로 면 3개(상·좌·우)와
   (x+y, z) 페인터 정렬로 가림이 안정적으로 풀린다
   ───────────────────────────────────────────────────────── */

export const TILE = 16;    // 1m → 등각 가로 반폭 (월드 px)
export const TILE_Z = 14;  // 1m 높이 → 화면 상승 (월드 px)

/** 그리드 좌표(x,y,z) → 등각 월드 px */
export function isoPt(x: number, y: number, z: number): [number, number] {
  return [(x - y) * TILE, (x + y) * (TILE / 2) - z * TILE_Z];
}

/** 등각 월드 px → 바닥(z=0) 그리드 좌표 */
export function groundAt(sx: number, sy: number): [number, number] {
  const a = sx / TILE;
  const b = sy / (TILE / 2);
  return [(a + b) / 2, (b - a) / 2];
}

/* ─── 명도 4단 팔레트 — Value Differentiation. [상, 좌(전면), 우(측면)] ─── */
export const TONES: [string, string, string][] = [
  ['#FAF6EE', '#E3DCCB', '#CDC4AE'],   // 0 밝음
  ['#E9E2D2', '#D2C9B4', '#B9AE95'],   // 1 기본
  ['#CFC6B2', '#B6AB93', '#9C9078'],   // 2
  ['#A89D85', '#8F846D', '#766C58'],   // 3 어두움
];
const OUTLINE = '#1A1814';

export interface BlockFaces {
  top: [number, number][];
  left: [number, number][];    // 전면 (y+d 쪽)
  right: [number, number][];   // 측면 (x+w 쪽)
}

/** 블록의 가시 면 3개 — 등각 월드 px 폴리곤 */
export function blockFaces(b: MassingBlock): BlockFaces {
  const { x, y, z, w, d, h } = b;
  const zt = z + h;
  return {
    top: [isoPt(x, y, zt), isoPt(x + w, y, zt), isoPt(x + w, y + d, zt), isoPt(x, y + d, zt)],
    left: [isoPt(x, y + d, z), isoPt(x + w, y + d, z), isoPt(x + w, y + d, zt), isoPt(x, y + d, zt)],
    right: [isoPt(x + w, y, z), isoPt(x + w, y + d, z), isoPt(x + w, y + d, zt), isoPt(x + w, y, zt)],
  };
}

/* ─── 페인터 정렬 — 분리축 기반 위상 정렬 ───
   중심점 키 정렬은 벽판처럼 길쭉한 박스에서 깨진다.
   축 정렬 박스 둘은 어느 한 축에서 완전히 분리되면 앞뒤가 확정된다:
   카메라가 +x·+y·+z 쪽이므로 그 축의 카메라 쪽 박스가 앞.
   화면 bbox가 겹치는 쌍만 비교해 위상 정렬 — 수동 레이어 조정 불필요. */

const EPS = 1e-6;

/** a가 b보다 앞인가(나중에 그려야 하나).
    부피가 겹치면(벽 중심 정렬로 인한 0.125m 관통 등) 가장 얕게 겹친 축에서
    카메라(+) 쪽 중심을 가진 박스를 앞으로 — 살짝 박힌 블록이 기대대로 보인다 */
function inFront(a: MassingBlock, b: MassingBlock): boolean {
  if (a.x >= b.x + b.w - EPS) return true;
  if (b.x >= a.x + a.w - EPS) return false;
  if (a.y >= b.y + b.d - EPS) return true;
  if (b.y >= a.y + a.d - EPS) return false;
  if (a.z >= b.z + b.h - EPS) return true;
  if (b.z >= a.z + a.h - EPS) return false;
  // 관통 — 최소 겹침 축 기준 판정
  const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
  const oy = Math.min(a.y + a.d, b.y + b.d) - Math.max(a.y, b.y);
  const oz = Math.min(a.z + a.h, b.z + b.h) - Math.max(a.z, b.z);
  if (ox <= oy && ox <= oz) return a.x + a.w / 2 > b.x + b.w / 2;
  if (oy <= oz) return a.y + a.d / 2 > b.y + b.d / 2;
  return a.z + a.h / 2 > b.z + b.h / 2;
}

/* ─── 4방향 카메라 회전 — 정사각 그리드 90° 좌표 치환 ───
   렌더·픽킹은 뷰 좌표에서, 저장은 원좌표에서. */

/** 블록을 시계 방향 k회 회전 (N = 그리드 한 변) */
export function rotBlockN(b: MassingBlock, k: number, N: number): MassingBlock {
  let r = b;
  const n = ((k % 4) + 4) % 4;
  for (let i = 0; i < n; i++) {
    r = { ...r, x: r.y, y: N - r.x - r.w, w: r.d, d: r.w };
  }
  return r;
}

/** 벡터를 시계 방향 k회 회전 */
export function rotVecN(dx: number, dy: number, k: number): [number, number] {
  const n = ((k % 4) + 4) % 4;
  for (let i = 0; i < n; i++) {
    const t = dx;
    dx = dy;
    dy = -t;
  }
  return [dx, dy];
}

/** dir 회전의 역방향 횟수 */
export const invDir = (k: number) => (4 - (k % 4)) % 4;

/** 등각 화면 bbox — 마퀴 선택·정렬 프루닝 공용 */
export function screenBBox(b: MassingBlock) {
  return {
    x0: (b.x - (b.y + b.d)) * TILE,
    x1: (b.x + b.w - b.y) * TILE,
    y0: (b.x + b.y) * (TILE / 2) - (b.z + b.h) * TILE_Z,
    y1: (b.x + b.w + b.y + b.d) * (TILE / 2) - b.z * TILE_Z,
  };
}

const fallbackKey = (b: MassingBlock) => b.x + b.w / 2 + b.y + b.d / 2 + (b.z + b.h / 2) * 0.001;

const orderCache = new WeakMap<MassingBlock[], MassingBlock[]>();

export function paintOrder(blocks: MassingBlock[]): MassingBlock[] {
  const cached = orderCache.get(blocks);
  if (cached) return cached;

  const n = blocks.length;
  const bbs = blocks.map(screenBBox);
  const after: number[][] = Array.from({ length: n }, () => []);   // edge b→a: b 먼저
  const indeg = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const A = bbs[i]!, B = bbs[j]!;
      if (A.x1 <= B.x0 || B.x1 <= A.x0 || A.y1 <= B.y0 || B.y1 <= A.y0) continue;
      if (inFront(blocks[i]!, blocks[j]!)) { after[j]!.push(i); indeg[i]++; }
      else { after[i]!.push(j); indeg[j]++; }
    }
  }
  // Kahn — 동률은 기존 키 순으로 안정화
  const ready: number[] = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) ready.push(i);
  const pick = () => {
    let best = 0;
    for (let k = 1; k < ready.length; k++) {
      if (fallbackKey(blocks[ready[k]!]!) < fallbackKey(blocks[ready[best]!]!)) best = k;
    }
    return ready.splice(best, 1)[0]!;
  };
  const out: MassingBlock[] = [];
  const done = new Array(n).fill(false);
  while (ready.length) {
    const i = pick();
    done[i] = true;
    out.push(blocks[i]!);
    for (const j of after[i]!) {
      if (--indeg[j] === 0) ready.push(j);
    }
  }
  // 순환(상호 관통 박스) 잔여 — 키 순으로 덧붙임
  if (out.length < n) {
    const rest = blocks.filter((_, i) => !done[i]).sort((a, b) => fallbackKey(a) - fallbackKey(b));
    out.push(...rest);
  }
  orderCache.set(blocks, out);
  return out;
}

function poly(ctx: CanvasRenderingContext2D, pts: [number, number][]) {
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
}

function pointInPoly(px: number, py: number, pts: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i]!;
    const [xj, yj] = pts[j]!;
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** 화면(월드 px) 좌표로 블록 픽킹 — 그리는 순서의 역순(앞부터) */
export function hitBlock(sx: number, sy: number, blocks: MassingBlock[]): string | null {
  const ordered = paintOrder(blocks);
  for (let i = ordered.length - 1; i >= 0; i--) {
    const b = ordered[i]!;
    const f = blockFaces(b);
    if (pointInPoly(sx, sy, f.top) || pointInPoly(sx, sy, f.left) || pointInPoly(sx, sy, f.right)) {
      return b.id;
    }
  }
  return null;
}

export interface MassingRenderOpts {
  zoomK: number;
  gridAlpha: number;       // 바닥 그리드 페이드 (0~1)
  selIds?: string[];
  previewBlock?: MassingBlock | null;
}

/** 바닥 그리드 + 블록 렌더. ctx는 이미 월드 변환 상태 */
export function renderMassing(
  ctx: CanvasRenderingContext2D,
  doc: MassingDoc,
  o: MassingRenderOpts,
) {
  const [cols, rows] = doc.grid;

  // 1. 바닥 그리드 (마름모)
  if (o.gridAlpha > 0) {
    ctx.save();
    ctx.globalAlpha = o.gridAlpha;
    ctx.strokeStyle = 'rgba(44,95,124,0.10)';
    ctx.lineWidth = 1 / o.zoomK;
    ctx.beginPath();
    for (let x = 0; x <= cols; x++) {
      const [ax, ay] = isoPt(x, 0, 0);
      const [bx, by] = isoPt(x, rows, 0);
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
    }
    for (let y = 0; y <= rows; y++) {
      const [ax, ay] = isoPt(0, y, 0);
      const [bx, by] = isoPt(cols, y, 0);
      ctx.moveTo(ax, ay);
      ctx.lineTo(bx, by);
    }
    ctx.stroke();
    ctx.restore();
  }
  // 작업 범위 외곽선
  ctx.strokeStyle = 'rgba(44,95,124,0.22)';
  ctx.lineWidth = 1.4 / o.zoomK;
  poly(ctx, [isoPt(0, 0, 0), isoPt(cols, 0, 0), isoPt(cols, rows, 0), isoPt(0, rows, 0)]);
  ctx.stroke();

  // 2. 블록 — 페인터 순서로 면 3개
  const sel = new Set(o.selIds ?? []);
  const list = paintOrder(doc.blocks);
  for (const b of list) drawBlock(ctx, b, o.zoomK, false);
  // 선택 외곽 — 본체 위에 다시
  for (const b of list) if (sel.has(b.id)) drawBlock(ctx, b, o.zoomK, true);

  // 3. 진행 중 미리보기
  if (o.previewBlock) {
    ctx.save();
    ctx.globalAlpha = 0.55;
    drawBlock(ctx, o.previewBlock, o.zoomK, false);
    ctx.restore();
    drawBlock(ctx, o.previewBlock, o.zoomK, true);
  }
}

function drawBlock(ctx: CanvasRenderingContext2D, b: MassingBlock, zoomK: number, selOnly: boolean) {
  const f = blockFaces(b);
  if (selOnly) {
    ctx.save();
    ctx.strokeStyle = 'rgba(44,95,124,0.95)';
    ctx.lineWidth = 1.8 / zoomK;
    ctx.setLineDash([6 / zoomK, 4 / zoomK]);
    // 가시 실루엣: 상단 A→B, 우측 모서리 내려와 E→F, 전면 바닥 F→G, 좌측 올라가 G→D→A
    poly(ctx, [f.top[0], f.top[1], f.right[0], f.right[1], f.left[0], f.top[3]] as [number, number][]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    return;
  }
  const tone = TONES[Math.max(0, Math.min(3, b.tone ?? 1))]!;
  ctx.lineJoin = 'round';
  ctx.lineWidth = 1.1 / zoomK;
  ctx.strokeStyle = OUTLINE;
  ctx.fillStyle = tone[0];
  poly(ctx, f.top);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = tone[1];
  poly(ctx, f.left);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = tone[2];
  poly(ctx, f.right);
  ctx.fill();
  ctx.stroke();
}

/** 씬 경계 (월드 px) — 핏/팬 클램프용. 바닥 마름모 + 최고 높이 여유 */
export function sceneBounds(doc: MassingDoc) {
  const [cols, rows] = doc.grid;
  const maxH = Math.max(6, ...doc.blocks.map((b) => b.z + b.h));
  return {
    minX: -rows * TILE,
    maxX: cols * TILE,
    minY: -maxH * TILE_Z,
    maxY: (cols + rows) * (TILE / 2),
  };
}
