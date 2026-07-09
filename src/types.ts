/* ──────────── 도메인 타입 ──────────── */

export type NodeType =
  | 'room'      // 일반 방
  | 'vista'     // 전망/예고 공간
  | 'treasure'  // 보상/획득
  | 'boss'      // 보스/대형 인카운터
  | 'hub'       // 허브/세이브
  | 'save';     // 세이브포인트

export type EdgeType =
  | 'open'      // 열린 통로
  | 'locked'    // 키 잠금
  | 'oneway'    // 일방통행
  | 'ability'   // 능력 게이트
  | 'vista';    // 전망 — 보이지만 닿을 수 없음

export type PostitColor = 'yellow' | 'pink' | 'mint' | 'blue' | 'lilac';

export interface Postit {
  id: string;
  x: number;          // 패드 안 상대 좌표 (자유 배치용, 옵션)
  y: number;
  rotation: number;   // -3 ~ +3 deg
  color: PostitColor;
  text: string;
  tags: string[];
  createdAt: number;
  promoted?: boolean; // 노드로 승격되면 true
}

export interface BubbleNode {
  id: string;
  type: NodeType;
  name: string;
  x: number;
  y: number;
  size?: number;            // 1.0 기본, 0.5~2.5 — 전체 크기
  aspect?: number;          // 1.0 기본, 0.5~2.0 — 가로:세로 비율 (1보다 크면 가로 길게)
  notes: string;
  icons: string[];
  mjPrompt?: string;
  promotedFrom?: string;
}

export interface BubbleEdge {
  id: string;
  from: string;
  to: string;
  type: EdgeType;
  keyId?: string;           // locked
  abilityId?: string;       // ability
  label?: string;
  /** 방향 표시 — from 끝(시작점)에 화살표. 미설정 시 타입 기본값 사용 */
  arrowStart?: boolean;
  /** 방향 표시 — to 끝(도착점)에 화살표. 미설정 시 타입 기본값 사용 */
  arrowEnd?: boolean;
}

export interface Concept {
  theme: string;
  intent: string;
  coreMechanic: string;
  learningGoals: string[];
  pacing: string;           // calm → tension → climax 자유 텍스트
  fantasyHook?: string;
}

export interface AISettings {
  provider: 'gemini' | 'none';
  apiKey?: string;
  preferPro: boolean;       // Pro 우선 사용
  usage: {
    proUsedToday: number;
    flashUsedToday: number;
    lastResetDay: string;   // YYYY-MM-DD
  };
}

export interface CanvasView {
  edgeStyle: 'clean' | 'rough';   // 깨끗한 곡선 vs 펜떨림
  autoLayout: boolean;
  showGrid: boolean;
  showMinimap: boolean;
}

/** 학생별 포트폴리오 색감 차별화 — hue 회전 + 채도 스케일. 명도는 보존 */
export interface ProjectTheme {
  hueShift: number;   // -180 ~ +180 (deg)
  satScale: number;   // 0 ~ 2 (0=무채색, 1=원본, 2=두 배)
}

export type DecorationKind = 'arrow' | 'ellipse' | 'text';

export interface Decoration {
  id: string;
  kind: DecorationKind;
  x: number;
  y: number;
  // arrow 전용 — 끝점
  x2?: number;
  y2?: number;
  // ellipse·text 전용 — 박스 크기
  width?: number;
  height?: number;
  // text 전용
  text?: string;
}

/** 캔버스에 자유 배치하는 참조 이미지 (드래그&드롭 / 붙여넣기). src는 data URI. */
export interface ImageItem {
  id: string;
  x: number;          // 중심 월드 좌표
  y: number;
  width: number;      // 월드 단위 표시 크기
  height: number;
  src: string;        // data URI (base64)
  createdAt: number;
}

/* ──────────── 탑다운 평면도 모드 — Scrawl 지오메트리 ────────────
   픽셀(셀) 채우기가 아니라 도형을 불리언 연산으로 쌓는 방식.
   도형 순서대로 union/subtract를 적용해 바닥 멀티폴리곤을 만들고,
   벽·그림자·해칭·내부 그리드는 전부 렌더 스타일로 자동 생성된다. */

export interface TopdownOverlay {
  visible: boolean;
  opacity: number;   // 0~1, 기본 0.5
  tx: number;        // 버블 좌표 → 그리드 정렬 (월드 px)
  ty: number;
  scale: number;
}

/** 폴리곤 — [링][점][x,y], 그리드(셀) 단위 좌표. 첫 링이 외곽, 이후는 구멍 */
export type GeoPoly = number[][][];

export interface GeoShape {
  id: string;
  /** union = 바닥 추가, subtract = 파내기 (지우기 모드) */
  op: 'union' | 'subtract';
  poly: GeoPoly;
  /** 도형 방향(라디안) — 회전 핸들이 기록. 스케일 핸들이 이 축을 따라 동작 (기본 0) */
  rot?: number;
}

/** 내부 구조 도형 — 바닥 위의 벽·기둥(low=false, 잉크 솔리드) / 낮은 엄폐(low=true, 밝은 채움).
    바닥과 독립적으로 불리언 병합되고 렌더 시 바닥에 클립된다 */
export interface StructShape extends GeoShape {
  low: boolean;
}

/** 구역 채움 — 전투 주석 레이어. 안전(파랑)/위험(빨강) 반투명 다각형 */
export type ZoneKind = 'safe' | 'danger';

export interface ZoneObj {
  id: string;
  kind: ZoneKind;
  poly: GeoPoly;
  /** 도형 방향(라디안) — GeoShape.rot과 동일 규칙 */
  rot?: number;
}

/** 문 — 벽(바닥 경계) 위에 놓이는 오브젝트. 좌표는 그리드 단위, angle은 벽 진행 방향(rad) */
export interface DoorObj {
  id: string;
  x: number;
  y: number;
  angle: number;
  /** 문 폭 (셀) */
  w: number;
}

/** 계단 — 드래그 축이 진행 방향, w는 폭(셀). 좌표는 그리드 단위 */
export interface StairObj {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  w: number;
}

/** 텍스트 라벨 — 손글씨(Caveat). x,y는 중심, size는 글자 높이(셀) */
export interface TextObj {
  id: string;
  x: number;
  y: number;
  text: string;
  size: number;
}

/** 마커 — 게임플레이 5종 + 린치(Lynch) 점형 2종. 좌표는 그리드 단위 */
export type MarkerKind = 'start' | 'goal' | 'reward' | 'enemy' | 'trigger' | 'landmark' | 'node';

export interface MarkerObj {
  id: string;
  x: number;
  y: number;
  kind: MarkerKind;
  label?: string;
}

/** 렌더 스타일 — 문서별 저장 */
export interface TopdownStyle {
  wallM: number;       // 벽 두께 (m) — 내벽 0.25 기본, 성벽 0.5
  hatch: boolean;      // 외곽 해칭
  shadow: boolean;     // 벽 그림자
}

export const TOPDOWN_MAX_GRID = 512;
export const TOPDOWN_GRID_PRESETS = [32, 48, 64, 96, 128, 192, 256, 384, 512] as const;

export interface TopdownDoc {
  id: string;
  name: string;
  week?: number;
  grid: [number, number];           // [cols, rows] — 최대 512 (스냅·범위 기준). 1셀 = 1m 고정 (1m = 100uu)
  overlay: TopdownOverlay;
  geo: GeoShape[];
  struct: StructShape[];
  zones: ZoneObj[];
  doors: DoorObj[];
  stairs: StairObj[];
  texts: TextObj[];
  markers: MarkerObj[];
  style: TopdownStyle;
}

export const defaultTdStyle = (): TopdownStyle => ({ wallM: 0.25, hatch: true, shadow: true });

export const emptyTopdown = (id: string, name = '평면도 1'): TopdownDoc => ({
  id,
  name,
  grid: [256, 256],
  overlay: { visible: true, opacity: 0.5, tx: 0, ty: 0, scale: 1 },
  geo: [],
  struct: [],
  zones: [],
  doors: [],
  stairs: [],
  texts: [],
  markers: [],
  style: defaultTdStyle(),
});

/* ──────────── 아이소 매싱 스케처 — 점·선·면 화이트박스 사고 스케치 ────────────
   고정 등각 카메라 아래 축 정렬 박스를 쌓는다. 좌표·치수는 셀(=m) 단위. */

export type MassingKind = 'mass' | 'column' | 'wall' | 'base' | 'overhead' | 'stone';

export interface MassingBlock {
  id: string;
  kind: MassingKind;
  x: number;      // 풋프린트 좌상단 (셀)
  y: number;
  z: number;      // 바닥 높이 (셀) — base inset은 음수
  w: number;      // x 방향 폭
  d: number;      // y 방향 깊이
  h: number;      // 높이
  tone: number;   // 0(밝음)~3(어두움) — Value Differentiation
}

export interface MassingDoc {
  id: string;
  name: string;
  grid: [number, number];
  view: { dir: 0 | 1 | 2 | 3 };   // 90° 스텝 카메라 (v0.2)
  blocks: MassingBlock[];
}

export const emptyMassing = (id: string, name = '매싱 1'): MassingDoc => ({
  id,
  name,
  grid: [64, 64],
  view: { dir: 0 },
  blocks: [],
});

/* ──────────── 푸시·풀 흐름 실험실 — 맵과 분리된 실습 전용 ────────────
   질량(박스)이 밀고(push) 목표·보상이 끄는(pull) 벡터장 위에서
   플레이어 흐름(유선)이 실시간으로 휘는 것을 관찰한다. 좌표는 m. */

export interface FlowBox {
  id: string;
  x: number;                     // 좌상단 (회전 전 로컬 기준)
  y: number;
  w: number;
  h: number;
  rot?: number;                  // 중심 기준 회전 (라디안, 기본 0)
}

/** 원형 오브젝트 — 기둥(난류 실습, 단단한 표면) / 언덕(부분 각도, 소프트 반발) */
export interface FlowDisc {
  id: string;
  kind: 'pillar' | 'hill';
  x: number;                     // 중심 (m)
  y: number;
  r: number;                     // 반경 (m)
}

export interface FlowDoc {
  id: string;
  name: string;
  grid: number;                  // 정사각 작업 범위 (m)
  /** 흐름 출발선 위치 — 기류는 항상 +x(왼→오른쪽) 직선 */
  start: { x: number; y: number };
  boxes: FlowBox[];
  discs: FlowDisc[];
}

export const emptyFlow = (id: string, name = '흐름 1'): FlowDoc => ({
  id,
  name,
  grid: 128,
  start: { x: 8, y: 64 },
  boxes: [],
  discs: [],
});

/* ── 페이싱 곡선 에디터 (50·51강) ── */
export interface PacingSegment { id: string; name: string; width: number; } // width=체류 비중(상대, ≥1)
export interface PacingPoint { id: string; segId: string; t: number; tension: number; } // t∈[0,1] 구간 내, tension∈[0,100]
export interface PacingMarker { id: string; kind: 'peak' | 'valley' | 'gap' | 'flag'; at: number; tension: number; } // at∈[0,1] 곡선 전체 진행
export interface PacingMap { dataUrl: string; w: number; h: number; }
export interface PacingPin { id: string; segId: string; mx: number; my: number; } // 맵 정규화 좌표 0~1

export interface PacingDoc {
  id: string;
  name: string;
  updatedAt: number;
  segments: PacingSegment[];
  points: PacingPoint[];
  markers: PacingMarker[];
  map: PacingMap | null;
  pins: PacingPin[];
}

export const emptyPacing = (id: string, name = '페이싱 1'): PacingDoc => ({
  id,
  name,
  updatedAt: Date.now(),
  segments: [{ id: id + '-s0', name: '구간 1', width: 1 }],
  points: [],
  markers: [],
  map: null,
  pins: [],
});

export interface Project {
  id: string;
  version: 2;
  name: string;
  updatedAt: number;
  concept: Concept;
  postits: Postit[];
  nodes: BubbleNode[];
  edges: BubbleEdge[];
  decorations: Decoration[];
  images: ImageItem[];
  /** 맵 개념 — 1 맵 = 1 버블 다이어그램 + N 탑다운 평면도 */
  topdowns: TopdownDoc[];
  mjMasterPrompt?: string;
  view: CanvasView;
  ai: AISettings;
  theme?: ProjectTheme;
}

/** v1(버블 단독) → v2(맵) 마이그레이션. v2는 결손 필드만 보강.
    구 셀 기반(layers.mass/walls) 데이터는 Scrawl 전환으로 폐기한다. */
export function migrateProject(p: any): Project {
  const topdowns = (Array.isArray(p.topdowns) ? p.topdowns : []).map((t: any) => {
    // layers = 구 셀 모델, paths = 제거된 동선, cellSize = 1m/셀 고정으로 폐기
    const { layers: _legacy, paths: _paths, cellSize: _cellSize, ...rest } = t;
    return {
      ...rest,
      overlay: t.overlay ?? { visible: true, opacity: 0.5, tx: 0, ty: 0, scale: 1 },
      geo: Array.isArray(t.geo) ? t.geo : [],
      struct: Array.isArray(t.struct) ? t.struct : [],
      zones: Array.isArray(t.zones) ? t.zones : [],
      doors: Array.isArray(t.doors) ? t.doors : [],
      stairs: Array.isArray(t.stairs) ? t.stairs : [],
      texts: Array.isArray(t.texts) ? t.texts : [],
      markers: Array.isArray(t.markers) ? t.markers : [],
      style: t.style ?? defaultTdStyle(),
    };
  });
  // massings = 매싱 스케처가 맵에서 분리(실습 전용 저장소)되며 폐기
  const { massings: _legacyMassings, ...rest } = p;
  return {
    ...rest,
    version: 2,
    decorations: p.decorations ?? [],
    images: p.images ?? [],
    topdowns,
  };
}

export const emptyConcept = (): Concept => ({
  theme: '',
  intent: '',
  coreMechanic: '',
  learningGoals: [],
  pacing: '',
});

export const emptyProject = (id: string): Project => ({
  id,
  version: 2,
  name: '새 레벨',
  updatedAt: Date.now(),
  concept: emptyConcept(),
  postits: [],
  nodes: [],
  edges: [],
  decorations: [],
  images: [],
  topdowns: [],
  view: {
    edgeStyle: 'clean',
    autoLayout: true,
    showGrid: true,
    showMinimap: true,
  },
  theme: { hueShift: 0, satScale: 1 },
  ai: {
    provider: 'none',
    preferPro: true,
    usage: {
      proUsedToday: 0,
      flashUsedToday: 0,
      lastResetDay: new Date().toISOString().slice(0, 10),
    },
  },
});
