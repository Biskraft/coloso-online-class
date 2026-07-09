import { create } from 'zustand';
import { temporal } from 'zundo';
import type { MassingDoc, MassingBlock } from '../types';
import { emptyMassing } from '../types';
import { uid } from '../utils/id';

/* ─────────────────────────────────────────────────────────
   매싱 스케처 전용 스토어 — 맵(프로젝트)과 완전 분리된 실습장.
   자체 localStorage 키·자체 undo 스택. .map.json에 포함되지 않는다.
   ───────────────────────────────────────────────────────── */

const KEY = 'bubble-atelier::massing';
const VERSION = 1;

interface MassingStore {
  docs: MassingDoc[];
  currentId: string;

  setActive: (id: string) => void;
  addDoc: (name?: string) => string;
  removeDoc: (id: string) => void;
  renameDoc: (id: string, name: string) => void;
  updateDoc: (id: string, patch: Partial<MassingDoc>) => void;

  addBlock: (docId: string, block: MassingBlock) => void;
  addBlocks: (docId: string, blocks: MassingBlock[]) => void;
  updateBlock: (docId: string, id: string, patch: Partial<MassingBlock>) => void;
  removeBlocks: (docId: string, ids: string[]) => void;
  translateBlocks: (docId: string, ids: string[], dx: number, dy: number) => void;
}

function loadStored(): { docs: MassingDoc[]; currentId: string } | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (p.v !== VERSION || !Array.isArray(p.docs) || p.docs.length === 0) return null;
    const docs: MassingDoc[] = p.docs.map((m: any) => ({
      ...m,
      grid: Array.isArray(m.grid) ? m.grid : [64, 64],
      view: m.view ?? { dir: 0 },
      blocks: Array.isArray(m.blocks) ? m.blocks : [],
    }));
    const currentId = docs.some((d) => d.id === p.currentId) ? p.currentId : docs[0].id;
    return { docs, currentId };
  } catch {
    return null;
  }
}

export const useMassing = create<MassingStore>()(
  temporal(
    (set, get) => {
      const restored = loadStored();
      const initial = restored ?? (() => {
        const d = emptyMassing(uid('ms'));
        return { docs: [d], currentId: d.id };
      })();

      const mutDoc = (docId: string, fn: (d: MassingDoc) => MassingDoc) =>
        set((s) => ({ docs: s.docs.map((d) => (d.id === docId ? fn(d) : d)) }));

      return {
        ...initial,

        setActive: (id) => {
          if (get().docs.some((d) => d.id === id)) set({ currentId: id });
        },

        addDoc: (name) => {
          const d = emptyMassing(uid('ms'), name ?? `매싱 ${get().docs.length + 1}`);
          set((s) => ({ docs: [...s.docs, d], currentId: d.id }));
          return d.id;
        },

        removeDoc: (id) => set((s) => {
          const rest = s.docs.filter((d) => d.id !== id);
          if (rest.length === 0) {
            const d = emptyMassing(uid('ms'));
            return { docs: [d], currentId: d.id };
          }
          return { docs: rest, currentId: s.currentId === id ? rest[0].id : s.currentId };
        }),

        renameDoc: (id, name) => mutDoc(id, (d) => ({ ...d, name })),
        updateDoc: (id, patch) => mutDoc(id, (d) => ({ ...d, ...patch })),

        addBlock: (docId, block) => mutDoc(docId, (d) => ({ ...d, blocks: [...d.blocks, block] })),
        addBlocks: (docId, blocks) => mutDoc(docId, (d) => ({ ...d, blocks: [...d.blocks, ...blocks] })),

        updateBlock: (docId, id, patch) => mutDoc(docId, (d) => ({
          ...d,
          blocks: d.blocks.map((b) => (b.id === id ? { ...b, ...patch } : b)),
        })),

        removeBlocks: (docId, ids) => {
          const idSet = new Set(ids);
          mutDoc(docId, (d) => ({ ...d, blocks: d.blocks.filter((b) => !idSet.has(b.id)) }));
        },

        translateBlocks: (docId, ids, dx, dy) => {
          if (dx === 0 && dy === 0) return;
          const idSet = new Set(ids);
          mutDoc(docId, (d) => ({
            ...d,
            blocks: d.blocks.map((b) =>
              idSet.has(b.id) ? { ...b, x: b.x + dx, y: b.y + dy } : b),
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
useMassing.subscribe((s) => {
  if (saveTimer) window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v: VERSION, docs: s.docs, currentId: s.currentId }));
    } catch (e) {
      console.warn('매싱 저장 실패', e);
    }
  }, 400);
});

export const undoMassing = () => useMassing.temporal.getState().undo();
export const redoMassing = () => useMassing.temporal.getState().redo();
