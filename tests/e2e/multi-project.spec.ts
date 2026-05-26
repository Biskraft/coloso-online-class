import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');
});

test('워크스페이스 초기 상태: 탭 1개', async ({ page }) => {
  await expect(page.locator('.project-tabs')).toBeVisible();
  await expect(page.locator('.pt-tab')).toHaveCount(1);
  await expect(page.locator('.pt-tab.is-active')).toHaveCount(1);
});

test('새 프로젝트 추가 → 탭 2개 + 새 탭이 활성', async ({ page }) => {
  await page.locator('.pt-new').click();
  await expect(page.locator('.pt-tab')).toHaveCount(2);
  // 가장 최근 탭이 활성
  const active = page.locator('.pt-tab.is-active');
  await expect(active).toHaveCount(1);
});

test('프로젝트 전환 — 다른 탭 클릭 시 캔버스가 바뀜', async ({ page }) => {
  // 첫 프로젝트에 노드 추가
  await page.evaluate(() => {
    const s = (window as any).__bubbleStore.getState();
    s.addNode({ x: 300, y: 300, type: 'room', name: 'A 방' });
  });
  await expect(page.locator('[data-node]')).toHaveCount(1);

  // 새 프로젝트 (빈)
  await page.locator('.pt-new').click();
  await expect(page.locator('[data-node]')).toHaveCount(0);

  // 첫 탭으로 돌아감
  await page.locator('.pt-tab').first().locator('.pt-tab-main').click();
  await expect(page.locator('[data-node]')).toHaveCount(1);
});

test('빈 프로젝트 탭 닫기는 즉시 (확인 없이)', async ({ page }) => {
  await page.locator('.pt-new').click();
  await expect(page.locator('.pt-tab')).toHaveCount(2);
  // 두 번째(빈) 탭 닫기
  await page.locator('.pt-tab').nth(1).locator('.pt-close').click();
  await expect(page.locator('.pt-tab')).toHaveCount(1);
});

test('내용 있는 탭 닫기는 확인 모달', async ({ page }) => {
  await page.evaluate(() => {
    const s = (window as any).__bubbleStore.getState();
    s.addNode({ x: 300, y: 300, type: 'room', name: 'B 방' });
  });
  await page.locator('.pt-tab').first().locator('.pt-close').click();
  await expect(page.locator('.pt-confirm')).toBeVisible();
  await expect(page.locator('.pt-confirm-msg')).toContainText('저장되지 않습니다');
  // 취소 → 탭 유지
  await page.locator('.pt-btn', { hasText: '취소' }).click();
  await expect(page.locator('.pt-tab')).toHaveCount(1);
});

test('마지막 탭 닫으면 새 빈 프로젝트 자동 생성', async ({ page }) => {
  await expect(page.locator('.pt-tab')).toHaveCount(1);
  await page.locator('.pt-close').click();
  // 빈 프로젝트라 즉시 닫힘 → 자동으로 새 빈 프로젝트
  await expect(page.locator('.pt-tab')).toHaveCount(1);
});
