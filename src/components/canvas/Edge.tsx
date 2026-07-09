import { useMemo } from 'react';
import type { BubbleEdge, BubbleNode, EdgeType } from '../../types';
import { roughLine } from '../../utils/rough-path';
import { nodeRadii } from './node-shapes';
import { useTheme } from '../../theme';
import { useProject } from '../../store/project';

interface Props {
  edge: BubbleEdge;
  from: BubbleNode;
  to: BubbleNode;
  rough: boolean;
  selected: boolean;
  /** 같은 노드쌍에 여러 엣지가 있을 때 수직 평행 offset (px). 0 = 단일 */
  offset?: number;
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
  vista:   { stroke: '#6B4F87',  width: 1.6, dash: '2 6',     label: '전망' },
};

/* 다크모드 선 색상 — 종이 위 어두운 잉크색(통로·일방)은 어두운 배경에서 묻히므로
   밝게 치환한다. 통로선은 흰색, 일방선은 밝은 회색. 색이 있는 선(잠금·능력·전망)은
   다크 배경에서도 또렷해 그대로 둔다. */
const DARK_STROKE: Partial<Record<EdgeType, string>> = {
  open:   '#FFFFFF',
  oneway: '#C7C0B4',
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

export function Edge({ edge, from, to, rough, selected, offset = 0, onSelect }: Props) {
  const style = EDGE_STYLE[edge.type];
  const theme = useTheme();
  const stroke = (theme === 'dark' && DARK_STROKE[edge.type]) || style.stroke;
  // 화살표 외곽선 — 라이트는 검정, 다크는 어두운 종이톤으로 밝은 화살표를 또렷이 분리
  const arrowOutline = theme === 'dark' ? '#14110D' : '#1A1814';

  // 선은 노드 *안쪽으로* 깊이 들어가서 절대 끊기지 않게.
  // 같은 노드쌍 중복 엣지: ID 사전순 기준 수직 벡터를 일관되게 사용 →
  // A→B와 B→A가 같은 px,py를 공유하므로 offset 부호로 좌우 평행 분리.
  const { startX, startY, endX, endY, arrowX, arrowY, startArrowX, startArrowY, angle } = useMemo(() => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.hypot(dx, dy) || 1;
    const ux = dx / len;
    const uy = dy / len;

    // ID 사전순 기준 수직벡터 (방향 무관)
    const sortedDir = from.id < to.id ? 1 : -1;
    const px = -uy * sortedDir;
    const py =  ux * sortedDir;
    const ox = px * offset;
    const oy = py * offset;

    const fr = nodeRadii(from.type, from.size ?? 1, from.aspect ?? 1);
    const tr = nodeRadii(to.type, to.size ?? 1, to.aspect ?? 1);

    const fromEdge = ellipseBoundary(from.x, from.y, fr.rx, fr.ry, dx, dy);
    const toEdge = ellipseBoundary(to.x, to.y, tr.rx, tr.ry, -dx, -dy);

    const inset = 6;
    const arrowOut = 2;
    return {
      startX: fromEdge.x - ux * inset + ox,
      startY: fromEdge.y - uy * inset + oy,
      endX:   toEdge.x   + ux * inset + ox,
      endY:   toEdge.y   + uy * inset + oy,
      arrowX: toEdge.x   - ux * arrowOut + ox,
      arrowY: toEdge.y   - uy * arrowOut + oy,
      startArrowX: fromEdge.x + ux * arrowOut + ox,
      startArrowY: fromEdge.y + uy * arrowOut + oy,
      angle:  Math.atan2(dy, dx) * 180 / Math.PI,
    };
  }, [from.x, from.y, to.x, to.y, from.id, to.id, from.type, from.size, from.aspect, to.type, to.size, to.aspect, offset]);

  const paths = useMemo(() => {
    // 단일 패스. rough 모드는 직선 평균을 따라가며 구불(휨 X, 떨림만)
    return roughLine(startX, startY, endX, endY, {
      seed: edge.id,
      roughness: rough ? 4.8 : 0,
      bowing:    0,
      passes:    1,
    });
  }, [startX, startY, endX, endY, edge.id, rough]);

  // 화살표 — 항상 크고 선명하게. 검정 외곽선으로 색깔과 무관히 또렷.
  const arrowSize = Math.max(13, Math.min(18, style.width * 3.0));
  const arrowPoints =
    `${-arrowSize},${-arrowSize * 0.6} ${arrowSize * 0.45},0 ${-arrowSize},${arrowSize * 0.6}`;

  const updateEdge = useProject((s) => s.updateEdge);

  // 방향 화살표 — 명시 플래그 우선, 미설정 시 타입 기본값
  const typeDefaultEnd = edge.type === 'oneway' || edge.type === 'ability' || edge.type === 'locked';
  const showEnd = edge.arrowEnd ?? typeDefaultEnd;
  const showStart = edge.arrowStart ?? false;
  const toggleEnd = (e: React.MouseEvent) => { e.stopPropagation(); updateEdge(edge.id, { arrowEnd: !showEnd }); };
  const toggleStart = (e: React.MouseEvent) => { e.stopPropagation(); updateEdge(edge.id, { arrowStart: !showStart }); };

  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  // 끝점 토글 핸들 위치 — 노드에 가리지 않도록 보이는 선 위 안쪽으로 약간 이동
  const hdx = endX - startX, hdy = endY - startY;
  const hlen = Math.hypot(hdx, hdy) || 1;
  const hux = hdx / hlen, huy = hdy / hlen;
  const hoff = Math.min(18, hlen * 0.3);
  const hStartX = startX + hux * hoff, hStartY = startY + huy * hoff;
  const hEndX = endX - hux * hoff, hEndY = endY - huy * hoff;

  return (
    <g
      data-edge={edge.id}
      className="eg"
      onClick={(e) => { e.stopPropagation(); onSelect(edge.id); }}
    >
      {/* 두꺼운 투명 클릭 영역 (첫 path 기준) */}
      <path d={paths[0]} fill="none" stroke="transparent" strokeWidth="14" />
      {/* 본선 — rough면 2패스 겹침 */}
      {/* 선택 시 외곽 강조 halo — brick 솔리드, 본선보다 두껍게 */}
      {selected && paths.map((d, idx) => (
        <path
          key={`halo-${idx}`}
          d={d}
          fill="none"
          stroke="#CF5547"
          strokeWidth={style.width + 8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
      {/* 본선 */}
      {paths.map((d, idx) => (
        <path
          key={idx}
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={selected ? style.width + 1.4 : style.width}
          strokeDasharray={style.dash}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}

      {/* 도착점(to) 화살표 — from→to 방향 */}
      {showEnd && (
        <polygon
          points={arrowPoints}
          fill={selected ? '#CF5547' : stroke}
          stroke={arrowOutline}
          strokeWidth={selected ? 2 : 1.4}
          strokeLinejoin="round"
          strokeLinecap="round"
          transform={`translate(${arrowX} ${arrowY}) rotate(${angle})`}
        />
      )}
      {/* 시작점(from) 화살표 — to→from 방향 (반대) */}
      {showStart && (
        <polygon
          points={arrowPoints}
          fill={selected ? '#CF5547' : stroke}
          stroke={arrowOutline}
          strokeWidth={selected ? 2 : 1.4}
          strokeLinejoin="round"
          strokeLinecap="round"
          transform={`translate(${startArrowX} ${startArrowY}) rotate(${angle + 180})`}
        />
      )}

      {/* 선택 시 양 끝점 토글 핸들 — 클릭으로 방향 화살표 표시/숨기기 */}
      {selected && (
        <>
          <circle
            cx={hStartX} cy={hStartY} r="7"
            className="eg-handle"
            fill={showStart ? '#CF5547' : 'var(--paper-50)'}
            stroke="var(--brick)" strokeWidth="1.6"
            onClick={toggleStart}
          >
            <title>시작점 방향 화살표 표시/숨기기</title>
          </circle>
          <circle
            cx={hEndX} cy={hEndY} r="7"
            className="eg-handle"
            fill={showEnd ? '#CF5547' : 'var(--paper-50)'}
            stroke="var(--brick)" strokeWidth="1.6"
            onClick={toggleEnd}
          >
            <title>도착점 방향 화살표 표시/숨기기</title>
          </circle>
        </>
      )}

      {(edge.keyId || edge.abilityId || edge.label) && (
        <EdgeLabel x={midX} y={midY} text={edge.label ?? edge.keyId ?? edge.abilityId ?? ''} color={stroke} />
      )}
    </g>
  );
}

function EdgeLabel({ x, y, text, color }: { x: number; y: number; text: string; color: string }) {
  // 한글은 라틴 대비 약 2배 폭 — 너비 어림 추정
  const koreanCount = (text.match(/[가-힯ㄱ-ㅎㅏ-ㅣ]/g) || []).length;
  const latinCount = text.length - koreanCount;
  const PADDING = 28; // 양쪽 14px씩 시각적 여백
  const estimated = Math.max(46, koreanCount * 15 + latinCount * 8 + PADDING);
  const HEIGHT = 26;
  return (
    <foreignObject
      x={x - estimated / 2}
      y={y - HEIGHT / 2}
      width={estimated}
      height={HEIGHT}
      style={{ overflow: 'visible' }}
    >
      <div className="edge-label" style={{ borderColor: color, color }}>
        <span>{text}</span>
      </div>
    </foreignObject>
  );
}
