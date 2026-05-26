import { useState } from 'react';
import { SvgCanvas } from '../canvas/SvgCanvas';
import { Legend } from './Legend';
import { useProject } from '../../store/project';
import './CanvasShell.css';

export function CanvasShell() {
  const view = useProject((s) => s.project.view);
  const setView = useProject((s) => s.setView);
  const [showLegend, setShowLegend] = useState(false);

  return (
    <main className="canvas-shell">
      <div className="cs-topbar">
        <div className="cs-view-toggles">
          <Toggle
            label="펜떨림"
            value={view.edgeStyle === 'rough'}
            onChange={(v) => setView({ edgeStyle: v ? 'rough' : 'clean' })}
            hint="손그림 느낌의 거친 곡선"
          />
          <Toggle
            label="그리드"
            value={view.showGrid}
            onChange={(v) => setView({ showGrid: v })}
          />
          <Toggle
            label="미니맵"
            value={view.showMinimap}
            onChange={(v) => setView({ showMinimap: v })}
          />
        </div>
        <button
          className={`cs-legend-btn ${showLegend ? 'is-on' : ''}`}
          onClick={() => setShowLegend(!showLegend)}
        >
          범례 {showLegend ? '▾' : '▸'}
        </button>
      </div>
      <div className={`cs-canvas-area ${view.showGrid ? '' : 'no-grid'}`}>
        <SvgCanvas />
      </div>
      {showLegend && <Legend onClose={() => setShowLegend(false)} />}
    </main>
  );
}

function Toggle({ label, value, onChange, hint }: {
  label: string; value: boolean; onChange: (v: boolean) => void; hint?: string;
}) {
  return (
    <label className={`cs-toggle ${value ? 'is-on' : ''}`} title={hint}>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="cs-toggle-knob" aria-hidden />
      <span className="cs-toggle-label">{label}</span>
    </label>
  );
}
