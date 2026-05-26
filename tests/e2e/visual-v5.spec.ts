import { test } from '@playwright/test';

test('v5 — 강한 펜떨림 + 두께 차등 + 형태 조절', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');

  await page.evaluate(() => {
    const store = (window as any).__bubbleStore;
    let s = store.getState();
    const ids: string[] = [];
    // 다양한 형태 시연
    // 1. 기본 타원 ENTRY (큰 노란 vista)
    ids.push(s.addNode({ x: 220, y: 300, type: 'vista', name: 'ENTRY' }));
    s = store.getState(); s.resizeNode(ids[0], 1.3);
    // 2. 원형 RAMPARTS (room을 원형으로)
    s = store.getState(); ids.push(s.addNode({ x: 470, y: 180, type: 'room', name: 'RAMPARTS' }));
    s = store.getState(); s.setNodeAspect(ids[1], Math.sqrt(45/70)); // room 원형
    // 3. 세로 타원 BELL TOWER
    s = store.getState(); ids.push(s.addNode({ x: 730, y: 180, type: 'room', name: 'BELL TOWER' }));
    s = store.getState(); s.setNodeAspect(ids[2], 0.55);
    // 4. 가로 큰 타원 CATHEDRAL NAVE
    s = store.getState(); ids.push(s.addNode({ x: 600, y: 380, type: 'vista', name: 'CATHEDRAL NAVE' }));
    s = store.getState(); s.resizeNode(ids[3], 1.4); s.setNodeAspect(ids[3], 1.3);
    // 5. 작은 원형 SECRET (treasure)
    s = store.getState(); ids.push(s.addNode({ x: 870, y: 90, type: 'treasure', name: 'SECRET' }));
    s = store.getState(); s.resizeNode(ids[4], 0.7); s.setNodeAspect(ids[4], Math.sqrt(45/70));
    // 6. BONFIRE save
    s = store.getState(); ids.push(s.addNode({ x: 370, y: 500, type: 'save', name: 'BONFIRE' }));
    // 7. 원형 PRISON
    s = store.getState(); ids.push(s.addNode({ x: 540, y: 540, type: 'room', name: 'PRISON' }));
    s = store.getState(); s.setNodeAspect(ids[6], Math.sqrt(45/70));
    // 8. 큰 원형 BOSS
    s = store.getState(); ids.push(s.addNode({ x: 870, y: 470, type: 'boss', name: 'BOSS ARENA' }));
    s = store.getState(); s.resizeNode(ids[7], 1.4); s.setNodeAspect(ids[7], Math.sqrt(60/90));

    // 엣지 — 4가지 타입 모두 보여주기
    const fresh = store.getState();
    fresh.addEdge(ids[0], ids[1], 'open');      // 굵은 검정 (4.8)
    fresh.addEdge(ids[0], ids[3], 'open');      // 굵은 검정
    fresh.addEdge(ids[1], ids[2], 'open');
    fresh.addEdge(ids[2], ids[4], 'locked');    // 점선 오크르 (2.8)
    fresh.addEdge(ids[2], ids[3], 'open');
    fresh.addEdge(ids[3], ids[5], 'open');
    fresh.addEdge(ids[3], ids[6], 'open');
    fresh.addEdge(ids[6], ids[7], 'ability');   // 점선 벽돌 (2.2)
    fresh.addEdge(ids[5], ids[6], 'oneway');    // 얇은 회색 화살표 (1.8)
    fresh.addEdge(ids[7], ids[3], 'oneway');    // 일방통행
  });

  await page.waitForTimeout(200);
  await page.locator('.cs-toggle', { hasText: '그리드' }).click(); // 그리드 OFF
  await page.waitForTimeout(150);

  // clean
  await page.screenshot({ path: 'screenshots/v5-01-clean.png', fullPage: false });
  // 펜떨림 ON (강해진 떨림)
  await page.locator('.cs-toggle', { hasText: '펜떨림' }).click();
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'screenshots/v5-02-strong-rough.png', fullPage: false });

  // 노드 선택 → Inspector의 형태 컨트롤 가시
  await page.locator('[data-node]').first().locator('.bn-shape').click({ force: true });
  await page.waitForTimeout(150);
  await page.screenshot({ path: 'screenshots/v5-03-inspector-aspect.png', fullPage: false });
});
