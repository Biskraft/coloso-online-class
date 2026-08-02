import { test, expect } from '@playwright/test';

/* 평면도 배경 참조 이미지 — 드롭 배치 / 이동 / 크기 / 회전 */

const CELL = 16;
const GRID = 256;              // 기본 작업 범위 (셀)
const FIT_MARGIN = 48;

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');
});

async function readTopdown(page: any) {
  const raw = await page.evaluate(() => localStorage.getItem('bubble-atelier::workspace'));
  return JSON.parse(raw).projects[0].topdowns[0];
}

async function readImages(page: any) {
  return (await readTopdown(page)).images ?? [];
}

/** 캔버스 진입 직후의 화면 맞춤 변환 — 컴포넌트의 fit 계산과 동일 */
function projector(box: { x: number; y: number; width: number; height: number }) {
  const W = GRID * CELL, H = GRID * CELL;
  const k = Math.max(0.02, Math.min(12, Math.min(
    (box.width - FIT_MARGIN * 2) / W,
    (box.height - FIT_MARGIN * 2) / H,
  )));
  const tx = (box.width - W * k) / 2, ty = (box.height - H * k) / 2;
  const S = (wx: number, wy: number) => ({
    x: box.x + tx + wx * CELL * k,
    y: box.y + ty + wy * CELL * k,
  });
  /** 회전 손잡이가 위 변에서 떨어진 거리 (셀) — 컴포넌트의 KNOB_PX / k / CELL */
  S.knobCells = 24 / k / CELL;
  return S;
}

/** 400×300 단색 PNG 파일을 만들어 캔버스에 드롭 */
async function dropImage(page: any, canvas: any, at: { x: number; y: number }) {
  const dt = await page.evaluateHandle(async () => {
    const cv = document.createElement('canvas');
    cv.width = 400;
    cv.height = 300;
    const ctx = cv.getContext('2d')!;
    ctx.fillStyle = '#B85450';
    ctx.fillRect(0, 0, 400, 300);
    const blob: Blob = await new Promise((r) => cv.toBlob((b) => r(b!), 'image/png'));
    const dtr = new DataTransfer();
    dtr.items.add(new File([blob], 'ref.png', { type: 'image/png' }));
    return dtr;
  });
  await canvas.dispatchEvent('drop', { dataTransfer: dt, clientX: at.x, clientY: at.y });
}

test('드롭 → 배경 이미지 배치 + 자동저장', async ({ page }) => {
  await page.locator('[data-testid="enter-topdown"]').click();
  const canvas = page.locator('[data-testid="topdown-canvas"]');
  const box = (await canvas.boundingBox())!;
  const S = projector(box);

  await dropImage(page, canvas, S(128, 128));
  await page.waitForTimeout(900);

  const images = await readImages(page);
  expect(images.length).toBe(1);
  const im = images[0];
  // 긴 변 = 작업 범위의 25% = 64m, 원본 4:3이므로 48m
  expect(im.w).toBeCloseTo(64, 1);
  expect(im.h).toBeCloseTo(48, 1);
  expect(im.rot).toBe(0);
  expect(im.x).toBeCloseTo(128, 0);
  expect(im.y).toBeCloseTo(128, 0);
  expect(im.src.startsWith('data:image/')).toBe(true);

  // Esc(선택 해제) → Esc(버블 복귀) → 재진입해도 유지
  await page.keyboard.press('Escape');
  await page.keyboard.press('Escape');
  await expect(page.locator('.canvas-shell')).toBeVisible();
  await page.locator('[data-testid="enter-topdown"]').click();
  await page.waitForTimeout(500);
  expect((await readImages(page)).length).toBe(1);
});

test('선택 → 이동 / 모서리 크기 / 손잡이 회전', async ({ page }) => {
  await page.locator('[data-testid="enter-topdown"]').click();
  const canvas = page.locator('[data-testid="topdown-canvas"]');
  const box = (await canvas.boundingBox())!;
  const S = projector(box);

  await dropImage(page, canvas, S(128, 128));
  await page.waitForTimeout(900);

  // ── 이동 — 선택 도구로 이미지 중심을 잡고 +12셀 ──
  await page.keyboard.press('v');
  const from = S(128, 128), to = S(140, 134);
  await page.mouse.move(from.x, from.y);
  await page.mouse.down();
  await page.mouse.move(to.x, to.y, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(700);

  let im = (await readImages(page))[0];
  expect(im.x).toBeCloseTo(140, 0);
  expect(im.y).toBeCloseTo(134, 0);
  expect(im.w).toBeCloseTo(64, 1);   // 이동은 크기를 바꾸지 않는다

  // ── 크기 — 우하단 모서리(x+32, y+24)를 바깥으로 ──
  const c0 = S(im.x + im.w / 2, im.y + im.h / 2);
  const c1 = S(im.x + im.w / 2 + 16, im.y + im.h / 2 + 12);
  await page.mouse.move(c0.x, c0.y);
  await page.mouse.down();
  await page.mouse.move(c1.x, c1.y, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(700);

  const scaled = (await readImages(page))[0];
  expect(scaled.w).toBeCloseTo(80, 0);
  expect(scaled.h).toBeCloseTo(60, 0);
  expect(scaled.rot).toBe(0);

  // ── 회전 — 위 변 중앙 위의 손잡이를 오른쪽으로 끌어 90° ──
  const cxw = scaled.x, cyw = scaled.y;
  const knob = S(cxw, cyw - scaled.h / 2 - S.knobCells);
  const right = S(cxw + 40, cyw);
  await page.mouse.move(knob.x, knob.y);
  await page.mouse.down();
  await page.mouse.move(right.x, right.y, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(700);

  const rotated = (await readImages(page))[0];
  expect(Math.abs(rotated.rot)).toBeCloseTo(Math.PI / 2, 2);
  // 회전은 중심과 실측 크기를 보존한다
  expect(rotated.x).toBeCloseTo(cxw, 0);
  expect(rotated.y).toBeCloseTo(cyw, 0);
  expect(rotated.w).toBeCloseTo(80, 0);
  expect(rotated.h).toBeCloseTo(60, 0);
});

test('Ctrl+V — 클립보드 이미지를 커서 자리에 배치', async ({ page }) => {
  await page.locator('[data-testid="enter-topdown"]').click();
  const canvas = page.locator('[data-testid="topdown-canvas"]');
  const box = (await canvas.boundingBox())!;
  const S = projector(box);

  // 커서를 (100, 90)에 올려둔다 — 붙여넣기 위치 기준
  const at = S(100, 90);
  await page.mouse.move(at.x, at.y);
  await page.waitForTimeout(150);

  // 클립보드 이미지가 담긴 paste 이벤트를 발생
  await page.evaluate(async () => {
    const cv = document.createElement('canvas');
    cv.width = 400;
    cv.height = 300;
    const c = cv.getContext('2d')!;
    c.fillStyle = '#2C5F7C';
    c.fillRect(0, 0, 400, 300);
    const blob: Blob = await new Promise((r) => cv.toBlob((b) => r(b!), 'image/png'));
    const dt = new DataTransfer();
    dt.items.add(new File([blob], 'clip.png', { type: 'image/png' }));
    window.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
  });
  await page.waitForTimeout(900);

  const images = await readImages(page);
  expect(images.length).toBe(1);
  expect(images[0].w).toBeCloseTo(64, 1);
  expect(images[0].x).toBeCloseTo(100, 0);
  expect(images[0].y).toBeCloseTo(90, 0);
});

test('Ctrl+V — 이미지가 없으면 도형 클립보드가 붙는다 (기존 동작 보존)', async ({ page }) => {
  await page.locator('[data-testid="enter-topdown"]').click();
  const canvas = page.locator('[data-testid="topdown-canvas"]');
  const box = (await canvas.boundingBox())!;
  const S = projector(box);

  // 방 하나 그리고 복사
  const a = S(100, 100), b = S(120, 115);
  await page.mouse.move(a.x, a.y);
  await page.mouse.down();
  await page.mouse.move(b.x, b.y, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(500);

  await page.keyboard.press('v');
  await page.mouse.click(S(110, 107).x, S(110, 107).y);
  await page.keyboard.press('Control+c');

  // 빈 클립보드 paste — 도형이 복제되어야 한다
  await page.evaluate(() => {
    window.dispatchEvent(new ClipboardEvent('paste', {
      clipboardData: new DataTransfer(), bubbles: true, cancelable: true,
    }));
  });
  await page.waitForTimeout(700);

  const raw = await page.evaluate(() => localStorage.getItem('bubble-atelier::workspace'));
  const td = JSON.parse(raw!).projects[0].topdowns[0];
  expect(td.geo.length).toBe(2);
  expect((td.images ?? []).length).toBe(0);
});

test('클립보드에 이미지가 있어도 도형 Ctrl+C/V가 우선한다', async ({ page }) => {
  await page.locator('[data-testid="enter-topdown"]').click();
  const canvas = page.locator('[data-testid="topdown-canvas"]');
  const box = (await canvas.boundingBox())!;
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;

  // 방 하나 → 선택 → 복사
  await page.mouse.move(cx - 100, cy - 70);
  await page.mouse.down();
  await page.mouse.move(cx + 60, cy + 50, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(400);
  await page.locator('.td-tool', { hasText: '선택' }).click();
  await page.mouse.click(cx - 20, cy - 10);
  await page.keyboard.press('Control+c');
  await page.waitForTimeout(200);

  // 스크린샷을 찍어 시스템 클립보드에 이미지가 있는 상황
  const withImage = () => page.evaluate(async () => {
    const cv = document.createElement('canvas');
    cv.width = 200; cv.height = 150;
    cv.getContext('2d')!.fillRect(0, 0, 200, 150);
    const blob: Blob = await new Promise((r) => cv.toBlob((b) => r(b!), 'image/png'));
    const dt = new DataTransfer();
    dt.items.add(new File([blob], 'shot.png', { type: 'image/png' }));
    window.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
  });

  await withImage();
  await page.waitForTimeout(800);
  let td = await readTopdown(page);
  expect(td.geo.length).toBe(2);              // 도형이 복제된다
  expect((td.images ?? []).length).toBe(0);   // 이미지는 끼어들지 않는다

  // 선택 없이 Ctrl+C = 도형 클립보드 비우기 → 이후에는 이미지가 붙는다
  await page.keyboard.press('Escape');        // 선택 해제
  await page.waitForTimeout(200);
  await page.keyboard.press('Control+c');
  await page.waitForTimeout(200);
  await withImage();
  await page.waitForTimeout(900);
  td = await readTopdown(page);
  expect(td.geo.length).toBe(2);              // 도형은 더 늘지 않는다
  expect((td.images ?? []).length).toBe(1);   // 이미지가 붙는다
});

test('Delete로 배경 이미지 삭제', async ({ page }) => {
  await page.locator('[data-testid="enter-topdown"]').click();
  const canvas = page.locator('[data-testid="topdown-canvas"]');
  const box = (await canvas.boundingBox())!;
  const S = projector(box);

  await dropImage(page, canvas, S(128, 128));
  await page.waitForTimeout(900);
  expect((await readImages(page)).length).toBe(1);

  await page.keyboard.press('v');
  const c = S(128, 128);
  await page.mouse.click(c.x, c.y);
  await page.keyboard.press('Delete');
  await page.waitForTimeout(700);
  expect((await readImages(page)).length).toBe(0);
});
