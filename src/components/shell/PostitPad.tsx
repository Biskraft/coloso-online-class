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
  const clearAllPostits = useProject((s) => s.clearAllPostits);
  const promoteAllPostits = useProject((s) => s.promoteAllPostits);
  const [color, setColor] = useState<PostitColor>('yellow');
  const [query, setQuery] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);

  const unpromotedCount = postits.filter((p) => !p.promoted).length;

  const onClearAll = () => {
    if (postits.length === 0) return;
    if (confirm(`포스트잇 ${postits.length}장을 모두 삭제하시겠습니까?`)) {
      clearAllPostits();
    }
  };

  const onPromoteAll = () => {
    if (unpromotedCount === 0) return;
    if (!confirm(`승격되지 않은 포스트잇 ${unpromotedCount}장을 모두 노드로 만들겠습니까? (캔버스 격자 배치)`)) return;
    // 캔버스 중심에서 약간 좌상단으로 시작
    const originX = 0;
    const originY = 0;
    promoteAllPostits(originX, originY);
  };

  const filtered = query
    ? postits.filter((p) =>
        p.text.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())))
    : postits;

  return (
    <aside className={`postit-pad edge-right ${showTemplates ? 'is-templates-open' : ''}`}>
      <header className="pp-header">
        <div className="pp-title-row">
          <h3 className="pp-title">포스트잇</h3>
          <span className="caption pp-count">{postits.length}장</span>
        </div>
        <p className="pp-hint hand">자유롭게 적고 캔버스로 던져 노드로 만드세요</p>
        {postits.length > 0 && (
          <div className="pp-bulk">
            <button
              onClick={onPromoteAll}
              disabled={unpromotedCount === 0}
              title={`승격 안 된 포스트잇 ${unpromotedCount}장을 캔버스에 격자로 변환`}
              className="pp-bulk-btn pp-bulk-promote"
            >
              ↗ 전부 캔버스로 ({unpromotedCount})
            </button>
            <button
              onClick={onClearAll}
              title="모든 포스트잇 삭제"
              className="pp-bulk-btn pp-bulk-clear"
            >
              🗑 전부 삭제
            </button>
          </div>
        )}
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
