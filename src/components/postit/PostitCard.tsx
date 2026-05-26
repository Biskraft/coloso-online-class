import { useRef, useState } from 'react';
import { useProject } from '../../store/project';
import type { Postit, PostitColor } from '../../types';
import './PostitCard.css';

const COLORS: PostitColor[] = ['yellow', 'pink', 'mint', 'blue', 'lilac'];

export function PostitCard({ postit }: { postit: Postit }) {
  const updatePostit = useProject((s) => s.updatePostit);
  const removePostit = useProject((s) => s.removePostit);
  const select = useProject((s) => s.select);
  const [editing, setEditing] = useState(postit.text === '');
  const taRef = useRef<HTMLTextAreaElement>(null);

  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/x-postit-id', postit.id);
    e.dataTransfer.effectAllowed = 'copy';
    select({ kind: 'postit', id: postit.id });
  };

  const cycleColor = () => {
    const idx = COLORS.indexOf(postit.color);
    const next = COLORS[(idx + 1) % COLORS.length];
    updatePostit(postit.id, { color: next });
  };

  return (
    <div
      className={`postit postit--${postit.color} ${postit.promoted ? 'is-promoted' : ''}`}
      style={{ transform: `rotate(${postit.rotation}deg)` }}
      draggable
      onDragStart={onDragStart}
      onClick={() => select({ kind: 'postit', id: postit.id })}
    >
      <div className="postit-tape" aria-hidden />
      <div className="postit-head">
        <button
          className="postit-color-btn"
          onClick={(e) => { e.stopPropagation(); cycleColor(); }}
          title="색상 변경"
          aria-label="색상 변경"
        />
        {postit.promoted && <span className="postit-badge" title="노드로 승격됨">→ 노드</span>}
        <button
          className="postit-x"
          onClick={(e) => { e.stopPropagation(); removePostit(postit.id); }}
          title="삭제"
          aria-label="삭제"
        >×</button>
      </div>

      {editing ? (
        <textarea
          ref={taRef}
          className="postit-textarea"
          autoFocus
          value={postit.text}
          onChange={(e) => updatePostit(postit.id, { text: e.target.value })}
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') { setEditing(false); }
            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { setEditing(false); }
          }}
          placeholder="여기에 메모…"
        />
      ) : (
        <p
          className="postit-text"
          onDoubleClick={() => setEditing(true)}
        >
          {postit.text || <span className="postit-placeholder">더블클릭으로 입력</span>}
        </p>
      )}

      {postit.tags.length > 0 && (
        <div className="postit-tags">
          {postit.tags.map((t) => (
            <span key={t} className="postit-tag">#{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}
