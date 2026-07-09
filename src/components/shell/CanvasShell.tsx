import { useState } from 'react';
import { SvgCanvas } from '../canvas/SvgCanvas';
import { Legend } from './Legend';
import { useProject } from '../../store/project';
import './CanvasShell.css';

export function CanvasShell() {
  const view = useProject((s) => s.project.view);
  const setView = useProject((s) => s.setView);
  const hueShift = useProject((s) => s.project.theme?.hueShift ?? 0);
  const satScale = useProject((s) => s.project.theme?.satScale ?? 1);
  const setHueShift = useProject((s) => s.setHueShift);
  const setSatScale = useProject((s) => s.setSatScale);
  const resetTheme = useProject((s) => s.resetTheme);
  const themeChanged = hueShift !== 0 || satScale !== 1;
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
        <div className="cs-right">
          <div className="cs-theme" title="학생별 고유 팔레트 — HUE는 색조, SAT는 채도">
            <div className="cs-theme-row">
              <span className="cs-theme-label">HUE</span>
              <input
                className="cs-theme-slider cs-theme-slider--hue"
                type="range"
                min={-180}
                max={180}
                step={1}
                value={hueShift}
                onChange={(e) => setHueShift(parseInt(e.target.value, 10))}
                style={{
                  background: `linear-gradient(to right,
                    hsl(0,70%,55%) 0%,
                    hsl(60,70%,55%) 16.66%,
                    hsl(120,70%,55%) 33.33%,
                    hsl(180,70%,55%) 50%,
                    hsl(240,70%,55%) 66.66%,
                    hsl(300,70%,55%) 83.33%,
                    hsl(360,70%,55%) 100%)`,
                }}
              />
              <span className="cs-theme-value">{hueShift > 0 ? `+${hueShift}` : hueShift}°</span>
            </div>
            <div className="cs-theme-row">
              <span className="cs-theme-label">SAT</span>
              <input
                className="cs-theme-slider cs-theme-slider--sat"
                type="range"
                min={0}
                max={2}
                step={0.05}
                value={satScale}
                onChange={(e) => setSatScale(parseFloat(e.target.value))}
                style={{
                  background: `linear-gradient(to right,
                    hsl(15,0%,55%) 0%,
                    hsl(15,50%,55%) 50%,
                    hsl(15,100%,55%) 100%)`,
                }}
              />
              <span className="cs-theme-value">{satScale.toFixed(2)}×</span>
            </div>
            <button
              type="button"
              className="cs-theme-reset"
              onClick={resetTheme}
              disabled={!themeChanged}
              title="기본 팔레트로 복원"
            >
              기본
            </button>
          </div>
          <button
            className={`cs-legend-btn ${showLegend ? 'is-on' : ''}`}
            onClick={() => setShowLegend(!showLegend)}
          >
            범례 {showLegend ? '▾' : '▸'}
          </button>
        </div>
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
