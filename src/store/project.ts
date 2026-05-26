import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type {
  Project, Postit, BubbleNode, BubbleEdge, Concept, PostitColor,
  NodeType, EdgeType, CanvasView,
} from '../types';
import { emptyProject } from '../types';
import { uid, today } from '../utils/id';
import { loadProject, saveProject } from './persistence';

interface ProjectStore {
  project: Project;
  selection: { kind: 'none' } | { kind: 'node'; id: string } | { kind: 'edge'; id: string } | { kind: 'postit'; id: string };

  // 프로젝트
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
  promotePostit: (postitId: string, x: number, y: number, type?: NodeType) => string;

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

const SAVE_DEBOUNCE = 400;
let saveTimer: number | undefined;

const queueSave = (p: Project) => {
  if (saveTimer) window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => saveProject(p), SAVE_DEBOUNCE);
};

const touch = (p: Project): Project => ({ ...p, updatedAt: Date.now() });

export const useProject = create<ProjectStore>()(
  subscribeWithSelector((set, get) => {
    const init = loadProject() ?? emptyProject();
    // AI 사용량 일일 리셋
    if (init.ai.usage.lastResetDay !== today()) {
      init.ai.usage = { proUsedToday: 0, flashUsedToday: 0, lastResetDay: today() };
    }

    return {
      project: init,
      selection: { kind: 'none' },

      setName: (name) =>
        set((s) => {
          const p = touch({ ...s.project, name });
          queueSave(p);
          return { project: p };
        }),

      loadFromJSON: (p) => {
        const np = touch(p);
        saveProject(np);
        set({ project: np, selection: { kind: 'none' } });
      },

      reset: () => {
        const p = emptyProject();
        saveProject(p);
        set({ project: p, selection: { kind: 'none' } });
      },

      setConcept: (patch) =>
        set((s) => {
          const p = touch({ ...s.project, concept: { ...s.project.concept, ...patch } });
          queueSave(p);
          return { project: p };
        }),

      addPostit: (text = '', color = 'yellow') => {
        const id = uid('pst');
        const rotation = (Math.random() * 6) - 3; // -3 ~ 3
        const postit: Postit = {
          id, x: 0, y: 0, rotation, color, text, tags: [],
          createdAt: Date.now(),
        };
        set((s) => {
          const p = touch({ ...s.project, postits: [postit, ...s.project.postits] });
          queueSave(p);
          return { project: p };
        });
        return id;
      },

      updatePostit: (id, patch) =>
        set((s) => {
          const postits = s.project.postits.map((x) => x.id === id ? { ...x, ...patch } : x);
          const p = touch({ ...s.project, postits });
          queueSave(p);
          return { project: p };
        }),

      removePostit: (id) =>
        set((s) => {
          const p = touch({
            ...s.project,
            postits: s.project.postits.filter((x) => x.id !== id),
          });
          queueSave(p);
          return { project: p };
        }),

      movePostit: (id, x, y) => {
        set((s) => {
          const postits = s.project.postits.map((p) =>
            p.id === id ? { ...p, x, y } : p
          );
          const p = touch({ ...s.project, postits });
          queueSave(p);
          return { project: p };
        });
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
        set((s) => {
          const p = touch({ ...s.project, nodes: [...s.project.nodes, node] });
          queueSave(p);
          return { project: p, selection: { kind: 'node', id } };
        });
        return id;
      },

      updateNode: (id, patch) =>
        set((s) => {
          const nodes = s.project.nodes.map((x) => x.id === id ? { ...x, ...patch } : x);
          const p = touch({ ...s.project, nodes });
          queueSave(p);
          return { project: p };
        }),

      removeNode: (id) =>
        set((s) => {
          const nodes = s.project.nodes.filter((x) => x.id !== id);
          const edges = s.project.edges.filter((e) => e.from !== id && e.to !== id);
          const p = touch({ ...s.project, nodes, edges });
          queueSave(p);
          return {
            project: p,
            selection: s.selection.kind === 'node' && s.selection.id === id ? { kind: 'none' } : s.selection,
          };
        }),

      moveNode: (id, x, y) =>
        set((s) => {
          const nodes = s.project.nodes.map((n) => n.id === id ? { ...n, x, y } : n);
          const p = touch({ ...s.project, nodes });
          queueSave(p);
          return { project: p };
        }),

      promotePostit: (postitId, x, y, type = 'room') => {
        const st = get();
        const pst = st.project.postits.find((p) => p.id === postitId);
        if (!pst) return '';
        const id = uid('nd');
        const node: BubbleNode = {
          id,
          type,
          name: pst.text.slice(0, 30) || '새 방',
          notes: pst.text,
          icons: [],
          x, y,
          promotedFrom: postitId,
        };
        set((s) => {
          const postits = s.project.postits.map((p) =>
            p.id === postitId ? { ...p, promoted: true } : p
          );
          const p = touch({ ...s.project, nodes: [...s.project.nodes, node], postits });
          queueSave(p);
          return { project: p, selection: { kind: 'node', id } };
        });
        return id;
      },

      addEdge: (from, to, type = 'open') => {
        if (from === to) return null;
        const st = get();
        // 중복 방지
        if (st.project.edges.some((e) => e.from === from && e.to === to)) return null;
        const id = uid('eg');
        const edge: BubbleEdge = { id, from, to, type };
        set((s) => {
          const p = touch({ ...s.project, edges: [...s.project.edges, edge] });
          queueSave(p);
          return { project: p };
        });
        return id;
      },

      updateEdge: (id, patch) =>
        set((s) => {
          const edges = s.project.edges.map((e) => e.id === id ? { ...e, ...patch } : e);
          const p = touch({ ...s.project, edges });
          queueSave(p);
          return { project: p };
        }),

      removeEdge: (id) =>
        set((s) => {
          const edges = s.project.edges.filter((e) => e.id !== id);
          const p = touch({ ...s.project, edges });
          queueSave(p);
          return {
            project: p,
            selection: s.selection.kind === 'edge' && s.selection.id === id ? { kind: 'none' } : s.selection,
          };
        }),

      setView: (patch) =>
        set((s) => {
          const p = touch({ ...s.project, view: { ...s.project.view, ...patch } });
          queueSave(p);
          return { project: p };
        }),

      select: (s) => set({ selection: s }),

      setApiKey: (k) =>
        set((s) => {
          const p = touch({
            ...s.project,
            ai: { ...s.project.ai, apiKey: k, provider: k ? 'gemini' : 'none' },
          });
          queueSave(p);
          return { project: p };
        }),

      bumpUsage: (model) =>
        set((s) => {
          const u = { ...s.project.ai.usage };
          if (u.lastResetDay !== today()) {
            u.proUsedToday = 0;
            u.flashUsedToday = 0;
            u.lastResetDay = today();
          }
          if (model === 'pro') u.proUsedToday += 1;
          else u.flashUsedToday += 1;
          const p = touch({ ...s.project, ai: { ...s.project.ai, usage: u } });
          queueSave(p);
          return { project: p };
        }),

      setMjMaster: (mjMasterPrompt) =>
        set((s) => {
          const p = touch({ ...s.project, mjMasterPrompt });
          queueSave(p);
          return { project: p };
        }),

      applyAutoLayoutPositions: (positions) =>
        set((s) => {
          const nodes = s.project.nodes.map((n) =>
            positions[n.id] ? { ...n, x: positions[n.id].x, y: positions[n.id].y } : n
          );
          const p = touch({ ...s.project, nodes });
          queueSave(p);
          return { project: p };
        }),
    };
  })
);
