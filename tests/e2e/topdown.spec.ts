import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

/* 제도판(탑다운) — Scrawl 지오메트리 방식 E2E */

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.clear();
    localStorage.setItem('bubble-atelier::onboarded', '1');
  });
  await page.goto('/');
});

async function readWorkspace(page: any) {
  const raw = await page.evaluate(() => localStorage.getItem('bubble-atelier::workspace'));
  return raw ? JSON.parse(raw) : null;
}

async function enterAndBox(page: any) {
  await page.locator('[data-testid="enter-topdown"]').click();
  await expect(page.locator('[data-testid="topdown-shell"]')).toBeVisible();
  const canvas = page.locator('[data-testid="topdown-canvas"]');
  const box = (await canvas.boundingBox())!;
  return { canvas, box, cx: box.x + box.width / 2, cy: box.y + box.height / 2 };
}

test('사각형 방 드래그 → 자동저장 → 복귀 후 유지', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);

  // 기본 도구가 사각형 — 드래그로 방 하나
  await page.mouse.move(cx - 100, cy - 70);
  await page.mouse.down();
  await page.mouse.move(cx + 60, cy + 50, { steps: 6 });
  await page.mouse.up();

  await page.waitForTimeout(800);
  let ws = await readWorkspace(page);
  const td = ws.projects[0].topdowns[0];
  expect(td.geo.length).toBe(1);
  expect(td.geo[0].op).toBe('union');
  expect(td.geo[0].poly[0].length).toBe(4);

  // Esc → 확인창 → 나가기 → 재진입해도 도형 유지
  await page.keyboard.press('Escape');
  await page.locator('[data-testid="td-exit-ok"]').click();
  await expect(page.locator('.canvas-shell')).toBeVisible();
  await page.locator('[data-testid="enter-topdown"]').click();
  await page.waitForTimeout(600);
  ws = await readWorkspace(page);
  expect(ws.projects[0].topdowns[0].geo.length).toBe(1);
});

test('Esc 나가기 — 확인창 취소는 평면도에 머물고, 나가기만 버블로', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);

  // 작도 중 Esc는 확인창까지 오지 않는다 (진행 중인 점 취소가 먼저 소비)
  await page.locator('.td-tool', { hasText: '다각형' }).click();
  await page.mouse.click(cx - 40, cy - 40);
  await page.mouse.click(cx + 40, cy - 40);
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-testid="td-exit-confirm"]')).toHaveCount(0);
  await expect(page.locator('[data-testid="topdown-shell"]')).toBeVisible();

  // 더 취소할 게 없으면 확인창이 뜬다
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-testid="td-exit-confirm"]')).toBeVisible();

  // 취소 → 평면도 유지
  await page.locator('[data-testid="td-exit-cancel"]').click();
  await expect(page.locator('[data-testid="td-exit-confirm"]')).toHaveCount(0);
  await expect(page.locator('[data-testid="topdown-shell"]')).toBeVisible();

  // 확인창에서 Esc → 취소로 동작
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-testid="td-exit-confirm"]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('[data-testid="td-exit-confirm"]')).toHaveCount(0);
  await expect(page.locator('[data-testid="topdown-shell"]')).toBeVisible();

  // 나가기 → 버블 복귀
  await page.keyboard.press('Escape');
  await page.locator('[data-testid="td-exit-ok"]').click();
  await expect(page.locator('.canvas-shell')).toBeVisible();
});

test('PNG 내보내기 — 2048×2048로 나온다', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);
  await page.mouse.move(cx - 100, cy - 70);
  await page.mouse.down();
  await page.mouse.move(cx + 60, cy + 50, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(400);

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.td-group .td-btn', { hasText: 'PNG' }).click(),
  ]);
  const path = await download.path();
  const buf = await readFile(path!);

  // PNG IHDR — 8바이트 시그니처 + 4길이 + 4타입 뒤에 width/height가 빅엔디안 4바이트씩
  expect(buf.subarray(1, 4).toString()).toBe('PNG');
  expect(buf.readUInt32BE(16)).toBe(2048);
  expect(buf.readUInt32BE(20)).toBe(2048);

  // 배경 투명 + 네 모서리 ㄱ자 표시 확인 — 실제 픽셀을 읽는다
  const probe = await page.evaluate(async (data) => {
    const img = new Image();
    await new Promise((r) => { img.onload = r; img.src = 'data:image/png;base64,' + data; });
    const cv = document.createElement('canvas');
    cv.width = img.naturalWidth; cv.height = img.naturalHeight;
    const ctx = cv.getContext('2d')!;
    ctx.drawImage(img, 0, 0);
    const px = (x: number, y: number) => Array.from(ctx.getImageData(x, y, 1, 1).data);
    // 모서리 표시 주변 사각 영역에서 불투명 잉크 픽셀 수
    const inkNear = (x: number, y: number) => {
      const d = ctx.getImageData(x - 70, y - 70, 140, 140).data;
      let n = 0;
      for (let i = 0; i < d.length; i += 4) if (d[i + 3]! > 200 && d[i]! < 120) n++;
      return n;
    };
    const W = cv.width, H = cv.height;
    return {
      // 캔버스 절대 모서리 = 아무것도 없는 자리 → 완전 투명
      cornerAlpha: [px(0, 0)[3], px(W - 1, 0)[3], px(0, H - 1)[3], px(W - 1, H - 1)[3]],
      marks: [inkNear(41, 41), inkNear(W - 41, 41), inkNear(41, H - 41), inkNear(W - 41, H - 41)],
    };
  }, buf.toString('base64'));

  expect(probe.cornerAlpha).toEqual([0, 0, 0, 0]);
  for (const n of probe.marks) expect(n).toBeGreaterThan(500);
});

test('빼기 모드(E) → subtract 도형 → 실행취소', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);

  // 방 하나
  await page.mouse.move(cx - 120, cy - 80);
  await page.mouse.down();
  await page.mouse.move(cx + 120, cy + 80, { steps: 6 });
  await page.mouse.up();

  // 빼기 토글 (버튼) 후 내부에 작은 사각형 → 파임
  await page.locator('.td-erase').click();
  await expect(page.locator('.td-erase')).toHaveClass(/is-active/);
  await page.mouse.move(cx - 30, cy - 20);
  await page.mouse.down();
  await page.mouse.move(cx + 30, cy + 20, { steps: 4 });
  await page.mouse.up();

  await page.waitForTimeout(800);
  let ws = await readWorkspace(page);
  let geo = ws.projects[0].topdowns[0].geo;
  expect(geo.length).toBe(2);
  expect(geo[1].op).toBe('subtract');

  // Ctrl+Z → 빼기만 취소
  await page.keyboard.press('Control+z');
  await page.waitForTimeout(800);
  ws = await readWorkspace(page);
  expect(ws.projects[0].topdowns[0].geo.length).toBe(1);
});

test('다각형·복도 도구 + 평면도 탭 추가', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);

  // 다각형 — 점 3개 클릭 후 Enter
  await page.locator('.td-tool', { hasText: '다각형' }).click();
  await page.mouse.click(cx - 80, cy - 60);
  await page.mouse.click(cx + 40, cy - 90);
  await page.mouse.click(cx + 10, cy + 30);
  await page.keyboard.press('Enter');

  // 복도 — 점 2개 후 Enter
  await page.locator('.td-tool', { hasText: '복도' }).click();
  await page.mouse.click(cx + 10, cy + 30);
  await page.mouse.click(cx + 150, cy + 90);
  await page.keyboard.press('Enter');

  await page.waitForTimeout(800);
  const ws = await readWorkspace(page);
  const geo = ws.projects[0].topdowns[0].geo;
  expect(geo.length).toBe(2);
  expect(geo[0].poly[0].length).toBe(3);          // 삼각형
  expect(geo[1].poly[0].length).toBeGreaterThanOrEqual(4); // 복도 — 각진 사각 마감

  // 탭 추가
  await page.locator('.td-tab-add').click();
  await expect(page.locator('.td-tab')).toHaveCount(2);
});

test('문 도구 — 벽 스냅 배치 → 실행취소', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);

  // 방 하나
  await page.mouse.move(cx - 100, cy - 70);
  await page.mouse.down();
  await page.mouse.move(cx + 60, cy + 50, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(400);

  // 문 도구 → 위쪽 벽 근처 클릭
  await page.locator('.td-tool', { hasText: '문' }).click();
  await page.mouse.click(cx - 20, cy - 70);

  await page.waitForTimeout(800);
  let ws = await readWorkspace(page);
  const td = ws.projects[0].topdowns[0];
  expect(td.doors.length).toBe(1);
  expect(td.doors[0].w).toBe(2);   // 기본 문 폭 2셀

  // Ctrl+Z → 문만 취소, 방은 유지
  await page.keyboard.press('Control+z');
  await page.waitForTimeout(800);
  ws = await readWorkspace(page);
  expect(ws.projects[0].topdowns[0].doors.length).toBe(0);
  expect(ws.projects[0].topdowns[0].geo.length).toBe(1);
});

test('버블 오버레이 — 토글·투명도 저장', async ({ page }) => {
  await enterAndBox(page);

  // 기본: 표시 on, 50%
  await expect(page.locator('.td-overlay')).toHaveClass(/is-active/);

  // 투명도 30%로 → 숨김
  await page.locator('.td-overlay-range').fill('30');
  await page.locator('.td-overlay').click();
  await page.waitForTimeout(800);
  let ws = await readWorkspace(page);
  let ov = ws.projects[0].topdowns[0].overlay;
  expect(ov.visible).toBe(false);
  expect(ov.opacity).toBeCloseTo(0.3, 5);

  // 다시 켜면 투명도 유지
  await page.locator('.td-overlay').click();
  await page.waitForTimeout(800);
  ws = await readWorkspace(page);
  ov = ws.projects[0].topdowns[0].overlay;
  expect(ov.visible).toBe(true);
  expect(ov.opacity).toBeCloseTo(0.3, 5);
});

test('계단·텍스트 도구 + 기본 256 그리드', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);

  // 계단 — 드래그 (방향 = 올라가는 방향)
  await page.locator('.td-tool', { hasText: '계단' }).click();
  await page.mouse.move(cx - 60, cy);
  await page.mouse.down();
  await page.mouse.move(cx + 60, cy, { steps: 4 });
  await page.mouse.up();

  // 텍스트 — 클릭 → 입력 → Enter
  await page.locator('.td-tool', { hasText: '텍스트' }).click();
  await page.mouse.click(cx, cy - 60);
  await page.locator('[data-testid="td-text-input"]').fill('보스방');
  await page.keyboard.press('Enter');

  await page.waitForTimeout(800);
  const ws = await readWorkspace(page);
  const td = ws.projects[0].topdowns[0];
  expect(td.grid[0]).toBe(256);            // 기본 그리드 256×256
  expect(td.stairs.length).toBe(1);
  expect(td.stairs[0].w).toBe(2);
  expect(td.texts.length).toBe(1);
  expect(td.texts[0].text).toBe('보스방');
});

test('마퀴 다중 선택 — 드래그로 두 방 선택 후 일괄 삭제', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);

  // 떨어진 방 두 개
  await page.mouse.move(cx - 200, cy - 120);
  await page.mouse.down();
  await page.mouse.move(cx - 80, cy - 30, { steps: 4 });
  await page.mouse.up();
  await page.mouse.move(cx + 60, cy + 10);
  await page.mouse.down();
  await page.mouse.move(cx + 200, cy + 120, { steps: 4 });
  await page.mouse.up();
  await page.waitForTimeout(500);
  let ws = await readWorkspace(page);
  expect(ws.projects[0].topdowns[0].geo.length).toBe(2);

  // 선택 도구 → 빈 곳에서 두 방을 모두 덮는 마퀴 드래그 → Delete
  await page.locator('.td-tool', { hasText: '선택' }).click();
  await page.mouse.move(cx - 260, cy - 170);
  await page.mouse.down();
  await page.mouse.move(cx + 260, cy + 170, { steps: 6 });
  await page.mouse.up();
  await page.keyboard.press('Delete');
  await page.waitForTimeout(800);
  ws = await readWorkspace(page);
  expect(ws.projects[0].topdowns[0].geo.length).toBe(0);
});

test('오버레이 조정 — 드래그 이동·스케일·리셋 저장', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);

  // 조정 모드 켜고 캔버스 드래그 → tx/ty 변경
  await page.locator('.td-cal').click();
  await expect(page.locator('.td-cal')).toHaveClass(/is-active/);
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await page.mouse.move(cx + 80, cy + 40, { steps: 5 });
  await page.mouse.up();

  // 스케일 150%
  await page.locator('.td-cal-range').fill('150');
  await page.waitForTimeout(800);
  let ws = await readWorkspace(page);
  let ov = ws.projects[0].topdowns[0].overlay;
  expect(ov.tx).toBeGreaterThan(0);
  expect(ov.scale).toBeCloseTo(1.5, 5);

  // 리셋 → 자동 맞춤 복귀
  await page.locator('.td-btn', { hasText: '리셋' }).click();
  await page.waitForTimeout(800);
  ws = await readWorkspace(page);
  ov = ws.projects[0].topdowns[0].overlay;
  expect(ov.tx).toBe(0);
  expect(ov.scale).toBe(1);
});

test('복사/붙여넣기(Ctrl+C/V) + 실행취소 버튼(↶↷)', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);

  // 방 하나 → 선택 → 복사 → 붙여넣기
  await page.mouse.move(cx - 100, cy - 70);
  await page.mouse.down();
  await page.mouse.move(cx + 60, cy + 50, { steps: 5 });
  await page.mouse.up();
  // 히스토리 스냅샷은 250ms throttle로 묶인다 — 방 그리기와 붙여넣기를
  // 서로 다른 undo 단계로 만들려면 그 창을 넘겨야 한다
  await page.waitForTimeout(300);
  await page.locator('.td-tool', { hasText: '선택' }).click();
  await page.mouse.click(cx - 20, cy - 10);
  await page.keyboard.press('Control+c');
  await page.keyboard.press('Control+v');
  await page.waitForTimeout(800);

  let ws = await readWorkspace(page);
  let geo = ws.projects[0].topdowns[0].geo;
  expect(geo.length).toBe(2);
  // 복제본은 +2셀 오프셋
  expect(geo[1].poly[0][0][0] - geo[0].poly[0][0][0]).toBeCloseTo(2, 5);
  expect(geo[1].poly[0][0][1] - geo[0].poly[0][0][1]).toBeCloseTo(2, 5);

  // ↶ 버튼 → 붙여넣기 취소, ↷ 버튼 → 복귀
  await page.locator('[data-testid="td-undo"]').click();
  await page.waitForTimeout(800);
  ws = await readWorkspace(page);
  expect(ws.projects[0].topdowns[0].geo.length).toBe(1);
  await page.locator('[data-testid="td-redo"]').click();
  await page.waitForTimeout(800);
  ws = await readWorkspace(page);
  expect(ws.projects[0].topdowns[0].geo.length).toBe(2);
});

test('마커 도구 — 3종 배치 → 저장 → 마퀴 일괄 삭제', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);

  await page.locator('.td-tool', { hasText: '마커' }).click();
  // 기본 시작 → 클릭, 보상 → 클릭, 적 → 클릭
  await page.mouse.click(cx - 100, cy - 40);
  await page.locator('.td-group[aria-label="마커 종류"] .td-btn', { hasText: '보상' }).click();
  await page.mouse.click(cx, cy);
  await page.locator('.td-group[aria-label="마커 종류"] .td-btn', { hasText: '적' }).click();
  await page.mouse.click(cx + 100, cy + 40);

  await page.waitForTimeout(800);
  let ws = await readWorkspace(page);
  const markers = ws.projects[0].topdowns[0].markers;
  expect(markers.length).toBe(3);
  expect(markers.map((m: any) => m.kind)).toEqual(['start', 'reward', 'enemy']);

  // 마퀴로 전부 선택 → Delete
  await page.locator('.td-tool', { hasText: '선택' }).click();
  await page.mouse.move(cx - 160, cy - 100);
  await page.mouse.down();
  await page.mouse.move(cx + 160, cy + 100, { steps: 5 });
  await page.mouse.up();
  await page.keyboard.press('Delete');
  await page.waitForTimeout(800);
  ws = await readWorkspace(page);
  expect(ws.projects[0].topdowns[0].markers.length).toBe(0);
});

test('마커는 바닥·구조가 없어도 배치되고 화면에 그려진다', async ({ page }) => {
  // 바닥을 그리지 않은 빈 제도판에서 시작
  await page.locator('[data-testid="enter-topdown"]').click();
  await expect(page.locator('[data-testid="topdown-shell"]')).toBeVisible();
  const canvas = page.locator('[data-testid="topdown-canvas"]');
  const box = (await canvas.boundingBox())!;
  const cx = box.x + box.width / 2, cy = box.y + box.height / 2;

  await page.mouse.move(cx, cy);
  for (let i = 0; i < 4; i++) await page.mouse.wheel(0, -240);
  await page.waitForTimeout(200);

  await page.locator('.td-tool', { hasText: '마커' }).click();
  await page.mouse.click(cx, cy);
  await page.waitForTimeout(800);

  const td = (await readWorkspace(page)).projects[0].topdowns[0];
  expect(td.geo.length).toBe(0);
  expect((td.struct ?? []).length).toBe(0);
  expect(td.markers.length).toBe(1);

  // 저장만이 아니라 실제로 그려지는지 — 클릭 주변에서 시작 마커색(--moss #6B8E5A) 픽셀을 찾는다
  const mossPixels = await page.evaluate(([px, py]) => {
    const cv = document.querySelector('[data-testid="topdown-canvas"]') as HTMLCanvasElement;
    const r = cv.getBoundingClientRect();
    const dpr = cv.width / r.width;
    const half = Math.round(60 * dpr);
    const x0 = Math.max(0, Math.round((px - r.left) * dpr) - half);
    const y0 = Math.max(0, Math.round((py - r.top) * dpr) - half);
    const d = cv.getContext('2d')!.getImageData(x0, y0, half * 2, half * 2).data;
    let n = 0;
    for (let i = 0; i < d.length; i += 4) {
      if (Math.abs(d[i]! - 107) < 14 && Math.abs(d[i + 1]! - 142) < 14 && Math.abs(d[i + 2]! - 90) < 14) n++;
    }
    return n;
  }, [cx, cy]);
  expect(mossPixels).toBeGreaterThan(200);
});

function bboxOf(poly: number[][][]) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const ring of poly) {
    for (const [x, y] of ring) {
      x0 = Math.min(x0, x!); x1 = Math.max(x1, x!);
      y0 = Math.min(y0, y!); y1 = Math.max(y1, y!);
    }
  }
  return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 };
}

test('도형 크기·회전 핸들 — 모서리 스케일 + 손잡이 90° 회전', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);

  // 방 그리기 (rect 기본)
  await page.mouse.move(cx - 80, cy - 60);
  await page.mouse.down();
  await page.mouse.move(cx + 40, cy + 20, { steps: 4 });
  await page.mouse.up();
  await page.waitForTimeout(400);

  // 선택 → 핸들 표시
  await page.locator('.td-tool', { hasText: '선택' }).click();
  await page.mouse.click(cx - 20, cy - 20);
  await page.waitForTimeout(300);
  let ws = await readWorkspace(page);
  const bb0 = bboxOf(ws.projects[0].topdowns[0].geo[0].poly);

  // 우하단 모서리 핸들 → 키우기
  await page.mouse.move(cx + 40, cy + 20);
  await page.mouse.down();
  await page.mouse.move(cx + 120, cy + 70, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  ws = await readWorkspace(page);
  const bb1 = bboxOf(ws.projects[0].topdowns[0].geo[0].poly);
  expect(bb1.x1).toBeGreaterThan(bb0.x1);
  expect(bb1.y1).toBeGreaterThan(bb0.y1);
  // 스냅 1셀(기본) — 늘린 모서리는 정수 셀에 떨어진다
  expect(Math.abs(bb1.x1 - Math.round(bb1.x1))).toBeLessThan(1e-6);
  expect(Math.abs(bb1.y1 - Math.round(bb1.y1))).toBeLessThan(1e-6);

  // 회전 손잡이(위 변 중앙 위 24px) → 오른쪽 90° 위치로 드래그
  const mxS = cx + 20, cyS = cy + 5;            // 스케일 후 bbox 중심 (화면)
  await page.mouse.move(mxS, cy - 60 - 24);
  await page.mouse.down();
  await page.mouse.move(mxS + 150, cyS, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  ws = await readWorkspace(page);
  const bb2 = bboxOf(ws.projects[0].topdowns[0].geo[0].poly);
  // 90° 회전 — bbox 가로/세로가 뒤바뀐다 (셀 단위 오차 허용)
  expect(Math.abs(bb2.w - bb1.h)).toBeLessThan(1.5);
  expect(Math.abs(bb2.h - bb1.w)).toBeLessThan(1.5);
});

test('회전 후 스케일 — 로컬 축 기준이라 직각 유지(찌그러짐 없음)', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);
  const canvas = page.locator('canvas.td-canvas');
  const box = (await canvas.boundingBox())!;
  const k = Math.min((box.width - 96) / (256 * 16), (box.height - 96) / (256 * 16));
  const px = (m: number) => box.x + box.width / 2 + (m - 128) * 16 * k;
  const py = (m: number) => box.y + box.height / 2 + (m - 128) * 16 * k;
  const rot = (r: number, x: number, y: number): [number, number] =>
    [x * Math.cos(r) - y * Math.sin(r), x * Math.sin(r) + y * Math.cos(r)];

  // 방 그리기 + 선택
  await page.mouse.move(cx - 80, cy - 50);
  await page.mouse.down();
  await page.mouse.move(cx + 40, cy + 30, { steps: 4 });
  await page.mouse.up();
  await page.waitForTimeout(400);
  await page.locator('.td-tool', { hasText: '선택' }).click();
  await page.mouse.click(cx - 20, cy - 10);
  await page.waitForTimeout(300);

  // 30° 회전 — 손잡이를 중심 기준 -60° 방향으로
  await page.mouse.move(cx - 20, cy - 50 - 24);
  await page.mouse.down();
  await page.mouse.move(cx - 20 + 75, cy - 10 - 130, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  let ws = await readWorkspace(page);
  let shape = ws.projects[0].topdowns[0].geo[0];
  expect(Math.abs(shape.rot - Math.PI / 6)).toBeLessThan(0.01);

  // 회전된 로컬 bbox의 우하단 모서리 핸들을 잡아 늘리기
  const inv = shape.poly[0].map(([x, y]: number[]) => rot(-shape.rot, x!, y!));
  const lx1 = Math.max(...inv.map((p: number[]) => p[0]!));
  const ly1 = Math.max(...inv.map((p: number[]) => p[1]!));
  const [hwx, hwy] = rot(shape.rot, lx1, ly1);          // 핸들 월드 좌표 (셀)
  await page.mouse.move(px(hwx), py(hwy));
  await page.mouse.down();
  await page.mouse.move(px(hwx) + 60, py(hwy) + 45, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(800);

  // 4 모서리가 모두 직각 유지 — 찌그러짐 없음
  ws = await readWorkspace(page);
  shape = ws.projects[0].topdowns[0].geo[0];
  const ring: number[][] = shape.poly[0];
  const pts = (ring.length > 4 &&
    Math.abs(ring[0]![0]! - ring[ring.length - 1]![0]!) < 1e-9 &&
    Math.abs(ring[0]![1]! - ring[ring.length - 1]![1]!) < 1e-9)
    ? ring.slice(0, -1) : ring;
  expect(pts.length).toBe(4);
  for (let i = 0; i < 4; i++) {
    const a = pts[i]!, b = pts[(i + 1) % 4]!, c = pts[(i + 2) % 4]!;
    const e1 = [b[0]! - a[0]!, b[1]! - a[1]!], e2 = [c[0]! - b[0]!, c[1]! - b[1]!];
    const dot = Math.abs(e1[0]! * e2[0]! + e1[1]! * e2[1]!);
    const norm = Math.hypot(...e1 as [number, number]) * Math.hypot(...e2 as [number, number]);
    expect(dot / norm).toBeLessThan(1e-6);
  }
});

test('직접 조작 — 사각형 도구인 채로 방 이동 + 모서리 크기', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);

  // 방 그리기
  await page.mouse.move(cx - 80, cy - 60);
  await page.mouse.down();
  await page.mouse.move(cx + 40, cy + 20, { steps: 4 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  let ws = await readWorkspace(page);
  const bb0 = bboxOf(ws.projects[0].topdowns[0].geo[0].poly);

  // 사각형 도구 그대로 — 방 내부 드래그 = 새 도형이 아니라 이동
  await page.mouse.move(cx - 20, cy - 20);
  await page.mouse.down();
  await page.mouse.move(cx + 60, cy + 30, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  ws = await readWorkspace(page);
  expect(ws.projects[0].topdowns[0].geo.length).toBe(1);
  const bb1 = bboxOf(ws.projects[0].topdowns[0].geo[0].poly);
  expect(bb1.x0).toBeGreaterThan(bb0.x0);
  expect(bb1.y0).toBeGreaterThan(bb0.y0);

  // 여전히 사각형 도구 — 우하단 모서리 핸들로 크기 조정 (이동 후 선택 유지 상태)
  await page.mouse.move(cx + 120, cy + 70);
  await page.mouse.down();
  await page.mouse.move(cx + 170, cy + 100, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  ws = await readWorkspace(page);
  expect(ws.projects[0].topdowns[0].geo.length).toBe(1);
  const bb2 = bboxOf(ws.projects[0].topdowns[0].geo[0].poly);
  expect(bb2.w).toBeGreaterThan(bb1.w);
  expect(bb2.h).toBeGreaterThan(bb1.h);
});

test('빈 곳 클릭 → 선택 해제 (사각형 도구에서도 핸들 비활성)', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);

  // 방 그리기 (그린 직후 선택 상태 — 모서리에 크기 핸들)
  await page.mouse.move(cx - 80, cy - 60);
  await page.mouse.down();
  await page.mouse.move(cx + 40, cy + 20, { steps: 4 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  let ws = await readWorkspace(page);
  const bb0 = bboxOf(ws.projects[0].topdowns[0].geo[0].poly);

  // 빈 곳 클릭 → 선택 해제 (사각형 도구를 그대로 둔 채)
  await page.mouse.click(cx + 220, cy - 150);
  await page.waitForTimeout(300);

  // 해제되었으므로 우하단 모서리는 더 이상 크기 핸들이 아님 →
  // 같은 자리를 드래그해도 원래 방은 리사이즈되지 않는다.
  await page.mouse.move(cx + 40, cy + 20);
  await page.mouse.down();
  await page.mouse.move(cx + 120, cy + 80, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  ws = await readWorkspace(page);
  const geo = ws.projects[0].topdowns[0].geo;
  // 원래 치수(±2)의 방이 그대로 존재 = 핸들 비활성(선택 해제됨).
  // 해제가 안 됐다면 핸들 드래그로 w·h가 커져 일치하는 도형이 없어 실패.
  const original = geo.find((g: any) => {
    const b = bboxOf(g.poly);
    return Math.abs(b.w - bb0.w) < 2 && Math.abs(b.h - bb0.h) < 2;
  });
  expect(original).toBeTruthy();
});

test('직접 조작 — 마커 도구인 채로 기존 마커 드래그 이동', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);

  await page.locator('.td-tool', { hasText: '마커' }).click();
  await page.mouse.click(cx - 60, cy);
  await page.waitForTimeout(800);
  let ws = await readWorkspace(page);
  expect(ws.projects[0].topdowns[0].markers.length).toBe(1);
  const m0 = ws.projects[0].topdowns[0].markers[0];

  // 마커 도구 그대로 — 방금 놓은 마커를 드래그하면 새 마커가 아니라 이동
  await page.mouse.move(cx - 60, cy);
  await page.mouse.down();
  await page.mouse.move(cx + 80, cy + 50, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(800);
  ws = await readWorkspace(page);
  const markers = ws.projects[0].topdowns[0].markers;
  expect(markers.length).toBe(1);
  expect(markers[0].x).toBeGreaterThan(m0.x);
  expect(markers[0].y).toBeGreaterThan(m0.y);
});

test('내부 구조 레이어 — 구조·엄폐 그리기 + 구조 벽에 문 + 일괄 삭제', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);
  // 256 그리드라 확대 후 작업
  await page.mouse.move(cx, cy);
  for (let i = 0; i < 4; i++) await page.mouse.wheel(0, -240);
  await page.waitForTimeout(200);

  // 바닥 방
  await page.mouse.move(cx - 160, cy - 110);
  await page.mouse.down();
  await page.mouse.move(cx + 160, cy + 110, { steps: 5 });
  await page.mouse.up();

  // 구조 — 내부 벽 블록 (잉크 솔리드)
  await page.locator('.td-group[aria-label="그리기 대상"] .td-btn', { hasText: '구조' }).click();
  await page.mouse.move(cx - 20, cy - 80);
  await page.mouse.down();
  await page.mouse.move(cx + 20, cy + 60, { steps: 5 });
  await page.mouse.up();

  // 엄폐 — 낮은 상자
  await page.locator('.td-group[aria-label="그리기 대상"] .td-btn', { hasText: '엄폐' }).click();
  await page.mouse.move(cx - 120, cy + 20);
  await page.mouse.down();
  await page.mouse.move(cx - 80, cy + 60, { steps: 4 });
  await page.mouse.up();

  // 문 — 구조 벽(왼쪽 모서리)에 부착
  await page.locator('.td-tool', { hasText: '문' }).click();
  await page.mouse.click(cx - 20, cy - 10);

  await page.waitForTimeout(800);
  let ws = await readWorkspace(page);
  let td = ws.projects[0].topdowns[0];
  expect(td.geo.length).toBe(1);
  expect(td.struct.length).toBe(2);
  expect(td.struct[0].low).toBe(false);   // 구조
  expect(td.struct[1].low).toBe(true);    // 엄폐
  expect(td.doors.length).toBe(1);        // 구조 벽에도 문이 달린다

  // 마퀴 전체 선택 → 일괄 삭제 (구조 포함)
  await page.locator('.td-tool', { hasText: '선택' }).click();
  await page.mouse.move(cx - 220, cy - 160);
  await page.mouse.down();
  await page.mouse.move(cx + 220, cy + 160, { steps: 6 });
  await page.mouse.up();
  await page.keyboard.press('Delete');
  await page.waitForTimeout(800);
  ws = await readWorkspace(page);
  td = ws.projects[0].topdowns[0];
  expect(td.geo.length).toBe(0);
  expect(td.struct.length).toBe(0);
});

test('넓은 복도의 꺾임은 뾰족하게 튀지 않는다 (폭 8m, 90° 회전)', async ({ page }) => {
  const { box } = await enterAndBox(page);

  // 진입 직후 화면 맞춤 변환 — 클릭 지점의 월드 좌표를 역산하기 위해
  const CELL = 16, GRID = 256, FIT = 48;
  const W = GRID * CELL;
  const k = Math.max(0.02, Math.min(12, Math.min((box.width - FIT * 2) / W, (box.height - FIT * 2) / W)));
  const ox = box.x + (box.width - W * k) / 2;
  const oy = box.y + (box.height - W * k) / 2;
  const S = (wx: number, wy: number) => ({ x: ox + wx * CELL * k, y: oy + wy * CELL * k });

  await page.locator('.td-tool', { hasText: '복도' }).click();
  await page.locator('.td-group[aria-label="복도 폭"] .td-btn', { hasText: '8m' }).click();

  // ㄱ자 경로 — 90° 꺾임 하나
  const path: [number, number][] = [[80, 100], [140, 100], [140, 170]];
  for (const [wx, wy] of path) {
    const p = S(wx, wy);
    await page.mouse.click(p.x, p.y);
  }
  await page.keyboard.press('Enter');
  await page.waitForTimeout(800);

  const ws = await readWorkspace(page);
  const poly = ws.projects[0].topdowns[0].geo[0].poly[0] as number[][];
  expect(poly.length).toBeGreaterThan(4);

  // 사각 마감을 감안해 중심선을 양 끝 half(=4)만큼 연장한 뒤,
  // 모든 꼭짓점이 중심선에서 half 이내인지 본다. 뿔이 있으면 half*√2까지 벌어진다.
  const half = 4;
  const line: [number, number][] = [[80 - half, 100], [140, 100], [140, 170 + half]];
  const distToSeg = (px: number, py: number, a: number[], b: number[]) => {
    const dx = b[0]! - a[0]!, dy = b[1]! - a[1]!;
    const l2 = dx * dx + dy * dy;
    const t = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - a[0]!) * dx + (py - a[1]!) * dy) / l2));
    return Math.hypot(px - (a[0]! + t * dx), py - (a[1]! + t * dy));
  };
  let worst = 0;
  for (const [px, py] of poly) {
    let d = Infinity;
    for (let i = 1; i < line.length; i++) d = Math.min(d, distToSeg(px!, py!, line[i - 1]!, line[i]!));
    worst = Math.max(worst, d);
  }
  expect(worst).toBeLessThan(half + 0.15);
});

test('구조·엄폐는 바닥 밖에서도 그려진다', async ({ page }) => {
  const { canvas, cx, cy } = await enterAndBox(page);
  await page.mouse.move(cx, cy);
  for (let i = 0; i < 4; i++) await page.mouse.wheel(0, -240);
  await page.waitForTimeout(200);

  /** 화면 좌표의 캔버스 픽셀을 읽는다 — 렌더 결과를 직접 확인 */
  const sample = (sx: number, sy: number) => page.evaluate(([px, py]) => {
    const cv = document.querySelector('[data-testid="topdown-canvas"]') as HTMLCanvasElement;
    const r = cv.getBoundingClientRect();
    const dpr = cv.width / r.width;
    const d = cv.getContext('2d')!.getImageData(
      Math.round((px - r.left) * dpr), Math.round((py - r.top) * dpr), 1, 1).data;
    return [d[0], d[1], d[2]];
  }, [sx, sy]);

  // 바닥은 왼쪽에만
  await page.mouse.move(cx - 260, cy - 60);
  await page.mouse.down();
  await page.mouse.move(cx - 60, cy + 60, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(300);

  // 구조 — 바닥 바깥(오른쪽)에 블록
  await page.locator('.td-group[aria-label="그리기 대상"] .td-btn', { hasText: '구조' }).click();
  await page.mouse.move(cx + 80, cy - 40);
  await page.mouse.down();
  await page.mouse.move(cx + 200, cy + 40, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(500);

  // 엄폐 — 같은 바깥 영역에 블록
  await page.locator('.td-group[aria-label="그리기 대상"] .td-btn', { hasText: '엄폐' }).click();
  await page.mouse.move(cx + 80, cy + 90);
  await page.mouse.down();
  await page.mouse.move(cx + 200, cy + 150, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(600);

  const ws = await readWorkspace(page);
  expect(ws.projects[0].topdowns[0].struct.length).toBe(2);

  // 구조 블록 한가운데 = 잉크 솔리드 (어두움)
  const inStruct = await sample(cx + 140, cy);
  expect(Math.max(...inStruct)).toBeLessThan(90);

  // 엄폐 블록 한가운데 = 엄폐 채움색(--paper-300 #DCD2BD). 배경(--paper-200)도 잉크도 아니다
  const inCover = await sample(cx + 140, cy + 120);
  for (const [i, want] of [220, 210, 189].entries()) {
    expect(Math.abs(inCover[i]! - want)).toBeLessThan(12);
  }
});

test('구역 채움 — 안전·위험 다각형 + 실행취소', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);

  // 바닥 방
  await page.mouse.move(cx - 150, cy - 100);
  await page.mouse.down();
  await page.mouse.move(cx + 150, cy + 100, { steps: 5 });
  await page.mouse.up();

  // 구역 — 안전(기본) 삼각형
  await page.locator('.td-tool', { hasText: '구역' }).click();
  await page.mouse.click(cx - 120, cy - 60);
  await page.mouse.click(cx - 20, cy - 70);
  await page.mouse.click(cx - 70, cy + 40);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(350);   // undo 스냅샷 분리 (zundo 스로틀 250ms)

  // 구역 — 위험 삼각형, 마지막 점은 더블클릭으로 닫기
  await page.locator('.td-group[aria-label="구역 종류"] .td-btn', { hasText: '위험' }).click();
  await page.mouse.click(cx + 20, cy - 50);
  await page.mouse.click(cx + 120, cy - 40);
  await page.mouse.dblclick(cx + 70, cy + 60);
  await page.keyboard.press('Enter');   // 병렬 부하로 dblclick 임계를 놓친 경우의 안전망

  await page.waitForTimeout(800);
  let ws = await readWorkspace(page);
  let zones = ws.projects[0].topdowns[0].zones;
  expect(zones.length).toBe(2);
  expect(zones[0].kind).toBe('safe');
  expect(zones[1].kind).toBe('danger');
  expect(zones[0].poly[0].length).toBe(3);
  expect(zones[1].poly[0].length).toBe(3);   // 더블클릭 중복 점이 제거된 깨끗한 삼각형

  // Ctrl+Z → 위험 구역만 취소
  await page.keyboard.press('Control+z');
  await page.waitForTimeout(800);
  ws = await readWorkspace(page);
  expect(ws.projects[0].topdowns[0].zones.length).toBe(1);
});

test('러프 모드(F) — 외곽선이 거칠어진 도형 커밋', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);

  await page.locator('.td-rough').click();
  await expect(page.locator('.td-rough')).toHaveClass(/is-active/);

  await page.mouse.move(cx - 100, cy - 70);
  await page.mouse.down();
  await page.mouse.move(cx + 60, cy + 50, { steps: 6 });
  await page.mouse.up();

  await page.waitForTimeout(800);
  const ws = await readWorkspace(page);
  const geo = ws.projects[0].topdowns[0].geo;
  expect(geo.length).toBe(1);
  // 사각형(4점)이 러프 처리로 잘게 쪼개진다
  expect(geo[0].poly[0].length).toBeGreaterThan(8);
});

test('문 추종 — 도형 이동 시 그 벽 위의 문이 함께 이동', async ({ page }) => {
  const { cx, cy } = await enterAndBox(page);

  // 방 + 위쪽 벽에 문
  await page.mouse.move(cx - 100, cy - 70);
  await page.mouse.down();
  await page.mouse.move(cx + 60, cy + 50, { steps: 6 });
  await page.mouse.up();
  await page.locator('.td-tool', { hasText: '문' }).click();
  await page.mouse.click(cx - 20, cy - 70);
  await page.waitForTimeout(800);

  let ws = await readWorkspace(page);
  const before = ws.projects[0].topdowns[0];
  const doorX0 = before.doors[0].x;
  const geoX0 = before.geo[0].poly[0][0][0];

  // 선택 도구로 방을 오른쪽으로 드래그
  await page.locator('.td-tool', { hasText: '선택' }).click();
  await page.mouse.move(cx - 20, cy - 10);
  await page.mouse.down();
  await page.mouse.move(cx + 76, cy - 10, { steps: 6 });
  await page.mouse.up();
  await page.waitForTimeout(800);

  ws = await readWorkspace(page);
  const after = ws.projects[0].topdowns[0];
  const geoDx = after.geo[0].poly[0][0][0] - geoX0;
  expect(geoDx).toBeGreaterThan(0);
  expect(after.doors[0].x - doorX0).toBeCloseTo(geoDx, 5);
});
