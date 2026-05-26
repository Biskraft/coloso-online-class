import { useState, useMemo } from 'react';
import { useProject } from '../../store/project';
import {
  TEMPLATES, MECHANIC_GROUPS, MECHANIC_LABEL,
  type ConceptTemplate, type Mechanic,
} from './concept-library';
import './TemplatePicker.css';

export function TemplatePicker({ onClose }: { onClose: () => void }) {
  const [activeMechanic, setActiveMechanic] = useState<Mechanic | 'all'>('all');
  const [preview, setPreview] = useState<ConceptTemplate | null>(null);
  const setConcept = useProject((s) => s.setConcept);
  const addPostit = useProject((s) => s.addPostit);
  const updatePostit = useProject((s) => s.updatePostit);
  const setName = useProject((s) => s.setName);

  const items = useMemo(() =>
    activeMechanic === 'all' ? TEMPLATES : TEMPLATES.filter((t) => t.mechanic === activeMechanic),
  [activeMechanic]);

  const apply = (tpl: ConceptTemplate) => {
    setName(tpl.title);
    setConcept(tpl.concept);
    tpl.seedPostits.forEach((sp) => {
      const id = addPostit(sp.text, sp.color);
      if (sp.tags?.length) updatePostit(id, { tags: sp.tags });
    });
    onClose();
    setPreview(null);
  };

  return (
    <div className="tp">
      <div className="tp-tabs">
        <button
          className={`tp-tab ${activeMechanic === 'all' ? 'is-active' : ''}`}
          onClick={() => setActiveMechanic('all')}
        >
          전체
        </button>
        {MECHANIC_GROUPS.map((g) => (
          <button
            key={g.mechanic}
            className={`tp-tab tp-tab--${g.mechanic} ${activeMechanic === g.mechanic ? 'is-active' : ''}`}
            onClick={() => setActiveMechanic(g.mechanic)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <ul className="tp-list">
        {items.map((tpl) => (
          <li key={tpl.id}>
            <button
              className={`tp-item ${preview?.id === tpl.id ? 'is-preview' : ''}`}
              onClick={() => setPreview(tpl)}
              onDoubleClick={() => apply(tpl)}
              title="더블클릭으로 즉시 적용"
            >
              <div className="tp-item-head">
                <span className={`tp-mech tp-mech--${tpl.mechanic}`}>{MECHANIC_LABEL[tpl.mechanic]}</span>
                <span className="tp-title">{tpl.title}</span>
              </div>
              <p className="tp-intent">{tpl.concept.intent}</p>
            </button>
          </li>
        ))}
      </ul>

      {preview && (
        <div className="tp-preview">
          <div className="tp-preview-head">
            <strong className="hand">{preview.title}</strong>
            <button onClick={() => setPreview(null)} className="tp-x">×</button>
          </div>
          <div className="tp-preview-meta caption">
            메커닉 {MECHANIC_LABEL[preview.mechanic]} · 장르 {preview.genres.join(', ')}
          </div>
          <p className="tp-preview-intent">{preview.concept.intent}</p>
          <div className="tp-preview-pacing">
            <span className="caption">페이싱</span>
            <p>{preview.concept.pacing}</p>
          </div>
          <div className="tp-preview-goals">
            <span className="caption">학습 목표</span>
            <ul>
              {preview.concept.learningGoals.map((g, i) => <li key={i}>{g}</li>)}
            </ul>
          </div>
          <div className="tp-preview-seeds">
            <span className="caption">시드 포스트잇 {preview.seedPostits.length}장</span>
            <ul>
              {preview.seedPostits.slice(0, 4).map((s, i) => <li key={i}>· {s.text}</li>)}
              {preview.seedPostits.length > 4 && <li className="tp-more">+ {preview.seedPostits.length - 4}장 더</li>}
            </ul>
          </div>
          <button className="tp-apply" onClick={() => apply(preview)}>
            이 템플릿으로 시작
          </button>
        </div>
      )}
    </div>
  );
}
