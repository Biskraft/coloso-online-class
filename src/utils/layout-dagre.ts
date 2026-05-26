import dagre from '@dagrejs/dagre';
import type { BubbleNode, BubbleEdge } from '../types';
import { nodeRadii } from '../components/canvas/node-shapes';

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
    const r = nodeRadii(n.type, n.size ?? 1);
    g.setNode(n.id, { width: r.rx * 2 + 20, height: r.ry * 2 + 20 });
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
