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

export interface Project {
  version: 1;
  name: string;
  updatedAt: number;
  concept: Concept;
  postits: Postit[];
  nodes: BubbleNode[];
  edges: BubbleEdge[];
  mjMasterPrompt?: string;
  view: CanvasView;
  ai: AISettings;
}

export const emptyConcept = (): Concept => ({
  theme: '',
  intent: '',
  coreMechanic: '',
  learningGoals: [],
  pacing: '',
});

export const emptyProject = (): Project => ({
  version: 1,
  name: '새 레벨',
  updatedAt: Date.now(),
  concept: emptyConcept(),
  postits: [],
  nodes: [],
  edges: [],
  view: {
    edgeStyle: 'clean',
    autoLayout: true,
    showGrid: true,
    showMinimap: true,
  },
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
