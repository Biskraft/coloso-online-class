import { create } from 'zustand';
import { temporal } from 'zundo';
import type { FlowDoc, FlowBox, FlowDisc } from '../types';
import { emptyFlow } from '../types';
import { uid } from '../utils/id';

/* ─────────────────────────────────────────────────────────
   흐름 실험실 전용 스토어 — 맵(프로젝트)과 완전 분리된 실습장.
   자체 localStorage 키·자체 undo 스택. (매싱 분리 원칙 승계)
   ───────────────────────────────────────────────────────── */

const KEY = 'bubble-atelier::flow';
const VERSION = 1;

interface FlowStore {
  docs: FlowDoc[];
  currentId: string;

  setActive: (id: string) => void;
  addDoc: (name?: string, seed?: Partial<FlowDoc>) => string;
  removeDoc: (id: string) => void;
  renameDoc: (id: string, name: string) => void;
  updateDoc: (id: string, patch: Partial<FlowDoc>) => void;

  addBox: (docId: string, box: FlowBox) => void;
  addDisc: (docId: string, disc: FlowDisc) => void;
  removeObjs: (docId: string, ids: string[]) => void;
  translateObjs: (docId: string, ids: string[], dx: number, dy: number) => void;
  /** 크기·회전·반경 변경 — 박스/디스크 중 id가 속한 쪽에 적용 */
  patchObj: (docId: string, id: string, patch: Partial<FlowBox> & Partial<FlowDisc>) => void;
}

function loadStored(): { docs: FlowDoc[]; currentId: string } | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (p.v !== VERSION || !Array.isArray(p.docs) || p.docs.length === 0) return null;
    const docs: FlowDoc[] = p.docs.map((d: any) => ({
      ...d,
      grid: 128,   // 작업 범위 2배 확장 (2026-06-12) — 기존 문서도 승격
      start: d.start ?? { x: 8, y: 64 },
      boxes: Array.isArray(d.boxes) ? d.boxes.map((b: any) => ({ rot: 0, ...b })) : [],
      discs: Array.isArray(d.discs) ? d.discs : [],
    }));
    const currentId = docs.some((d) => d.id === p.currentId) ? p.currentId : docs[0].id;
    return { docs, currentId };
  } catch {
    return null;
  }
}

export const useFlow = create<FlowStore>()(
  temporal(
    (set, get) => {
      const restored = loadStored();
      const initial = restored ?? (() => {
        const d = emptyFlow(uid('fl'));
        return { docs: [d], currentId: d.id };
      })();

      const mutDoc = (docId: string, fn: (d: FlowDoc) => FlowDoc) =>
        set((s) => ({ docs: s.docs.map((d) => (d.id === docId ? fn(d) : d)) }));

      return {
        ...initial,

        setActive: (id) => {
          if (get().docs.some((d) => d.id === id)) set({ currentId: id });
        },

        addDoc: (name, seed) => {
          const d = { ...emptyFlow(uid('fl'), name ?? `흐름 ${get().docs.length + 1}`), ...seed };
          set((s) => ({ docs: [...s.docs, d], currentId: d.id }));
          return d.id;
        },

        removeDoc: (id) => set((s) => {
          const rest = s.docs.filter((d) => d.id !== id);
          if (rest.length === 0) {
            const d = emptyFlow(uid('fl'));
            return { docs: [d], currentId: d.id };
          }
          return { docs: rest, currentId: s.currentId === id ? rest[0].id : s.currentId };
        }),

        renameDoc: (id, name) => mutDoc(id, (d) => ({ ...d, name })),
        updateDoc: (id, patch) => mutDoc(id, (d) => ({ ...d, ...patch })),

        addBox: (docId, box) => mutDoc(docId, (d) => ({ ...d, boxes: [...d.boxes, box] })),
        addDisc: (docId, disc) => mutDoc(docId, (d) => ({ ...d, discs: [...d.discs, disc] })),

        removeObjs: (docId, ids) => {
          const idSet = new Set(ids);
          mutDoc(docId, (d) => ({
            ...d,
            boxes: d.boxes.filter((b) => !idSet.has(b.id)),
            discs: d.discs.filter((c) => !idSet.has(c.id)),
          }));
        },

        patchObj: (docId, id, patch) => {
          mutDoc(docId, (d) => ({
            ...d,
            boxes: d.boxes.map((b) => (b.id === id ? { ...b, ...patch } : b)),
            discs: d.discs.map((c) => (c.id === id ? { ...c, ...patch } : c)),
          }));
        },

        translateObjs: (docId, ids, dx, dy) => {
          if (dx === 0 && dy === 0) return;
          const idSet = new Set(ids);
          mutDoc(docId, (d) => ({
            ...d,
            boxes: d.boxes.map((b) =>
              idSet.has(b.id) ? { ...b, x: b.x + dx, y: b.y + dy } : b),
            discs: d.discs.map((c) =>
              idSet.has(c.id) ? { ...c, x: c.x + dx, y: c.y + dy } : c),
          }));
        },
      };
    },
    {
      partialize: (s) => ({ docs: s.docs, currentId: s.currentId }) as any,
      limit: 80,
      equality: (a: any, b: any) => a.docs === b.docs,
    },
  ),
);

/* 자동저장 — 디바운스 */
let saveTimer: number | undefined;
useFlow.subscribe((s) => {
  if (saveTimer) window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: VERSION, docs: s.docs, currentId: s.currentId }));
    } catch (e) {
      console.warn('흐름 저장 실패', e);
    }
  }, 400);
});

export const undoFlow = () => useFlow.temporal.getState().undo();
export const redoFlow = () => useFlow.temporal.getState().redo();
