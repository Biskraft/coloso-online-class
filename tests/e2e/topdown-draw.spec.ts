import { test, expect } from '@playwright/test';

/* 동선 레이어 — 자유 드로잉 도구 / 색·두께 / 레이어 잠금 */

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');
});

async function readTd(page: any) {
  const raw = await page.evaluate(() => localStorage.getItem('bubble-atelier::workspace'));
  return JSON.parse(raw).projects[0].topdowns[0];
}

async function enter(page: any) {
  await page.locator('[data-testid="enter-topdown"]').click();
  const canvas = page.locator('[data-testid="topdown-canvas"]');
  const box = (await canvas.boundingBox())!;
  return { canvas, box, cx: box.x + box.width / 2, cy: box.y + box.height / 2 };
}

test('드로잉 도구는 다각형 바로 다음 자리에 있다', async ({ page }) => {
  await enter(page);
  const labels = await page.locator('.td-tool').allInnerTexts();
  expect(labels[3]).toBe('다각형');
  expect(labels[4]).toBe('드로잉');
});

test('드래그로 자유 곡선 → 획 1개 커밋 + 실행취소', async ({ page }) => {
  const { cx, cy } = await enter(page);

  await page.locator('.td-tool', { hasText: '드로잉' }).click();
  // 드로잉을 고르면 대상 레이어가 동선으로 따라간다
  await expect(page.locator('.td-target-path')).toHaveClass(/is-active/);

  await page.mouse.move(cx - 120, cy);
  await page.mouse.down();
  await page.mouse.move(cx - 60, cy - 60, { steps: 6 });
  await page.mouse.move(cx + 10, cy + 40, { steps: 6 });
  await page.mouse.move(cx + 90, cy - 20, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(800);

  const td = await readTd(page);
  expect(td.strokes.length).toBe(1);
  expect(td.strokes[0].pts.length).toBeGreaterThan(3);   // 곡선이 점으로 남는다
  expect(td.strokes[0].color).toBe('moss');              // 기본 색
  expect(td.strokes[0].width).toBe(2);                   // 기본 두께
  expect(td.geo.length).toBe(0);                         // 바닥 도형에는 영향 없음

  // 1획 = undo 1단계
  await page.locator('[data-testid="td-undo"]').click();
  await page.waitForTimeout(600);
  expect((await readTd(page)).strokes.length).toBe(0);
});

test('색·두께를 바꾸면 그대로 저장된다', async ({ page }) => {
  const { cx, cy } = await enter(page);

  await page.locator('.td-tool', { hasText: '드로잉' }).click();
  await page.locator('.td-stroke-swatch', { hasText: '위협·추격' }).click();
  await page.locator('.td-group[aria-label="동선 두께"] .td-btn', { hasText: '8m' }).click();

  await page.mouse.move(cx - 80, cy - 40);
  await page.mouse.down();
  await page.mouse.move(cx + 80, cy + 40, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(800);

  const s = (await readTd(page)).strokes[0];
  expect(s.color).toBe('brick');
  expect(s.width).toBe(8);
});

test('동선 레이어에서는 드로잉·선택만 열리고 나머지는 잠긴다', async ({ page }) => {
  await enter(page);

  await page.locator('.td-target-path').click();
  // 레이어를 고르면 도구가 드로잉으로 바뀐다
  await expect(page.locator('.td-tool', { hasText: '드로잉' })).toHaveClass(/is-active/);
  await expect(page.locator('.td-tool', { hasText: '선택' })).toBeEnabled();   // 지우기용
  await expect(page.locator('.td-tool', { hasText: '사각형' })).toBeDisabled();
  await expect(page.locator('.td-tool', { hasText: '복도' })).toBeDisabled();

  // 바닥으로 돌아오면 잠금이 풀리고 도구도 복귀
  await page.locator('.td-group[aria-label="그리기 대상"] .td-btn', { hasText: '바닥' }).click();
  await expect(page.locator('.td-tool', { hasText: '사각형' })).toBeEnabled();
  await expect(page.locator('.td-tool', { hasText: '사각형' })).toHaveClass(/is-active/);
});

test('선택 도구로 획을 골라 삭제 — 레이어를 벗어나지 않는다', async ({ page }) => {
  const { cx, cy } = await enter(page);

  await page.locator('.td-tool', { hasText: '드로잉' }).click();
  // 획 2개 — 위/아래로 분리해 하나만 정확히 집는다
  await page.mouse.move(cx - 120, cy - 80);
  await page.mouse.down();
  await page.mouse.move(cx + 120, cy - 80, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(300);
  await page.mouse.move(cx - 120, cy + 80);
  await page.mouse.down();
  await page.mouse.move(cx + 120, cy + 80, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(700);
  expect((await readTd(page)).strokes.length).toBe(2);

  // 동선 레이어에 머문 채 선택 도구로 전환
  await page.locator('.td-tool', { hasText: '선택' }).click();
  await expect(page.locator('.td-target-path')).toHaveClass(/is-active/);

  // 위쪽 획만 클릭 → Delete
  await page.mouse.click(cx, cy - 80);
  await page.keyboard.press('Delete');
  await page.waitForTimeout(700);

  const td = await readTd(page);
  expect(td.strokes.length).toBe(1);
  // 남은 것은 아래쪽 획
  expect(td.strokes[0].pts[0][1]).toBeGreaterThan(td.grid[1] / 2);
});

test('마퀴로 획 여러 개 일괄 삭제', async ({ page }) => {
  const { cx, cy } = await enter(page);

  await page.locator('.td-tool', { hasText: '드로잉' }).click();
  for (const dy of [-60, 0, 60]) {
    await page.mouse.move(cx - 100, cy + dy);
    await page.mouse.down();
    await page.mouse.move(cx + 100, cy + dy, { steps: 6 });
    await page.mouse.up();
    await page.waitForTimeout(200);
  }
  await page.waitForTimeout(600);
  expect((await readTd(page)).strokes.length).toBe(3);

  await page.locator('.td-tool', { hasText: '선택' }).click();
  await page.mouse.move(cx - 180, cy - 140);
  await page.mouse.down();
  await page.mouse.move(cx + 180, cy + 140, { steps: 8 });
  await page.mouse.up();
  await page.keyboard.press('Delete');
  await page.waitForTimeout(700);

  expect((await readTd(page)).strokes.length).toBe(0);
});

test('비우기 버튼 — 획 전체 삭제 후 실행취소로 복구', async ({ page }) => {
  const { cx, cy } = await enter(page);

  await page.locator('.td-tool', { hasText: '드로잉' }).click();
  await expect(page.locator('[data-testid="td-stroke-clear"]')).toBeDisabled();

  for (const dy of [-50, 50]) {
    await page.mouse.move(cx - 90, cy + dy);
    await page.mouse.down();
    await page.mouse.move(cx + 90, cy + dy, { steps: 6 });
    await page.mouse.up();
    await page.waitForTimeout(200);
  }
  await page.waitForTimeout(600);
  expect((await readTd(page)).strokes.length).toBe(2);
  await expect(page.locator('[data-testid="td-stroke-clear"]')).toContainText('2');

  await page.locator('[data-testid="td-stroke-clear"]').click();
  await page.waitForTimeout(700);
  expect((await readTd(page)).strokes.length).toBe(0);
  await expect(page.locator('[data-testid="td-stroke-clear"]')).toBeDisabled();

  // 비우기도 undo 1단계
  await page.locator('[data-testid="td-undo"]').click();
  await page.waitForTimeout(600);
  expect((await readTd(page)).strokes.length).toBe(2);
});

test('동선 토글 — 끄면 선택도 안 되고, 그리면 자동으로 다시 켜진다', async ({ page }) => {
  const { cx, cy } = await enter(page);

  await page.locator('.td-tool', { hasText: '드로잉' }).click();
  await page.mouse.move(cx - 90, cy);
  await page.mouse.down();
  await page.mouse.move(cx + 90, cy, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(700);
  await expect(page.locator('[data-testid="td-path-toggle"]')).toHaveClass(/is-active/);

  // 끄기 — 데이터는 남고 표시만 사라진다
  await page.locator('[data-testid="td-path-toggle"]').click();
  await page.waitForTimeout(600);
  let td = await readTd(page);
  expect(td.pathVisible).toBe(false);
  expect(td.strokes.length).toBe(1);
  await expect(page.locator('[data-testid="td-path-toggle"]')).not.toHaveClass(/is-active/);

  // 숨김 상태에서는 선택 도구로도 잡히지 않는다
  await page.locator('.td-tool', { hasText: '선택' }).click();
  await page.mouse.click(cx, cy);
  await page.keyboard.press('Delete');
  await page.waitForTimeout(600);
  expect((await readTd(page)).strokes.length).toBe(1);

  // 숨김 상태에서 새로 그리면 레이어가 자동으로 켜진다
  await page.locator('.td-tool', { hasText: '드로잉' }).click();
  await page.mouse.move(cx - 90, cy + 70);
  await page.mouse.down();
  await page.mouse.move(cx + 90, cy + 70, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(700);
  td = await readTd(page);
  expect(td.pathVisible).toBe(true);
  expect(td.strokes.length).toBe(2);
});

test('동선은 바닥이 없어도 그려지고 자동저장된다', async ({ page }) => {
  const { cx, cy } = await enter(page);

  await page.keyboard.press('4');   // 동선 레이어 단축키
  await expect(page.locator('.td-target-path')).toHaveClass(/is-active/);

  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await page.mouse.move(cx + 100, cy + 60, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(800);

  const td = await readTd(page);
  expect(td.geo.length).toBe(0);
  expect(td.strokes.length).toBe(1);
});
