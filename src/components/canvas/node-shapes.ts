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

/* 채도 한 단계 낮춘 톤 — 종이 위에 인쇄된 느낌 (네온 X) */
export const NODE_STYLES: Record<NodeType, NodeStyle> = {
  room: {
    label: '방',
    icon: '◯',
    rx: 70, ry: 45,
    fill: '#7AA8C2',
    stroke: OUTLINE,
    strokeWidth: 3.6,
    textColor: OUTLINE,
  },
  vista: {
    label: '전망',
    icon: '◇',
    rx: 80, ry: 50,
    fill: '#E8C552',
    stroke: OUTLINE,
    strokeWidth: 3.6,
    textColor: OUTLINE,
  },
  treasure: {
    label: '보물',
    icon: '✦',
    rx: 70, ry: 45,
    fill: '#D9823A',
    stroke: OUTLINE,
    strokeWidth: 3.2,
    textColor: OUTLINE,
  },
  boss: {
    label: '보스',
    icon: '✚',
    rx: 90, ry: 60,
    fill: '#CF5547',
    stroke: OUTLINE,
    strokeWidth: 4.2,
    textColor: OUTLINE,
  },
  hub: {
    label: '허브',
    icon: '⌬',
    rx: 80, ry: 50,
    fill: '#E8C552',
    stroke: OUTLINE,
    strokeWidth: 3.6,
    textColor: OUTLINE,
  },
  save: {
    label: '세이브',
    icon: '⚑',
    rx: 60, ry: 38,
    fill: '#8AAE52',
    stroke: OUTLINE,
    strokeWidth: 3.2,
    textColor: OUTLINE,
  },
};

export interface NodeShapeOpts {
  cx: number;
  cy: number;
  type: NodeType;
  size?: number;
  aspect?: number;
  rough: boolean;
  seed: string;
}

/**
 * 노드의 실제(스케일·형태 적용) 반지름
 * aspect:
 *   1.0 → 타입 기본 비율 그대로
 *   > 1 → 더 가로로 (rx 증가, ry 감소)
 *   < 1 → 더 세로로 (rx 감소, ry 증가)
 * 면적은 size로만 결정 (sqrt 양방향 보정으로 aspect는 비율만 변경)
 */
export function nodeRadii(type: NodeType, size = 1, aspect = 1): { rx: number; ry: number } {
  const s = NODE_STYLES[type];
  const a = Math.sqrt(aspect);
  return { rx: s.rx * size * a, ry: s.ry * size / a };
}

/** 노드 path 배열 — clean 모드는 1개, rough 모드는 2개 (겹친 스트로크) */
export function nodePaths(o: NodeShapeOpts): string[] {
  const { rx, ry } = nodeRadii(o.type, o.size ?? 1, o.aspect ?? 1);
  if (o.rough) {
    return roughEllipse(o.cx, o.cy, rx, ry, {
      seed: o.seed,
      roughness: 2.8,
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
