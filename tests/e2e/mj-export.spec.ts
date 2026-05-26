import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');
});

test('오프라인 MJ 프롬프트 생성', async ({ page }) => {
  // 템플릿 적용으로 컨셉 + 포스트잇 채움
  await page.locator('.pp-templates-btn').click();
  await page.locator('.tp-item').first().click();
  await page.locator('.tp-apply').click();

  // MJ 탭으로 이동
  await page.locator('.ins-tabs button', { hasText: 'MJ 프롬프트' }).click();
  await expect(page.locator('.ins-mj-section').first()).toBeVisible();

  // 오프라인 재생성
  await page.locator('.ins-mj-section').first().locator('button', { hasText: '오프라인 재생성' }).click();
  const master = await page.locator('.ins-mj-section').first().locator('textarea').inputValue();
  expect(master).toContain('--ar 16:9');
  expect(master).toContain('--v 8.1');
});

test('Markdown export 트리거', async ({ page }) => {
  await page.locator('.pp-templates-btn').click();
  await page.locator('.tp-item').first().click();
  await page.locator('.tp-apply').click();

  await page.locator('.ins-tabs button', { hasText: 'Export' }).click();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.exp-btn', { hasText: 'Markdown 명세서' }).click(),
  ]);
  expect(download.suggestedFilename()).toMatch(/\.md$/);
});

test('JSON 입출력 라운드트립', async ({ page }) => {
  // 노드 하나 추가
  await page.locator('.canvas-toolbar button', { hasText: '방' }).first().click();
  await page.waitForTimeout(200);

  await page.locator('.ins-tabs button', { hasText: 'Export' }).click();
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.exp-btn', { hasText: 'JSON 프로젝트' }).click(),
  ]);
  expect(download.suggestedFilename()).toMatch(/\.json$/);
});
