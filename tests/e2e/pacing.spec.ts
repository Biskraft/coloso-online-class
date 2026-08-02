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

test('점을 정중앙에서 드래그해 이동(간헐적 실패 수정 — 핸들러를 그룹에 배치)', async ({ page }) => {
  await page.getByTestId('enter-pacing').click();
  await expect(page.getByTestId('pacing-shell')).toBeVisible();

  const canvas = page.getByTestId('pacing-canvas');
  const box = (await canvas.boundingBox())!;
  const cx = box.x + box.width * 0.5;
  const cy = box.y + box.height * 0.55;

  // 점 1개 추가
  await page.getByRole('button', { name: '점', exact: true }).click();
  await page.mouse.click(cx, cy);
  await page.waitForTimeout(400);
  let ws = await readPacing(page);
  const before = ws.docs[0].points[0].tension as number;

  // 선택 도구로 전환 후, 점의 '정중앙'(가시 r6 원 위)을 눌러 위로 드래그(긴장↑ = y 감소).
  // 예전엔 핸들러가 안쪽 히트 원에만 있어 정중앙(r6)을 누르면 드래그가 시작되지 않았음.
  await page.getByRole('button', { name: '선택', exact: true }).click();
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await page.mouse.move(cx, cy - box.height * 0.3, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(600);

  ws = await readPacing(page);
  expect(ws.docs[0].points.length).toBe(1); // 드래그가 새 점을 만들지 않음
  expect(ws.docs[0].points[0].tension).toBeGreaterThan(before + 10); // 정중앙 클릭으로도 이동됨
});

test('프리셋 → 조령관 곡선 시드 + 내보내기 버튼', async ({ page }) => {
  await page.getByTestId('enter-pacing').click();
  await expect(page.getByTestId('pacing-shell')).toBeVisible();

  await page.getByTestId('pac-preset').selectOption('joryeonggwan');
  await page.waitForTimeout(800);

  const ws = await readPacing(page);
  const seeded = ws.docs[ws.docs.length - 1];
  // 세 공간(시작 지점·지상 섬·공중 섬) + 22비트 곡선
  expect(seeded.segments.length).toBe(3);
  expect(seeded.points.length).toBeGreaterThanOrEqual(20);
  expect(seeded.markers.some((m: any) => m.kind === 'gap')).toBe(true);
  expect(seeded.markers.some((m: any) => m.kind === 'flag')).toBe(true);

  // 내보내기 — PNG/JSON 두 버튼으로 분리되어 있음(각각 노출 확인)
  await expect(page.getByRole('button', { name: 'PNG 내보내기' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'JSON 내보내기' })).toBeVisible();
});

test('내 평면도에서 맵 불러오기 → 배경 맵으로 설정', async ({ page }) => {
  // 1) 평면도(Top-down) 하나 그리기 — 기본 사각형 도구로 방 하나
  await page.getByTestId('enter-topdown').click();
  await expect(page.getByTestId('topdown-shell')).toBeVisible();
  const tb = (await page.getByTestId('topdown-canvas').boundingBox())!;
  const tcx = tb.x + tb.width / 2;
  const tcy = tb.y + tb.height / 2;
  await page.mouse.move(tcx - 100, tcy - 70);
  await page.mouse.down();
  await page.mouse.move(tcx + 60, tcy + 50, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(300);

  // 2) 버블 복귀 → 페이싱 진입
  await page.keyboard.press('Escape');
  await page.getByTestId('enter-pacing').click();
  await expect(page.getByTestId('pacing-shell')).toBeVisible();

  // 3) '내 평면도에서' 셀렉트에 방금 만든 평면도가 뜨고, 선택하면 배경 맵으로 설정됨
  const sel = page.getByTestId('pac-map-topdown');
  await expect(sel).toBeEnabled();
  const firstVal = await sel.locator('option').nth(1).getAttribute('value');
  expect(firstVal).toBeTruthy();
  await sel.selectOption(firstVal!);
  await page.waitForTimeout(600);

  const ws = await readPacing(page);
  expect(ws.docs[0].map).toBeTruthy();
  expect((ws.docs[0].map.dataUrl as string).startsWith('data:image/png')).toBe(true);
  expect(ws.docs[0].map.w).toBeGreaterThan(0);
});

test('구간+ 추가 시 새 구간 자동 선택 → 편집칸 즉시 노출', async ({ page }) => {
  await page.getByTestId('enter-pacing').click();
  await expect(page.getByTestId('pacing-shell')).toBeVisible();

  // 마운트 시 첫 구간(구간 1)이 기본 선택되어 편집칸이 이미 열려 있음
  await expect(page.getByTestId('pac-seg-name')).toHaveValue('구간 1');

  // 구간+ → 새 '구간 2'가 자동 선택되어 편집칸에 곧바로 반영(추가 클릭 불필요)
  await page.getByRole('button', { name: '구간+' }).click();
  await expect(page.getByTestId('pac-seg-name')).toHaveValue('구간 2');
});

test('구간 선택 → 이름 편집 → 삭제', async ({ page }) => {
  await page.getByTestId('enter-pacing').click();
  await expect(page.getByTestId('pacing-shell')).toBeVisible();

  // 구간 추가 — 기본 '구간 1' + 새 '구간 2'
  await page.getByRole('button', { name: '구간+' }).click();

  // 오른쪽 구간 목록에서 '구간 2' 클릭해 선택(선택 경로 이중화 — 곡선 하단 라벨과 동일)
  await page.getByTestId('pac-seg-list').getByText('구간 2', { exact: true }).click();

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
