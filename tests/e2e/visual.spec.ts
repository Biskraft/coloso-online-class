import { test } from '@playwright/test';

test('전체 워크플로우 스크린샷 — 비주얼 검증', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');

  // 1. 빈 상태
  await page.screenshot({ path: 'screenshots/01-empty.png', fullPage: false });

  // 2. 템플릿 적용
  await page.locator('.pp-templates-btn').click();
  await page.waitForTimeout(200);
  await page.locator('.tp-item').first().click();
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'screenshots/02-template-preview.png', fullPage: false });
  await page.locator('.tp-apply').click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/03-after-template.png', fullPage: false });

  // 3. 여러 노드와 엣지를 store로 구성
  await page.evaluate(() => {
    const store = (window as any).__bubbleStore;
    let s = store.getState();
    const ids: string[] = [];
    ids.push(s.addNode({ x: 150, y: 280, type: 'room', name: '입구 홀' }));
    s = store.getState();
    ids.push(s.addNode({ x: 360, y: 200, type: 'vista', name: '협곡 전망' }));
    s = store.getState();
    ids.push(s.addNode({ x: 360, y: 380, type: 'room', name: '적과 첫 대면' }));
    s = store.getState();
    ids.push(s.addNode({ x: 580, y: 290, type: 'treasure', name: '대시 능력 제단' }));
    s = store.getState();
    ids.push(s.addNode({ x: 820, y: 200, type: 'room', name: '대시 연습실' }));
    s = store.getState();
    ids.push(s.addNode({ x: 820, y: 380, type: 'hub', name: '카타콤 허브' }));
    s = store.getState();
    ids.push(s.addNode({ x: 1060, y: 290, type: 'boss', name: '바람의 수호자' }));
    s = store.getState();
    s.addEdge(ids[0], ids[1], 'open');
    s.addEdge(ids[0], ids[2], 'open');
    s.addEdge(ids[1], ids[3], 'open');
    s.addEdge(ids[2], ids[3], 'open');
    s.addEdge(ids[3], ids[4], 'ability');
    s.addEdge(ids[3], ids[5], 'open');
    s.addEdge(ids[4], ids[6], 'locked');
    s.addEdge(ids[5], ids[6], 'oneway');
    // 마지막 엣지에 메타데이터
    const last = store.getState().project.edges;
    s.updateEdge(last[6].id, { keyId: 'dragon_key' });
    s.updateEdge(last[4].id, { abilityId: 'dash' });
  });
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'screenshots/04-full-diagram.png', fullPage: false });

  // 4. 펜떨림 ON
  await page.locator('.cs-toggle', { hasText: '펜떨림' }).click();
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'screenshots/05-rough-mode.png', fullPage: false });

  // 5. 노드 선택 → MJ 탭
  await page.locator('[data-node]').nth(3).locator('.bn-shape').click({ force: true });
  await page.locator('.ins-tabs button', { hasText: 'MJ 프롬프트' }).click();
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'screenshots/06-mj-panel.png', fullPage: false });

  // 6. 범례 표시
  await page.locator('.cs-legend-btn').click();
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'screenshots/07-legend.png', fullPage: false });
});
