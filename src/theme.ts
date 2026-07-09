/* 테마 컨트롤러 — light/dark 토글, localStorage 저장.
   index.html의 인라인 스크립트가 사전 적용해 FOUC 방지. */

import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
const KEY = 'bubble-atelier::theme';

export function getStoredTheme(): Theme | null {
  const v = localStorage.getItem(KEY);
  return v === 'light' || v === 'dark' ? v : null;
}

export function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getCurrentTheme(): Theme {
  return (document.documentElement.dataset.theme as Theme) || getSystemTheme();
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(KEY, theme);
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

export function toggleTheme() {
  setTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark');
}

/** 현재 테마를 구독하는 React 훅 — 토글/시스템 변경에 반응해 리렌더 */
export function useTheme(): Theme {
  const [theme, setLocal] = useState<Theme>(getCurrentTheme());
  useEffect(() => {
    const onChange = (e: Event) => setLocal((e as CustomEvent<Theme>).detail);
    window.addEventListener('themechange', onChange);
    const unsub = subscribeSystemTheme((t) => setLocal(t));
    return () => {
      window.removeEventListener('themechange', onChange);
      unsub();
    };
  }, []);
  return theme;
}

/** 시스템 테마 변경을 구독 — 사용자가 명시 설정 안 했을 때만 자동 추종 */
export function subscribeSystemTheme(cb: (t: Theme) => void) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e: MediaQueryListEvent) => {
    if (!getStoredTheme()) cb(e.matches ? 'dark' : 'light');
  };
  mq.addEventListener('change', handler);
  return () => mq.removeEventListener('change', handler);
}
