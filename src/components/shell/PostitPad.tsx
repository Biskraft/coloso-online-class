import { useState } from 'react';
import { useProject } from '../../store/project';
import { PostitCard } from '../postit/PostitCard';
import { TemplatePicker } from '../templates/TemplatePicker';
import type { PostitColor } from '../../types';
import './PostitPad.css';

const COLORS: PostitColor[] = ['yellow', 'pink', 'mint', 'blue', 'lilac'];

export function PostitPad() {
  const postits = useProject((s) => s.project.postits);
  const addPostit = useProject((s) => s.addPostit);
  const [color, setColor] = useState<PostitColor>('yellow');
  const [query, setQuery] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);

  const filtered = query
    ? postits.filter((p) =>
        p.text.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
    : postits;

  return (
    <aside className="postit-pad edge-right">
      <header className="pp-header">
        <div className="pp-title-row">
          <h3 className="pp-title">포스트잇</h3>
          <span className="caption pp-count">{postits.length}장</span>
        </div>
        <p className="pp-hint hand">자유롭게 적고 캔버스로 던져 노드로 만드세요</p>
      </header>

      <div className="pp-toolbar">
        <button
          className="pp-add"
          onClick={() => addPostit('', color)}
          title="새 포스트잇"
        >
          <span aria-hidden>+</span> 새 메모
        </button>
        <div className="pp-colors" role="group" aria-label="색상 선택">
          {COLORS.map((c) => (
            <button
              key={c}
              className={`pp-swatch pp-swatch--${c} ${color === c ? 'is-active' : ''}`}
              onClick={() => setColor(c)}
              title={c}
              aria-label={`${c} 색상`}
            />
          ))}
        </div>
      </div>

      <div className="pp-search">
        <input
          className="pp-search-input"
          placeholder="검색…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="pp-templates-toggle">
        <button onClick={() => setShowTemplates(!showTemplates)} className="pp-templates-btn">
          {showTemplates ? '▾' : '▸'} 컨셉 템플릿
        </button>
      </div>
      {showTemplates && <TemplatePicker onClose={() => setShowTemplates(false)} />}

      <ul className="pp-list lined">
        {filtered.length === 0 && (
          <li className="pp-empty">
            <p className="hand">
              {postits.length === 0
                ? '아직 비어 있습니다.\n위의 [+ 새 메모]로 시작하세요.'
                : '검색 결과 없음'}
            </p>
          </li>
        )}
        {filtered.map((p) => (
          <li key={p.id}>
            <PostitCard postit={p} />
          </li>
        ))}
      </ul>
    </aside>
  );
}
