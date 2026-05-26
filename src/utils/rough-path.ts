/* ─────────────────────────────────────────────────────────
   펜떨림 SVG path 생성기 (개선판)
   - 2회 겹친 스트로크로 진짜 손그림 느낌
   - 저주파 드리프트 + 고주파 떨림 다층 합성
   - 양 끝점 앵커링 (sin 마스크)
   - 곡선 휨(bowing) — 패스마다 반대 방향
   - 결정론적 (시드 기반) — 매 렌더 동일 결과
   ───────────────────────────────────────────────────────── */

// 시드 PRNG (mulberry32)
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

/**
 * 부드러운 1D 노이즈 — 위상 무작위 사인 3개 합성
 * Perlin/Simplex 풀 구현 없이 자연스러운 결과
 */
function smoothNoise(rng: () => number, baseFreq: number): (t: number) => number {
  const w1 = 0.6 + rng() * 1.4;
  const w2 = 2.0 + rng() * 2.0;
  const w3 = 4.0 + rng() * 3.0;
  const p1 = rng() * Math.PI * 2;
  const p2 = rng() * Math.PI * 2;
  const p3 = rng() * Math.PI * 2;
  return (t: number) =>
    Math.sin(t * w1 * Math.PI * 2 * baseFreq + p1) * 0.60 +
    Math.sin(t * w2 * Math.PI * 2 * baseFreq + p2) * 0.30 +
    Math.sin(t * w3 * Math.PI * 2 * baseFreq + p3) * 0.15;
}

/** 부드럽게 시작·끝나는 0→1→0 마스크 (사인 hill) */
const anchorMask = (t: number) => Math.sin(t * Math.PI);

/**
 * 포인트 배열 → quadratic 부드러운 path
 * (Catmull-Rom 풀 평활화는 손그림감을 죽이므로 quadratic 적당함)
 */
function pointsToPath(pts: ReadonlyArray<readonly [number, number]>): string {
  if (pts.length < 2) return '';
  const f = (n: number) => n.toFixed(2);
  let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
  if (pts.length === 2) {
    d += ` L ${f(pts[1][0])} ${f(pts[1][1])}`;
    return d;
  }
  // 첫 세그먼트는 L
  d += ` L ${f((pts[0][0] + pts[1][0]) / 2)} ${f((pts[0][1] + pts[1][1]) / 2)}`;
  // 중간은 control point=현재 점, end=다음 점과의 중간
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2;
    const my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q ${f(pts[i][0])} ${f(pts[i][1])}, ${f(mx)} ${f(my)}`;
  }
  // 마지막은 L
  const last = pts[pts.length - 1];
  d += ` L ${f(last[0])} ${f(last[1])}`;
  return d;
}

export interface RoughOpts {
  seed: string;
  /** 떨림 진폭 (px). 권장 0.8~2.0. 0이면 직선 */
  roughness?: number;
  /** 곡선 휨 정도. 권장 0.4~1.0 */
  bowing?: number;
  /** 패스 수 (1~2 권장). 기본 2 */
  passes?: number;
}

/**
 * 두 점 사이 펜떨림 곡선 — 2회 겹친 스트로크 배열 반환
 */
export function roughLine(
  x1: number, y1: number,
  x2: number, y2: number,
  opts: RoughOpts,
): string[] {
  const roughness = opts.roughness ?? 1.4;
  const bowing = opts.bowing ?? 0.7;
  const passes = opts.passes ?? 2;
  if (roughness <= 0 && bowing <= 0) {
    return [`M ${x1} ${y1} L ${x2} ${y2}`];
  }

  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len < 0.5) return [`M ${x1} ${y1} L ${x2} ${y2}`];

  const ux = dx / len;
  const uy = dy / len;
  // 수직 단위벡터 (떨림 방향)
  const px = -uy;
  const py = ux;

  // 세그먼트 — 길이에 비례 (12px/seg), 최소 8
  const segments = Math.max(8, Math.min(48, Math.floor(len / 12)));

  return Array.from({ length: passes }, (_, passIdx) => {
    const rng = mulberry32(hashString(`${opts.seed}|L|${passIdx}`));
    // 두 패스는 반대 방향으로 휨 → 손그림 특유의 겹침
    const bowSign = passIdx % 2 === 0 ? 1 : -1;
    // 휨 진폭: 길이 비례 (너무 긴 선은 캡)
    const bowAmp = bowing * Math.min(len, 200) * 0.04 * bowSign * (0.7 + rng() * 0.6);

    // 끝점 살짝 흔들기 (각 패스마다 다르게)
    const startOff = (rng() - 0.5) * roughness * 0.8;
    const endOff = (rng() - 0.5) * roughness * 0.8;

    // 노이즈 함수 2개 (저주파 + 고주파)
    const nLow = smoothNoise(rng, 0.7);
    const nHigh = smoothNoise(rng, 2.2);

    const pts: Array<[number, number]> = [];
    // 시작점 (살짝 어긋남)
    pts.push([x1 + px * startOff, y1 + py * startOff]);
    // 중간점들
    for (let i = 1; i < segments; i++) {
      const t = i / segments;
      const mask = anchorMask(t);
      // 휨(저주파) + 떨림(고주파) 모두 mask로 양 끝 0 수렴
      const bow = bowAmp * mask;
      const wobble = (nLow(t) * 0.65 + nHigh(t) * 0.35) * roughness * mask;
      const total = bow + wobble;
      const bx = x1 + dx * t;
      const by = y1 + dy * t;
      pts.push([bx + px * total, by + py * total]);
    }
    // 끝점
    pts.push([x2 + px * endOff, y2 + py * endOff]);

    return pointsToPath(pts);
  });
}

/**
 * 타원/원의 펜떨림 path — 2회 겹친 스트로크
 * 각 패스는 시작각이 다르고 살짝 over/undershoot — 손으로 그린 원의 특유 어긋남
 */
export function roughEllipse(
  cx: number, cy: number,
  rx: number, ry: number,
  opts: RoughOpts,
): string[] {
  const roughness = opts.roughness ?? 1.2;
  const passes = opts.passes ?? 2;

  // 둘레 비례 세그먼트 (최소 20)
  const circumf = Math.PI * (3 * (rx + ry) - Math.sqrt((3 * rx + ry) * (rx + 3 * ry)));
  const segments = Math.max(20, Math.min(64, Math.floor(circumf / 10)));

  return Array.from({ length: passes }, (_, passIdx) => {
    const rng = mulberry32(hashString(`${opts.seed}|E|${passIdx}`));

    // 각 패스의 시작각 다르게 (펜이 다른 위치에서 시작)
    const startA = (passIdx * 0.35 + rng() * 0.6) * Math.PI;
    // 살짝 미달/초과 — 끝이 시작과 정확히 안 만남
    const undershoot = -(0.05 + rng() * 0.12);
    const overshoot = 0.08 + rng() * 0.18;
    const sweep = Math.PI * 2 + overshoot - undershoot;

    // 노이즈 (반지름 방향 떨림)
    const nLow = smoothNoise(rng, 0.8);
    const nHigh = smoothNoise(rng, 2.5);

    // 살짝 다른 베이스 반지름 (패스별로)
    const rxJitter = 1 + (rng() - 0.5) * 0.025;
    const ryJitter = 1 + (rng() - 0.5) * 0.025;
    // 살짝 다른 중심 (1px 내외)
    const cxJitter = (rng() - 0.5) * 0.6;
    const cyJitter = (rng() - 0.5) * 0.6;

    const pts: Array<[number, number]> = [];
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const a = startA + undershoot + sweep * t;
      const wobble = (nLow(t) * 0.7 + nHigh(t) * 0.3) * roughness;
      const r1 = rx * rxJitter + wobble;
      const r2 = ry * ryJitter + wobble;
      pts.push([
        cx + cxJitter + Math.cos(a) * r1,
        cy + cyJitter + Math.sin(a) * r2,
      ]);
    }
    return pointsToPath(pts);
  });
}

/** 호환: 단일 path 반환 헬퍼 (한 패스로 줄이고 싶을 때) */
export function roughCurve(
  x1: number, y1: number,
  x2: number, y2: number,
  opts: RoughOpts,
): string {
  return roughLine(x1, y1, x2, y2, { ...opts, passes: 1 })[0];
}
