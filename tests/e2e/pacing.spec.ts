import { test, expect } from '@playwright/test';

/* 페이싱 곡선 에디터 — 감정 곡선 E2E (50·51강) */

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');
});

async function readPacing(page: any) {
  const raw = await page.evaluate(() => localStorage.getItem('bubble-atelier::pacing'));
  return raw ? JSON.parse(raw) : null;
}

test('진입 → 구간 추가 → 점 찍기 → 저장 → undo', async ({ page }) => {
  await page.getByTestId('enter-pacing').click();
  await expect(page.getByTestId('pacing-shell')).toBeVisible();

  // 구간 추가
  await page.getByRole('button', { name: '구간+' }).click();

  // 점 도구 → 캔버스 클릭 2회
  await page.getByRole('button', { name: '점', exact: true }).click();
  const canvas = page.getByTestId('pacing-canvas');
  const box = (await canvas.boundingBox())!;
  await page.mouse.click(box.x + box.width * 0.3, box.y + box.height * 0.6);
  await page.mouse.click(box.x + box.width * 0.7, box.y + box.height * 0.3);

  // localStorage 자동저장(디바운스 400ms) 반영 대기 후 point 2개 확인
  await page.waitForTimeout(800);
  let ws = await readPacing(page);
  expect(ws.docs[0].points.length).toBe(2);

  // undo → 1개
  await page.keyboard.press('Control+z');
  await page.waitForTimeout(800);
  ws = await readPacing(page);
  expect(ws.docs[0].points.length).toBe(1);
});

test('프리셋 → 조령관 곡선 시드 + 내보내기 버튼', async ({ page }) => {
  await page.getByTestId('enter-pacing').click();
  await expect(page.getByTestId('pacing-shell')).toBeVisible();

  await page.getByTestId('pac-preset').selectOption('joryeonggwan');
  await page.waitForTimeout(800);

  const ws = await readPacing(page);
  const seeded = ws.docs[ws.docs.length - 1];
  expect(seeded.segments.length).toBeGreaterThanOrEqual(4);

  // 내보내기 — PNG/JSON 두 버튼으로 분리되어 있음(각각 노출 확인)
  await expect(page.getByRole('button', { name: 'PNG 내보내기' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'JSON 내보내기' })).toBeVisible();
});
