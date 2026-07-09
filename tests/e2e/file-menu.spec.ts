import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');
});

test('파일 메뉴: 열고 → JSON 내보내기 작동', async ({ page }) => {
  // 첫 클릭: 메뉴 열기
  await page.locator('.cb-btn', { hasText: '파일' }).click();
  // body 직접 자식으로 렌더되는 cb-menu가 보여야 함
  const menu = page.locator('[data-cb-menu]');
  await expect(menu).toBeVisible();
  await expect(menu.locator('button', { hasText: 'JSON 내보내기' })).toBeVisible();
  await expect(menu.locator('button', { hasText: 'JSON 불러오기' })).toBeVisible();

  // 항목 클릭이 작동하는지 — JSON 내보내기 download 트리거
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    menu.locator('button', { hasText: 'JSON 내보내기' }).click(),
  ]);
  expect(download.suggestedFilename()).toMatch(/\.json$/);
  // 메뉴는 닫혔어야 함
  await expect(page.locator('[data-cb-menu]')).toBeHidden();
});

test('파일 메뉴: 외부 클릭(오버레이)으로 닫힘', async ({ page }) => {
  await page.locator('.cb-btn', { hasText: '파일' }).click();
  await expect(page.locator('[data-cb-menu]')).toBeVisible();

  // 메뉴 밖 어디를 눌러도 전체 화면 오버레이가 받아서 닫는다
  await page.locator('.cb-menu-overlay').click({ position: { x: 200, y: 400 } });
  await expect(page.locator('[data-cb-menu]')).toBeHidden();
});

test('파일 메뉴: 다시 열기 가능 (오버레이 닫기 후)', async ({ page }) => {
  const fileBtn = page.locator('.cb-btn', { hasText: '파일' });
  // 열림 → 오버레이로 닫힘 → 다시 열림
  await fileBtn.click();
  await expect(page.locator('[data-cb-menu]')).toBeVisible();
  await page.locator('.cb-menu-overlay').click({ position: { x: 200, y: 400 } });
  await expect(page.locator('[data-cb-menu]')).toBeHidden();
  await fileBtn.click();
  await expect(page.locator('[data-cb-menu]')).toBeVisible();
});
