import { useRef, useState } from 'react';
import type { BubbleNode as TNode } from '../../types';
import { NODE_STYLES, nodePath } from './node-shapes';
import { useProject } from '../../store/project';

interface Props {
  node: TNode;
  rough: boolean;
  selected: boolean;
  onPointerDownNode: (e: React.PointerEvent, id: string) => void;
  onHandlePointerDown: (e: React.PointerEvent, fromId: string) => void;
}

export function BubbleNode({ node, rough, selected, onPointerDownNode, onHandlePointerDown }: Props) {
  const s = NODE_STYLES[node.type];
  const path = nodePath({ cx: 0, cy: 0, type: node.type, rough, seed: node.id });
  const select = useProject((s) => s.select);
  const [hover, setHover] = useState(false);

  return (
    <g
      data-node={node.id}
      transform={`translate(${node.x} ${node.y})`}
      onPointerDown={(e) => {
        e.stopPropagation();
        select({ kind: 'node', id: node.id });
        onPointerDownNode(e, node.id);
      }}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="bn"
    >
      {/* 그림자 */}
      <path
        d={path}
        fill="rgba(58, 50, 38, 0.10)"
        stroke="none"
        transform="translate(2, 3)"
      />
      {/* 본체 */}
      <path
        d={path}
        fill={s.fill}
        stroke={s.stroke}
        strokeWidth={selected ? s.strokeWidth + 1.5 : s.strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
        className="bn-shape"
      />
      {/* 선택 표시 — 점선 외곽 */}
      {selected && (
        <path
          d={path}
          fill="none"
          stroke="var(--brick)"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          transform="scale(1.10)"
          opacity="0.8"
        />
      )}
      {/* 아이콘 */}
      <text
        y={-12}
        textAnchor="middle"
        fontSize={16}
        fill={s.textColor}
        fontFamily="var(--font-display)"
        pointerEvents="none"
      >
        {s.icon}
      </text>
      {/* 노드 이름 */}
      <foreignObject x={-s.rx + 8} y={2} width={s.rx * 2 - 16} height={s.ry}>
        <div className="bn-name">{node.name}</div>
      </foreignObject>
      {/* 타입 라벨 */}
      <text
        y={s.ry - 8}
        textAnchor="middle"
        fontSize={9}
        fill="var(--ink-500)"
        fontFamily="var(--font-mono)"
        letterSpacing="0.12em"
        pointerEvents="none"
        style={{ textTransform: 'uppercase' }}
      >
        {s.label}
      </text>
      {/* 출처 표시 (포스트잇 승격) */}
      {node.promotedFrom && (
        <text
          x={s.rx - 8}
          y={-s.ry + 12}
          textAnchor="end"
          fontSize={9}
          fill="var(--brick)"
          fontFamily="var(--font-mono)"
          pointerEvents="none"
        >
          ↩
        </text>
      )}
      {/* 엣지 드래그 핸들 (호버 시 우측 표시) */}
      {(hover || selected) && (
        <circle
          data-handle="out"
          cx={s.rx + 6}
          cy={0}
          r={6}
          fill="var(--paper-50)"
          stroke="var(--brick)"
          strokeWidth="1.4"
          className="bn-handle"
          onPointerDown={(e) => {
            e.stopPropagation();
            onHandlePointerDown(e, node.id);
          }}
        />
      )}
    </g>
  );
}
