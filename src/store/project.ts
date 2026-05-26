import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type {
  Project, Postit, BubbleNode, BubbleEdge, Decoration, DecorationKind,
  Concept, PostitColor, NodeType, EdgeType, CanvasView,
} from '../types';
import { emptyProject } from '../types';
import { uid, today } from '../utils/id';

/* ─────────────────────────────────────────────────────────
   멀티 프로젝트 워크스페이스 — 모든 상태는 메모리만.
   영구 저장 없음. JSON export/import로만 보존.
   project = projects[currentId 매칭] (state.project로 동기 유지)
   ───────────────────────────────────────────────────────── */

interface ProjectStore {
  projects: Project[];
  currentId: string;
  project: Project;   // 현재 활성 프로젝트와 동기화된 참조
  selection: { kind: 'none' } | { kind: 'node'; id: string } | { kind: 'edge'; id: string } | { kind: 'postit'; id: string } | { kind: 'decoration'; id: string };

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

  // 노드
  addNode: (n: Partial<BubbleNode> & { x: number; y: number }) => string;
  updateNode: (id: string, patch: Partial<BubbleNode>) => void;
  removeNode: (id: string) => void;
  moveNode: (id: string, x: number, y: number) => void;
  resizeNode: (id: string, size: number) => void;
  setNodeAspect: (id: string, aspect: number) => void;
  promotePostit: (postitId: string, x: number, y: number, type?: NodeType) => string;

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

  // 선택
  select: (s: ProjectStore['selection']) => void;

  // AI
  setApiKey: (k: string | undefined) => void;
  bumpUsage: (model: 'pro' | 'flash') => void;
  setMjMaster: (s: string) => void;

  // 마이그레이션 헬퍼
  applyAutoLayoutPositions: (positions: Record<string, { x: number; y: number }>) => void;
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

export const useProject = create<ProjectStore>()(
  subscribeWithSelector((set, get) => {
    const first = emptyProject(newId());
    return {
      projects: [first],
      currentId: first.id,
      project: first,
      selection: { kind: 'none' },

      // ── 워크스페이스 ──
      newProject: (name = '새 레벨') => {
        const np = { ...emptyProject(newId()), name };
        set((s) => ({
          projects: [...s.projects, np],
          currentId: np.id,
          project: np,
          selection: { kind: 'none' },
        }));
        return np.id;
      },

      switchProject: (id) => {
        set((s) => {
          const target = s.projects.find((p) => p.id === id);
          if (!target) return {};
          return { currentId: id, project: target, selection: { kind: 'none' } };
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
          };
        });
      },

      importProject: (p) => {
        // 새 id 부여 (기존 id 충돌 방지)
        const imported: Project = { ...p, id: newId() };
        set((s) => ({
          projects: [...s.projects, imported],
          currentId: imported.id,
          project: imported,
          selection: { kind: 'none' },
        }));
        return imported.id;
      },

      // ── 현재 프로젝트 액션 ──
      setName: (name) => updateCurrent(set, (p) => ({ ...p, name })),

      loadFromJSON: (p) => {
        // 현재 프로젝트를 통째로 교체 (id는 현재 것 유지)
        updateCurrent(set, (cur) => ({ ...p, id: cur.id }));
        set({ selection: { kind: 'none' } });
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

      select: (sel) => set({ selection: sel }),

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
    };
  })
);
