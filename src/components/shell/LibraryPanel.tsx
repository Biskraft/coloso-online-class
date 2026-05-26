import { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { useProject } from '../../store/project';
import {
  SCENARIO_DOCS, REFERENCE_DOCS, SCENARIO_TEMPLATES,
  type ScenarioDoc, type ReferenceDoc,
} from '../templates/scenario-library';
import './LibraryPanel.css';

type Tab = 'scenarios' | 'references';

export function LibraryPanel({ onClose }: { onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('scenarios');
  const [query, setQuery] = useState('');
  const [selectedScenario, setSelectedScenario] = useState<ScenarioDoc | null>(SCENARIO_DOCS[0] ?? null);
  const [selectedRef, setSelectedRef] = useState<ReferenceDoc | null>(REFERENCE_DOCS[0] ?? null);
  const [viewMode, setViewMode] = useState<'scenario' | 'topview'>('scenario');

  const setName = useProject((s) => s.setName);
  const setConcept = useProject((s) => s.setConcept);
  const addPostit = useProject((s) => s.addPostit);
  const updatePostit = useProject((s) => s.updatePostit);
  const newProject = useProject((s) => s.newProject);

  const filteredScenarios = useMemo(() => {
    if (!query.trim()) return SCENARIO_DOCS;
    const q = query.toLowerCase();
    return SCENARIO_DOCS.filter((s) =>
      s.title.toLowerCase().includes(q) ||
      s.scenarioMd.toLowerCase().includes(q),
    );
  }, [query]);

  const filteredRefs = useMemo(() => {
    if (!query.trim()) return REFERENCE_DOCS;
    const q = query.toLowerCase();
    return REFERENCE_DOCS.filter((r) =>
      r.title.toLowerCase().includes(q) ||
      r.md.toLowerCase().includes(q),
    );
  }, [query]);

  const applyScenarioToNewProject = (doc: ScenarioDoc) => {
    const tpl = SCENARIO_TEMPLATES.find((t) => t.id === doc.id);
    if (!tpl) return;
    newProject(tpl.title);
    setName(tpl.title);
    setConcept(tpl.concept);
    tpl.seedPostits.forEach((sp) => {
      const id = addPostit(sp.text, sp.color);
      if (sp.tags?.length) updatePostit(id, { tags: sp.tags });
    });
    onClose();
  };

  return createPortal(
    <div className="lib-backdrop" onClick={onClose}>
      <div className="lib-modal" onClick={(e) => e.stopPropagation()}>
        <header className="lib-header">
          <h2 className="hand">참고 라이브러리</h2>
          <button onClick={onClose} className="lib-x" aria-label="닫기">×</button>
        </header>

        <div className="lib-tabs">
          <button
            className={tab === 'scenarios' ? 'is-active' : ''}
            onClick={() => setTab('scenarios')}
          >
            시나리오 {SCENARIO_DOCS.length}편
          </button>
          <button
            className={tab === 'references' ? 'is-active' : ''}
            onClick={() => setTab('references')}
          >
            데이터베이스·가이드 {REFERENCE_DOCS.length}
          </button>
        </div>

        <div className="lib-search">
          <input
            placeholder="검색 — 시나리오 본문도 함께 검색됨"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="lib-body">
          {tab === 'scenarios' && (
            <>
              <aside className="lib-list">
                {filteredScenarios.map((s) => (
                  <button
                    key={s.id}
                    className={`lib-item ${selectedScenario?.id === s.id ? 'is-active' : ''}`}
                    onClick={() => setSelectedScenario(s)}
                  >
                    <span className="lib-item-num">S{String(s.num).padStart(2, '0')}</span>
                    <span className="lib-item-title">{s.title.replace(/^S\d+\s+/, '')}</span>
                  </button>
                ))}
              </aside>
              <article className="lib-view">
                {selectedScenario ? (
                  <>
                    <div className="lib-view-head">
                      <strong>{selectedScenario.title}</strong>
                      <div className="lib-view-actions">
                        {selectedScenario.topviewMd && (
                          <button
                            onClick={() => setViewMode(viewMode === 'scenario' ? 'topview' : 'scenario')}
                            className="lib-view-toggle"
                          >
                            {viewMode === 'scenario' ? 'Top-down 맵 보기 →' : '← 시나리오로 돌아가기'}
                          </button>
                        )}
                        <button
                          onClick={() => applyScenarioToNewProject(selectedScenario)}
                          className="lib-apply"
                        >
                          이 시나리오로 새 프로젝트 시작
                        </button>
                      </div>
                    </div>
                    <MarkdownView md={viewMode === 'topview' ? selectedScenario.topviewMd ?? '' : selectedScenario.scenarioMd} />
                  </>
                ) : (
                  <p className="lib-empty">시나리오를 선택하세요</p>
                )}
              </article>
            </>
          )}
          {tab === 'references' && (
            <>
              <aside className="lib-list">
                {filteredRefs.map((r) => (
                  <button
                    key={r.id}
                    className={`lib-item ${selectedRef?.id === r.id ? 'is-active' : ''}`}
                    onClick={() => setSelectedRef(r)}
                  >
                    <span className="lib-item-num">{r.id.slice(0, 2)}</span>
                    <span className="lib-item-title">{r.title.replace(/^\d+_/, '')}</span>
                  </button>
                ))}
              </aside>
              <article className="lib-view">
                {selectedRef ? (
                  <>
                    <div className="lib-view-head">
                      <strong>{selectedRef.title}</strong>
                    </div>
                    <MarkdownView md={selectedRef.md} />
                  </>
                ) : (
                  <p className="lib-empty">자료를 선택하세요</p>
                )}
              </article>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* 경량 마크다운 렌더러 (외부 의존성 X) */
function MarkdownView({ md }: { md: string }) {
  // 매우 기본적인 변환만: 헤딩, 굵게, 코드블록, 리스트, 단락
  const html = useMemo(() => convertMarkdown(md), [md]);
  return <div className="lib-md" dangerouslySetInnerHTML={{ __html: html }} />;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function convertMarkdown(raw: string): string {
  const lines = raw.split(/\r?\n/);
  const out: string[] = [];
  let inCode = false;
  let inList = false;

  const closeList = () => { if (inList) { out.push('</ul>'); inList = false; } };

  for (const line of lines) {
    if (line.startsWith('```')) {
      closeList();
      if (inCode) { out.push('</pre>'); inCode = false; }
      else { out.push('<pre>'); inCode = true; }
      continue;
    }
    if (inCode) { out.push(escapeHtml(line)); continue; }

    if (/^#{1,6}\s/.test(line)) {
      closeList();
      const level = line.match(/^(#+)/)![1].length;
      const text = inline(line.replace(/^#+\s*/, ''));
      out.push(`<h${level}>${text}</h${level}>`);
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      if (!inList) { out.push('<ul>'); inList = true; }
      out.push(`<li>${inline(line.replace(/^\s*[-*]\s+/, ''))}</li>`);
      continue;
    }

    if (/^>\s/.test(line)) {
      closeList();
      out.push(`<blockquote>${inline(line.replace(/^>\s*/, ''))}</blockquote>`);
      continue;
    }

    if (line.trim() === '---') {
      closeList();
      out.push('<hr/>');
      continue;
    }

    if (line.trim() === '') { closeList(); out.push(''); continue; }

    closeList();
    out.push(`<p>${inline(line)}</p>`);
  }
  closeList();
  if (inCode) out.push('</pre>');
  return out.join('\n');
}

function inline(s: string): string {
  return escapeHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}
