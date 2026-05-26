import { test, expect } from '@playwright/test';

test.use({ baseURL: 'https://biskraft.github.io/coloso-online-class/' });

test('라이브 배포: 앱이 로드되고 온보딩이 표시', async ({ page }) => {
  await page.addInitScript(() => localStorage.clear());
  await page.goto('/coloso-online-class/');
  await expect(page.locator('.app-shell')).toBeVisible({ timeout: 15000 });
  await expect(page.locator('.ow-card')).toBeVisible();
  await expect(page.getByText('시작하기')).toBeVisible();
});

test('라이브 배포: 오프라인 모드 진입 후 모든 패널 렌더', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/coloso-online-class/');
  await expect(page.locator('.concept-bar')).toBeVisible();
  await expect(page.locator('.postit-pad')).toBeVisible();
  await expect(page.locator('.canvas-shell')).toBeVisible();
  await expect(page.locator('.inspector')).toBeVisible();
});

test('라이브 배포: 템플릿 적용 → 포스트잇 생성', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/coloso-online-class/');
  await page.locator('.pp-templates-btn').click();
  await page.locator('.tp-item').first().click();
  await page.locator('.tp-apply').click();
  await expect(page.locator('.postit')).toHaveCount(7); // 첫 템플릿의 시드 포스트잇 수
});
