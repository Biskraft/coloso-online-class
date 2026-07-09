import type { PacingDoc, PacingSegment } from '../../types';

export function segmentBounds(segments: PacingSegment[]) {
  const total = segments.reduce((a, s) => a + Math.max(0.25, s.width), 0) || 1;
  let acc = 0;
  return segments.map((s) => {
    const w = Math.max(0.25, s.width) / total;
    const b = { id: s.id, x0: acc, x1: acc + w };
    acc += w;
    return b;
  });
}

export function globalX(segId: string, t: number, segments: PacingSegment[]): number {
  const b = segmentBounds(segments).find((x) => x.id === segId);
  if (!b) return 0;
  return b.x0 + (b.x1 - b.x0) * Math.max(0, Math.min(1, t));
}

export function sortedSamples(doc: PacingDoc) {
  return doc.points
    .map((p) => ({ x: globalX(p.segId, p.t, doc.segments), tension: p.tension }))
    .sort((a, b) => a.x - b.x);
}

// Fritsch–Carlson 모노톤 큐빅 — 오버슈트 없는 부드러운 곡선
export function monotoneCubic(samples: { x: number; tension: number }[]): (x: number) => number {
  const n = samples.length;
  if (n === 0) return () => 50;
  if (n === 1) return () => samples[0].tension;
  const xs = samples.map((s) => s.x), ys = samples.map((s) => s.tension);
  const dx: number[] = [], slope: number[] = [];
  for (let i = 0; i < n - 1; i++) { dx[i] = xs[i + 1] - xs[i] || 1e-6; slope[i] = (ys[i + 1] - ys[i]) / dx[i]; }
  const m: number[] = [slope[0]];
  for (let i = 1; i < n - 1; i++) {
    if (slope[i - 1] * slope[i] <= 0) m[i] = 0;
    else { const w1 = 2 * dx[i] + dx[i - 1], w2 = dx[i] + 2 * dx[i - 1]; m[i] = (w1 + w2) / (w1 / slope[i - 1] + w2 / slope[i]); }
  }
  m[n - 1] = slope[n - 2];
  return (x: number) => {
    if (x <= xs[0]) return ys[0];
    if (x >= xs[n - 1]) return ys[n - 1];
    let i = 0; while (x > xs[i + 1]) i++;
    const h = dx[i], tt = (x - xs[i]) / h;
    const t2 = tt * tt, t3 = t2 * tt;
    const h00 = 2 * t3 - 3 * t2 + 1, h10 = t3 - 2 * t2 + tt, h01 = -2 * t3 + 3 * t2, h11 = t3 - t2;
    return h00 * ys[i] + h10 * h * m[i] + h01 * ys[i + 1] + h11 * h * m[i + 1];
  };
}

export function curvePath(doc: PacingDoc, W: number, H: number, pad: number): string {
  const f = monotoneCubic(sortedSamples(doc));
  const px = (x: number) => pad + x * (W - 2 * pad);
  const py = (tension: number) => H - pad - (tension / 100) * (H - 2 * pad);
  const steps = 120;
  let d = '';
  for (let i = 0; i <= steps; i++) { const x = i / steps; d += (i === 0 ? 'M' : 'L') + px(x).toFixed(1) + ',' + py(f(x)).toFixed(1) + ' '; }
  return d.trim();
}

export function hintForTension(tension: number): { band: '아늑' | '상승' | '간극'; items: string[] } {
  if (tension <= 33) return { band: '아늑', items: ['아늑한 폭', '질서 있는 배치', '둥근 형태', '볕'] };
  if (tension <= 66) return { band: '상승', items: ['폭 좁힘', '천장 낮춤', '뾰족한 형태'] };
  return { band: '간극', items: ['기대 장치', '그걸 끊는 장치(세트)'] };
}
