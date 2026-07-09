import { test, expect } from '@playwright/test';

/* 페이싱 곡선 에디터 — 감정 곡선 E2E (50·51강) */

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');
});

async function readPacing(page: any) {
  const raw = await page.evaluate(() => localStorage.getItem('bubble-atelier::pacing'));
  return raw ? JSON.parse(raw) : null;
}

test('진입 → 구간 추가 → 점 찍기 → 저장 → undo', async ({ page }) => {
  await page.getByTestId('enter-pacing').click();
  await expect(page.getByTestId('pacing-shell')).toBeVisible();

  // 구간 추가
  await page.getByRole('button', { name: '구간+' }).click();

  // 점 도구 → 캔버스 클릭 2회
  await page.getByRole('button', { name: '점', exact: true }).click();
  const canvas = page.getByTestId('pacing-canvas');
  const box = (await canvas.boundingBox())!;
  await page.mouse.click(box.x + box.width * 0.3, box.y + box.height * 0.6);
  await page.mouse.click(box.x + box.width * 0.7, box.y + box.height * 0.3);

  // localStorage 자동저장(디바운스 400ms) 반영 대기 후 point 2개 확인
  await page.waitForTimeout(800);
  let ws = await readPacing(page);
  expect(ws.docs[0].points.length).toBe(2);

  // undo → 1개
  await page.keyboard.press('Control+z');
  await page.waitForTimeout(800);
  ws = await readPacing(page);
  expect(ws.docs[0].points.length).toBe(1);
});

test('프리셋 → 조령관 곡선 시드 + 내보내기 버튼', async ({ page }) => {
  await page.getByTestId('enter-pacing').click();
  await expect(page.getByTestId('pacing-shell')).toBeVisible();

  await page.getByTestId('pac-preset').selectOption('joryeonggwan');
  await page.waitForTimeout(800);

  const ws = await readPacing(page);
  const seeded = ws.docs[ws.docs.length - 1];
  expect(seeded.segments.length).toBeGreaterThanOrEqual(4);

  // 내보내기 — PNG/JSON 두 버튼으로 분리되어 있음(각각 노출 확인)
  await expect(page.getByRole('button', { name: 'PNG 내보내기' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'JSON 내보내기' })).toBeVisible();
});

test('구간 선택 → 이름 편집 → 삭제', async ({ page }) => {
  await page.getByTestId('enter-pacing').click();
  await expect(page.getByTestId('pacing-shell')).toBeVisible();

  // 구간 추가 — 기본 '구간 1' + 새 '구간 2'
  await page.getByRole('button', { name: '구간+' }).click();

  // 곡선 하단 구간 라벨 클릭으로 '구간 2' 선택
  await page.getByText('구간 2', { exact: true }).click();

  // 사이드 이름 입력 변경 → blur로 커밋
  const nameInput = page.getByTestId('pac-seg-name');
  await expect(nameInput).toHaveValue('구간 2');
  await nameInput.fill('보스룸');
  await nameInput.blur();

  await page.waitForTimeout(800);
  let ws = await readPacing(page);
  let doc = ws.docs[0];
  const target = doc.segments.find((s: any) => s.name === '보스룸');
  expect(target).toBeTruthy();

  // 폭(체류 비중) 조정
  const widthInput = page.getByTestId('pac-seg-width');
  await widthInput.fill('2.5');
  await widthInput.blur();

  await page.waitForTimeout(800);
  ws = await readPacing(page);
  doc = ws.docs[0];
  expect(doc.segments.find((s: any) => s.name === '보스룸').width).toBe(2.5);

  const beforeCount = doc.segments.length;

  // 구간 삭제 — 개수 감소 확인
  await page.getByTestId('pac-seg-remove').click();
  await page.waitForTimeout(800);
  ws = await readPacing(page);
  doc = ws.docs[0];
  expect(doc.segments.length).toBe(beforeCount - 1);
  expect(doc.segments.find((s: any) => s.name === '보스룸')).toBeFalsy();
});
