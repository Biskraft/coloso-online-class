import { useEffect } from 'react';
import { ConceptBar } from './components/shell/ConceptBar';
import { PostitPad } from './components/shell/PostitPad';
import { CanvasShell } from './components/shell/CanvasShell';
import { Inspector } from './components/shell/Inspector';
import { OnboardingWizard } from './components/ai/OnboardingWizard';
import { useProject } from './store/project';
import './App.css';

export function App() {
  const ai = useProject((s) => s.project.ai);
  const seen = localStorage.getItem('bubble-atelier::onboarded');

  useEffect(() => {
    // 키보드: Escape → 선택 해제, Delete → 선택 삭제
    const onKey = (e: KeyboardEvent) => {
      const st = useProject.getState();
      if (e.key === 'Escape') {
        st.select({ kind: 'none' });
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') &&
          (e.target as HTMLElement).tagName !== 'INPUT' &&
          (e.target as HTMLElement).tagName !== 'TEXTAREA') {
        const sel = st.selection;
        if (sel.kind === 'node') st.removeNode(sel.id);
        else if (sel.kind === 'edge') st.removeEdge(sel.id);
        else if (sel.kind === 'postit') st.removePostit(sel.id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const needsOnboarding = !seen && ai.provider === 'none' && !ai.apiKey;

  return (
    <div className="app-shell paper-grain">
      <ConceptBar />
      <div className="app-body">
        <PostitPad />
        <CanvasShell />
        <Inspector />
      </div>
      {needsOnboarding && <OnboardingWizard />}
    </div>
  );
}
