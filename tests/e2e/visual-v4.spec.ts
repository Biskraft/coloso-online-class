import { test } from '@playwright/test';

test('v4 — 채도 다운 + 엣지 단일패스 비교', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');

  await page.evaluate(() => {
    const store = (window as any).__bubbleStore;
    let s = store.getState();
    const ids: string[] = [];
    ids.push(s.addNode({ x: 200, y: 280, type: 'vista', name: 'ENTRY' }));
    s = store.getState(); s.resizeNode(ids[0], 1.3);
    s = store.getState(); ids.push(s.addNode({ x: 480, y: 180, type: 'room', name: 'RAMPARTS' }));
    s = store.getState(); ids.push(s.addNode({ x: 680, y: 130, type: 'treasure', name: 'SECRET' }));
    s = store.getState(); s.resizeNode(ids[2], 0.7);
    s = store.getState(); ids.push(s.addNode({ x: 600, y: 380, type: 'vista', name: 'NAVE' }));
    s = store.getState(); s.resizeNode(ids[3], 1.4);
    s = store.getState(); ids.push(s.addNode({ x: 380, y: 450, type: 'save', name: 'BONFIRE' }));
    s = store.getState(); ids.push(s.addNode({ x: 850, y: 480, type: 'boss', name: 'BOSS' }));
    s = store.getState(); s.resizeNode(ids[5], 1.4);
    const fresh = store.getState();
    fresh.addEdge(ids[0], ids[1], 'open');
    fresh.addEdge(ids[0], ids[3], 'open');
    fresh.addEdge(ids[1], ids[2], 'open');
    fresh.addEdge(ids[1], ids[3], 'open');
    fresh.addEdge(ids[3], ids[4], 'open');
    fresh.addEdge(ids[3], ids[5], 'locked');
  });
  await page.waitForTimeout(200);
  await page.locator('.cs-toggle', { hasText: '그리드' }).click(); // 그리드 OFF
  await page.waitForTimeout(150);

  // clean 엣지
  await page.screenshot({ path: 'screenshots/v4-clean.png', fullPage: false });
  // 펜떨림 ON
  await page.locator('.cs-toggle', { hasText: '펜떨림' }).click();
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'screenshots/v4-rough.png', fullPage: false });
});
