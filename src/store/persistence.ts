import type { Project } from '../types';

const KEY = 'bubble-atelier::project';

export function loadProject(): Project | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Project;
    if (parsed.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveProject(p: Project): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch (e) {
    console.warn('localStorage 저장 실패', e);
  }
}

export function clearProject(): void {
  localStorage.removeItem(KEY);
}

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
