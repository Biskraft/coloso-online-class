import { create } from 'zustand';
import { temporal } from 'zundo';
import type { PacingDoc, PacingPoint, PacingMarker, PacingMap, PacingPin } from '../types';
import { emptyPacing } from '../types';
import { uid } from '../utils/id';

const KEY = 'bubble-atelier::pacing';
const VERSION = 1;

interface PacingStore {
  docs: PacingDoc[];
  currentId: string;
  setActive: (id: string) => void;
  addDoc: (name?: string, seed?: Partial<PacingDoc>) => string;
  removeDoc: (id: string) => void;
  renameDoc: (id: string, name: string) => void;
  addSegment: (docId: string) => void;
  renameSegment: (docId: string, segId: string, name: string) => void;
  setSegmentWidth: (docId: string, segId: string, width: number) => void;
  removeSegment: (docId: string, segId: string) => void;
  addPoint: (docId: string, p: PacingPoint) => void;
  movePoint: (docId: string, id: string, t: number, tension: number) => void;
  removePoint: (docId: string, id: string) => void;
  addMarker: (docId: string, m: PacingMarker) => void;
  moveMarker: (docId: string, id: string, at: number, tension: number) => void;
  removeMarker: (docId: string, id: string) => void;
  setMap: (docId: string, map: PacingMap | null) => void;
  addPin: (docId: string, pin: PacingPin) => void;
  movePin: (docId: string, id: string, mx: number, my: number) => void;
  removePin: (docId: string, id: string) => void;
}

function loadStored(): { docs: PacingDoc[]; currentId: string } | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw);
    if (p.v !== VERSION || !Array.isArray(p.docs) || p.docs.length === 0) return null;
    const docs: PacingDoc[] = p.docs.map((d: any) => ({
      id: d.id, name: d.name,
      updatedAt: d.updatedAt ?? Date.now(),
      segments: Array.isArray(d.segments) ? d.segments : [],
      points: Array.isArray(d.points) ? d.points : [],
      markers: Array.isArray(d.markers) ? d.markers : [],
      map: d.map ?? null,
      pins: Array.isArray(d.pins) ? d.pins : [],
    }));
    const currentId = docs.some((d) => d.id === p.currentId) ? p.currentId : docs[0].id;
    return { docs, currentId };
  } catch { return null; }
}

export const usePacing = create<PacingStore>()(
  temporal(
    (set, get) => {
      const restored = loadStored();
      const initial = restored ?? (() => {
        const d = emptyPacing(uid('pc'));
        return { docs: [d], currentId: d.id };
      })();
      const mutDoc = (docId: string, fn: (d: PacingDoc) => PacingDoc) =>
        set((s) => ({ docs: s.docs.map((d) => (d.id === docId ? fn(d) : d)) }));
      return {
        ...initial,
        setActive: (id) => { if (get().docs.some((d) => d.id === id)) set({ currentId: id }); },
        addDoc: (name, seed) => {
          const d = { ...emptyPacing(uid('pc'), name ?? `페이싱 ${get().docs.length + 1}`), ...seed };
          set((s) => ({ docs: [...s.docs, d], currentId: d.id }));
          return d.id;
        },
        removeDoc: (id) => set((s) => {
          const rest = s.docs.filter((d) => d.id !== id);
          if (rest.length === 0) { const d = emptyPacing(uid('pc')); return { docs: [d], currentId: d.id }; }
          return { docs: rest, currentId: s.currentId === id ? rest[0].id : s.currentId };
        }),
        renameDoc: (id, name) => mutDoc(id, (d) => ({ ...d, name })),
        addSegment: (docId) => mutDoc(docId, (d) => ({ ...d, segments: [...d.segments, { id: uid('pc-s'), name: `구간 ${d.segments.length + 1}`, width: 1 }] })),
        renameSegment: (docId, segId, name) => mutDoc(docId, (d) => ({ ...d, segments: d.segments.map((s) => s.id === segId ? { ...s, name } : s) })),
        setSegmentWidth: (docId, segId, width) => mutDoc(docId, (d) => ({ ...d, segments: d.segments.map((s) => s.id === segId ? { ...s, width: Math.max(0.25, width) } : s) })),
        removeSegment: (docId, segId) => mutDoc(docId, (d) => d.segments.length <= 1 ? d : ({
          ...d, segments: d.segments.filter((s) => s.id !== segId),
          points: d.points.filter((p) => p.segId !== segId),
          pins: d.pins.filter((p) => p.segId !== segId),
        })),
        addPoint: (docId, p) => mutDoc(docId, (d) => ({ ...d, points: [...d.points, p] })),
        movePoint: (docId, id, t, tension) => mutDoc(docId, (d) => ({ ...d, points: d.points.map((p) => p.id === id ? { ...p, t: clamp01(t), tension: clampT(tension) } : p) })),
        removePoint: (docId, id) => mutDoc(docId, (d) => ({ ...d, points: d.points.filter((p) => p.id !== id) })),
        addMarker: (docId, m) => mutDoc(docId, (d) => ({ ...d, markers: [...d.markers, m] })),
        moveMarker: (docId, id, at, tension) => mutDoc(docId, (d) => ({ ...d, markers: d.markers.map((m) => m.id === id ? { ...m, at: clamp01(at), tension: clampT(tension) } : m) })),
        removeMarker: (docId, id) => mutDoc(docId, (d) => ({ ...d, markers: d.markers.filter((m) => m.id !== id) })),
        setMap: (docId, map) => mutDoc(docId, (d) => ({ ...d, map })),
        addPin: (docId, pin) => mutDoc(docId, (d) => ({ ...d, pins: [...d.pins, pin] })),
        movePin: (docId, id, mx, my) => mutDoc(docId, (d) => ({ ...d, pins: d.pins.map((p) => p.id === id ? { ...p, mx: clamp01(mx), my: clamp01(my) } : p) })),
        removePin: (docId, id) => mutDoc(docId, (d) => ({ ...d, pins: d.pins.filter((p) => p.id !== id) })),
      };
    },
    { partialize: (s) => ({ docs: s.docs, currentId: s.currentId }) as any, limit: 80, equality: (a: any, b: any) => a.docs === b.docs },
  ),
);

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const clampT = (v: number) => Math.max(0, Math.min(100, v));

let saveTimer: number | undefined;
usePacing.subscribe((s) => {
  if (saveTimer) window.clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    try { localStorage.setItem(KEY, JSON.stringify({ v: VERSION, docs: s.docs, currentId: s.currentId })); }
    catch (e) { console.warn('페이싱 저장 실패', e); }
  }, 400);
});

export const undoPacing = () => usePacing.temporal.getState().undo();
export const redoPacing = () => usePacing.temporal.getState().redo();
