import { test, expect } from '@playwright/test';

/* 매싱 스케처 — 등각 화이트박스 E2E */

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');
});

async function readMassing(page: any) {
  const raw = await page.evaluate(() => localStorage.getItem('bubble-atelier::massing'));
  return raw ? JSON.parse(raw) : null;
}

test('박스·기둥·벽판 생성 → 자동저장 → 재진입 유지', async ({ page }) => {
  await page.locator('[data-testid="enter-massing"]').click();
  await expect(page.locator('[data-testid="massing-shell"]')).toBeVisible();
  const canvas = page.locator('[data-testid="massing-canvas"]');
  const box = (await canvas.boundingBox())!;
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;

  // 박스 — 기본 도구. 바닥 드래그
  await page.mouse.move(cx - 80, cy - 20);
  await page.mouse.down();
  await page.mouse.move(cx + 10, cy + 30, { steps: 5 });
  await page.mouse.up();

  // 기둥 — 클릭
  await page.locator('.td-tool', { hasText: '기둥' }).click();
  await page.mouse.click(cx + 120, cy - 40);

  // 벽판 — 드래그
  await page.locator('.td-tool', { hasText: '벽판' }).click();
  await page.mouse.move(cx - 120, cy + 80);
  await page.mouse.down();
  await page.mouse.move(cx + 40, cy + 120, { steps: 5 });
  await page.mouse.up();

  await page.waitForTimeout(800);
  let ws = await readMassing(page);
  let blocks = ws.docs[0].blocks;
  expect(blocks.length).toBe(3);
  expect(blocks[0].kind).toBe('mass');
  expect(blocks[0].h).toBe(3);                       // 기본 높이 3m
  expect(blocks[0].w).toBeGreaterThanOrEqual(1);
  expect(blocks[1].kind).toBe('column');
  expect(blocks[1].w).toBe(1);
  expect(blocks[2].kind).toBe('wall');
  expect(Math.min(blocks[2].w, blocks[2].d)).toBeCloseTo(0.25, 5);   // 얇은 판

  // Esc → 버블 복귀 → 재진입 유지
  await page.keyboard.press('Escape');
  await expect(page.locator('.canvas-shell')).toBeVisible();
  await page.locator('[data-testid="enter-massing"]').click();
  await page.waitForTimeout(400);
  ws = await readMassing(page);
  expect(ws.docs[0].blocks.length).toBe(3);
});

test('v0.2 — 바닥판·머리판·점·명도·회전·마퀴', async ({ page }) => {
  await page.locator('[data-testid="enter-massing"]').click();
  const canvas = page.locator('[data-testid="massing-canvas"]');
  const box = (await canvas.boundingBox())!;
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;

  // 질량 박스 (명도 칠할 대상)
  await page.mouse.move(cx - 130, cy - 30);
  await page.mouse.down();
  await page.mouse.move(cx - 30, cy + 30, { steps: 4 });
  await page.mouse.up();

  // 바닥판 — 파임(inset)
  await page.locator('.td-tool', { hasText: '바닥판' }).click();
  await page.locator('.td-group[aria-label="바닥판 모드"] .td-btn', { hasText: '파임' }).click();
  await page.mouse.move(cx + 40, cy + 60);
  await page.mouse.down();
  await page.mouse.move(cx + 140, cy + 110, { steps: 4 });
  await page.mouse.up();

  // 머리위판 — 높이 4m 띄움
  await page.locator('.td-tool', { hasText: '머리판' }).click();
  await page.locator('.td-group[aria-label="블록 높이"] .td-btn', { hasText: '4m' }).click();
  await page.mouse.move(cx + 30, cy - 110);
  await page.mouse.down();
  await page.mouse.move(cx + 130, cy - 60, { steps: 4 });
  await page.mouse.up();

  // 점 — 공중 2m 부유석
  await page.locator('.td-tool', { hasText: '점' }).click();
  await page.locator('.td-group[aria-label="점 띄움"] .td-btn', { hasText: '2m' }).click();
  await page.mouse.click(cx + 200, cy + 20);

  // 명도 — 견본 3을 질량 박스에 적용
  await page.locator('.td-tool', { hasText: '명도' }).click();
  await page.locator('.td-group[aria-label="명도 견본"] .td-btn', { hasText: '3' }).click();
  await page.mouse.click(cx - 80, cy - 10);

  await page.waitForTimeout(800);
  let ws = await readMassing(page);
  let blocks = ws.docs[0].blocks;
  expect(blocks.length).toBe(4);
  expect(blocks[0].kind).toBe('mass');
  expect(blocks[0].tone).toBe(3);                     // 명도 적용
  expect(blocks[1].kind).toBe('base');
  expect(blocks[1].z).toBeCloseTo(-0.5, 5);           // 파임
  expect(blocks[2].kind).toBe('overhead');
  expect(blocks[2].z).toBe(4);                        // 4m 띄움
  expect(blocks[2].h).toBeCloseTo(0.25, 5);
  expect(blocks[3].kind).toBe('stone');
  expect(blocks[3].z).toBe(2);                        // 부유석

  // 회전 — 시계(E) 한 번, 좌표는 원본 유지·뷰만 변경
  const before = JSON.stringify(blocks);
  await page.locator('.td-btn[title^="시계 회전"]').click();
  await expect(page.locator('[data-testid="ms-dir"]')).toHaveText('뷰 2/4');
  await page.waitForTimeout(800);
  ws = await readMassing(page);
  expect(ws.docs[0].view.dir).toBe(1);
  expect(JSON.stringify(ws.docs[0].blocks)).toBe(before);

  // 원위치 후 마퀴 전체 선택 → 일괄 삭제
  await page.locator('.td-btn[title^="반시계 회전"]').click();
  await page.locator('.td-tool', { hasText: '선택' }).click();
  await page.mouse.move(box.x + 60, box.y + 60);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width - 60, box.y + box.height - 60, { steps: 6 });
  await page.mouse.up();
  await page.keyboard.press('Delete');
  await page.waitForTimeout(800);
  ws = await readMassing(page);
  expect(ws.docs[0].blocks.length).toBe(0);
});

test('직접 조작 — 박스 도구인 채로 기존 블록 드래그 이동', async ({ page }) => {
  await page.locator('[data-testid="enter-massing"]').click();
  const canvas = page.locator('[data-testid="massing-canvas"]');
  const box = (await canvas.boundingBox())!;
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;

  // 박스 생성
  await page.mouse.move(cx - 60, cy - 20);
  await page.mouse.down();
  await page.mouse.move(cx + 40, cy + 40, { steps: 4 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  let ws = await readMassing(page);
  expect(ws.docs[0].blocks.length).toBe(1);
  const b0 = ws.docs[0].blocks[0];

  // 박스 도구 그대로 — 블록 윗면을 드래그하면 새 블록이 아니라 이동
  await page.mouse.move(cx - 10, cy - 10);
  await page.mouse.down();
  await page.mouse.move(cx + 150, cy + 60, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  ws = await readMassing(page);
  expect(ws.docs[0].blocks.length).toBe(1);
  const b1 = ws.docs[0].blocks[0];
  expect(b1.x !== b0.x || b1.y !== b0.y).toBe(true);
});

test('학습 프리셋 — 새 탭 생성 + 복제(Ctrl+C/V)', async ({ page }) => {
  await page.locator('[data-testid="enter-massing"]').click();
  const canvas = page.locator('[data-testid="massing-canvas"]');
  const box = (await canvas.boundingBox())!;
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;

  // 학습 가이드 — 점·선·면 ④ → 새 탭 + 블록 시드
  await page.locator('[data-testid="ms-preset"]').selectOption('pt4');
  await page.waitForTimeout(800);
  let ws = await readMassing(page);
  expect(ws.docs.length).toBe(2);
  const preset = ws.docs[1];
  expect(preset.name).toContain('점·선·면 ④');
  expect(preset.blocks.length).toBeGreaterThanOrEqual(13);   // 점5+선5+면암시3+면2
  expect(preset.blocks.some((b: any) => b.kind === 'overhead')).toBe(true);
  await expect(page.locator('.td-tab')).toHaveCount(2);

  // 복제 — 기둥 하나 놓고 선택 → Ctrl+C/V ×2 (누적 오프셋)
  await page.locator('.td-tool', { hasText: '기둥' }).click();
  await page.mouse.click(cx, cy + 100);
  await page.locator('.td-tool', { hasText: '선택' }).click();
  await page.mouse.click(cx, cy + 90);
  await page.keyboard.press('Control+c');
  await page.keyboard.press('Control+v');
  await page.keyboard.press('Control+v');
  await page.waitForTimeout(800);
  ws = await readMassing(page);
  const blocks = ws.docs[1].blocks;
  const cols = blocks.filter((b: any) => b.kind === 'column' && b.h === 3);
  expect(cols.length).toBeGreaterThanOrEqual(3);
  const last = blocks[blocks.length - 1];
  const prev = blocks[blocks.length - 2];
  expect(last.x - prev.x).toBeCloseTo(2, 5);   // 누적 +2셀
  expect(last.y - prev.y).toBeCloseTo(2, 5);
});

test('높이 프리셋 + 실행취소', async ({ page }) => {
  await page.locator('[data-testid="enter-massing"]').click();
  const canvas = page.locator('[data-testid="massing-canvas"]');
  const box = (await canvas.boundingBox())!;
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;

  // 높이 6m 선택 후 기둥
  await page.locator('.td-group[aria-label="블록 높이"] .td-btn', { hasText: '6m' }).click();
  await page.locator('.td-tool', { hasText: '기둥' }).click();
  await page.mouse.click(cx, cy);
  await page.waitForTimeout(800);
  let ws = await readMassing(page);
  expect(ws.docs[0].blocks[0].h).toBe(6);

  // Ctrl+Z → 블록 취소
  await page.keyboard.press('Control+z');
  await page.waitForTimeout(800);
  ws = await readMassing(page);
  expect(ws.docs[0].blocks.length).toBe(0);
});
