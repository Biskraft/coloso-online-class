import { NODE_STYLES } from '../canvas/node-shapes';
import { EDGE_STYLE } from '../canvas/Edge';
import type { NodeType, EdgeType } from '../../types';
import './Legend.css';

const NODE_ORDER: NodeType[] = ['room', 'vista', 'treasure', 'boss', 'hub', 'save'];
const EDGE_ORDER: EdgeType[] = ['open', 'locked', 'oneway', 'ability', 'vista'];

const NODE_HELP: Record<NodeType, string> = {
  room:     '일반 방. 전투·통과·환경 인터랙션.',
  vista:    '풍경/예고 공간. 플레이어에게 목표나 비밀을 보여줌.',
  treasure: '보상/획득 공간. 보물, 능력, 정보.',
  boss:     '거대 인카운터. 일반적으로 페이싱의 클라이맥스.',
  hub:      '여러 경로가 모이는 허브.',
  save:     '체크포인트, 회복, 휴식.',
};
const EDGE_HELP: Record<EdgeType, string> = {
  open:    '열린 통로. 양방향 자유 통행.',
  locked:  '잠금문. 키를 획득해야 통과.',
  oneway:  '일방통행. 반대로 돌아갈 수 없음.',
  ability: '능력 게이트. 특정 능력 보유 시만 통과.',
  vista:   '전망. 다른 공간이 시각적으로 보이지만 이동 불가.',
};

export function Legend({ onClose }: { onClose: () => void }) {
  return (
    <aside className="legend" role="dialog" aria-label="범례">
      <header className="lg-head">
        <h3 className="hand">표기 규약</h3>
        <button onClick={onClose} className="lg-x" aria-label="닫기">×</button>
      </header>
      <p className="lg-intro caption">3D 게임 레벨 디자인 노드·간선 표기 규약</p>

      <h4>노드</h4>
      <ul className="lg-list">
        {NODE_ORDER.map((t) => {
          const s = NODE_STYLES[t];
          return (
            <li key={t}>
              <svg width="48" height="32" viewBox="-32 -22 64 44">
                <ellipse cx="0" cy="0" rx="24" ry="16" fill={s.fill} stroke={s.stroke} strokeWidth={s.strokeWidth} />
                <text x="0" y="3" textAnchor="middle" fontSize="11" fill="var(--ink-900)">{s.icon}</text>
              </svg>
              <div>
                <strong>{s.label}</strong>
                <span>{NODE_HELP[t]}</span>
              </div>
            </li>
          );
        })}
      </ul>

      <h4>간선</h4>
      <ul className="lg-list">
        {EDGE_ORDER.map((t) => {
          const e = EDGE_STYLE[t];
          return (
            <li key={t}>
              <svg width="48" height="32" viewBox="0 0 48 32">
                <path
                  d="M 4 16 Q 24 4, 44 16"
                  fill="none"
                  stroke={e.stroke}
                  strokeWidth={e.width}
                  strokeDasharray={e.dash}
                  strokeLinecap="round"
                />
                {(t === 'oneway' || t === 'ability' || t === 'locked') && (
                  <polygon points="38,12 44,16 38,20" fill={e.stroke} />
                )}
              </svg>
              <div>
                <strong>{e.label}</strong>
                <span>{EDGE_HELP[t]}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
