import { useState } from 'react';
import type { BubbleNode as TNode } from '../../types';
import { NODE_STYLES, nodePaths, nodeRadii } from './node-shapes';
import { useProject } from '../../store/project';

interface Props {
  node: TNode;
  rough: boolean;
  selected: boolean;
  onPointerDownNode: (e: React.PointerEvent, id: string) => void;
  onHandlePointerDown: (e: React.PointerEvent, fromId: string) => void;
  onResizePointerDown: (e: React.PointerEvent, id: string) => void;
}

export function BubbleNode({
  node, rough, selected,
  onPointerDownNode, onHandlePointerDown, onResizePointerDown,
}: Props) {
  const s = NODE_STYLES[node.type];
  const size = node.size ?? 1;
  const { rx, ry } = nodeRadii(node.type, size);
  const paths = nodePaths({ cx: 0, cy: 0, type: node.type, size, rough, seed: node.id });
  const shadowPath = nodePaths({ cx: 0, cy: 0, type: node.type, size, rough: false, seed: node.id })[0];
  const select = useProject((s) => s.select);
  const [hover, setHover] = useState(false);

  // 핸들 위치 — 스케일된 반지름 기준
  const outHandle = { x: rx + 6, y: 0 };
  // 리사이즈 핸들: SE 방향 (타원 위 점)
  const seAngle = Math.PI * 0.25; // 45°
  const resizeHandle = {
    x: rx * Math.cos(seAngle) + 4,
    y: ry * Math.sin(seAngle) + 4,
  };

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
      {/* 그림자 — 항상 깨끗한 ellipse */}
      <path
        d={shadowPath}
        fill="rgba(58, 50, 38, 0.10)"
        stroke="none"
        transform="translate(2, 3)"
      />
      {/* Fill 레이어 — 항상 깨끗한 ellipse (rough path 닫힘 chord 아티팩트 회피) */}
      <ellipse cx="0" cy="0" rx={rx} ry={ry} fill={s.fill} stroke="none" className="bn-fill" />
      {/* Stroke 레이어 — clean 1패스, rough 2패스 겹침. fill 없음 */}
      {paths.map((d, idx) => (
        <path
          key={idx}
          d={d}
          fill="none"
          stroke={s.stroke}
          strokeWidth={
            rough
              ? (selected ? s.strokeWidth + 0.4 : s.strokeWidth * 0.9)
              : (selected ? s.strokeWidth + 1.5 : s.strokeWidth)
          }
          strokeOpacity={rough ? (idx === 0 ? 0.90 : 0.65) : 1}
          strokeLinejoin="round"
          strokeLinecap="round"
          className={idx === 0 ? 'bn-shape' : 'bn-shape-overlay'}
        />
      ))}
      {/* 선택 표시 */}
      {selected && (
        <ellipse
          cx="0" cy="0"
          rx={rx + 8}
          ry={ry + 6}
          fill="none"
          stroke="var(--brick)"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          opacity="0.7"
          pointerEvents="none"
        />
      )}
      {/* 아이콘 */}
      <text
        y={-12 * size}
        textAnchor="middle"
        fontSize={16 * Math.sqrt(size)}
        fill={s.textColor}
        fontFamily="var(--font-display)"
        pointerEvents="none"
      >
        {s.icon}
      </text>
      {/* 노드 이름 */}
      <foreignObject x={-rx + 8} y={2} width={rx * 2 - 16} height={ry}>
        <div className="bn-name" style={{ fontSize: `${13 * Math.sqrt(size)}px` }}>
          {node.name}
        </div>
      </foreignObject>
      {/* 타입 라벨 */}
      <text
        y={ry - 8}
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
      {/* 출처 표시 */}
      {node.promotedFrom && (
        <text
          x={rx - 8} y={-ry + 12}
          textAnchor="end"
          fontSize={9}
          fill="var(--brick)"
          fontFamily="var(--font-mono)"
          pointerEvents="none"
        >↩</text>
      )}
      {/* 엣지 핸들 (호버/선택 시 우측) */}
      {(hover || selected) && (
        <g data-handle="out">
          <circle
            cx={outHandle.x} cy={outHandle.y}
            r="6"
            fill="var(--paper-50)"
            stroke="var(--brick)"
            strokeWidth="1.4"
            className="bn-handle"
            onPointerDown={(e) => {
              e.stopPropagation();
              onHandlePointerDown(e, node.id);
            }}
          />
          {/* 작은 화살표 힌트 */}
          <path
            d={`M ${outHandle.x - 2.5} ${outHandle.y - 2} L ${outHandle.x + 1.5} ${outHandle.y} L ${outHandle.x - 2.5} ${outHandle.y + 2}`}
            fill="none"
            stroke="var(--brick)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pointerEvents="none"
          />
        </g>
      )}
      {/* 리사이즈 핸들 (호버/선택 시 SE 모서리) */}
      {(hover || selected) && (
        <g data-handle="resize">
          <circle
            cx={resizeHandle.x} cy={resizeHandle.y}
            r="6"
            fill="var(--paper-50)"
            stroke="var(--blueprint)"
            strokeWidth="1.4"
            className="bn-handle bn-handle-resize"
            onPointerDown={(e) => {
              e.stopPropagation();
              onResizePointerDown(e, node.id);
            }}
          />
          {/* 대각선 화살표 힌트 */}
          <path
            d={`M ${resizeHandle.x - 2} ${resizeHandle.y - 2} L ${resizeHandle.x + 2} ${resizeHandle.y + 2}
                M ${resizeHandle.x + 2} ${resizeHandle.y - 2} L ${resizeHandle.x - 2} ${resizeHandle.y + 2}`}
            stroke="var(--blueprint)"
            strokeWidth="1.1"
            strokeLinecap="round"
            pointerEvents="none"
            opacity="0.7"
          />
        </g>
      )}
    </g>
  );
}
