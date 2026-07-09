import type { FlowDoc } from '../../types';
import { uid } from '../../utils/id';

/* ─────────────────────────────────────────────────────────
   학습 프리셋 — week2-02 강의 장면 4종을 새 탭으로 시드
   (매싱 스케처의 가이드 프리셋 패턴 승계)
   ───────────────────────────────────────────────────────── */

export interface FlowPreset {
  id: string;
  name: string;
  /** 셀렉트 툴팁 — 무엇을 관찰해야 하는가 */
  lesson: string;
  seed: () => Pick<FlowDoc, 'boxes' | 'discs'>;
}

const box = (x: number, y: number, w: number, h: number) => ({ id: uid('fb'), x, y, w, h });
const pillar = (x: number, y: number, r: number) => ({ id: uid('fd'), kind: 'pillar' as const, x, y, r });
const hill = (x: number, y: number, r: number) => ({ id: uid('fd'), kind: 'hill' as const, x, y, r });

export const FLOW_PRESETS: FlowPreset[] = [
  {
    id: 'uniform',
    name: '균일 보이드',
    lesson: '어느 틈으로 가도 똑같다 — 차이 없는 선택은 무의미한 선택이다. 박스 하나를 옮겨 차이를 만들어 보세요.',
    seed: () => ({
      boxes: [40, 56, 72, 88].flatMap((x) =>
        [32, 48, 64, 80].map((y) => box(x, y, 4, 4))),
      discs: [],
    }),
  },
  {
    id: 'alley',
    name: '골목',
    lesson: '두 질량 사이로 흐름이 모여 빠르고 곧게 흐른다 — "파이프 속의 물". 골목 폭을 좁혀 보세요.',
    seed: () => ({
      boxes: [box(46, 22, 38, 32), box(46, 74, 38, 32)],
      discs: [],
    }),
  },
  {
    id: 'turbulent',
    name: '난류 모서리',
    lesson: '벽 모서리와 기둥들이 흐름을 흩뜨려 머무름·은신의 공간을 만든다. 기둥을 더하거나 빼 보세요.',
    seed: () => ({
      boxes: [box(44, 28, 46, 5), box(85, 28, 5, 46)],
      discs: [pillar(56, 48, 2), pillar(68, 42, 2), pillar(62, 58, 2), pillar(76, 54, 2)],
    }),
  },
  {
    id: 'hill',
    name: '언덕',
    lesson: '언덕의 법선은 위·옆을 향한다(부분 각도) — 흐름이 막히지 않고 둘레로 비켜 흐른다. 벽(박스)과 비교해 보세요.',
    seed: () => ({
      boxes: [],
      discs: [hill(56, 46, 10), hill(82, 80, 12)],
    }),
  },
];
