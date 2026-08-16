import type { PacingDoc, PacingMarker, PacingPoint, PacingSegment } from '../../types';

/* ─────────────────────────────────────────────────────────
   학습 프리셋 — 조령관 예시 곡선(공중 성으로 가는 22비트)
   (흐름 실험실 FLOW_PRESETS의 프리셋 패턴 승계)
   segments/points/markers는 전부 고정 id로 구성 — seed()는 호출할 때마다
   완전히 같은 구조를 반환한다(무작위 id 없음).

   설계 근거: 동사 넷(건너다·솟구치다·깨우다·흐르다)으로 22비트를 구성.
   바람길(스플라인)을 타는 '흐르다'는 마지막 공간에서만 등장해 졸업 보상이 된다.
   거절은 세 번이되 종류가 다름 — 물리적(비트3)·정보적(비트9)·조건적(비트13).
   포트폴리오용 레벨이라 재도전·체크포인트 비트는 두지 않는다.
   ───────────────────────────────────────────────────────── */

export interface PacingPreset {
  id: string;
  name: string;
  /** 셀렉트 툴팁 — 무엇을 관찰해야 하는가 */
  lesson: string;
  seed: () => Partial<PacingDoc>;
}

/* 세 공간 — 폭은 비트 수에 비례(8 / 8 / 6) */
const JG_SEGMENTS: PacingSegment[] = [
  { id: 'jg-seg-start', name: '시작 지점', width: 1.0 },
  { id: 'jg-seg-ground', name: '지상 섬', width: 1.0 },
  { id: 'jg-seg-sky', name: '공중 섬', width: 0.8 },
];

const JG_POINTS: PacingPoint[] = [
  // ── 시작 지점 (비트 1~8) — 성을 보고, 거절당하고, 물이 차오르는 지붕을 건넌다
  { id: 'jg-p01', segId: 'jg-seg-start', t: 0.05, tension: 20 }, // 1 멀리 빛나는 성을 봄
  { id: 'jg-p02', segId: 'jg-seg-start', t: 0.18, tension: 25 }, // 2 낮은 바위 건너뛰기
  { id: 'jg-p03', segId: 'jg-seg-start', t: 0.31, tension: 30 }, // 3 관문이 닫힘(1차 거절)
  { id: 'jg-p04', segId: 'jg-seg-start', t: 0.44, tension: 35 }, // 4 바람 기둥을 깨움
  { id: 'jg-p05', segId: 'jg-seg-start', t: 0.57, tension: 45 }, // 5 단번에 솟구침
  { id: 'jg-p06', segId: 'jg-seg-start', t: 0.70, tension: 50 }, // 6 잠긴 지붕 연달아
  { id: 'jg-p07', segId: 'jg-seg-start', t: 0.83, tension: 60 }, // 7 잠기는 지붕 서둘러(산)
  { id: 'jg-p08', segId: 'jg-seg-start', t: 0.95, tension: 35 }, // 8 무너진 입구로 진입(골)

  // ── 지상 섬 (비트 9~16) — 끊긴 성벽, 되돌아가 깨우고, 잠긴 문을 우회한다
  { id: 'jg-p09', segId: 'jg-seg-ground', t: 0.05, tension: 40 }, // 9 성벽이 끊김(2차 거절)
  { id: 'jg-p10', segId: 'jg-seg-ground', t: 0.18, tension: 45 }, // 10 되돌아가 기둥을 깨움
  { id: 'jg-p11', segId: 'jg-seg-ground', t: 0.31, tension: 55 }, // 11 약한 바람, 두 번 나눠
  { id: 'jg-p12', segId: 'jg-seg-ground', t: 0.44, tension: 60 }, // 12 좁은 성벽 위 조심히
  { id: 'jg-p13', segId: 'jg-seg-ground', t: 0.57, tension: 65 }, // 13 빗장 걸린 문(3차 거절·산)
  { id: 'jg-p14', segId: 'jg-seg-ground', t: 0.70, tension: 55 }, // 14 바깥으로 멀리 우회
  { id: 'jg-p15', segId: 'jg-seg-ground', t: 0.83, tension: 60 }, // 15 처마·균열에 매달려 오름
  { id: 'jg-p16', segId: 'jg-seg-ground', t: 0.95, tension: 40 }, // 16 어두운 본거지 진입(골)

  // ── 공중 섬 (비트 17~22) — 바람길을 깨워 타고, 끊긴 곳을 건너, 성에 닿는다
  { id: 'jg-p17', segId: 'jg-seg-sky', t: 0.05, tension: 55 }, // 17 바람길과 성을 올려다봄
  { id: 'jg-p18', segId: 'jg-seg-sky', t: 0.20, tension: 60 }, // 18 바람길 시작점을 깨움
  { id: 'jg-p19', segId: 'jg-seg-sky', t: 0.35, tension: 55 }, // 19 짧고 안전한 첫 흐름
  { id: 'jg-p20', segId: 'jg-seg-sky', t: 0.50, tension: 70 }, // 20 바람길이 끊김 — 간극
  { id: 'jg-p21', segId: 'jg-seg-sky', t: 0.65, tension: 80 }, // 21 역류하는 바람길을 버팀
  { id: 'jg-p22', segId: 'jg-seg-sky', t: 0.82, tension: 85 }, // 22 마지막으로 크게 솟구침(정점)
  { id: 'jg-p23', segId: 'jg-seg-sky', t: 0.97, tension: 30 }, // 22 공중 성 관문 앞 도착(해소)
];

/* 표기 — at은 전체 진행률(0~1). 구간 폭 8:8:6(합 2.8) 기준으로 계산된 값.
   시작 지점 0~0.3571 · 지상 섬 0.3571~0.7143 · 공중 섬 0.7143~1 */
const JG_MARKERS: PacingMarker[] = [
  // 공중 성 도착 — 도착 감정 지점 (jg-p23)
  { id: 'jg-m-flag', kind: 'flag', at: 0.9914, tension: 30 },
];

export const PACING_PRESETS: PacingPreset[] = [
  {
    id: 'joryeonggwan',
    name: '조령관 예시 곡선',
    lesson:
      '시작 지점(성을 보고 거절당한 뒤 물에 잠기는 지붕을 건넘) → 지상 섬(끊긴 성벽·잠긴 문을 우회) → 공중 섬(바람길을 타고 끊긴 간극을 넘어 성에 도착). 동사 넷으로 22비트를 만든 곡선 — 산·골이 두 번 교차한 뒤 마지막에 최고점과 해소가 옵니다.',
    seed: () => ({
      segments: JG_SEGMENTS.map((s) => ({ ...s })),
      points: JG_POINTS.map((p) => ({ ...p })),
      markers: JG_MARKERS.map((m) => ({ ...m })),
    }),
  },
];
