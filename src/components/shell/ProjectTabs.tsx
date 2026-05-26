import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useProject } from '../../store/project';
import './ProjectTabs.css';

export function ProjectTabs() {
  const projects = useProject((s) => s.projects);
  const currentId = useProject((s) => s.currentId);
  const newProject = useProject((s) => s.newProject);
  const switchProject = useProject((s) => s.switchProject);
  const closeProject = useProject((s) => s.closeProject);
  const [confirmClose, setConfirmClose] = useState<string | null>(null);

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
