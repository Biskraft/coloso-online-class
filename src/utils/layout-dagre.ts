import dagre from '@dagrejs/dagre';
import type { BubbleNode, BubbleEdge } from '../types';

export function autoLayout(
  nodes: BubbleNode[],
  edges: BubbleEdge[],
  direction: 'LR' | 'TB' = 'LR',
): Record<string, { x: number; y: number }> {
  const g = new dagre.graphlib.Graph();
  g.setGraph({
    rankdir: direction,
    nodesep: 80,
    ranksep: 120,
    marginx: 60,
    marginy: 60,
  });
  g.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((n) => {
    g.setNode(n.id, { width: NODE_W(n.type), height: NODE_H(n.type) });
  });
  edges.forEach((e) => {
    g.setEdge(e.from, e.to);
  });

  dagre.layout(g);

  const out: Record<string, { x: number; y: number }> = {};
  nodes.forEach((n) => {
    const np = g.node(n.id);
    if (np) out[n.id] = { x: np.x, y: np.y };
  });
  return out;
}

function NODE_W(t: string): number {
  if (t === 'boss') return 180;
  if (t === 'vista') return 160;
  if (t === 'hub') return 160;
  return 140;
}
function NODE_H(t: string): number {
  if (t === 'boss') return 120;
  if (t === 'vista') return 100;
  if (t === 'hub') return 100;
  return 90;
}
