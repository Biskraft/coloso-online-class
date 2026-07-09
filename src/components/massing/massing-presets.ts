import type { MassingBlock } from '../../types';

/* ─────────────────────────────────────────────────────────
   학습 가이드 프리셋 — CGMA 3주차 실습 장면을 단계별로 재현
   (빈 들판 → 점 → 선 → 면 암시 → 면 완성 / 공간 정의 강화·약화 비교)
   선택하면 새 매싱 탭으로 생성된다 — 시연·따라하기 출발점
   ───────────────────────────────────────────────────────── */

type B = Omit<MassingBlock, 'id'>;

const stone = (x: number, y: number, tone = 1, z = 0, h = 1): B =>
  ({ kind: 'stone', x, y, z, w: 1, d: 1, h, tone });
const column = (x: number, y: number, h = 3, tone = 1): B =>
  ({ kind: 'column', x, y, z: 0, w: 1, d: 1, h, tone });

/* 점 — 들판에 흩어놓은 돌. 일부는 명도를 달리해 identity 부여 */
const STAGE_POINTS: B[] = [
  stone(26, 30, 1),
  stone(31, 27, 2),
  stone(35, 31, 1),
  stone(29, 34, 3),
  stone(33, 35, 0),
];

/* 선 — 잔해 기둥 (높이 변화로 리듬) */
const STAGE_COLUMNS: B[] = [
  column(25, 26, 3),
  column(36, 26, 2),
  column(25, 36, 2),
  column(36, 36, 3),
  column(30, 31, 1, 2),   // 부러진 기둥
];

/* 면 암시 — 벽판 두 장 + 부유석 */
const STAGE_WALLS: B[] = [
  { kind: 'wall', x: 25, y: 24.875, z: 0, w: 12, d: 0.25, h: 2.5, tone: 1 },
  { kind: 'wall', x: 23.875, y: 25, z: 0, w: 0.25, d: 7, h: 2, tone: 2 },
  stone(33, 29, 2, 2),    // 부유석 — 공중 2m
];

/* 면 완성 — 바닥판(올림) + 머리위판 */
const STAGE_PLANES: B[] = [
  { kind: 'base', x: 27, y: 28, z: 0, w: 8, d: 7, h: 0.5, tone: 0 },
  { kind: 'overhead', x: 26, y: 27, z: 3, w: 10, d: 9, h: 0.25, tone: 3 },
];

/* 공간 정의 — 강화: 골조 정렬 + 명도 대비 + 3면(바닥·벽·머리) */
const DEFINED_ROOM: B[] = [
  { kind: 'base', x: 25, y: 26, z: 0, w: 12, d: 9, h: 0.5, tone: 0 },
  column(25, 26, 3), column(36, 26, 3), column(25, 34, 3), column(36, 34, 3),
  { kind: 'wall', x: 25, y: 25.875, z: 0, w: 12, d: 0.25, h: 3, tone: 2 },
  { kind: 'wall', x: 24.875, y: 26, z: 0, w: 0.25, d: 9, h: 3, tone: 2 },
  { kind: 'overhead', x: 25, y: 26, z: 3, w: 12, d: 9, h: 0.25, tone: 3 },
];

/* 공간 정의 — 약화: 모서리 어긋남(edge bleeding)·명도 동화·골조 없음 */
const WEAK_ROOM: B[] = [
  { kind: 'base', x: 26.5, y: 27, z: 0, w: 12, d: 9, h: 0.5, tone: 1 },
  { kind: 'base', x: 23, y: 30, z: 0, w: 18, d: 2, h: 0.5, tone: 1 },   // 경계 밖으로 흘러나간 판
  { kind: 'wall', x: 28, y: 25.875, z: 0, w: 8, d: 0.25, h: 2, tone: 1 },
  stone(31, 31, 1),
  stone(34, 29, 1),
];

export interface MassingPreset {
  id: string;
  name: string;
  blocks: B[];
}

export const MASSING_PRESETS: MassingPreset[] = [
  { id: 'pt1', name: '점·선·면 ① 점',        blocks: STAGE_POINTS },
  { id: 'pt2', name: '점·선·면 ② +선(기둥)', blocks: [...STAGE_POINTS, ...STAGE_COLUMNS] },
  { id: 'pt3', name: '점·선·면 ③ +면 암시',  blocks: [...STAGE_POINTS, ...STAGE_COLUMNS, ...STAGE_WALLS] },
  { id: 'pt4', name: '점·선·면 ④ 면 완성',   blocks: [...STAGE_POINTS, ...STAGE_COLUMNS, ...STAGE_WALLS, ...STAGE_PLANES] },
  { id: 'def1', name: '공간 정의 — 강화',     blocks: DEFINED_ROOM },
  { id: 'def2', name: '공간 정의 — 약화',     blocks: WEAK_ROOM },
];
