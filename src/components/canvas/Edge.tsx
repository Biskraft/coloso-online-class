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

  // 엣지가 노드 *가장자리*에서 시작/끝나도록 계산
  const { startX, startY, endX, endY, angle } = useMemo(() => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;

    const fr = nodeRadii(from.type, from.size ?? 1, from.aspect ?? 1);
    const tr = nodeRadii(to.type, to.size ?? 1, to.aspect ?? 1);

    const fromEdge = ellipseBoundary(from.x, from.y, fr.rx, fr.ry, dx, dy);
    const toEdge = ellipseBoundary(to.x, to.y, tr.rx, tr.ry, -dx, -dy);

    // 시각적 숨쉴 공간 — 노드와 4px 떨어뜨리기
    const gap = 4;
    return {
      startX: fromEdge.x + ux * gap,
      startY: fromEdge.y + uy * gap,
      endX:   toEdge.x - ux * gap,
      endY:   toEdge.y - uy * gap,
      angle:  Math.atan2(dy, dx) * 180 / Math.PI,
    };
  }, [from.x, from.y, to.x, to.y, from.type, from.size, to.type, to.size]);

  const paths = useMemo(() => {
    // 단일 패스 — 두께가 다양해서 2중 스트로크 불필요
    // rough 모드: 강한 떨림 + 자연스러운 휨
    return roughLine(startX, startY, endX, endY, {
      seed: edge.id,
      roughness: rough ? 2.2 : 0,
      bowing:    rough ? 1.1 : 0.25,
      passes:    1,
    });
  }, [startX, startY, endX, endY, edge.id, rough]);

  // 화살표 — 엣지 두께에 비례, 단 너무 작거나 크지 않게 클램프
  const arrowTip = { x: endX, y: endY };
  const arrowSize = Math.max(7, Math.min(13, style.width * 2.4));
  const arrowPoints =
    `${-arrowSize},${-arrowSize * 0.55} ${arrowSize * 0.4},0 ${-arrowSize},${arrowSize * 0.55}`;

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
          transform={`translate(${arrowTip.x} ${arrowTip.y}) rotate(${angle})`}
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
