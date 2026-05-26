import { test } from '@playwright/test';

test('v2 비주얼 — 펜떨림 + 엣지 경계 + 리사이즈', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');

  // 의미 있는 다이어그램 세팅
  await page.evaluate(() => {
    const store = (window as any).__bubbleStore;
    let s = store.getState();
    const ids: string[] = [];
    ids.push(s.addNode({ x: 180, y: 320, type: 'room', name: '입구 홀' }));
    s = store.getState();
    ids.push(s.addNode({ x: 420, y: 220, type: 'vista', name: '협곡 전망' }));
    s = store.getState();
    ids.push(s.addNode({ x: 420, y: 420, type: 'room', name: '적과 첫 대면' }));
    s = store.getState();
    ids.push(s.addNode({ x: 680, y: 320, type: 'treasure', name: '대시 능력 제단' }));
    s = store.getState();
    ids.push(s.addNode({ x: 940, y: 220, type: 'room', name: '연습실' }));
    s = store.getState();
    ids.push(s.addNode({ x: 940, y: 420, type: 'hub', name: '카타콤 허브' }));
    s = store.getState();
    ids.push(s.addNode({ x: 1180, y: 320, type: 'boss', name: '바람의 수호자' }));
    s = store.getState();
    s.addEdge(ids[0], ids[1], 'open');
    s.addEdge(ids[0], ids[2], 'open');
    s.addEdge(ids[1], ids[3], 'open');
    s.addEdge(ids[2], ids[3], 'open');
    s.addEdge(ids[3], ids[4], 'ability');
    s.addEdge(ids[3], ids[5], 'open');
    s.addEdge(ids[4], ids[6], 'locked');
    s.addEdge(ids[5], ids[6], 'oneway');
    // 보스를 크게, 입구를 작게 — 리사이즈 검증
    const fresh = store.getState();
    fresh.resizeNode(ids[6], 1.6);
    fresh.resizeNode(ids[0], 0.75);
    // 메타데이터
    const eList = store.getState().project.edges;
    fresh.updateEdge(eList[6].id, { keyId: 'dragon_key' });
    fresh.updateEdge(eList[4].id, { abilityId: 'dash' });
  });
  await page.waitForTimeout(300);

  // 1. clean 모드
  await page.screenshot({ path: 'screenshots/v2-01-clean.png', fullPage: false });

  // 2. rough 모드
  await page.locator('.cs-toggle', { hasText: '펜떨림' }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/v2-02-rough.png', fullPage: false });

  // 3. 보스 선택 → 리사이즈 핸들 가시
  await page.locator('[data-node]').last().locator('.bn-shape').click({ force: true });
  await page.waitForTimeout(150);
  await page.screenshot({ path: 'screenshots/v2-03-boss-selected-handles.png', fullPage: false });
});
