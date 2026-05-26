import type { NodeType } from '../../types';
import { roughEllipse } from '../../utils/rough-path';

export interface NodeStyle {
  label: string;
  icon: string;
  rx: number;
  ry: number;
  fill: string;
  stroke: string;
  strokeWidth: number;
  textColor: string;
}

export const NODE_STYLES: Record<NodeType, NodeStyle> = {
  room: {
    label: '방',
    icon: '◯',
    rx: 70, ry: 45,
    fill: 'var(--paper-50)',
    stroke: 'var(--ink-800)',
    strokeWidth: 1.6,
    textColor: 'var(--ink-900)',
  },
  vista: {
    label: '전망',
    icon: '◇',
    rx: 80, ry: 50,
    fill: 'rgba(154, 179, 136, 0.30)',
    stroke: 'var(--moss)',
    strokeWidth: 1.6,
    textColor: 'var(--ink-900)',
  },
  treasure: {
    label: '보물',
    icon: '✦',
    rx: 70, ry: 45,
    fill: 'rgba(222, 197, 145, 0.40)',
    stroke: 'var(--ochre-deep)',
    strokeWidth: 1.6,
    textColor: 'var(--ink-900)',
  },
  boss: {
    label: '보스',
    icon: '✚',
    rx: 90, ry: 60,
    fill: 'rgba(216, 149, 147, 0.45)',
    stroke: 'var(--brick-deep)',
    strokeWidth: 2.2,
    textColor: 'var(--ink-900)',
  },
  hub: {
    label: '허브',
    icon: '⌬',
    rx: 80, ry: 50,
    fill: 'rgba(191, 211, 230, 0.42)',
    stroke: 'var(--blueprint)',
    strokeWidth: 1.6,
    textColor: 'var(--ink-900)',
  },
  save: {
    label: '세이브',
    icon: '⚑',
    rx: 60, ry: 38,
    fill: 'rgba(184, 218, 208, 0.50)',
    stroke: 'var(--moss)',
    strokeWidth: 1.4,
    textColor: 'var(--ink-900)',
  },
};

export interface NodeShapeOpts {
  cx: number;
  cy: number;
  type: NodeType;
  size?: number;
  rough: boolean;
  seed: string;
}

/** 노드의 실제(스케일 적용) 반지름 — 핸들·엣지 위치 계산용 */
export function nodeRadii(type: NodeType, size = 1): { rx: number; ry: number } {
  const s = NODE_STYLES[type];
  return { rx: s.rx * size, ry: s.ry * size };
}

/** 노드 path 배열 — clean 모드는 1개, rough 모드는 2개 (겹친 스트로크) */
export function nodePaths(o: NodeShapeOpts): string[] {
  const { rx, ry } = nodeRadii(o.type, o.size ?? 1);
  if (o.rough) {
    return roughEllipse(o.cx, o.cy, rx, ry, {
      seed: o.seed,
      roughness: 1.0,
      passes: 2,
    });
  }
  return [ellipsePath(o.cx, o.cy, rx, ry)];
}

function ellipsePath(cx: number, cy: number, rx: number, ry: number): string {
  return `M ${cx - rx} ${cy}
          a ${rx} ${ry} 0 1 0 ${rx * 2} 0
          a ${rx} ${ry} 0 1 0 ${-rx * 2} 0 Z`.replace(/\s+/g, ' ');
}
