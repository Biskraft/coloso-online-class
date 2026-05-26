import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { useProject } from './store/project';
import './styles/global.css';

// 디버그/E2E 테스트용 — 프로덕션에서도 노출되지만 무해
(window as any).__bubbleStore = useProject;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
