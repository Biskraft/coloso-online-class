import { useEffect, useState } from 'react';
import { ProjectTabs } from './components/shell/ProjectTabs';
import { ConceptBar } from './components/shell/ConceptBar';
import { PostitPad } from './components/shell/PostitPad';
import { CanvasShell } from './components/shell/CanvasShell';
import { Inspector } from './components/shell/Inspector';
import { LibraryPanel } from './components/shell/LibraryPanel';
import { OnboardingWizard } from './components/ai/OnboardingWizard';
import { TopdownShell } from './components/topdown/TopdownShell';
import { MassingShell } from './components/massing/MassingShell';
import { FlowShell } from './components/flow/FlowShell';
import { useProject, undoProject, redoProject } from './store/project';
import { undoMassing, redoMassing } from './store/massing';
import { undoFlow, redoFlow } from './store/flow';
import './App.css';

export function App() {
  const ai = useProject((s) => s.project.ai);
  const mode = useProject((s) => s.mode);
  const seen = localStorage.getItem('bubble-atelier::onboarded');
  const [libOpen, setLibOpen] = useState(false);
  // 넓게 쓰기(포커스) 모드 — 캔버스와 하단 플로팅 메뉴만 남기고 주변 패널을 숨김
  const [focusMode, setFocusMode] = useState(false);

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
      const meta = e.ctrlKey || e.metaKey;

      // 평면도/매싱 모드 — 버블 전용 단축키(선택·삭제·포커스)는 건너뛴다
      const inTopdown = st.mode !== 'bubble';

      if (e.key === 'Escape') {
        if (st.mode === 'topdown') {
          st.exitTopdown();
          return;
        }
        if (st.mode === 'massing') {
          st.exitMassing();
          return;
        }
        if (st.mode === 'flow') {
          st.exitFlow();
          return;
        }
        st.select({ kind: 'none' });
        setFocusMode(false);
      }
      // F — 넓게 쓰기 모드 토글 (입력 중 제외)
      if ((e.key === 'f' || e.key === 'F') && !inField && !meta && !inTopdown) {
        e.preventDefault();
        setFocusMode((v) => !v);
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && !inField && !inTopdown) {
        // 그룹 선택 우선
        if (st.groupSelection.length > 0) {
          st.removeGroup();
          return;
        }
        const sel = st.selection;
        if (sel.kind === 'node') st.removeNode(sel.id);
        else if (sel.kind === 'edge') st.removeEdge(sel.id);
        else if (sel.kind === 'postit') st.removePostit(sel.id);
        else if (sel.kind === 'decoration') st.removeDecoration(sel.id);
        else if (sel.kind === 'image') st.removeImage(sel.id);
      }
      // Ctrl+A 전체 선택 (캔버스의 노드 + 데코)
      if (meta && (e.key === 'a' || e.key === 'A') && !inField && !inTopdown) {
        e.preventDefault();
        st.selectAll();
      }
      // Undo/Redo — 매싱·흐름 모드는 각자의 실습 스토어를 되돌린다
      const undoFn = st.mode === 'massing' ? undoMassing : st.mode === 'flow' ? undoFlow : undoProject;
      const redoFn = st.mode === 'massing' ? redoMassing : st.mode === 'flow' ? redoFlow : redoProject;
      if (meta && (e.key === 'z' || e.key === 'Z')) {
        e.preventDefault();
        if (e.shiftKey) redoFn();
        else undoFn();
      }
      if (meta && (e.key === 'y' || e.key === 'Y')) {
        e.preventDefault();
        redoFn();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const needsOnboarding = !seen && ai.provider === 'none' && !ai.apiKey;

  if (mode === 'topdown') {
    return (
      <div className="app-shell is-topdown paper-grain">
        <ProjectTabs />
        <TopdownShell />
      </div>
    );
  }

  if (mode === 'massing') {
    // 매싱은 맵과 분리된 실습장 — 프로젝트 탭 없이 전체 화면
    return (
      <div className="app-shell is-massing paper-grain">
        <MassingShell />
      </div>
    );
  }

  if (mode === 'flow') {
    // 흐름 실험실 — 맵과 분리된 실습장, 전체 화면
    return (
      <div className="app-shell is-massing paper-grain">
        <FlowShell />
      </div>
    );
  }

  return (
    <div className={`app-shell paper-grain ${focusMode ? 'is-focus' : ''}`}>
      <ProjectTabs />
      <ConceptBar />
      <div className="app-body">
        <PostitPad />
        <CanvasShell />
        <Inspector />
      </div>

      {/* 넓게 쓰기 모드 토글 — 항상 우상단에 떠 있음 (단축키 F) */}
      <button
        className="focus-toggle"
        onClick={() => setFocusMode((v) => !v)}
        title={focusMode ? '넓게 쓰기 종료 (F / Esc)' : '넓게 쓰기 (F)'}
        aria-pressed={focusMode}
      >
        {focusMode ? (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2v3a1 1 0 0 1-1 1H2M14 6h-3a1 1 0 0 1-1-1V2M2 10h3a1 1 0 0 1 1 1v3M10 14v-3a1 1 0 0 1 1-1h3" />
            </svg>
            <span>좁게</span>
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6V3a1 1 0 0 1 1-1h3M10 2h3a1 1 0 0 1 1 1v3M14 10v3a1 1 0 0 1-1 1h-3M6 14H3a1 1 0 0 1-1-1v-3" />
            </svg>
            <span>넓게</span>
          </>
        )}
      </button>

      {needsOnboarding && <OnboardingWizard />}
      {libOpen && <LibraryPanel onClose={() => setLibOpen(false)} />}
    </div>
  );
}
