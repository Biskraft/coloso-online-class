import type { Project } from '../types';

/* ─────────────────────────────────────────────────────────
   영구 저장 없음 — 모든 프로젝트는 메모리에서만.
   JSON export/import만 영구화 수단.
   ───────────────────────────────────────────────────────── */

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
