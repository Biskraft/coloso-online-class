import { test, expect } from '@playwright/test';

/* 내보내기 라벨 정렬 회귀 방지 (버블 다이어그램)
   html-to-image는 <svg>를 만나면 네이티브 deep clone 후 자식 순회를 멈춘다(clone-node.js).
   → foreignObject 안 HTML에는 계산된 스타일이 인라인되지 않고, 외부 스타일시트도 따라가지 않는다.
   따라서 정렬 규칙은 SVG 서브트리 자체에 실려 있어야 내보낸 이미지에서 유지된다.
   이 테스트는 SVG를 그대로 직렬화했을 때 정렬 정보가 함께 나오는지 검사한다. */

test('SVG 직렬화 결과에 라벨 중앙 정렬 규칙이 포함된다', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');

  await page.evaluate(() => {
    const store = (window as any).__bubbleStore;
    let s = store.getState();
    const a = s.addNode({ x: 300, y: 300, type: 'boss', name: '정상 관문', icons: ['fire'] });
    s = store.getState();
    const b = s.addNode({ x: 620, y: 300, type: 'hub', name: '내성 마당' });
    s = store.getState();
    s.addEdge(a, b, 'locked');
  });
  await page.waitForTimeout(400);

  const svgText = await page.evaluate(() => {
    const svg = document.querySelector('.canvas-svg') as SVGSVGElement;
    // 내보내기와 동일한 조건 — 네이티브 deep clone 후 직렬화
    return new XMLSerializer().serializeToString(svg.cloneNode(true) as SVGSVGElement);
  });

  // 노드 이름 — 가로 중앙
  expect(svgText).toContain('text-align: center');
  // 아이콘 태그 · 데코 텍스트 · 엣지 라벨 — 플렉스 가로 중앙
  expect(svgText).toContain('justify-content: center');
});
