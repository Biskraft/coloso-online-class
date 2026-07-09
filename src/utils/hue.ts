/* HSL hue rotation — hex → 회전 → hex
   학생별 포트폴리오 색감 차별화용. 채도·명도는 보존하고 색조만 회전. */

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '');
  const v = h.length === 3
    ? h.split('').map((c) => c + c).join('')
    : h;
  return {
    r: parseInt(v.slice(0, 2), 16),
    g: parseInt(v.slice(2, 4), 16),
    b: parseInt(v.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const c = (n: number) => Math.round(Math.max(0, Math.min(255, n))).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = (gn - bn) / d + (gn < bn ? 6 : 0); break;
      case gn: h = (bn - rn) / d + 2; break;
      case bn: h = (rn - gn) / d + 4; break;
    }
    h *= 60;
  }
  return { h, s, l };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const hp = h / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r1 = 0, g1 = 0, b1 = 0;
  if (hp >= 0 && hp < 1) { r1 = c; g1 = x; }
  else if (hp < 2) { r1 = x; g1 = c; }
  else if (hp < 3) { g1 = c; b1 = x; }
  else if (hp < 4) { g1 = x; b1 = c; }
  else if (hp < 5) { r1 = x; b1 = c; }
  else { r1 = c; b1 = x; }
  const m = l - c / 2;
  return { r: (r1 + m) * 255, g: (g1 + m) * 255, b: (b1 + m) * 255 };
}

/**
 * hex 색상의 hue만 deg(°)만큼 회전. 채도/명도는 보존.
 * 회색·검정·흰색(채도 0)은 그대로 반환.
 */
export function shiftHue(hex: string, deg: number): string {
  if (deg === 0) return hex;
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  if (s < 0.04) return hex;
  const nh = ((h + deg) % 360 + 360) % 360;
  const rgb = hslToRgb(nh, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * hex 색상에 hue 회전 + 채도 스케일을 동시 적용.
 * - hueDeg: -180~+180 (deg)
 * - satScale: 0~2 (0=무채색, 1=원본, 2=두 배)
 * 명도는 보존. 채도 0인 회색은 hue 영향 받지 않음.
 */
export function adjustColor(hex: string, hueDeg: number, satScale: number): string {
  if (hueDeg === 0 && satScale === 1) return hex;
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  if (s < 0.04) return hex;
  const nh = ((h + hueDeg) % 360 + 360) % 360;
  const ns = Math.max(0, Math.min(1, s * satScale));
  const rgb = hslToRgb(nh, ns, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}
