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
