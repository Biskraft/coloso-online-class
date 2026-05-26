import { test } from '@playwright/test';

test('v3 비주얼 — 레퍼런스 톤 매칭', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');

  // 레퍼런스 이미지 구조와 유사한 다이어그램 구성
  await page.evaluate(() => {
    const store = (window as any).__bubbleStore;
    let s = store.getState();
    const ids: string[] = [];
    // ENTRY (vista=노랑) — 큰 허브
    ids.push(s.addNode({ x: 200, y: 250, type: 'vista', name: 'ENTRY COURTYARD' }));
    s = store.getState(); s.resizeNode(ids[0], 1.4);
    // RAMPARTS (room=파랑)
    s = store.getState(); ids.push(s.addNode({ x: 450, y: 130, type: 'room', name: 'RAMPARTS' }));
    // TOWER SECRET (treasure=주황) — 작은 옵셔널
    s = store.getState(); ids.push(s.addNode({ x: 640, y: 90, type: 'treasure', name: 'TOWER SECRET' }));
    s = store.getState(); s.resizeNode(ids[2], 0.65);
    // BELL TOWER (room)
    s = store.getState(); ids.push(s.addNode({ x: 780, y: 180, type: 'room', name: 'BELL TOWER' }));
    s = store.getState(); s.resizeNode(ids[3], 0.85);
    // CATHEDRAL NAVE (vista=노랑) — 가장 큰 허브
    s = store.getState(); ids.push(s.addNode({ x: 580, y: 330, type: 'vista', name: 'CATHEDRAL NAVE' }));
    s = store.getState(); s.resizeNode(ids[4], 1.5);
    // BONFIRE CHAMBER (save=초록)
    s = store.getState(); ids.push(s.addNode({ x: 380, y: 380, type: 'save', name: 'BONFIRE CHAMBER' }));
    // PRISON BLOCK (room)
    s = store.getState(); ids.push(s.addNode({ x: 480, y: 480, type: 'room', name: 'PRISON BLOCK' }));
    // HIDDEN CELL (room)
    s = store.getState(); ids.push(s.addNode({ x: 680, y: 480, type: 'room', name: 'HIDDEN CELL' }));
    // FLOODED CATACOMBS (vista=노랑)
    s = store.getState(); ids.push(s.addNode({ x: 380, y: 620, type: 'vista', name: 'FLOODED CATACOMBS' }));
    s = store.getState(); s.resizeNode(ids[8], 1.35);
    // ELEVATOR SHAFT (room)
    s = store.getState(); ids.push(s.addNode({ x: 620, y: 620, type: 'room', name: 'ELEVATOR SHAFT' }));
    // BOSS ARENA (boss=빨강)
    s = store.getState(); ids.push(s.addNode({ x: 900, y: 580, type: 'boss', name: 'BOSS ARENA' }));
    s = store.getState(); s.resizeNode(ids[10], 1.5);

    // 엣지 — 레퍼런스의 'IMMEDIATE ADJACENCY' = open(굵은 검정)
    const fresh = store.getState();
    fresh.addEdge(ids[0], ids[1], 'open');
    fresh.addEdge(ids[0], ids[4], 'open');
    fresh.addEdge(ids[1], ids[3], 'open');
    fresh.addEdge(ids[2], ids[3], 'open');
    fresh.addEdge(ids[3], ids[4], 'open');
    fresh.addEdge(ids[4], ids[5], 'open');
    fresh.addEdge(ids[4], ids[6], 'open');
    fresh.addEdge(ids[5], ids[6], 'open');
    fresh.addEdge(ids[6], ids[7], 'open');
    fresh.addEdge(ids[6], ids[8], 'open');
    fresh.addEdge(ids[7], ids[8], 'open');
    fresh.addEdge(ids[7], ids[9], 'open');
    fresh.addEdge(ids[8], ids[9], 'open');
    // ONE-WAY DROP
    fresh.addEdge(ids[9], ids[10], 'oneway');
    // SECRET PASSAGE - 잠금
    fresh.addEdge(ids[7], ids[10], 'locked');
  });
  await page.waitForTimeout(300);

  // 1. clean 모드 — 평면 일러스트
  await page.screenshot({ path: 'screenshots/v3-01-flat-clean.png', fullPage: false });

  // 2. rough 모드 — 펜떨림 적용된 솔리드 색
  await page.locator('.cs-toggle', { hasText: '펜떨림' }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/v3-02-flat-rough.png', fullPage: false });

  // 3. 그리드 OFF (레퍼런스처럼 깨끗한 배경)
  await page.locator('.cs-toggle', { hasText: '펜떨림' }).click(); // rough OFF
  await page.locator('.cs-toggle', { hasText: '그리드' }).click(); // grid OFF
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/v3-03-no-grid.png', fullPage: false });
});
