import type { PacingDoc, PacingMarker, PacingPoint, PacingSegment } from '../../types';

/* ─────────────────────────────────────────────────────────
   학습 프리셋 — 조령관 예시 곡선(50강 슬라이드10)을 새 탭으로 시드
   (흐름 실험실 FLOW_PRESETS의 프리셋 패턴 승계)
   segments/points/markers는 전부 고정 id로 구성 — seed()는 호출할 때마다
   완전히 같은 구조를 반환한다(무작위 id 없음).
   ───────────────────────────────────────────────────────── */

export interface PacingPreset {
  id: string;
  name: string;
  /** 셀렉트 툴팁 — 무엇을 관찰해야 하는가 */
  lesson: string;
  seed: () => Partial<PacingDoc>;
}

/* 조령관 6구간 — 협곡 상승 → 산사태 간극 → 절벽 고긴장 → 망루 깊은 골 → 마당 발산 잔물결 → 정상 정점 */
const JG_SEGMENTS: PacingSegment[] = [
  { id: 'jg-seg-canyon',    name: '협곡 진입',   width: 1.2 },
  { id: 'jg-seg-landslide', name: '산사태 간극', width: 0.8 },
  { id: 'jg-seg-cliff',     name: '절벽 능선',   width: 1.0 },
  { id: 'jg-seg-tower',     name: '망루',        width: 1.0 },
  { id: 'jg-seg-yard',      name: '마당',        width: 1.3 },
  { id: 'jg-seg-summit',    name: '정상',        width: 0.8 },
];

const JG_POINTS: PacingPoint[] = [
  // 협곡 진입 — 완만한 상승
  { id: 'jg-p01', segId: 'jg-seg-canyon',    t: 0.10, tension: 15 },
  { id: 'jg-p02', segId: 'jg-seg-canyon',    t: 0.90, tension: 48 },
  // 산사태 간극 — 짧은 스파이크 후 급격히 끊김
  { id: 'jg-p03', segId: 'jg-seg-landslide', t: 0.15, tension: 58 },
  { id: 'jg-p04', segId: 'jg-seg-landslide', t: 0.50, tension: 18 },
  { id: 'jg-p05', segId: 'jg-seg-landslide', t: 0.90, tension: 24 },
  // 절벽 능선 — 고긴장으로 치닫음
  { id: 'jg-p06', segId: 'jg-seg-cliff',     t: 0.20, tension: 35 },
  { id: 'jg-p07', segId: 'jg-seg-cliff',     t: 0.85, tension: 82 },
  // 망루 — 깊은 골로 이완
  { id: 'jg-p08', segId: 'jg-seg-tower',     t: 0.10, tension: 60 },
  { id: 'jg-p09', segId: 'jg-seg-tower',     t: 0.55, tension: 10 },
  { id: 'jg-p10', segId: 'jg-seg-tower',     t: 0.90, tension: 32 },
  // 마당 — 발산하는 잔물결(작은 오르내림 반복)
  { id: 'jg-p11', segId: 'jg-seg-yard',      t: 0.15, tension: 55 },
  { id: 'jg-p12', segId: 'jg-seg-yard',      t: 0.45, tension: 32 },
  { id: 'jg-p13', segId: 'jg-seg-yard',      t: 0.70, tension: 58 },
  { id: 'jg-p14', segId: 'jg-seg-yard',      t: 0.95, tension: 38 },
  // 정상 — 정점으로 마무리
  { id: 'jg-p15', segId: 'jg-seg-summit',    t: 0.20, tension: 68 },
  { id: 'jg-p16', segId: 'jg-seg-summit',    t: 0.60, tension: 88 },
  { id: 'jg-p17', segId: 'jg-seg-summit',    t: 0.95, tension: 99 },
];

const JG_MARKERS: PacingMarker[] = [
  // 산사태 — 급전개·단절 지점 (jg-p04와 같은 진행률)
  { id: 'jg-m-gap',    kind: 'gap',   at: 0.2623, tension: 18 },
  // 망루 — 가장 깊은 골 (jg-p09와 같은 진행률)
  { id: 'jg-m-valley', kind: 'valley', at: 0.5820, tension: 10 },
  // 정상 도착 — 이정표 깃발
  { id: 'jg-m-flag',   kind: 'flag',  at: 0.99, tension: 99 },
];

export const PACING_PRESETS: PacingPreset[] = [
  {
    id: 'joryeonggwan',
    name: '조령관 예시 곡선',
    lesson: '협곡의 상승 → 산사태로 끊기는 간극 → 절벽의 고긴장 → 망루의 깊은 이완 → 마당의 잔물결 → 정상 정점(50강 슬라이드10). 구간·점·표기를 옮겨 자신의 페이싱과 비교해 보세요.',
    seed: () => ({
      segments: JG_SEGMENTS.map((s) => ({ ...s })),
      points: JG_POINTS.map((p) => ({ ...p })),
      markers: JG_MARKERS.map((m) => ({ ...m })),
    }),
  },
];
