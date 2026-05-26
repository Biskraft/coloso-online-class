import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');
});

test('Undo로 노드 추가 취소', async ({ page }) => {
  await page.evaluate(() => {
    const s = (window as any).__bubbleStore.getState();
    s.addNode({ x: 300, y: 300, type: 'room', name: 'A' });
  });
  await expect(page.locator('[data-node]')).toHaveCount(1);
  await page.waitForTimeout(350); // throttle 250ms 통과 대기
  await page.keyboard.press('Control+z');
  await page.waitForTimeout(150);
  await expect(page.locator('[data-node]')).toHaveCount(0);
});

test('Redo로 취소된 노드 복원', async ({ page }) => {
  await page.evaluate(() => {
    const s = (window as any).__bubbleStore.getState();
    s.addNode({ x: 300, y: 300, type: 'room', name: 'A' });
  });
  await page.waitForTimeout(350);
  await page.keyboard.press('Control+z');
  await page.waitForTimeout(150);
  await expect(page.locator('[data-node]')).toHaveCount(0);
  await page.keyboard.press('Control+Shift+z');
  await page.waitForTimeout(150);
  await expect(page.locator('[data-node]')).toHaveCount(1);
});

test('Undo 버튼 disabled→enabled 전환', async ({ page }) => {
  // 초기: undo 불가
  const undoBtn = page.locator('.cb-undo').first();
  await expect(undoBtn).toBeDisabled();
  // 변경 후 활성
  await page.evaluate(() => {
    const s = (window as any).__bubbleStore.getState();
    s.addNode({ x: 300, y: 300, type: 'room', name: 'B' });
  });
  await page.waitForTimeout(400);
  await expect(undoBtn).toBeEnabled();
});
