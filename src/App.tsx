import { useEffect, useState } from 'react';
import { ProjectTabs } from './components/shell/ProjectTabs';
import { ConceptBar } from './components/shell/ConceptBar';
import { PostitPad } from './components/shell/PostitPad';
import { CanvasShell } from './components/shell/CanvasShell';
import { Inspector } from './components/shell/Inspector';
import { LibraryPanel } from './components/shell/LibraryPanel';
import { OnboardingWizard } from './components/ai/OnboardingWizard';
import { useProject, undoProject, redoProject } from './store/project';
import './App.css';

export function App() {
  const ai = useProject((s) => s.project.ai);
  const seen = localStorage.getItem('bubble-atelier::onboarded');
  const [libOpen, setLibOpen] = useState(false);

  // ConceptBar의 라이브러리 버튼이 호출
  useEffect(() => {
    (window as any).__openLibrary = () => setLibOpen(true);
    return () => { (window as any).__openLibrary = undefined; };
  }, []);

  useEffect(() => {
    // 키보드: Escape, Delete, Ctrl+Z/Y
    const onKey = (e: KeyboardEvent) => {
      const st = useProject.getState();
      const tag = (e.target as HTMLElement).tagName;
      const inField = tag === 'INPUT' || tag === 'TEXTAREA';

      if (e.key === 'Escape') {
        st.select({ kind: 'none' });
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && !inField) {
        const sel = st.selection;
        if (sel.kind === 'node') st.removeNode(sel.id);
        else if (sel.kind === 'edge') st.removeEdge(sel.id);
        else if (sel.kind === 'postit') st.removePostit(sel.id);
        else if (sel.kind === 'decoration') st.removeDecoration(sel.id);
      }
      // Undo/Redo
      const meta = e.ctrlKey || e.metaKey;
      if (meta && (e.key === 'z' || e.key === 'Z')) {
        e.preventDefault();
        if (e.shiftKey) redoProject();
        else undoProject();
      }
      if (meta && (e.key === 'y' || e.key === 'Y')) {
        e.preventDefault();
        redoProject();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const needsOnboarding = !seen && ai.provider === 'none' && !ai.apiKey;

  return (
    <div className="app-shell paper-grain">
      <ProjectTabs />
      <ConceptBar />
      <div className="app-body">
        <PostitPad />
        <CanvasShell />
        <Inspector />
      </div>
      {needsOnboarding && <OnboardingWizard />}
      {libOpen && <LibraryPanel onClose={() => setLibOpen(false)} />}
    </div>
  );
}
