import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useProject } from '../../store/project';
import { getCurrentTheme, toggleTheme, subscribeSystemTheme, type Theme } from '../../theme';
import './ProjectTabs.css';

export function ProjectTabs() {
  const projects = useProject((s) => s.projects);
  const currentId = useProject((s) => s.currentId);
  const newProject = useProject((s) => s.newProject);
  const switchProject = useProject((s) => s.switchProject);
  const closeProject = useProject((s) => s.closeProject);
  const [confirmClose, setConfirmClose] = useState<string | null>(null);
  const [theme, setLocalTheme] = useState<Theme>(getCurrentTheme());

  useEffect(() => {
    const onChange = (e: Event) => setLocalTheme((e as CustomEvent<Theme>).detail);
    window.addEventListener('themechange', onChange);
    const unsub = subscribeSystemTheme((t) => setLocalTheme(t));
    return () => {
      window.removeEventListener('themechange', onChange);
      unsub();
    };
  }, []);

  return (
    <nav className="project-tabs" aria-label="프로젝트 탭">
      <ul className="pt-list">
        {projects.map((p) => {
          const active = p.id === currentId;
          const nodeCount = p.nodes.length;
          return (
            <li key={p.id} className={`pt-tab ${active ? 'is-active' : ''}`}>
              <button
                className="pt-tab-main"
                onClick={() => switchProject(p.id)}
                title={`${p.name} · 노드 ${nodeCount}`}
              >
                <span className="pt-name">{p.name || '제목 없음'}</span>
                {nodeCount > 0 && <span className="pt-count">{nodeCount}</span>}
              </button>
              <button
                className="pt-close"
                onClick={(e) => {
                  e.stopPropagation();
                  if (nodeCount === 0 && p.postits.length === 0) {
                    closeProject(p.id);
                  } else {
                    setConfirmClose(p.id);
                  }
                }}
                aria-label={`${p.name} 닫기`}
                title="탭 닫기 (저장 X)"
              >×</button>
            </li>
          );
        })}
      </ul>
      <button
        className="pt-new"
        onClick={() => newProject()}
        title="새 프로젝트"
      >
        +
      </button>

      <button
        type="button"
        className="pt-theme-toggle"
        onClick={toggleTheme}
        title={theme === 'dark' ? '라이트 모드로' : '다크 모드로'}
        aria-label="테마 전환"
      >
        {theme === 'dark' ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>

      <a
        className="pt-credit"
        href="https://bisk.kr"
        target="_blank"
        rel="noopener noreferrer"
        title="제작 · BISK Level Design"
      >
        <img
          className="pt-credit-logo"
          src={`${import.meta.env.BASE_URL}bisk-logo.png`}
          alt="BISK"
          loading="lazy"
          decoding="async"
        />
        <span className="pt-credit-text">
          <strong>BISK</strong>
          <span className="pt-credit-domain">bisk.kr</span>
        </span>
      </a>

      {confirmClose && createPortal(
        <div className="pt-confirm-backdrop" onClick={() => setConfirmClose(null)}>
          <div className="pt-confirm" onClick={(e) => e.stopPropagation()}>
            <p className="pt-confirm-msg">
              이 프로젝트는 <strong>저장되지 않습니다</strong>.<br />
              JSON 내보내기를 하지 않으면 사라집니다.
            </p>
            <div className="pt-confirm-actions">
              <button onClick={() => setConfirmClose(null)} className="pt-btn">취소</button>
              <button
                onClick={() => { closeProject(confirmClose); setConfirmClose(null); }}
                className="pt-btn pt-btn--danger"
              >그래도 닫기</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </nav>
  );
}
