import { test, expect } from '@playwright/test';

// NOTE: 구성 실험실(.lab-entry) 진입점이 현재 UI에서 제거되어 전체 보류.
// 기능 재연결 여부 결정 후 복원할 것 (커리큘럼 4주차 '이미지 구성' 실습 후보).
test.skip(true, '구성 실험실 진입점(.lab-entry)이 현재 UI에 없음 — 기능 재연결 결정 대기');

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.setViewportSize({ width: 1360, height: 820 });
  await page.goto('/');
  await page.locator('.lab-entry').click();
  await expect(page.locator('.comp-lab')).toBeVisible();
});

const balance = async (page: any) =>
  page.locator('.cl-gauge-val').evaluate(
    (el: HTMLElement) => parseInt(el.firstChild?.textContent || '0', 10),
  );

const svgCenter = async (page: any) => {
  const b = (await page.locator('.cl-svg').boundingBox())!;
  return { x: b.x + b.width / 2, y: b.y + b.height / 2, b };
};

const dragShapeTo = async (page: any, idx: number, x: number, y: number) => {
  const s = page.locator('.cl-shape').nth(idx);
  const sb = (await s.boundingBox())!;
  await page.mouse.move(sb.x + sb.width / 2, sb.y + sb.height / 2);
  await page.mouse.down();
  await page.mouse.move(x, y, { steps: 10 });
  await page.mouse.up();
};

// 도형 본체(채움 있는 요소)의 fill 읽기
const bodyFill = (page: any, idx: number) =>
  page.locator('.cl-shape').nth(idx).evaluate((g: SVGGElement) => {
    const el = Array.from(g.children).find(
      (c) => c.getAttribute('fill') && c.getAttribute('fill') !== 'none',
    );
    return el?.getAttribute('fill') ?? null;
  });

test('균형 계산: 중앙=안정, 모서리=불균형, 반대편 무게=회복', async ({ page }) => {
  await page.locator('.cl-pal', { hasText: '원' }).click();
  const { x, y, b } = await svgCenter(page);

  // 정중앙으로 → 균형 거의 100
  await dragShapeTo(page, 0, x, y);
  expect(await balance(page)).toBeGreaterThanOrEqual(95);

  // 좌상단 모서리로 → 크게 불균형
  await dragShapeTo(page, 0, b.x + 50, b.y + 50);
  const cornerScore = await balance(page);
  expect(cornerScore).toBeLessThan(70);

  // 대각 반대편에 같은 무게 추가 → 균형 회복
  await page.locator('.cl-pal', { hasText: '원' }).click();
  await dragShapeTo(page, 1, b.x + b.width - 50, b.y + b.height - 50);
  const balancedScore = await balance(page);
  expect(balancedScore).toBeGreaterThan(cornerScore + 15);
});

test('초점 링: 무게 가장 큰 형태에 정확히 1개', async ({ page }) => {
  await page.locator('.cl-pal', { hasText: '원' }).click();
  await page.locator('.cl-pal', { hasText: '사각형' }).click();
  await page.locator('.cl-pal', { hasText: '삼각형' }).click();
  // 무게중심·균형 오버레이가 켜져 있으면 초점 링(var(--ochre)) 1개
  const ochre = page.locator('.cl-svg [stroke="var(--ochre)"]');
  await expect(ochre).toHaveCount(1);
});

test('오버레이 4종: 실루엣·반전·명도·흐름이 렌더에 반영된다', async ({ page }) => {
  await page.locator('.cl-pal', { hasText: '영웅' }).click();

  // 기본: 색조 채움(hsl)
  expect(await bodyFill(page, 0)).toMatch(/^hsl\(/);

  // 음/양 실루엣 → 단색 잉크
  await page.locator('.cl-tg', { hasText: '음/양(실루엣)' }).click();
  expect((await bodyFill(page, 0))!.toUpperCase()).toBe('#1A1814');

  // 음/양 반전 → 배경 잉크, 도형 종이색
  await page.locator('.cl-tg', { hasText: '음/양 반전' }).click();
  expect((await bodyFill(page, 0))!.toUpperCase()).toBe('#FAF6EE');
  const bg = await page.locator('.cl-svg rect').first().getAttribute('fill');
  expect(bg!.toUpperCase()).toBe('#1A1814');

  // 반전·실루엣 끄고 명도 → 무채색
  await page.locator('.cl-tg', { hasText: '음/양 반전' }).click();
  await page.locator('.cl-tg', { hasText: '음/양(실루엣)' }).click();
  await page.locator('.cl-tg', { hasText: '명도(흑백)' }).click();
  expect(await bodyFill(page, 0)).toMatch(/hsl\(0, ?0%/);

  // Push/Pull 흐름 → 선 요소 증가
  const before = await page.locator('.cl-svg line').count();
  await page.locator('.cl-tg', { hasText: 'Push/Pull' }).click();
  const after = await page.locator('.cl-svg line').count();
  expect(after).toBeGreaterThan(before);
});

test('시점 토글: 탑다운은 정사각 viewBox', async ({ page }) => {
  expect(await page.locator('.cl-svg').getAttribute('viewBox')).toBe('0 0 1600 900');
  await page.locator('.cl-seg button', { hasText: '탑다운' }).click();
  expect(await page.locator('.cl-svg').getAttribute('viewBox')).toBe('0 0 1600 1600');
});

test('인스펙터: 크기 조절·삭제', async ({ page }) => {
  await page.locator('.cl-pal', { hasText: '원' }).click();
  await page.locator('.cl-shape').first().click();
  const rBefore = await page.locator('.cl-shape circle[fill^="hsl"]').first().getAttribute('r');

  const slider = page.locator('.cl-field', { hasText: '크기' }).locator('input[type="range"]');
  await slider.fill('220');
  const rAfter = await page.locator('.cl-shape circle[fill^="hsl"]').first().getAttribute('r');
  expect(Number(rAfter)).toBeGreaterThan(Number(rBefore));

  await page.locator('.cl-del').click();
  await expect(page.locator('.cl-shape')).toHaveCount(0);
});

test('다크모드 구동 + 스크린샷', async ({ page }) => {
  // data-theme을 직접 설정(리로드 없이) — beforeEach의 localStorage.clear() 영향 회피
  await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
  await page.locator('.cl-pal', { hasText: '영웅' }).click();
  await page.locator('.cl-pal', { hasText: '적' }).click();
  await page.locator('.cl-seg button', { hasText: '탑다운' }).click();
  await page.locator('.cl-tg', { hasText: 'Push/Pull' }).click();
  await expect(page.locator('.comp-lab')).toBeVisible();
  await page.screenshot({ path: 'screenshots/verify-lab-dark.png' });
});
