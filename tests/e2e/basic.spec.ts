import { test, expect } from '@playwright/test';

test.describe('기본 로딩', () => {
  test('앱 셸이 표시되고 온보딩이 뜬다', async ({ page }) => {
    await page.addInitScript(() => localStorage.clear());
    await page.goto('/');
    await expect(page.locator('.app-shell')).toBeVisible();
    await expect(page.locator('.ow-card')).toBeVisible();
    await expect(page.getByText('시작하기')).toBeVisible();
    await expect(page.getByText('오프라인으로 시작')).toBeVisible();
  });

  test('오프라인 모드 진입 후 3패널 렌더', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
      localStorage.setItem('bubble-atelier::onboarded', '1');
    });
    await page.goto('/');
    await expect(page.locator('.app-shell')).toBeVisible();
    await expect(page.locator('.concept-bar')).toBeVisible();
    await expect(page.locator('.postit-pad')).toBeVisible();
    await expect(page.locator('.canvas-shell')).toBeVisible();
    await expect(page.locator('.inspector')).toBeVisible();
  });

  test('컨셉 바 필드 입력이 즉시 반영되고 localStorage 저장된다', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
      localStorage.setItem('bubble-atelier::onboarded', '1');
    });
    await page.goto('/');
    const theme = page.locator('.cb-field-input').first();
    await theme.fill('테스트 사원');
    await expect(theme).toHaveValue('테스트 사원');
    // 디바운스 대기 후 localStorage에 기록되었는지 확인
    await page.waitForTimeout(700);
    const stored = await page.evaluate(() => localStorage.getItem('bubble-atelier::project'));
    expect(stored).toContain('테스트 사원');
  });
});
