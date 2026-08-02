import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { temporal } from 'zundo';
import type {
  Project, Postit, BubbleNode, BubbleEdge, Decoration, DecorationKind,
  Concept, PostitColor, NodeType, EdgeType, CanvasView, ImageItem,
  TopdownDoc, GeoShape, StructShape, ZoneObj, DoorObj, StairObj, TextObj, MarkerObj, GeoPoly,
  TdImage, StrokeObj,
} from '../types';
import { emptyProject, emptyTopdown, migrateProject } from '../types';
import { distToPolyEdge } from '../components/topdown/topdown-utils';
import { uid, today } from '../utils/id';
import { loadWorkspace, saveWorkspace } from './persistence';

/* ─────────────────────────────────────────────────────────
   멀티 프로젝트 워크스페이스 — 모든 상태는 메모리만.
   영구 저장 없음. JSON export/import로만 보존.
   project = projects[currentId 매칭] (state.project로 동기 유지)
   ───────────────────────────────────────────────────────── */

interface ProjectStore {
  projects: Project[];
  currentId: string;
  project: Project;   // 현재 활성 프로젝트와 동기화된 참조
  selection: { kind: 'none' } | { kind: 'node'; id: string } | { kind: 'edge'; id: string } | { kind: 'postit'; id: string } | { kind: 'decoration'; id: string } | { kind: 'image'; id: string };
  /** 다중 선택 — 노드와 데코 id를 통합으로 저장 */
  groupSelection: string[];

  // 워크스페이스
  newProject: (name?: string) => string;
  switchProject: (id: string) => void;
  closeProject: (id: string) => void;
  importProject: (p: Project) => string;

  // 현재 프로젝트
  setName: (name: string) => void;
  loadFromJSON: (p: Project) => void;
  reset: () => void;

  // 컨셉
  setConcept: (patch: Partial<Concept>) => void;

  // 포스트잇
  addPostit: (text?: string, color?: PostitColor) => string;
  updatePostit: (id: string, patch: Partial<Postit>) => void;
  removePostit: (id: string) => void;
  movePostit: (id: string, x: number, y: number) => void;
  reorderPostits: (orderedIds: string[]) => void;
  clearAllPostits: () => void;
  promoteAllPostits: (originX: number, originY: number) => number;

  // 노드
  addNode: (n: Partial<BubbleNode> & { x: number; y: number }) => string;
  updateNode: (id: string, patch: Partial<BubbleNode>) => void;
  removeNode: (id: string) => void;
  moveNode: (id: string, x: number, y: number) => void;
  resizeNode: (id: string, size: number) => void;
  setNodeAspect: (id: string, aspect: number) => void;
  bringNodeToFront: (id: string) => void;
  sendNodeToBack: (id: string) => void;
  promotePostit: (postitId: string, x: number, y: number, type?: NodeType) => string;

  // 이미지 (자유 배치 참조 이미지)
  addImage: (x: number, y: number, src: string, width: number, height: number) => string;
  updateImage: (id: string, patch: Partial<ImageItem>) => void;
  removeImage: (id: string) => void;
  moveImage: (id: string, x: number, y: number) => void;
  resizeImage: (id: string, width: number, height: number) => void;

  // 데코 요소 (자유 배치 화살표/타원/텍스트)
  addDecoration: (kind: DecorationKind, x: number, y: number) => string;
  updateDecoration: (id: string, patch: Partial<Decoration>) => void;
  removeDecoration: (id: string) => void;
  moveDecoration: (id: string, x: number, y: number) => void;

  // 엣지
  addEdge: (from: string, to: string, type?: EdgeType) => string | null;
  updateEdge: (id: string, patch: Partial<BubbleEdge>) => void;
  removeEdge: (id: string) => void;

  // 뷰
  setView: (patch: Partial<CanvasView>) => void;

  // 테마 (학생별 색감 차별화)
  setHueShift: (deg: number) => void;
  setSatScale: (scale: number) => void;
  resetTheme: () => void;

  // 선택
  select: (s: ProjectStore['selection']) => void;
  /** 노드+데코 다중 선택. clear: [] */
  setGroupSelection: (ids: string[]) => void;
  selectAll: () => void;
  /** 그룹 선택된 모든 요소를 동일 delta로 이동 */
  moveGroup: (dx: number, dy: number) => void;
  /** 그룹 선택된 모든 요소 삭제 */
  removeGroup: () => void;

  // AI
  setApiKey: (k: string | undefined) => void;
  bumpUsage: (model: 'pro' | 'flash') => void;
  setMjMaster: (s: string) => void;

  // 마이그레이션 헬퍼
  applyAutoLayoutPositions: (positions: Record<string, { x: number; y: number }>) => void;

  // ── 탑다운 (평면도 모드) ──
  /** 'bubble' = 버블, 'topdown' = 평면도, 'massing' = 매싱, 'flow' = 흐름 실험실, 'pacing' = 페이싱 곡선. undo 추적 대상 아님 */
  mode: 'bubble' | 'topdown' | 'massing' | 'flow' | 'pacing';
  activeTopdownId: string | null;
  /** 평면도 진입 — 문서가 없으면 하나 만들고 진입 */
  enterTopdown: () => void;
  exitTopdown: () => void;
  setActiveTopdown: (id: string) => void;
  addTopdown: (name?: string) => string;
  removeTopdown: (id: string) => void;
  renameTopdown: (id: string, name: string) => void;
  updateTopdown: (id: string, patch: Partial<TopdownDoc>) => void;
  /** 도형 추가 (union/subtract) — 호출 1회 = undo 1단계 */
  addGeo: (tdId: string, shape: GeoShape) => void;
  /** 도형 삭제 */
  removeGeo: (tdId: string, ids: string[]) => void;
  /** 도형 이동 (그리드 단위 delta) */
  translateGeo: (tdId: string, ids: string[], dx: number, dy: number) => void;
  /** 내부 구조(벽·기둥·엄폐) 도형 */
  addStruct: (tdId: string, shape: StructShape) => void;
  removeStruct: (tdId: string, ids: string[]) => void;
  translateStruct: (tdId: string, ids: string[], dx: number, dy: number) => void;
  /** 구역 채움 (안전/위험 주석) */
  addZone: (tdId: string, zone: ZoneObj) => void;
  removeZone: (tdId: string, ids: string[]) => void;
  translateZones: (tdId: string, ids: string[], dx: number, dy: number) => void;
  /** 도형 폴리곤 교체 — 크기·회전 핸들 커밋. 부착 문 보정 포함, 호출 1회 = undo 1단계 */
  transformShape: (tdId: string, payload: {
    kind: 'geo' | 'struct' | 'zone';
    id: string;
    poly: GeoPoly;
    /** 회전 핸들 커밋 시 새 방향 — 스케일은 생략(방향 유지) */
    rot?: number;
    doors?: { id: string; x: number; y: number; angle: number }[];
  }) => void;
  /** 문 배치 — 호출 1회 = undo 1단계 */
  addDoor: (tdId: string, door: DoorObj) => void;
  /** 문 삭제 */
  removeDoor: (tdId: string, ids: string[]) => void;
  /** 계단 배치 */
  addStair: (tdId: string, stair: StairObj) => void;
  removeStair: (tdId: string, ids: string[]) => void;
  /** 텍스트 라벨 */
  addText: (tdId: string, text: TextObj) => void;
  updateText: (tdId: string, id: string, patch: Partial<TextObj>) => void;
  removeText: (tdId: string, ids: string[]) => void;
  /** 문/계단/텍스트/마커/배경이미지 단일 오브젝트 이동 (그리드 단위 delta) */
  translateObject: (tdId: string, id: string, dx: number, dy: number) => void;
  /** 마커 (게임플레이·린치 배지) */
  addMarker: (tdId: string, marker: MarkerObj) => void;
  updateMarker: (tdId: string, id: string, patch: Partial<MarkerObj>) => void;
  removeMarker: (tdId: string, ids: string[]) => void;
  /** 동선 — 자유 드로잉 스트로크 추가 (1획 = undo 1단계) */
  addStroke: (tdId: string, stroke: StrokeObj) => void;
  removeStroke: (tdId: string, ids: string[]) => void;
  /** 동선 레이어 전체 비우기 — 호출 1회 = undo 1단계 */
  clearStrokes: (tdId: string) => void;
  /** 배경 참조 이미지 — 가장 아래 레이어. 이동은 translateObject 공용 */
  addTdImage: (tdId: string, image: TdImage) => void;
  updateTdImage: (tdId: string, id: string, patch: Partial<TdImage>) => void;
  removeTdImage: (tdId: string, ids: string[]) => void;
  /** 일괄 추가 (붙여넣기) — 호출 1회 = undo 1단계 */
  addMany: (tdId: string, items: {
    geo?: GeoShape[]; struct?: StructShape[]; zones?: ZoneObj[]; doors?: DoorObj[];
    stairs?: StairObj[]; texts?: TextObj[]; markers?: MarkerObj[];
  }) => void;

  // ── 매싱 스케처 (모드 전환만 — 데이터는 store/massing.ts에 분리) ──
  enterMassing: () => void;
  exitMassing: () => void;
  // ── 흐름 실험실 (모드 전환만 — 데이터는 store/flow.ts에 분리) ──
  enterFlow: () => void;
  exitFlow: () => void;
  // ── 페이싱 곡선 (모드 전환만 — 데이터는 store/pacing.ts에 분리) ──
  enterPacing: () => void;
  exitPacing: () => void;
}

const newId = () => uid('prj');

/** 현재 프로젝트를 mutator로 교체하면서 projects 배열과 project 동기화 */
const updateCurrent = (
  set: (fn: (s: ProjectStore) => Partial<ProjectStore>) => void,
  mutator: (p: Project) => Project,
) => {
  set((s) => {
    const idx = s.projects.findIndex((p) => p.id === s.currentId);
    if (idx < 0) return {};
    const updated = { ...mutator(s.projects[idx]), updatedAt: Date.now() };
    const projects = [...s.projects];
    projects[idx] = updated;
    return { projects, project: updated };
  });
};

/* drag/resize 같은 연속 변경에서 무한 snapshot 회피용 throttle */
function throttle<T extends (...args: any[]) => void>(fn: T, ms: number): T {
  let last = 0;
  let pending: number | undefined;
  return ((...args: any[]) => {
    const now = Date.now();
    const delta = now - last;
    if (delta >= ms) {
      last = now;
      fn(...args);
    } else {
      if (pending) window.clearTimeout(pending);
      pending = window.setTimeout(() => {
        last = Date.now();
        fn(...args);
      }, ms - delta);
    }
  }) as T;
}

export const useProject = create<ProjectStore>()(
  temporal(
    subscribeWithSelector((set, get) => {
    // 워크스페이스 복원 시도. 없으면 새 빈 프로젝트
    const restored = loadWorkspace();
    let initialProjects: Project[];
    let initialCurrentId: string;
    if (restored && restored.projects.length > 0) {
      // v1 → v2(맵) 포함 필드 마이그레이션 (이전 버전 호환)
      initialProjects = restored.projects.map(migrateProject);
      initialCurrentId = restored.projects.some((p) => p.id === restored.currentId)
        ? restored.currentId
        : initialProjects[0].id;
    } else {
      const first = emptyProject(newId());
      initialProjects = [first];
      initialCurrentId = first.id;
    }
    const initialActive = initialProjects.find((p) => p.id === initialCurrentId)!;

    return {
      projects: initialProjects,
      currentId: initialCurrentId,
      project: initialActive,
      selection: { kind: 'none' },
      groupSelection: [],
      mode: 'bubble' as const,
      activeTopdownId: null,

      // ── 워크스페이스 ──
      newProject: (name = '새 레벨') => {
        const np = { ...emptyProject(newId()), name };
        set((s) => ({
          projects: [...s.projects, np],
          currentId: np.id,
          project: np,
          selection: { kind: 'none' },
          mode: 'bubble',
          activeTopdownId: null,
        }));
        return np.id;
      },

      switchProject: (id) => {
        set((s) => {
          const target = s.projects.find((p) => p.id === id);
          if (!target) return {};
          return {
            currentId: id, project: target, selection: { kind: 'none' },
            mode: 'bubble', activeTopdownId: null,
          };
        });
      },

      closeProject: (id) => {
        set((s) => {
          const remaining = s.projects.filter((p) => p.id !== id);
          if (remaining.length === 0) {
            // 모두 닫으면 새 빈 프로젝트 자동 생성
            const fresh = emptyProject(newId());
            return {
              projects: [fresh],
              currentId: fresh.id,
              project: fresh,
              selection: { kind: 'none' },
              mode: 'bubble',
              activeTopdownId: null,
            };
          }
          let nextId = s.currentId;
          let nextProject = s.project;
          if (s.currentId === id) {
            nextProject = remaining[0];
            nextId = nextProject.id;
          }
          return {
            projects: remaining,
            currentId: nextId,
            project: nextProject,
            selection: { kind: 'none' },
            ...(s.currentId === id ? { mode: 'bubble' as const, activeTopdownId: null } : {}),
          };
        });
      },

      importProject: (p) => {
        // 새 id 부여 (기존 id 충돌 방지)
        const imported: Project = { ...migrateProject(p), id: newId() };
        set((s) => ({
          projects: [...s.projects, imported],
          currentId: imported.id,
          project: imported,
          selection: { kind: 'none' },
          mode: 'bubble',
          activeTopdownId: null,
        }));
        return imported.id;
      },

      // ── 현재 프로젝트 액션 ──
      setName: (name) => updateCurrent(set, (p) => ({ ...p, name })),

      loadFromJSON: (p) => {
        // 현재 프로젝트를 통째로 교체 (id는 현재 것 유지)
        updateCurrent(set, (cur) => ({ ...migrateProject(p), id: cur.id }));
        set({ selection: { kind: 'none' }, activeTopdownId: null });
      },

      reset: () => {
        updateCurrent(set, (cur) => ({ ...emptyProject(cur.id) }));
        set({ selection: { kind: 'none' } });
      },

      setConcept: (patch) => updateCurrent(set, (p) => ({ ...p, concept: { ...p.concept, ...patch } })),

      addPostit: (text = '', color = 'yellow') => {
        const id = uid('pst');
        const rotation = (Math.random() * 6) - 3;
        const postit: Postit = { id, x: 0, y: 0, rotation, color, text, tags: [], createdAt: Date.now() };
        updateCurrent(set, (p) => ({ ...p, postits: [postit, ...p.postits] }));
        return id;
      },

      updatePostit: (id, patch) => updateCurrent(set, (p) => ({
        ...p,
        postits: p.postits.map((x) => x.id === id ? { ...x, ...patch } : x),
      })),

      removePostit: (id) => updateCurrent(set, (p) => ({
        ...p,
        postits: p.postits.filter((x) => x.id !== id),
      })),

      movePostit: (id, x, y) => updateCurrent(set, (p) => ({
        ...p,
        postits: p.postits.map((x2) => x2.id === id ? { ...x2, x, y } : x2),
      })),

      // 드래그 재정렬 — orderedIds 순서로 재배치. 목록에 없는(검색 필터 등) 항목은 뒤에 보존
      reorderPostits: (orderedIds) => updateCurrent(set, (p) => {
        const map = new Map(p.postits.map((x) => [x.id, x]));
        const seen = new Set(orderedIds);
        const next = orderedIds.map((id) => map.get(id)).filter(Boolean) as typeof p.postits;
        for (const x of p.postits) if (!seen.has(x.id)) next.push(x);
        return { ...p, postits: next };
      }),

      clearAllPostits: () => updateCurrent(set, (p) => ({
        ...p,
        postits: [],
      })),

      promoteAllPostits: (originX, originY) => {
        const st = get();
        const targets = st.project.postits.filter((p) => !p.promoted);
        if (targets.length === 0) return 0;
        const cols = Math.max(3, Math.ceil(Math.sqrt(targets.length * 1.4)));
        const cellW = 200, cellH = 170;
        const newNodes: BubbleNode[] = [];
        const newIds: string[] = [];
        targets.forEach((pst, i) => {
          const id = uid('nd');
          newIds.push(id);
          const col = i % cols;
          const row = Math.floor(i / cols);
          newNodes.push({
            id,
            type: 'room',
            name: pst.text.slice(0, 30) || '새 방',
            notes: pst.text,
            icons: [],
            x: originX + col * cellW,
            y: originY + row * cellH,
            promotedFrom: pst.id,
          });
        });
        updateCurrent(set, (p) => ({
          ...p,
          nodes: [...p.nodes, ...newNodes],
          postits: p.postits.map((x) =>
            targets.find((t) => t.id === x.id) ? { ...x, promoted: true } : x
          ),
        }));
        return targets.length;
      },

      addNode: (n) => {
        const id = uid('nd');
        const node: BubbleNode = {
          id,
          type: n.type ?? 'room',
          name: n.name ?? '이름 없음',
          notes: n.notes ?? '',
          icons: n.icons ?? [],
          x: n.x,
          y: n.y,
          promotedFrom: n.promotedFrom,
        };
        updateCurrent(set, (p) => ({ ...p, nodes: [...p.nodes, node] }));
        set({ selection: { kind: 'node', id } });
        return id;
      },

      updateNode: (id, patch) => updateCurrent(set, (p) => ({
        ...p,
        nodes: p.nodes.map((x) => x.id === id ? { ...x, ...patch } : x),
      })),

      removeNode: (id) => {
        updateCurrent(set, (p) => ({
          ...p,
          nodes: p.nodes.filter((x) => x.id !== id),
          edges: p.edges.filter((e) => e.from !== id && e.to !== id),
        }));
        set((s) => ({
          selection: s.selection.kind === 'node' && s.selection.id === id ? { kind: 'none' } : s.selection,
        }));
      },

      moveNode: (id, x, y) => updateCurrent(set, (p) => ({
        ...p,
        nodes: p.nodes.map((n) => n.id === id ? { ...n, x, y } : n),
      })),

      resizeNode: (id, size) => {
        const clamped = Math.max(0.5, Math.min(3.0, size));
        updateCurrent(set, (p) => ({
          ...p,
          nodes: p.nodes.map((n) => n.id === id ? { ...n, size: clamped } : n),
        }));
      },

      setNodeAspect: (id, aspect) => {
        const clamped = Math.max(0.4, Math.min(2.5, aspect));
        updateCurrent(set, (p) => ({
          ...p,
          nodes: p.nodes.map((n) => n.id === id ? { ...n, aspect: clamped } : n),
        }));
      },

      bringNodeToFront: (id) => updateCurrent(set, (p) => {
        const target = p.nodes.find((n) => n.id === id);
        if (!target) return p;
        const others = p.nodes.filter((n) => n.id !== id);
        return { ...p, nodes: [...others, target] };
      }),

      sendNodeToBack: (id) => updateCurrent(set, (p) => {
        const target = p.nodes.find((n) => n.id === id);
        if (!target) return p;
        const others = p.nodes.filter((n) => n.id !== id);
        return { ...p, nodes: [target, ...others] };
      }),

      promotePostit: (postitId, x, y, type = 'room') => {
        const st = get();
        const pst = st.project.postits.find((p) => p.id === postitId);
        if (!pst) return '';
        const id = uid('nd');
        const node: BubbleNode = {
          id, type,
          name: pst.text.slice(0, 30) || '새 방',
          notes: pst.text,
          icons: [],
          x, y,
          promotedFrom: postitId,
        };
        updateCurrent(set, (p) => ({
          ...p,
          nodes: [...p.nodes, node],
          postits: p.postits.map((x2) => x2.id === postitId ? { ...x2, promoted: true } : x2),
        }));
        set({ selection: { kind: 'node', id } });
        return id;
      },

      addEdge: (from, to, type = 'open') => {
        if (from === to) return null;
        const st = get();
        if (st.project.edges.some((e) => e.from === from && e.to === to)) return null;
        const id = uid('eg');
        const edge: BubbleEdge = { id, from, to, type };
        updateCurrent(set, (p) => ({ ...p, edges: [...p.edges, edge] }));
        return id;
      },

      updateEdge: (id, patch) => updateCurrent(set, (p) => ({
        ...p,
        edges: p.edges.map((e) => e.id === id ? { ...e, ...patch } : e),
      })),

      removeEdge: (id) => {
        updateCurrent(set, (p) => ({
          ...p,
          edges: p.edges.filter((e) => e.id !== id),
        }));
        set((s) => ({
          selection: s.selection.kind === 'edge' && s.selection.id === id ? { kind: 'none' } : s.selection,
        }));
      },

      // ── 이미지 ──
      addImage: (x, y, src, width, height) => {
        const id = uid('img');
        const image: ImageItem = { id, x, y, width, height, src, createdAt: Date.now() };
        updateCurrent(set, (p) => ({ ...p, images: [...(p.images ?? []), image] }));
        set({ selection: { kind: 'image', id } });
        return id;
      },

      updateImage: (id, patch) => updateCurrent(set, (p) => ({
        ...p,
        images: (p.images ?? []).map((im) => im.id === id ? { ...im, ...patch } : im),
      })),

      removeImage: (id) => {
        updateCurrent(set, (p) => ({
          ...p,
          images: (p.images ?? []).filter((im) => im.id !== id),
        }));
        set((s) => ({
          selection: s.selection.kind === 'image' && s.selection.id === id ? { kind: 'none' } : s.selection,
        }));
      },

      moveImage: (id, x, y) => updateCurrent(set, (p) => ({
        ...p,
        images: (p.images ?? []).map((im) => im.id === id ? { ...im, x, y } : im),
      })),

      resizeImage: (id, width, height) => updateCurrent(set, (p) => ({
        ...p,
        images: (p.images ?? []).map((im) => im.id === id ? { ...im, width, height } : im),
      })),

      // ── 데코 요소 ──
      addDecoration: (kind, x, y) => {
        const id = uid('dec');
        const dec: Decoration =
          kind === 'arrow'
            ? { id, kind, x, y, x2: x + 140, y2: y }
            : kind === 'ellipse'
            ? { id, kind, x, y, width: 140, height: 90 }
            : { id, kind, x, y, width: 180, height: 40, text: '텍스트' };
        updateCurrent(set, (p) => ({ ...p, decorations: [...(p.decorations ?? []), dec] }));
        set({ selection: { kind: 'decoration', id } });
        return id;
      },

      updateDecoration: (id, patch) => updateCurrent(set, (p) => ({
        ...p,
        decorations: (p.decorations ?? []).map((d) => d.id === id ? { ...d, ...patch } : d),
      })),

      removeDecoration: (id) => {
        updateCurrent(set, (p) => ({
          ...p,
          decorations: (p.decorations ?? []).filter((d) => d.id !== id),
        }));
        set((s) => ({
          selection: s.selection.kind === 'decoration' && s.selection.id === id ? { kind: 'none' } : s.selection,
        }));
      },

      moveDecoration: (id, x, y) => updateCurrent(set, (p) => {
        const dec = (p.decorations ?? []).find((d) => d.id === id);
        if (!dec) return p;
        // arrow는 두 끝점 모두 같은 delta로 이동
        if (dec.kind === 'arrow' && dec.x2 !== undefined && dec.y2 !== undefined) {
          const dx = x - dec.x;
          const dy = y - dec.y;
          return {
            ...p,
            decorations: p.decorations.map((d) =>
              d.id === id ? { ...d, x, y, x2: (d.x2 ?? 0) + dx, y2: (d.y2 ?? 0) + dy } : d,
            ),
          };
        }
        return {
          ...p,
          decorations: p.decorations.map((d) => d.id === id ? { ...d, x, y } : d),
        };
      }),

      setView: (patch) => updateCurrent(set, (p) => ({
        ...p, view: { ...p.view, ...patch },
      })),

      setHueShift: (deg) => updateCurrent(set, (p) => ({
        ...p,
        theme: {
          hueShift: Math.max(-180, Math.min(180, Math.round(deg))),
          satScale: p.theme?.satScale ?? 1,
        },
      })),
      setSatScale: (scale) => updateCurrent(set, (p) => ({
        ...p,
        theme: {
          hueShift: p.theme?.hueShift ?? 0,
          satScale: Math.max(0, Math.min(2, Math.round(scale * 100) / 100)),
        },
      })),
      resetTheme: () => updateCurrent(set, (p) => ({
        ...p, theme: { hueShift: 0, satScale: 1 },
      })),

      select: (sel) => set({ selection: sel, groupSelection: [] }),

      setGroupSelection: (ids) => set({
        groupSelection: ids,
        selection: { kind: 'none' },
      }),

      selectAll: () => {
        const st = get();
        const nodeIds = st.project.nodes.map((n) => n.id);
        const decoIds = (st.project.decorations ?? []).map((d) => d.id);
        const imgIds = (st.project.images ?? []).map((im) => im.id);
        set({
          groupSelection: [...nodeIds, ...decoIds, ...imgIds],
          selection: { kind: 'none' },
        });
      },

      moveGroup: (dx, dy) => {
        const st = get();
        const idSet = new Set(st.groupSelection);
        if (idSet.size === 0) return;
        updateCurrent(set, (p) => ({
          ...p,
          nodes: p.nodes.map((n) =>
            idSet.has(n.id) ? { ...n, x: n.x + dx, y: n.y + dy } : n
          ),
          decorations: (p.decorations ?? []).map((d) => {
            if (!idSet.has(d.id)) return d;
            const next: Decoration = { ...d, x: d.x + dx, y: d.y + dy };
            if (d.kind === 'arrow' && d.x2 !== undefined && d.y2 !== undefined) {
              next.x2 = d.x2 + dx;
              next.y2 = d.y2 + dy;
            }
            return next;
          }),
          images: (p.images ?? []).map((im) =>
            idSet.has(im.id) ? { ...im, x: im.x + dx, y: im.y + dy } : im
          ),
        }));
      },

      removeGroup: () => {
        const st = get();
        const idSet = new Set(st.groupSelection);
        if (idSet.size === 0) return;
        updateCurrent(set, (p) => ({
          ...p,
          nodes: p.nodes.filter((n) => !idSet.has(n.id)),
          edges: p.edges.filter((e) => !idSet.has(e.from) && !idSet.has(e.to)),
          decorations: (p.decorations ?? []).filter((d) => !idSet.has(d.id)),
          images: (p.images ?? []).filter((im) => !idSet.has(im.id)),
        }));
        set({ groupSelection: [], selection: { kind: 'none' } });
      },

      setApiKey: (k) => updateCurrent(set, (p) => ({
        ...p,
        ai: { ...p.ai, apiKey: k, provider: k ? 'gemini' : 'none' },
      })),

      bumpUsage: (model) => updateCurrent(set, (p) => {
        const u = { ...p.ai.usage };
        if (u.lastResetDay !== today()) {
          u.proUsedToday = 0;
          u.flashUsedToday = 0;
          u.lastResetDay = today();
        }
        if (model === 'pro') u.proUsedToday += 1;
        else u.flashUsedToday += 1;
        return { ...p, ai: { ...p.ai, usage: u } };
      }),

      setMjMaster: (mjMasterPrompt) => updateCurrent(set, (p) => ({
        ...p, mjMasterPrompt,
      })),

      applyAutoLayoutPositions: (positions) => updateCurrent(set, (p) => ({
        ...p,
        nodes: p.nodes.map((n) =>
          positions[n.id] ? { ...n, x: positions[n.id].x, y: positions[n.id].y } : n
        ),
      })),

      // ── 탑다운 (평면도 모드) ──
      enterTopdown: () => {
        const st = get();
        const tds = st.project.topdowns ?? [];
        if (tds.length === 0) {
          const id = st.addTopdown();
          set({ mode: 'topdown', activeTopdownId: id });
          return;
        }
        const active = tds.some((t) => t.id === st.activeTopdownId)
          ? st.activeTopdownId
          : tds[0].id;
        set({ mode: 'topdown', activeTopdownId: active });
      },

      exitTopdown: () => set({ mode: 'bubble' }),

      setActiveTopdown: (id) => {
        const st = get();
        if (!(st.project.topdowns ?? []).some((t) => t.id === id)) return;
        set({ activeTopdownId: id });
      },

      addTopdown: (name) => {
        const id = uid('td');
        updateCurrent(set, (p) => {
          const n = name ?? `평면도 ${(p.topdowns?.length ?? 0) + 1}`;
          return { ...p, topdowns: [...(p.topdowns ?? []), emptyTopdown(id, n)] };
        });
        set({ activeTopdownId: id });
        return id;
      },

      removeTopdown: (id) => {
        updateCurrent(set, (p) => ({
          ...p,
          topdowns: (p.topdowns ?? []).filter((t) => t.id !== id),
        }));
        set((s) => {
          if (s.activeTopdownId !== id) return {};
          const rest = s.project.topdowns ?? [];
          return { activeTopdownId: rest.length > 0 ? rest[0].id : null };
        });
      },

      renameTopdown: (id, name) => updateCurrent(set, (p) => ({
        ...p,
        topdowns: (p.topdowns ?? []).map((t) => (t.id === id ? { ...t, name } : t)),
      })),

      updateTopdown: (id, patch) => updateCurrent(set, (p) => ({
        ...p,
        topdowns: (p.topdowns ?? []).map((t) => (t.id === id ? { ...t, ...patch } : t)),
      })),

      addGeo: (tdId, shape) => updateCurrent(set, (p) => ({
        ...p,
        topdowns: (p.topdowns ?? []).map((t) =>
          t.id === tdId ? { ...t, geo: [...t.geo, shape] } : t),
      })),

      removeGeo: (tdId, ids) => {
        const idSet = new Set(ids);
        updateCurrent(set, (p) => ({
          ...p,
          topdowns: (p.topdowns ?? []).map((t) =>
            t.id === tdId ? { ...t, geo: t.geo.filter((g) => !idSet.has(g.id)) } : t),
        }));
      },

      translateGeo: (tdId, ids, dx, dy) => {
        if (dx === 0 && dy === 0) return;
        const idSet = new Set(ids);
        updateCurrent(set, (p) => ({
          ...p,
          topdowns: (p.topdowns ?? []).map((t) => {
            if (t.id !== tdId) return t;
            // 이동 도형의 변 위에 놓인 문은 같은 델타로 따라간다
            const moved = t.geo.filter((g) => idSet.has(g.id));
            const follows = (d: DoorObj) =>
              moved.some((g) => distToPolyEdge(d.x, d.y, g.poly) <= 0.45);
            return {
              ...t,
              geo: t.geo.map((g) =>
                idSet.has(g.id)
                  ? { ...g, poly: g.poly.map((ring) => ring.map(([x, y]) => [x + dx, y + dy])) }
                  : g),
              doors: (t.doors ?? []).map((d) =>
                follows(d) ? { ...d, x: d.x + dx, y: d.y + dy } : d),
            };
          }),
        }));
      },

      addStruct: (tdId, shape) => updateCurrent(set, (p) => ({
        ...p,
        topdowns: (p.topdowns ?? []).map((t) =>
          t.id === tdId ? { ...t, struct: [...(t.struct ?? []), shape] } : t),
      })),

      removeStruct: (tdId, ids) => {
        const idSet = new Set(ids);
        updateCurrent(set, (p) => ({
          ...p,
          topdowns: (p.topdowns ?? []).map((t) =>
            t.id === tdId ? { ...t, struct: (t.struct ?? []).filter((g) => !idSet.has(g.id)) } : t),
        }));
      },

      translateStruct: (tdId, ids, dx, dy) => {
        if (dx === 0 && dy === 0) return;
        const idSet = new Set(ids);
        updateCurrent(set, (p) => ({
          ...p,
          topdowns: (p.topdowns ?? []).map((t) => {
            if (t.id !== tdId) return t;
            // 이동한 구조 벽 위의 문도 함께 (바닥 도형과 동일 규칙)
            const moved = (t.struct ?? []).filter((g) => idSet.has(g.id));
            const follows = (d: DoorObj) =>
              moved.some((g) => distToPolyEdge(d.x, d.y, g.poly) <= 0.45);
            return {
              ...t,
              struct: (t.struct ?? []).map((g) =>
                idSet.has(g.id)
                  ? { ...g, poly: g.poly.map((ring) => ring.map(([x, y]) => [x + dx, y + dy])) }
                  : g),
              doors: (t.doors ?? []).map((d) =>
                follows(d) ? { ...d, x: d.x + dx, y: d.y + dy } : d),
            };
          }),
        }));
      },

      addZone: (tdId, zone) => updateCurrent(set, (p) => ({
        ...p,
        topdowns: (p.topdowns ?? []).map((t) =>
          t.id === tdId ? { ...t, zones: [...(t.zones ?? []), zone] } : t),
      })),

      removeZone: (tdId, ids) => {
        const idSet = new Set(ids);
        updateCurrent(set, (p) => ({
          ...p,
          topdowns: (p.topdowns ?? []).map((t) =>
            t.id === tdId ? { ...t, zones: (t.zones ?? []).filter((z) => !idSet.has(z.id)) } : t),
        }));
      },

      translateZones: (tdId, ids, dx, dy) => {
        if (dx === 0 && dy === 0) return;
        const idSet = new Set(ids);
        updateCurrent(set, (p) => ({
          ...p,
          topdowns: (p.topdowns ?? []).map((t) =>
            t.id === tdId
              ? {
                  ...t,
                  zones: (t.zones ?? []).map((z) =>
                    idSet.has(z.id)
                      ? { ...z, poly: z.poly.map((ring) => ring.map(([x, y]) => [x + dx, y + dy])) }
                      : z),
                }
              : t),
        }));
      },

      transformShape: (tdId, { kind, id, poly, rot, doors }) => {
        const doorMap = new Map((doors ?? []).map((d) => [d.id, d]));
        const patch = rot === undefined ? { poly } : { poly, rot };
        updateCurrent(set, (p) => ({
          ...p,
          topdowns: (p.topdowns ?? []).map((t) => {
            if (t.id !== tdId) return t;
            return {
              ...t,
              geo: kind === 'geo' ? t.geo.map((g) => (g.id === id ? { ...g, ...patch } : g)) : t.geo,
              struct: kind === 'struct'
                ? (t.struct ?? []).map((g) => (g.id === id ? { ...g, ...patch } : g))
                : t.struct,
              zones: kind === 'zone'
                ? (t.zones ?? []).map((z) => (z.id === id ? { ...z, ...patch } : z))
                : t.zones,
              doors: doorMap.size
                ? (t.doors ?? []).map((d) => {
                    const nd = doorMap.get(d.id);
                    return nd ? { ...d, x: nd.x, y: nd.y, angle: nd.angle } : d;
                  })
                : t.doors,
            };
          }),
        }));
      },

      addDoor: (tdId, door) => updateCurrent(set, (p) => ({
        ...p,
        topdowns: (p.topdowns ?? []).map((t) =>
          t.id === tdId ? { ...t, doors: [...(t.doors ?? []), door] } : t),
      })),

      removeDoor: (tdId, ids) => {
        const idSet = new Set(ids);
        updateCurrent(set, (p) => ({
          ...p,
          topdowns: (p.topdowns ?? []).map((t) =>
            t.id === tdId ? { ...t, doors: (t.doors ?? []).filter((d) => !idSet.has(d.id)) } : t),
        }));
      },

      addStair: (tdId, stair) => updateCurrent(set, (p) => ({
        ...p,
        topdowns: (p.topdowns ?? []).map((t) =>
          t.id === tdId ? { ...t, stairs: [...(t.stairs ?? []), stair] } : t),
      })),

      removeStair: (tdId, ids) => {
        const idSet = new Set(ids);
        updateCurrent(set, (p) => ({
          ...p,
          topdowns: (p.topdowns ?? []).map((t) =>
            t.id === tdId ? { ...t, stairs: (t.stairs ?? []).filter((s) => !idSet.has(s.id)) } : t),
        }));
      },

      addText: (tdId, text) => updateCurrent(set, (p) => ({
        ...p,
        topdowns: (p.topdowns ?? []).map((t) =>
          t.id === tdId ? { ...t, texts: [...(t.texts ?? []), text] } : t),
      })),

      updateText: (tdId, id, patch) => updateCurrent(set, (p) => ({
        ...p,
        topdowns: (p.topdowns ?? []).map((t) =>
          t.id === tdId
            ? { ...t, texts: (t.texts ?? []).map((x) => (x.id === id ? { ...x, ...patch } : x)) }
            : t),
      })),

      removeText: (tdId, ids) => {
        const idSet = new Set(ids);
        updateCurrent(set, (p) => ({
          ...p,
          topdowns: (p.topdowns ?? []).map((t) =>
            t.id === tdId ? { ...t, texts: (t.texts ?? []).filter((x) => !idSet.has(x.id)) } : t),
        }));
      },

      addMarker: (tdId, marker) => updateCurrent(set, (p) => ({
        ...p,
        topdowns: (p.topdowns ?? []).map((t) =>
          t.id === tdId ? { ...t, markers: [...(t.markers ?? []), marker] } : t),
      })),

      updateMarker: (tdId, id, patch) => updateCurrent(set, (p) => ({
        ...p,
        topdowns: (p.topdowns ?? []).map((t) =>
          t.id === tdId
            ? { ...t, markers: (t.markers ?? []).map((m) => (m.id === id ? { ...m, ...patch } : m)) }
            : t),
      })),

      removeMarker: (tdId, ids) => {
        const idSet = new Set(ids);
        updateCurrent(set, (p) => ({
          ...p,
          topdowns: (p.topdowns ?? []).map((t) =>
            t.id === tdId ? { ...t, markers: (t.markers ?? []).filter((m) => !idSet.has(m.id)) } : t),
        }));
      },

      // 숨김 상태에서 그리면 보이지 않는 획이 쌓인다 — 커밋과 함께 레이어를 다시 켠다
      addStroke: (tdId, stroke) => updateCurrent(set, (p) => ({
        ...p,
        topdowns: (p.topdowns ?? []).map((t) =>
          t.id === tdId
            ? { ...t, strokes: [...(t.strokes ?? []), stroke], pathVisible: true }
            : t),
      })),

      removeStroke: (tdId, ids) => {
        const idSet = new Set(ids);
        updateCurrent(set, (p) => ({
          ...p,
          topdowns: (p.topdowns ?? []).map((t) =>
            t.id === tdId ? { ...t, strokes: (t.strokes ?? []).filter((s) => !idSet.has(s.id)) } : t),
        }));
      },

      clearStrokes: (tdId) => updateCurrent(set, (p) => ({
        ...p,
        topdowns: (p.topdowns ?? []).map((t) =>
          t.id === tdId ? { ...t, strokes: [] } : t),
      })),

      addTdImage: (tdId, image) => updateCurrent(set, (p) => ({
        ...p,
        topdowns: (p.topdowns ?? []).map((t) =>
          t.id === tdId ? { ...t, images: [...(t.images ?? []), image] } : t),
      })),

      updateTdImage: (tdId, id, patch) => updateCurrent(set, (p) => ({
        ...p,
        topdowns: (p.topdowns ?? []).map((t) =>
          t.id === tdId
            ? { ...t, images: (t.images ?? []).map((im) => (im.id === id ? { ...im, ...patch } : im)) }
            : t),
      })),

      removeTdImage: (tdId, ids) => {
        const idSet = new Set(ids);
        updateCurrent(set, (p) => ({
          ...p,
          topdowns: (p.topdowns ?? []).map((t) =>
            t.id === tdId ? { ...t, images: (t.images ?? []).filter((im) => !idSet.has(im.id)) } : t),
        }));
      },

      // ── 매싱 스케처 — 모드 전환만 (데이터는 별도 스토어) ──
      enterMassing: () => set({ mode: 'massing' }),
      exitMassing: () => set({ mode: 'bubble' }),

      // ── 흐름 실험실 — 모드 전환만 (데이터는 별도 스토어) ──
      enterFlow: () => set({ mode: 'flow' }),
      exitFlow: () => set({ mode: 'bubble' }),

      // ── 페이싱 곡선 — 모드 전환만 (데이터는 별도 스토어) ──
      enterPacing: () => set({ mode: 'pacing' }),
      exitPacing: () => set({ mode: 'bubble' }),

      addMany: (tdId, items) => updateCurrent(set, (p) => ({
        ...p,
        topdowns: (p.topdowns ?? []).map((t) =>
          t.id === tdId
            ? {
                ...t,
                geo: [...t.geo, ...(items.geo ?? [])],
                struct: [...(t.struct ?? []), ...(items.struct ?? [])],
                zones: [...(t.zones ?? []), ...(items.zones ?? [])],
                doors: [...(t.doors ?? []), ...(items.doors ?? [])],
                stairs: [...(t.stairs ?? []), ...(items.stairs ?? [])],
                texts: [...(t.texts ?? []), ...(items.texts ?? [])],
                markers: [...(t.markers ?? []), ...(items.markers ?? [])],
              }
            : t),
      })),

      translateObject: (tdId, id, dx, dy) => {
        if (dx === 0 && dy === 0) return;
        updateCurrent(set, (p) => ({
          ...p,
          topdowns: (p.topdowns ?? []).map((t) =>
            t.id === tdId
              ? {
                  ...t,
                  doors: (t.doors ?? []).map((d) =>
                    d.id === id ? { ...d, x: d.x + dx, y: d.y + dy } : d),
                  stairs: (t.stairs ?? []).map((s) =>
                    s.id === id
                      ? { ...s, x1: s.x1 + dx, y1: s.y1 + dy, x2: s.x2 + dx, y2: s.y2 + dy }
                      : s),
                  texts: (t.texts ?? []).map((x) =>
                    x.id === id ? { ...x, x: x.x + dx, y: x.y + dy } : x),
                  markers: (t.markers ?? []).map((m) =>
                    m.id === id ? { ...m, x: m.x + dx, y: m.y + dy } : m),
                  images: (t.images ?? []).map((im) =>
                    im.id === id ? { ...im, x: im.x + dx, y: im.y + dy } : im),
                  strokes: (t.strokes ?? []).map((s) =>
                    s.id === id
                      ? { ...s, pts: s.pts.map(([x, y]) => [x! + dx, y! + dy]) }
                      : s),
                }
              : t),
        }));
      },
    };
    }),
    {
      // undo/redo 추적 대상은 projects + currentId만 (selection은 메모리 한정)
      partialize: (state) => ({
        projects: state.projects,
        currentId: state.currentId,
        project: state.project,
      }) as any,
      limit: 80,
      // 드래그/리사이즈 연속 변경에서 매 frame snapshot 회피
      handleSet: (handleSet) =>
        throttle((pastState: any) => handleSet(pastState), 250),
      equality: (a: any, b: any) =>
        a.projects === b.projects && a.currentId === b.currentId,
    },
  ),
);

/* undo/redo 외부 사용 헬퍼 */
export const undoProject = () => useProject.temporal.getState().undo();
export const redoProject = () => useProject.temporal.getState().redo();
export const canUndoCount = () => useProject.temporal.getState().pastStates.length;
export const canRedoCount = () => useProject.temporal.getState().futureStates.length;

/* ─── 자동저장 — projects 또는 currentId 변화 시 디바운스 저장 ─── */
let saveTimer: number | undefined;
const SAVE_DEBOUNCE = 400;

useProject.subscribe(
  (s) => ({ projects: s.projects, currentId: s.currentId }),
  ({ projects, currentId }) => {
    if (saveTimer) window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => saveWorkspace(projects, currentId), SAVE_DEBOUNCE);
  },
  { equalityFn: (a, b) => a.projects === b.projects && a.currentId === b.currentId },
);
