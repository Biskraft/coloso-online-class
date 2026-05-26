import { useMemo } from 'react';
import type { BubbleEdge, BubbleNode, EdgeType } from '../../types';
import { roughCurve } from '../../utils/rough-path';

interface Props {
  edge: BubbleEdge;
  from: BubbleNode;
  to: BubbleNode;
  rough: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const EDGE_STYLE: Record<EdgeType, { stroke: string; dash?: string; width: number; label: string }> = {
  open:    { stroke: 'var(--ink-700)',     width: 1.6,                          label: '통로' },
  locked:  { stroke: 'var(--ochre-deep)',  width: 2.0, dash: '6 4',             label: '잠금' },
  oneway:  { stroke: 'var(--blueprint)',   width: 1.8,                          label: '일방' },
  ability: { stroke: 'var(--brick)',       width: 2.0, dash: '2 4',             label: '능력' },
};

export function Edge({ edge, from, to, rough, selected, onSelect }: Props) {
  const style = EDGE_STYLE[edge.type];

  const path = useMemo(() => {
    return roughCurve(from.x, from.y, to.x, to.y, {
      seed: edge.id,
      tremor: rough ? 1.2 : 0,
      segments: 18,
      curveStrength: rough ? 0.30 : 0.18,
    });
  }, [from.x, from.y, to.x, to.y, edge.id, rough]);

  // 화살표 위치: to 노드로부터 약간 떨어진 지점
  const arrow = useMemo(() => arrowMarker(from, to, 18), [from.x, from.y, to.x, to.y]);

  return (
    <g
      data-edge={edge.id}
      className="eg"
      onClick={(e) => { e.stopPropagation(); onSelect(edge.id); }}
    >
      {/* 클릭 영역 */}
      <path d={path} fill="none" stroke="transparent" strokeWidth="14" />
      {/* 본선 */}
      <path
        d={path}
        fill="none"
        stroke={style.stroke}
        strokeWidth={selected ? style.width + 1.2 : style.width}
        strokeDasharray={style.dash}
        strokeLinecap="round"
        opacity={selected ? 1 : 0.92}
      />
      {/* 일방통행/능력 엣지에 화살표 */}
      {(edge.type === 'oneway' || edge.type === 'ability' || edge.type === 'locked') && (
        <polygon
          points={arrow.points}
          fill={style.stroke}
          transform={`rotate(${arrow.angle} ${arrow.cx} ${arrow.cy})`}
        />
      )}
      {/* 잠금/능력 라벨 */}
      {(edge.keyId || edge.abilityId || edge.label) && (
        <EdgeLabel
          x={(from.x + to.x) / 2}
          y={(from.y + to.y) / 2}
          text={edge.label ?? edge.keyId ?? edge.abilityId ?? ''}
          color={style.stroke}
        />
      )}
    </g>
  );
}

function EdgeLabel({ x, y, text, color }: { x: number; y: number; text: string; color: string }) {
  const padding = 4;
  const charW = 6.5;
  const w = text.length * charW + padding * 2;
  return (
    <g transform={`translate(${x - w / 2} ${y - 9})`}>
      <rect width={w} height={18} rx="3" ry="3" fill="var(--paper-50)" stroke={color} strokeWidth="1" />
      <text x={w / 2} y={12} textAnchor="middle" fontSize="11" fontFamily="var(--font-mono)" fill="var(--ink-800)">
        {text}
      </text>
    </g>
  );
}

function arrowMarker(from: { x: number; y: number }, to: { x: number; y: number }, distance: number) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  // 노드 가장자리에서 distance만큼 안쪽
  const offset = 60; // 노드 반지름 근사
  const cx = to.x - ux * offset;
  const cy = to.y - uy * offset;
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  const size = 7;
  // 화살표 좌표 (오른쪽 방향 기준)
  const points = `${cx - size},${cy - size * 0.6} ${cx + size * 0.6},${cy} ${cx - size},${cy + size * 0.6}`;
  return { points, angle: 0, cx, cy };
}
