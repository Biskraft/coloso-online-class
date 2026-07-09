/* favicon 변형 자동 생성 — public/bisk-logo.png → 다중 사이즈
   사용: node scripts/gen-favicons.mjs */
import sharp from 'sharp';
import { mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const SRC = resolve(root, 'public/bisk-logo.png');
const OUT = resolve(root, 'public');

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const SIZES = [
  { name: 'favicon-32.png',  size: 32 },
  { name: 'favicon-64.png',  size: 64 },
  { name: 'favicon-180.png', size: 180 }, // apple-touch-icon
  { name: 'favicon-192.png', size: 192 }, // android / pwa
  { name: 'favicon-512.png', size: 512 }, // 공유 카드용
];

const OG_NAME = 'og-card.png'; // 1200x630 OpenGraph 카드

await Promise.all(SIZES.map(async ({ name, size }) => {
  await sharp(SRC)
    .resize(size, size, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(resolve(OUT, name));
  console.log(`✓ ${name} (${size}×${size})`);
}));

/* OpenGraph 카드 — 1200×630에 검정 배경 + 중앙 로고 + 텍스트 */
const ogW = 1200, ogH = 630;
const logoSize = 360;
const logoBuf = await sharp(SRC)
  .resize(logoSize, logoSize, { fit: 'cover' })
  .png()
  .toBuffer();

const svgOverlay = Buffer.from(`<svg width="${ogW}" height="${ogH}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .title { font-family: 'JetBrains Mono','Consolas',monospace; font-weight: 700; fill: #F4EFE6; }
    .sub   { font-family: 'JetBrains Mono','Consolas',monospace; font-weight: 500; fill: #E8C552; letter-spacing: 6px; }
    .domain { font-family: 'JetBrains Mono','Consolas',monospace; font-weight: 500; fill: #C9C4B8; letter-spacing: 4px; }
  </style>
  <text x="640" y="240" font-size="68" class="title">버블 아틀리에</text>
  <text x="640" y="296" font-size="20" class="sub">BUBBLE ATELIER · LEVEL DESIGN</text>
  <text x="640" y="430" font-size="22" class="domain">BISK · bisk.kr</text>
</svg>`);

await sharp({
  create: { width: ogW, height: ogH, channels: 4, background: { r: 14, g: 14, b: 14, alpha: 1 } },
})
  .composite([
    { input: logoBuf, top: Math.round((ogH - logoSize) / 2), left: 140 },
    { input: svgOverlay, top: 0, left: 0 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(resolve(OUT, OG_NAME));
console.log(`✓ ${OG_NAME} (${ogW}×${ogH} OpenGraph 카드)`);
