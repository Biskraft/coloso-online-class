import { test, expect } from '@playwright/test';

/* 흐름 실험실 — push & pull 벡터장 E2E */

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');
});

async function readFlow(page: any) {
  const raw = await page.evaluate(() => localStorage.getItem('bubble-atelier::flow'));
  return raw ? JSON.parse(raw) : null;
}

test('박스 배치 → 자동저장 → 목표 마커 드래그 → 실행취소', async ({ page }) => {
  await page.locator('[data-testid="enter-flow"]').click();
  await expect(page.locator('[data-testid="flow-shell"]')).toBeVisible();
  const canvas = page.locator('[data-testid="flow-canvas"]');
  const box = (await canvas.boundingBox())!;
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;

  // 박스 — 기본 도구. 흐름 한가운데 질량
  await page.mouse.move(cx - 40, cy - 50);
  await page.mouse.down();
  await page.mouse.move(cx + 40, cy + 50, { steps: 5 });
  await page.mouse.up();

  await page.waitForTimeout(800);
  let ws = await readFlow(page);
  const doc = ws.docs[0];
  expect(doc.boxes.length).toBe(1);
  expect(doc.boxes[0].w).toBeGreaterThanOrEqual(1);
  // 시작 ▶ 드래그 — 기본 위치 (8, 64). 화면 좌표로 환산해 끌기
  // fit: 128m 정사각이 캔버스에 맞춰짐 — 중심 (64,64), 1m당 px = fitK*16
  const k = Math.min((box.width - 96) / (128 * 16), (box.height - 96) / (128 * 16));
  const px = (m: number) => box.x + box.width / 2 + (m - 64) * 16 * k;
  const py = (m: number) => box.y + box.height / 2 + (m - 64) * 16 * k;
  await page.locator('.td-tool', { hasText: '선택' }).click();
  await page.mouse.move(px(8), py(64));
  await page.mouse.down();
  await page.mouse.move(px(8), py(44), { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  ws = await readFlow(page);
  expect(ws.docs[0].start.x).toBe(8);
  expect(ws.docs[0].start.y).toBeLessThan(64);   // 위로 끌었음

  // Ctrl+Z — 흐름 스토어 undo 라우팅 (시작 이동 취소)
  await page.keyboard.press('Control+z');
  await page.waitForTimeout(800);
  ws = await readFlow(page);
  expect(ws.docs[0].start.y).toBe(64);

  // Esc → 선택 해제 → 한 번 더 Esc → 버블 복귀 → 재진입 유지
  await page.keyboard.press('Escape');
  await page.waitForTimeout(150);
  await page.keyboard.press('Escape');
  await expect(page.locator('.canvas-shell')).toBeVisible();
  await page.locator('[data-testid="enter-flow"]').click();
  await page.waitForTimeout(400);
  ws = await readFlow(page);
  expect(ws.docs[0].boxes.length).toBe(1);
});

test('직접 조작 — 도구 무관 이동 + 모서리 크기 + 회전 손잡이', async ({ page }) => {
  await page.locator('[data-testid="enter-flow"]').click();
  await expect(page.locator('[data-testid="flow-shell"]')).toBeVisible();
  const canvas = page.locator('[data-testid="flow-canvas"]');
  const box = (await canvas.boundingBox())!;
  const k = Math.min((box.width - 96) / (128 * 16), (box.height - 96) / (128 * 16));
  const px = (m: number) => box.x + box.width / 2 + (m - 64) * 16 * k;
  const py = (m: number) => box.y + box.height / 2 + (m - 64) * 16 * k;

  // 박스 도구로 생성
  await page.mouse.move(px(48), py(56));
  await page.mouse.down();
  await page.mouse.move(px(64), py(72), { steps: 4 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  let ws = await readFlow(page);
  let b = ws.docs[0].boxes[0];
  expect(b.w).toBe(16);

  // 1) 박스 도구인 채로 내부 드래그 → 새 박스가 아니라 이동
  await page.mouse.move(px(b.x + b.w / 2), py(b.y + b.h / 2));
  await page.mouse.down();
  await page.mouse.move(px(b.x + b.w / 2 + 10), py(b.y + b.h / 2), { steps: 4 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  ws = await readFlow(page);
  expect(ws.docs[0].boxes.length).toBe(1);
  expect(ws.docs[0].boxes[0].x).toBe(b.x + 10);
  b = ws.docs[0].boxes[0];

  // 2) 우하단 모서리 핸들 → 크기 변경 (이동 직후라 선택 유지 상태)
  await page.mouse.move(px(b.x + b.w), py(b.y + b.h));
  await page.mouse.down();
  await page.mouse.move(px(b.x + b.w + 8), py(b.y + b.h + 6), { steps: 4 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  ws = await readFlow(page);
  expect(ws.docs[0].boxes[0].w).toBe(b.w + 8);
  expect(ws.docs[0].boxes[0].h).toBe(b.h + 6);
  b = ws.docs[0].boxes[0];

  // 3) 회전 손잡이(윗변 중앙 위 24px) → 오른쪽 90° 위치로 드래그
  const cxS = px(b.x + b.w / 2), cyS = py(b.y + b.h / 2);
  await page.mouse.move(px(b.x + b.w / 2), py(b.y) - 24);
  await page.mouse.down();
  await page.mouse.move(cxS + 120, cyS, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  ws = await readFlow(page);
  const rot = ws.docs[0].boxes[0].rot;
  expect(rot).toBeGreaterThan(1.3);
  expect(rot).toBeLessThan(1.9);
});

test('v0.2 — 기둥·언덕 배치, 시각화 토글, 학습 프리셋', async ({ page }) => {
  await page.locator('[data-testid="enter-flow"]').click();
  await expect(page.locator('[data-testid="flow-shell"]')).toBeVisible();
  const canvas = page.locator('[data-testid="flow-canvas"]');
  const box = (await canvas.boundingBox())!;
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;

  // 기둥 (C) — 클릭·드래그로 반경
  await page.locator('.td-tool', { hasText: '기둥' }).click();
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await page.mouse.move(cx + 40, cy, { steps: 3 });
  await page.mouse.up();
  await page.waitForTimeout(350);   // zundo 스로틀 — 다음 커밋과 병합 방지

  // 언덕 (H)
  await page.locator('.td-tool', { hasText: '언덕' }).click();
  await page.mouse.move(cx - 100, cy + 60);
  await page.mouse.down();
  await page.mouse.move(cx - 40, cy + 60, { steps: 3 });
  await page.mouse.up();
  await page.waitForTimeout(800);

  let ws = await readFlow(page);
  const doc = ws.docs[0];
  expect(doc.discs.length).toBe(2);
  expect(doc.discs[0].kind).toBe('pillar');
  expect(doc.discs[0].r).toBeGreaterThanOrEqual(1);
  expect(doc.discs[1].kind).toBe('hill');
  expect(doc.discs[1].r).toBeGreaterThanOrEqual(3);

  // 시각화 토글 — 법선 / 압력
  await page.locator('[data-testid="fl-normals"]').click();
  await expect(page.locator('[data-testid="fl-normals"]')).toHaveClass(/is-active/);
  await page.locator('[data-testid="fl-pressure"]').click();
  await expect(page.locator('[data-testid="fl-pressure"]')).toHaveClass(/is-active/);

  // 학습 프리셋 — 새 탭으로 시드
  await page.locator('[data-testid="fl-preset"]').selectOption('alley');
  await page.waitForTimeout(800);
  ws = await readFlow(page);
  expect(ws.docs.length).toBe(2);
  const alley = ws.docs[1];
  expect(alley.name).toBe('골목');
  expect(alley.boxes.length).toBe(2);
  expect(ws.currentId).toBe(alley.id);
});
