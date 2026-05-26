import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useProject, undoProject, redoProject } from '../../store/project';
import { downloadJSON, uploadJSON } from '../../store/persistence';
import './ConceptBar.css';

export function ConceptBar() {
  const name = useProject((s) => s.project.name);
  const concept = useProject((s) => s.project.concept);
  const updatedAt = useProject((s) => s.project.updatedAt);
  const project = useProject((s) => s.project);
  const setName = useProject((s) => s.setName);
  const setConcept = useProject((s) => s.setConcept);
  const importProject = useProject((s) => s.importProject);
  const reset = useProject((s) => s.reset);

  const [editing, setEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [historySize, setHistorySize] = useState({ past: 0, future: 0 });

  // 외부 클릭은 invisible backdrop이 처리

  // undo/redo 가능 카운트 구독
  useEffect(() => {
    const t = useProject.temporal as any;
    const update = () => {
      const s = t.getState();
      setHistorySize({ past: s.pastStates.length, future: s.futureStates.length });
    };
    update();
    const unsub = t.subscribe(update);
    return () => unsub();
  }, []);

  const updatedLabel = formatRelative(updatedAt);

  return (
    <header className="concept-bar">
      <div className="cb-brand">
        <span className="cb-mark" aria-hidden>
          <svg viewBox="0 0 24 24" width="22" height="22">
            <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="16" cy="15" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <line x1="11.5" y1="11.5" x2="14" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
        <span className="cb-brand-text">
          <strong>버블 아틀리에</strong>
          <em className="caption">Bubble Atelier · Level Design Workbench</em>
        </span>
      </div>

      <div className="cb-name">
        {editing ? (
          <input
            autoFocus
            className="cb-name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => { if (e.key === 'Enter') setEditing(false); }}
          />
        ) : (
          <button className="cb-name-btn" onClick={() => setEditing(true)} title="이름 변경">
            <span className="hand">{name || '제목 없음'}</span>
            <span className="cb-name-pencil" aria-hidden>✎</span>
          </button>
        )}
        <span className="cb-stamp caption">저장됨 · {updatedLabel}</span>
      </div>

      <div className="cb-concept-line">
        <ConceptField
          label="테마"
          value={concept.theme}
          onChange={(v) => setConcept({ theme: v })}
          placeholder="예: 잊혀진 사원, 우주 정거장…"
        />
        <ConceptField
          label="의도"
          value={concept.intent}
          onChange={(v) => setConcept({ intent: v })}
          placeholder="예: 플레이어가 능력을 획득하고 시험한다"
        />
        <ConceptField
          label="코어 메커닉"
          value={concept.coreMechanic}
          onChange={(v) => setConcept({ coreMechanic: v })}
          placeholder="예: 대시, 더블점프, 스텔스…"
        />
      </div>

      <div className="cb-actions">
        <button
          className="cb-undo"
          onClick={() => undoProject()}
          disabled={historySize.past === 0}
          title={`되돌리기 (Ctrl+Z) · ${historySize.past}`}
          aria-label="되돌리기"
        >↶</button>
        <button
          className="cb-undo"
          onClick={() => redoProject()}
          disabled={historySize.future === 0}
          title={`다시 실행 (Ctrl+Shift+Z) · ${historySize.future}`}
          aria-label="다시 실행"
        >↷</button>
        <button
          className="cb-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
        >
          파일 ▾
        </button>
        {menuOpen && createPortal(
          <>
            <div className="cb-menu-overlay" onClick={() => setMenuOpen(false)} />
            <div className="cb-menu" data-cb-menu>
              <button onClick={() => { downloadJSON(project, `${name || 'level'}.json`); setMenuOpen(false); }}>
                JSON 내보내기
              </button>
              <button onClick={async () => {
                setMenuOpen(false);
                const p = await uploadJSON();
                if (p) importProject(p);
              }}>
                JSON 불러오기 (새 탭)
              </button>
              <hr />
              <button onClick={() => {
                setMenuOpen(false);
                if (confirm('현재 캔버스를 초기화합니다 (탭은 유지). 계속하시겠습니까?')) reset();
              }} className="cb-menu-danger">
                현재 캔버스 초기화
              </button>
            </div>
          </>,
          document.body
        )}
      </div>
    </header>
  );
}

function ConceptField({
  label, value, onChange, placeholder
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="cb-field">
      <span className="cb-field-label caption">{label}</span>
      <input
        className="cb-field-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function formatRelative(ts: number): string {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 5) return '방금 전';
  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return new Date(ts).toLocaleDateString('ko-KR');
}
