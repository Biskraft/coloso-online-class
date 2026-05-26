/* ─────────────────────────────────────────────────────────
   펜떨림 SVG path 생성기
   - 직선/곡선을 손그림 흔들림으로 변형
   - 결정론적 noise (시드 기반)로 매 렌더 동일 결과
   ───────────────────────────────────────────────────────── */

// 간단한 시드 PRNG (mulberry32)
function mulberry32(seed: number) {
  let a = seed | 0;
  return () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export interface RoughOpts {
  seed: string;
  tremor: number;       // 0 = 직선, 2~4 = 자연스러움, 8+ = 거친
  segments: number;     // 분할 수
  curveStrength?: number; // 곡선의 굽힘 (0=직선, 0.2~0.4 자연)
}

/**
 * 두 점 사이의 펜떨림 곡선 path 생성
 */
export function roughCurve(
  x1: number, y1: number,
  x2: number, y2: number,
  opts: RoughOpts,
): string {
  const { seed, tremor, segments, curveStrength = 0.18 } = opts;
  if (tremor <= 0 && curveStrength <= 0) {
    return `M ${x1} ${y1} L ${x2} ${y2}`;
  }

  const rng = mulberry32(hashString(seed));
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 1) return `M ${x1} ${y1} L ${x2} ${y2}`;

  // 수직 단위 벡터 (떨림 방향)
  const nx = -dy / len;
  const ny = dx / len;

  // 곡선 굽힘 (선의 중간이 한쪽으로 살짝 휘게)
  const bowSign = (rng() - 0.5) * 2;
  const bow = curveStrength * len * 0.15 * bowSign;

  const pts: Array<[number, number]> = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // 기본 직선 + 사인 굽힘
    const baseX = x1 + dx * t;
    const baseY = y1 + dy * t;
    const bowAmt = Math.sin(t * Math.PI) * bow;
    let px = baseX + nx * bowAmt;
    let py = baseY + ny * bowAmt;
    // 끝점은 흔들지 않음
    if (i !== 0 && i !== segments) {
      const wiggle = (rng() - 0.5) * 2 * tremor;
      px += nx * wiggle;
      py += ny * wiggle;
    }
    pts.push([px, py]);
  }

  // 부드러운 곡선으로 잇기 (Catmull-Rom → Bezier)
  return catmullRomToBezier(pts);
}

/**
 * 원/타원의 펜떨림 path 생성
 */
export function roughEllipse(
  cx: number, cy: number,
  rx: number, ry: number,
  opts: RoughOpts,
): string {
  const { seed, tremor, segments } = opts;
  const rng = mulberry32(hashString(seed));
  const pts: Array<[number, number]> = [];
  // 시작 각도 살짝 흔들기
  const startA = rng() * Math.PI * 2;
  const stepN = Math.max(16, segments);
  for (let i = 0; i <= stepN; i++) {
    const t = i / stepN;
    const a = startA + t * Math.PI * 2;
    const wr = tremor > 0 ? (rng() - 0.5) * 2 * tremor : 0;
    const px = cx + Math.cos(a) * (rx + wr);
    const py = cy + Math.sin(a) * (ry + wr);
    pts.push([px, py]);
  }
  return catmullRomToBezier(pts, true);
}

function catmullRomToBezier(
  pts: Array<[number, number]>,
  closed = false,
): string {
  if (pts.length < 2) return '';
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(2)} ${pts[0][1].toFixed(2)}`;

  const get = (i: number): [number, number] => {
    if (closed) return pts[(i + n) % n];
    return pts[Math.max(0, Math.min(n - 1, i))];
  };

  const end = closed ? n : n - 1;
  for (let i = 0; i < end; i++) {
    const p0 = get(i - 1);
    const p1 = get(i);
    const p2 = get(i + 1);
    const p3 = get(i + 2);

    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;

    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`;
  }
  if (closed) d += ' Z';
  return d;
}
