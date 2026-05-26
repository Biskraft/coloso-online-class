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

/* ─────────────────────────────────────────────────────────
   레퍼런스 톤 매칭 — 솔리드 채도색, 굵은 검정 외곽선
   - 알파(rgba/opacity) 미사용
   - Boss Keys 표기 규약 색 매핑:
     room  → BLUE   (Standard Zone)
     vista → YELLOW (Major Hub — 큰 랜드마크 공간)
     treasure → ORANGE (Optional/Secret Area)
     boss  → RED    (Dangerous Zone)
     hub   → YELLOW (Major Hub)
     save  → GREEN  (Safe Zone)
   ───────────────────────────────────────────────────────── */

const OUTLINE = '#1A1814';

export const NODE_STYLES: Record<NodeType, NodeStyle> = {
  room: {
    label: '방',
    icon: '◯',
    rx: 70, ry: 45,
    fill: '#5BA9D5',
    stroke: OUTLINE,
    strokeWidth: 2.6,
    textColor: OUTLINE,
  },
  vista: {
    label: '전망',
    icon: '◇',
    rx: 80, ry: 50,
    fill: '#F9CF3D',
    stroke: OUTLINE,
    strokeWidth: 2.6,
    textColor: OUTLINE,
  },
  treasure: {
    label: '보물',
    icon: '✦',
    rx: 70, ry: 45,
    fill: '#F0832E',
    stroke: OUTLINE,
    strokeWidth: 2.4,
    textColor: OUTLINE,
  },
  boss: {
    label: '보스',
    icon: '✚',
    rx: 90, ry: 60,
    fill: '#E84B36',
    stroke: OUTLINE,
    strokeWidth: 3.0,
    textColor: OUTLINE,
  },
  hub: {
    label: '허브',
    icon: '⌬',
    rx: 80, ry: 50,
    fill: '#F9CF3D',
    stroke: OUTLINE,
    strokeWidth: 2.6,
    textColor: OUTLINE,
  },
  save: {
    label: '세이브',
    icon: '⚑',
    rx: 60, ry: 38,
    fill: '#7BA63F',
    stroke: OUTLINE,
    strokeWidth: 2.4,
    textColor: OUTLINE,
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
