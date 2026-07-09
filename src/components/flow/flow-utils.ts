import type { FlowBox, FlowDisc } from '../../types';

/* ─────────────────────────────────────────────────────────
   푸시·풀 벡터장 — week2-02 "Push and Pull"의 지각적 힘 모델
   기류는 항상 +x(왼→오른쪽) 직선. 질량이 밀면 휘고,
   지나가면 차선 복원력으로 다시 직선·제 간격으로 돌아온다.
   질량 3종: 박스(벽) · 기둥(단단한 원, 난류) · 언덕(소프트 반발, 부분 각도)
   ───────────────────────────────────────────────────────── */

export const M = 16;            // 1m → 월드 px

const PAD = 0.6;                // 표면 여유 — 유선이 표면에 달라붙지 않게
const SPLIT = 0.12;             // 정체점 탈출 — 중심선 양쪽 미세 대칭 분기
const HILL_K = 0.5;             // 언덕 — doublet 절반 강도. 정체점이 없어 중앙은 타고 넘는다
const HILL_REACH = 1.8;         // 언덕 압력 표시 범위 = r × REACH (시각화 전용)
const WIND_X = 1, WIND_Y = 0;   // 고정 기류 — +x 직선

export interface Pt { x: number; y: number }

/** 합성 장 — 기류 + 질량별 포텐셜 유동(원기둥 doublet).
    doublet은 전후가 정확히 거울 대칭 — 다가갈 때 벌어지는 곡률과
    지나간 뒤 닫히는 곡률이 같다 (자석 도해와 동일한 모양). */
export function fieldAt(x: number, y: number, boxes: FlowBox[], discs: FlowDisc[]): [number, number] {
  let fx = WIND_X, fy = WIND_Y;

  // 원기둥 doublet — 균일 기류 U(+x) 속 반경 R 원기둥의 교란 성분:
  //   pu = -U·R²(dx²−dy²)/r⁴, pv = -2U·R²·dx·dy/r⁴   (dx→−dx에 대해 거울 대칭)
  const doublet = (dx: number, dy: number, R: number, gain: number) => {
    let r2 = dx * dx + dy * dy;
    if (r2 < R * R) {
      // 내부 — 표면 위 점으로 투영해 평가 (표면 위 장은 접선 방향)
      const s = R / Math.sqrt(Math.max(r2, 1e-9));
      dx *= s; dy *= s; r2 = R * R;
    }
    const r4 = r2 * r2;
    fx += gain * (-(R * R) * (dx * dx - dy * dy)) / r4;
    fy += gain * (-(R * R) * 2 * dx * dy) / r4;
    // 정체점 탈출 — 중심선과 정확히 겹친 유선이 멈추지 않게. 전후 대칭(dx 무관)
    fy += (dy >= 0 ? 1 : -1) * SPLIT * gain * ((R * R) / r2);
  };

  for (const b of boxes) {
    // 가로막는 단면(높이 h)이 등가 반경. 긴 박스는 장축 코어 세그먼트의
    // 최근접점 기준(스타디움) — 회전 시 세그먼트도 함께 돈다
    const R = b.h / 2 + PAD;
    const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
    const half = Math.max(0, b.w / 2 + PAD - R);
    const rot = b.rot ?? 0;
    const ax = Math.cos(rot), ay = Math.sin(rot);
    const t = Math.max(-half, Math.min(half, (x - cx) * ax + (y - cy) * ay));
    doublet(x - (cx + ax * t), y - (cy + ay * t), R, 1);
  }

  for (const c of discs) {
    if (c.kind === 'hill') doublet(x - c.x, y - c.y, c.r, HILL_K);
    else doublet(x - c.x, y - c.y, c.r + 0.4, 1);
  }

  return [fx, fy];
}

/** 박스 로컬 좌표 (중심 원점, 회전 제거) */
export function toLocal(b: FlowBox, x: number, y: number): [number, number] {
  const rot = b.rot ?? 0;
  const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
  const c = Math.cos(rot), s = Math.sin(rot);
  const dx = x - cx, dy = y - cy;
  return [dx * c + dy * s, -dx * s + dy * c];
}

/** 박스 로컬 → 월드 */
export function toWorld(b: FlowBox, lx: number, ly: number): [number, number] {
  const rot = b.rot ?? 0;
  const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
  const c = Math.cos(rot), s = Math.sin(rot);
  return [cx + lx * c - ly * s, cy + lx * s + ly * c];
}

/** 압력(거리장) — 시각화 전용. 질량 표면에 가까울수록 크다 */
export function pressureAt(x: number, y: number, boxes: FlowBox[], discs: FlowDisc[]): number {
  let p = 0;
  for (const b of boxes) {
    const [lx, ly] = toLocal(b, x, y);
    const qx = Math.max(-b.w / 2, Math.min(b.w / 2, lx));
    const qy = Math.max(-b.h / 2, Math.min(b.h / 2, ly));
    const d = Math.hypot(lx - qx, ly - qy);
    p += 1 / ((d + 0.6) * (d + 0.6));
  }
  for (const c of discs) {
    const dc = Math.hypot(x - c.x, y - c.y);
    if (c.kind === 'hill') {
      const reach = c.r * HILL_REACH;
      if (dc < reach) p += 0.9 * (1 - dc / reach);  // 언덕은 완만한 둔덕 모양
      continue;
    }
    const d = Math.max(0, dc - c.r);
    p += 1 / ((d + 0.6) * (d + 0.6));
  }
  return p;
}

/** 유선 — RK2 적분. doublet이 전후 대칭 복귀를 보장하므로
    차선 복원력은 여러 질량 통과 후의 누적 표류만 잡는 약한 값 */
export function streamline(
  sx: number, sy: number,
  boxes: FlowBox[], discs: FlowDisc[], grid: number,
  maxSteps = 900, h = 0.35,
): number[][] {
  const lane = sy;   // 이 선의 차선 = 시작 y
  const localField = (qx: number, qy: number): [number, number] => {
    const f = fieldAt(qx, qy, boxes, discs);
    const fx = f[0];
    let fy = f[1];
    fy += Math.max(-0.35, Math.min(0.35, (lane - qy) * 0.04));
    return [fx, fy];
  };
  const pts: number[][] = [[sx, sy]];
  let x = sx, y = sy;
  for (let i = 0; i < maxSteps; i++) {
    let [fx, fy] = localField(x, y);
    let m = Math.hypot(fx, fy);
    if (m < 0.05) break;
    const mx = x + (fx / m) * (h / 2);
    const my = y + (fy / m) * (h / 2);
    [fx, fy] = localField(mx, my);
    m = Math.hypot(fx, fy);
    if (m < 1e-4) break;
    x += (fx / m) * h;
    y += (fy / m) * h;
    // 박스 관통 보정 — 로컬 좌표에서 가장 가까운 면으로 밀어내기 (회전 대응)
    for (const b of boxes) {
      const [lx, ly] = toLocal(b, x, y);
      const hw = b.w / 2, hh = b.h / 2;
      if (Math.abs(lx) < hw && Math.abs(ly) < hh) {
        const dl = lx + hw, dr = hw - lx, dt = ly + hh, db = hh - ly;
        const md = Math.min(dl, dr, dt, db);
        let nx = lx, ny = ly;
        if (md === dl) nx = -hw - 0.02;
        else if (md === dr) nx = hw + 0.02;
        else if (md === dt) ny = -hh - 0.02;
        else ny = hh + 0.02;
        [x, y] = toWorld(b, nx, ny);
      }
    }
    // 기둥 관통 보정 — 표면 밖으로 (언덕은 표면이 없으므로 통과 허용)
    for (const c of discs) {
      if (c.kind !== 'pillar') continue;
      const dx = x - c.x, dy = y - c.y;
      const dc = Math.hypot(dx, dy);
      if (dc < c.r && dc > 1e-6) {
        x = c.x + (dx / dc) * (c.r + 0.02);
        y = c.y + (dy / dc) * (c.r + 0.02);
      }
    }
    pts.push([x, y]);
    if (x < -2 || y < -2 || x > grid + 1 || y > grid + 2) break;
  }
  return pts;
}

/** 출발선 — 작업 범위 전체 높이를 채우는 수직 띠. 시작 마커는 x 위치만 결정 */
export function seedLine(start: Pt, grid: number, spacing = 1.5): Pt[] {
  const out: Pt[] = [];
  for (let y = 2; y <= grid - 2; y += spacing) {
    out.push({ x: start.x, y });
  }
  return out;
}

/** 박스 픽킹 (m 단위, 회전 대응) */
export function hitFlowBox(x: number, y: number, boxes: FlowBox[]): string | null {
  for (let i = boxes.length - 1; i >= 0; i--) {
    const b = boxes[i]!;
    const [lx, ly] = toLocal(b, x, y);
    if (Math.abs(lx) <= b.w / 2 && Math.abs(ly) <= b.h / 2) return b.id;
  }
  return null;
}

/** 디스크(기둥·언덕) 픽킹 (m 단위) */
export function hitFlowDisc(x: number, y: number, discs: FlowDisc[]): string | null {
  for (let i = discs.length - 1; i >= 0; i--) {
    const c = discs[i]!;
    if (Math.hypot(x - c.x, y - c.y) <= c.r + 0.4) return c.id;
  }
  return null;
}
