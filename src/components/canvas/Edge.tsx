import { useMemo } from 'react';
import type { BubbleEdge, BubbleNode, EdgeType } from '../../types';
import { roughLine } from '../../utils/rough-path';
import { nodeRadii } from './node-shapes';

interface Props {
  edge: BubbleEdge;
  from: BubbleNode;
  to: BubbleNode;
  rough: boolean;
  selected: boolean;
  onSelect: (id: string) => void;
}

/**
 * 두께 위계 — 레퍼런스 이미지처럼 극적으로 차등화
 *   open    4.8px  굵은 검정          (Immediate Adjacency, 가장 강한 시각 무게)
 *   locked  2.8px  점선 오크르         (Lock/Key, 의미 있는 차단)
 *   oneway  1.8px  얇은 회색 (화살표)   (One-Way Drop, 정보성 화살표)
 *   ability 2.2px  점선 벽돌           (Ability Gate)
 */
export const EDGE_STYLE: Record<EdgeType, { stroke: string; dash?: string; width: number; label: string }> = {
  open:    { stroke: '#1A1814',  width: 4.8,                  label: '통로' },
  locked:  { stroke: '#8F7740',  width: 2.8, dash: '8 5',     label: '잠금' },
  oneway:  { stroke: '#6B6760',  width: 1.8,                  label: '일방' },
  ability: { stroke: '#8A3D3A',  width: 2.2, dash: '3 4',     label: '능력' },
};

/** 타원 경계 위의 점 계산 — 중심에서 방향 (dirX, dirY)로 나가는 광선의 타원 교점 */
function ellipseBoundary(
  cx: number, cy: number,
  rx: number, ry: number,
  dirX: number, dirY: number,
): { x: number; y: number } {
  const k = Math.sqrt((dirX * dirX) / (rx * rx) + (dirY * dirY) / (ry * ry));
  if (k === 0) return { x: cx, y: cy };
  return { x: cx + dirX / k, y: cy + dirY / k };
}

export function Edge({ edge, from, to, rough, selected, onSelect }: Props) {
  const style = EDGE_STYLE[edge.type];

  // 선은 노드 *안쪽으로* 깊이 들어가서 절대 끊기지 않게.
  // 노드 fill이 z-order 위에 덮어 자연스러운 끝 처리.
  // 화살표는 노드 가장자리 살짝 바깥에 별도 위치.
  const { startX, startY, endX, endY, arrowX, arrowY, angle } = useMemo(() => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;

    const fr = nodeRadii(from.type, from.size ?? 1, from.aspect ?? 1);
    const tr = nodeRadii(to.type, to.size ?? 1, to.aspect ?? 1);

    const fromEdge = ellipseBoundary(from.x, from.y, fr.rx, fr.ry, dx, dy);
    const toEdge = ellipseBoundary(to.x, to.y, tr.rx, tr.ry, -dx, -dy);

    // 선 끝점: 노드 *안쪽으로* 6px 들어감 → 노드 fill에 가려져 절대 안 끊김
    const inset = 6;
    // 화살표 끝점: 노드 가장자리에서 외곽으로 2px → 화살표가 노드에 묻히지 않음
    const arrowOut = 2;
    return {
      startX: fromEdge.x - ux * inset,
      startY: fromEdge.y - uy * inset,
      endX:   toEdge.x + ux * inset,
      endY:   toEdge.y + uy * inset,
      arrowX: toEdge.x - ux * arrowOut,
      arrowY: toEdge.y - uy * arrowOut,
      angle:  Math.atan2(dy, dx) * 180 / Math.PI,
    };
  }, [from.x, from.y, to.x, to.y, from.type, from.size, from.aspect, to.type, to.size, to.aspect]);

  const paths = useMemo(() => {
    // 단일 패스. rough 모드는 직선 평균을 따라가며 구불(휨 X, 떨림만)
    return roughLine(startX, startY, endX, endY, {
      seed: edge.id,
      roughness: rough ? 2.4 : 0,
      bowing:    0,
      passes:    1,
    });
  }, [startX, startY, endX, endY, edge.id, rough]);

  // 화살표 — 항상 크고 선명하게. 검정 외곽선으로 색깔과 무관히 또렷.
  const arrowSize = Math.max(13, Math.min(18, style.width * 3.0));
  const arrowPoints =
    `${-arrowSize},${-arrowSize * 0.6} ${arrowSize * 0.45},0 ${-arrowSize},${arrowSize * 0.6}`;

  const showArrow = edge.type === 'oneway' || edge.type === 'ability' || edge.type === 'locked';

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  return (
    <g
      data-edge={edge.id}
      className="eg"
      onClick={(e) => { e.stopPropagation(); onSelect(edge.id); }}
    >
      {/* 두꺼운 투명 클릭 영역 (첫 path 기준) */}
      <path d={paths[0]} fill="none" stroke="transparent" strokeWidth="14" />
      {/* 본선 — rough면 2패스 겹침 */}
      {paths.map((d, idx) => (
        <path
          key={idx}
          d={d}
          fill="none"
          stroke={style.stroke}
          strokeWidth={selected ? style.width + 1.2 : style.width}
          strokeDasharray={style.dash}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {showArrow && (
        <polygon
          points={arrowPoints}
          fill={style.stroke}
          stroke="#1A1814"
          strokeWidth="1.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          transform={`translate(${arrowX} ${arrowY}) rotate(${angle})`}
        />
      )}

      {(edge.keyId || edge.abilityId || edge.label) && (
        <EdgeLabel x={midX} y={midY} text={edge.label ?? edge.keyId ?? edge.abilityId ?? ''} color={style.stroke} />
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
