import type { Project } from '../types';

/* ─────────────────────────────────────────────────────────
   워크스페이스 영속화 — 모든 프로젝트 + 활성 ID
   localStorage 자동 저장/복원 (디바운스)
   ───────────────────────────────────────────────────────── */

const KEY = 'bubble-atelier::workspace';
const VERSION = 1;

export interface Workspace {
  v: number;
  projects: Project[];
  currentId: string;
}

export function loadWorkspace(): Workspace | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Workspace;
    if (parsed.v !== VERSION) return null;
    if (!Array.isArray(parsed.projects) || parsed.projects.length === 0) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveWorkspace(projects: Project[], currentId: string): void {
  try {
    const ws: Workspace = { v: VERSION, projects, currentId };
    localStorage.setItem(KEY, JSON.stringify(ws));
  } catch (e) {
    console.warn('localStorage 저장 실패', e);
  }
}

export function clearWorkspace(): void {
  localStorage.removeItem(KEY);
}

/* ─── JSON 파일 입출력 (개별 프로젝트) ─── */

export function downloadJSON(p: Project, filename = 'level-design.json') {
  const blob = new Blob([JSON.stringify(p, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function uploadJSON(): Promise<Project | null> {
  return new Promise((resolve) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return resolve(null);
      try {
        const text = await file.text();
        const p = JSON.parse(text) as Project;
        if (p.version !== 1) return resolve(null);
        resolve(p);
      } catch {
        resolve(null);
      }
    };
    input.click();
  });
}
