import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');
});

test('포스트잇 추가/수정/삭제', async ({ page }) => {
  await page.locator('.pp-add').click();
  await expect(page.locator('.postit')).toHaveCount(1);

  // 새 포스트잇은 빈 텍스트이므로 자동으로 textarea가 표시됨
  const textarea = page.locator('.postit-textarea').first();
  await textarea.fill('첫 메모');
  // blur 처리 — 패드의 다른 영역 클릭
  await page.locator('.pp-search-input').click();
  await expect(page.locator('.postit-text')).toContainText('첫 메모');

  // 두 번째 추가
  await page.locator('.pp-add').click();
  await expect(page.locator('.postit')).toHaveCount(2);

  // 첫 번째 삭제 — 카드 호버 후 × 클릭
  const first = page.locator('.postit').first();
  await first.hover();
  await first.locator('.postit-x').click({ force: true });
  await expect(page.locator('.postit')).toHaveCount(1);
});

test('컨셉 템플릿 적용으로 포스트잇 배치', async ({ page }) => {
  await page.locator('.pp-templates-btn').click();
  await expect(page.locator('.tp')).toBeVisible();
  // 첫 번째 템플릿 클릭(프리뷰), 적용 버튼
  const firstItem = page.locator('.tp-item').first();
  await firstItem.click();
  await expect(page.locator('.tp-preview')).toBeVisible();
  await page.locator('.tp-apply').click();

  await expect(page.locator('.postit')).toHaveCount({ greaterThan: 3 } as any).catch(async () => {
    // fallback: 1장 이상 확인
    expect(await page.locator('.postit').count()).toBeGreaterThan(3);
  });
  // 컨셉 바에 테마 채워짐 확인
  const themeVal = await page.locator('.cb-field-input').first().inputValue();
  expect(themeVal.length).toBeGreaterThan(0);
});
