import type { BubbleNode } from '../../types';
import { NODE_STYLES, nodeRadii } from './node-shapes';

interface Props {
  nodes: BubbleNode[];
  viewBox: { x: number; y: number; w: number; h: number };
}

const MM_W = 180;
const MM_H = 130;

export function Minimap({ nodes, viewBox }: Props) {
  if (nodes.length === 0) return null;

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const n of nodes) {
    const r = nodeRadii(n.type, n.size ?? 1);
    minX = Math.min(minX, n.x - r.rx);
    minY = Math.min(minY, n.y - r.ry);
    maxX = Math.max(maxX, n.x + r.rx);
    maxY = Math.max(maxY, n.y + r.ry);
  }
  const w = Math.max(1, maxX - minX);
  const h = Math.max(1, maxY - minY);
  const pad = 20;

  return (
    <svg
      className="minimap"
      width={MM_W}
      height={MM_H}
      viewBox={`${minX - pad} ${minY - pad} ${w + pad * 2} ${h + pad * 2}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <rect
        x={minX - pad} y={minY - pad}
        width={w + pad * 2} height={h + pad * 2}
        fill="rgba(244, 239, 230, 0.94)"
      />
      {nodes.map((n) => {
        const s = NODE_STYLES[n.type];
        const r = nodeRadii(n.type, n.size ?? 1);
        return (
          <ellipse
            key={n.id}
            cx={n.x} cy={n.y}
            rx={r.rx} ry={r.ry}
            fill={s.fill} stroke={s.stroke} strokeWidth="2"
          />
        );
      })}
      <rect
        x={viewBox.x} y={viewBox.y}
        width={viewBox.w} height={viewBox.h}
        fill="none" stroke="var(--brick)" strokeWidth="2"
        strokeDasharray="6 4"
      />
    </svg>
  );
}
