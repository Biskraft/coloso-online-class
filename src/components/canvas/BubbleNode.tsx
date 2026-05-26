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
  const aspect = node.aspect ?? 1;
  const { rx, ry } = nodeRadii(node.type, size, aspect);
  const paths = nodePaths({ cx: 0, cy: 0, type: node.type, size, aspect, rough, seed: node.id });
  const select = useProject((s) => s.select);
  const [hover, setHover] = useState(false);

  // 엣지 연결 핸들 — 4방향 (N/E/S/W) 모두 동일 기능
  const edgeHandles = [
    { id: 'e', x:  rx + 6,  y: 0,        ax: -2.5, ay: -2, bx: 1.5, by: 0, cx: -2.5, cy: 2 },
    { id: 'w', x: -rx - 6,  y: 0,        ax:  2.5, ay: -2, bx: -1.5, by: 0, cx:  2.5, cy: 2 },
    { id: 'n', x:  0,       y: -ry - 6,  ax: -2,   ay:  2.5, bx: 0, by: -1.5, cx: 2, cy: 2.5 },
    { id: 's', x:  0,       y:  ry + 6,  ax: -2,   ay: -2.5, bx: 0, by: 1.5, cx: 2, cy: -2.5 },
  ];
  // 리사이즈 핸들: SE 방향 (타원 위 점)
  const seAngle = Math.PI * 0.25;
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
      {/* Fill 레이어 — 솔리드 채도색 ellipse */}
      <ellipse cx="0" cy="0" rx={rx} ry={ry} fill={s.fill} stroke="none" className="bn-fill" />
      {/* Stroke 레이어 — 굵은 검정 외곽선. rough 모드는 2패스 겹침(둘 다 솔리드) */}
      {paths.map((d, idx) => (
        <path
          key={idx}
          d={d}
          fill="none"
          stroke={s.stroke}
          strokeWidth={
            rough
              ? (selected ? s.strokeWidth + 0.6 : s.strokeWidth * 0.92)
              : (selected ? s.strokeWidth + 1.4 : s.strokeWidth)
          }
          strokeLinejoin="round"
          strokeLinecap="round"
          className={idx === 0 ? 'bn-shape' : 'bn-shape-overlay'}
        />
      ))}
      {/* 선택 표시 — 외곽 점선 (솔리드 색) */}
      {selected && (
        <ellipse
          cx="0" cy="0"
          rx={rx + 9}
          ry={ry + 7}
          fill="none"
          stroke="#1A1814"
          strokeWidth="1.4"
          strokeDasharray="5 4"
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
      {/* 아이콘 태그 — 노드 아래 작은 칩으로 시각화 */}
      {node.icons.length > 0 && (
        <foreignObject x={-rx - 20} y={ry + 6} width={rx * 2 + 40} height={28}>
          <div className="bn-icon-tags">
            {node.icons.slice(0, 6).map((k) => (
              <span key={k} className="bn-icon-chip">{k}</span>
            ))}
            {node.icons.length > 6 && (
              <span className="bn-icon-more">+{node.icons.length - 6}</span>
            )}
          </div>
        </foreignObject>
      )}
      {/* 엣지 연결 핸들 — 4방향 (호버/선택 시 표시) */}
      {(hover || selected) && edgeHandles.map((h) => (
        <g key={h.id} data-handle="out">
          <circle
            cx={h.x} cy={h.y}
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
          {/* 방향 화살표 힌트 */}
          <path
            d={`M ${h.x + h.ax} ${h.y + h.ay} L ${h.x + h.bx} ${h.y + h.by} L ${h.x + h.cx} ${h.y + h.cy}`}
            fill="none"
            stroke="var(--brick)"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pointerEvents="none"
          />
        </g>
      ))}
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
