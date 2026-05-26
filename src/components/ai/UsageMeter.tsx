import { useProject } from '../../store/project';
import './UsageMeter.css';

const PRO_LIMIT = 50;
const FLASH_LIMIT = 1500;

export function UsageMeter() {
  const ai = useProject((s) => s.project.ai);
  if (ai.provider !== 'gemini') {
    return (
      <div className="usage">
        <span className="caption">AI</span>
        <span className="usage-off">오프라인 모드</span>
      </div>
    );
  }
  const proPct = Math.min(100, (ai.usage.proUsedToday / PRO_LIMIT) * 100);
  const flashPct = Math.min(100, (ai.usage.flashUsedToday / FLASH_LIMIT) * 100);
  return (
    <div className="usage">
      <span className="caption">오늘 사용량</span>
      <div className="usage-row">
        <span className="usage-label">Pro</span>
        <div className="usage-bar">
          <div className="usage-fill usage-fill--pro" style={{ width: `${proPct}%` }} />
        </div>
        <span className="usage-num">{ai.usage.proUsedToday}/{PRO_LIMIT}</span>
      </div>
      <div className="usage-row">
        <span className="usage-label">Flash</span>
        <div className="usage-bar">
          <div className="usage-fill usage-fill--flash" style={{ width: `${flashPct}%` }} />
        </div>
        <span className="usage-num">{ai.usage.flashUsedToday}/{FLASH_LIMIT}</span>
      </div>
    </div>
  );
}
