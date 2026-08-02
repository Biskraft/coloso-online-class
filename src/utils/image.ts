/* ─────────────────────────────────────────────────────────
   이미지 파일/클립보드 → data URI + 적정 표시 크기 계산
   캔버스 드래그&드롭 / Ctrl+V 붙여넣기에서 공통 사용
   ───────────────────────────────────────────────────────── */

/** 캔버스 초기 배치 시 가장 긴 변의 최대 월드 크기 (과대 이미지 방지) */
export const MAX_IMAGE_DIM = 360;
/** 리사이즈 핸들로 줄일 수 있는 최소 변 크기 */
export const MIN_IMAGE_DIM = 40;
/** 허용 최대 원본 파일 크기 (data URI 폭주 방지) — 12MB */
const MAX_FILE_BYTES = 12 * 1024 * 1024;

export interface SizedImage {
  src: string;     // data URI
  width: number;   // 월드 단위 초기 표시 크기
  height: number;
}

/** data URI를 읽어 원본 픽셀 크기를 구하고 MAX_IMAGE_DIM 기준으로 축소 */
function measure(src: string): Promise<SizedImage> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const nw = img.naturalWidth || 1;
      const nh = img.naturalHeight || 1;
      const longest = Math.max(nw, nh);
      const scale = longest > MAX_IMAGE_DIM ? MAX_IMAGE_DIM / longest : 1;
      resolve({ src, width: Math.round(nw * scale), height: Math.round(nh * scale) });
    };
    img.onerror = () => reject(new Error('이미지를 읽을 수 없습니다'));
    img.src = src;
  });
}

function readAsDataURL(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('파일 읽기 실패'));
    reader.readAsDataURL(file);
  });
}

/** File/Blob(이미지)을 data URI + 적정 크기로 변환. 비이미지/초과 크기는 null */
export async function fileToSizedImage(file: Blob): Promise<SizedImage | null> {
  if (!file.type.startsWith('image/')) return null;
  if (file.size > MAX_FILE_BYTES) {
    throw new Error(`이미지가 너무 큽니다 (최대 ${Math.round(MAX_FILE_BYTES / 1024 / 1024)}MB)`);
  }
  const src = await readAsDataURL(file);
  return measure(src);
}

/* ─── 평면도 배경 이미지 — 실제 비트맵을 줄여 저장 ───
   버블 캔버스와 달리 원본 data URI를 그대로 담으면 localStorage 자동저장이
   조용히 실패한다(saveWorkspace는 예외를 삼킨다). 가져오는 시점에 리샘플한다. */

/** 재인코딩 후 긴 변 최대 픽셀 */
export const TD_IMAGE_MAX_PX = 1400;
/** PNG(투명 보존)로 유지할 수 있는 data URI 상한 — 넘으면 흰 배경 JPEG로 전환 */
const TD_PNG_BUDGET = 900 * 1024;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('이미지를 읽을 수 없습니다'));
    img.src = src;
  });
}

function drawTo(img: HTMLImageElement, w: number, h: number, bg?: string): HTMLCanvasElement {
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext('2d')!;
  if (bg) {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);
  }
  ctx.drawImage(img, 0, 0, w, h);
  return cv;
}

/** File/Blob → 리샘플된 data URI + 픽셀 크기. 비이미지는 null */
export async function fileToTdImage(file: Blob): Promise<{ src: string; w: number; h: number } | null> {
  if (!file.type.startsWith('image/')) return null;
  if (file.size > MAX_FILE_BYTES) {
    throw new Error(`이미지가 너무 큽니다 (최대 ${Math.round(MAX_FILE_BYTES / 1024 / 1024)}MB)`);
  }
  const raw = await readAsDataURL(file);
  const img = await loadImage(raw);
  const nw = img.naturalWidth || 1;
  const nh = img.naturalHeight || 1;
  const longest = Math.max(nw, nh);
  const k = longest > TD_IMAGE_MAX_PX ? TD_IMAGE_MAX_PX / longest : 1;
  const w = Math.max(1, Math.round(nw * k));
  const h = Math.max(1, Math.round(nh * k));
  // 이미 충분히 작고 가벼우면 원본 그대로 (재인코딩 화질 손실 회피)
  if (k === 1 && raw.length <= TD_PNG_BUDGET) return { src: raw, w, h };

  // 투명이 있을 수 있는 포맷은 PNG 우선, 용량을 넘으면 흰 배경 JPEG로 대체
  const mayHaveAlpha = /^image\/(png|gif|webp|svg\+xml)$/.test(file.type);
  if (mayHaveAlpha) {
    const png = drawTo(img, w, h).toDataURL('image/png');
    if (png.length <= TD_PNG_BUDGET) return { src: png, w, h };
  }
  return { src: drawTo(img, w, h, '#FFFFFF').toDataURL('image/jpeg', 0.85), w, h };
}
