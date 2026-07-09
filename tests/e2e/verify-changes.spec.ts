import { test, expect } from '@playwright/test';

// 다크모드 흰 선 + 넓게 쓰기(포커스) 모드 회귀 테스트
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
    localStorage.setItem('bubble-atelier::theme', 'dark');
  });
  await page.goto('/');
});

test('다크모드에서 통로(open) 엣지는 흰 선으로 렌더된다', async ({ page }) => {
  await page.evaluate(() => {
    const s = (window as any).__bubbleStore.getState();
    s.addNode({ x: 220, y: 260, type: 'room', name: 'A 방' });
    s.addNode({ x: 640, y: 300, type: 'boss', name: 'B 보스' });
    const fresh = (window as any).__bubbleStore.getState();
    const [n1, n2] = fresh.project.nodes;
    fresh.addEdge(n1.id, n2.id, 'open');
  });
  // 본선 path의 stroke가 흰색인지 — 다크모드 치환 확인
  const strokes = await page.locator('[data-edge] path[stroke]').evaluateAll(
    (paths) => paths.map((p) => (p as SVGPathElement).getAttribute('stroke')),
  );
  expect(strokes).toContain('#FFFFFF');
});

test('포스트잇을 드래그해 순서를 바꿀 수 있다', async ({ page }) => {
  // addPostit은 앞에 추가 → 위에서부터 C, B, A
  await page.evaluate(() => {
    const s = (window as any).__bubbleStore.getState();
    s.addPostit('A', 'yellow');
    s.addPostit('B', 'pink');
    s.addPostit('C', 'mint');
  });
  const texts = page.locator('.pp-item .postit-text');
  await expect(texts).toHaveText(['C', 'B', 'A']);

  const firstId = await page.evaluate(
    () => (window as any).__bubbleStore.getState().project.postits[0].id,
  );
  // 첫 항목(C)을 마지막 항목(A) 아래로 드롭
  const target = page.locator('.pp-item').last();
  const box = (await target.boundingBox())!;
  const dt = await page.evaluateHandle((id) => {
    const d = new DataTransfer();
    d.setData('application/x-postit-id', id);
    return d;
  }, firstId);

  const src = page.locator('.pp-item').first();
  await src.dispatchEvent('dragstart', { dataTransfer: dt });
  await target.dispatchEvent('dragover', {
    dataTransfer: dt, clientY: box.y + box.height * 0.8,
  });
  await target.dispatchEvent('drop', {
    dataTransfer: dt, clientY: box.y + box.height * 0.8,
  });

  // C가 맨 아래로 → B, A, C
  await expect(texts).toHaveText(['B', 'A', 'C']);
});

test('레이아웃: 브랜드는 사이드바 상단, 제목은 컨셉바 좌측', async ({ page }) => {
  await page.evaluate(() => {
    (window as any).__bubbleStore.getState().setName('ECHORIS WORLD MAP');
  });
  const rect = (sel: string) =>
    page.evaluate((s) => {
      const el = document.querySelector(s) as HTMLElement | null;
      if (!el) return null;
      const b = el.getBoundingClientRect();
      return { x: Math.round(b.x), y: Math.round(b.y) };
    }, sel);

  // 브랜드는 더 이상 컨셉바 안에 없다
  await expect(page.locator('.concept-bar .brand-mark')).toHaveCount(0);
  // 브랜드는 사이드바(포스트잇 패널) 최상단에 있다
  await expect(page.locator('.postit-pad .pp-brand')).toHaveCount(1);

  const cb = (await rect('.concept-bar'))!;
  const title = (await rect('.cb-name'))!;
  const brand = (await rect('.pp-brand'))!;
  const header = (await rect('.pp-header'))!;

  // 제목이 컨셉바 좌측(좌측 패딩 근처)에 위치
  expect(title.x).toBeLessThan(cb.x + 40);
  // 브랜드는 컨셉바보다 아래(2행 띠) + 포스트잇 헤더보다 위
  expect(brand.y).toBeGreaterThan(cb.y);
  expect(brand.y).toBeLessThan(header.y);
});

test('미니맵에 엣지 선이 그려진다', async ({ page }) => {
  await page.evaluate(() => {
    const s = (window as any).__bubbleStore.getState();
    s.addNode({ x: 240, y: 260, type: 'room', name: 'A' });
    s.addNode({ x: 640, y: 320, type: 'boss', name: 'B' });
    const f = (window as any).__bubbleStore.getState();
    const [n1, n2] = f.project.nodes;
    f.addEdge(n1.id, n2.id, 'open');
    f.setView({ showMinimap: true });
  });
  // 미니맵 SVG 안에 엣지 line 요소가 존재해야 한다
  await expect(page.locator('.minimap line')).toHaveCount(1);
});

test('넓게 쓰기 모드: 주변 패널을 숨기고 캔버스+하단 메뉴만 남긴다', async ({ page }) => {
  // 평상시엔 포스트잇/인스펙터/컨셉바가 보인다
  await expect(page.locator('.postit-pad')).toBeVisible();
  await expect(page.locator('.inspector')).toBeVisible();
  await expect(page.locator('.concept-bar')).toBeVisible();

  await page.locator('.focus-toggle').click();

  // 포커스 모드 — 주변 패널은 숨고, 하단 플로팅 메뉴는 유지
  await expect(page.locator('.postit-pad')).toBeHidden();
  await expect(page.locator('.inspector')).toBeHidden();
  await expect(page.locator('.concept-bar')).toBeHidden();
  await expect(page.locator('.project-tabs')).toBeHidden();
  await expect(page.locator('.canvas-toolbar')).toBeVisible();

  // 토글 버튼은 우상단에 고정(fixed)되어 보인다
  await expect(page.locator('.focus-toggle')).toBeVisible();
  const pos = await page.locator('.focus-toggle').evaluate(
    (el) => getComputedStyle(el).position,
  );
  expect(pos).toBe('fixed');

  // Esc 로 빠져나오면 패널 복귀
  await page.keyboard.press('Escape');
  await expect(page.locator('.postit-pad')).toBeVisible();
});
