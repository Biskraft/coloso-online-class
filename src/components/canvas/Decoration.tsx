import { useState, useRef, useEffect } from 'react';
import type { Decoration as TDecoration } from '../../types';
import { useProject } from '../../store/project';

interface Props {
  dec: TDecoration;
  selected: boolean;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  onArrowEndpointDown: (e: React.PointerEvent, id: string, endpoint: 'start' | 'end') => void;
  onResizeDown: (e: React.PointerEvent, id: string) => void;
}

export function Decoration({ dec, selected, onPointerDown, onArrowEndpointDown, onResizeDown }: Props) {
  const select = useProject((s) => s.select);

  const onSelect = (e: React.PointerEvent) => {
    e.stopPropagation();
    select({ kind: 'decoration', id: dec.id });
    onPointerDown(e, dec.id);
  };

  if (dec.kind === 'arrow') {
    return <ArrowDeco dec={dec} selected={selected} onSelect={onSelect} onEndpointDown={onArrowEndpointDown} />;
  }
  if (dec.kind === 'ellipse') {
    return <EllipseDeco dec={dec} selected={selected} onSelect={onSelect} onResizeDown={onResizeDown} />;
  }
  return <TextDeco dec={dec} selected={selected} onSelect={onSelect} onResizeDown={onResizeDown} />;
}

/* ───── Arrow ───── */
function ArrowDeco({
  dec, selected, onSelect, onEndpointDown,
}: {
  dec: TDecoration; selected: boolean;
  onSelect: (e: React.PointerEvent) => void;
  onEndpointDown: (e: React.PointerEvent, id: string, endpoint: 'start' | 'end') => void;
}) {
  const x1 = dec.x, y1 = dec.y;
  const x2 = dec.x2 ?? dec.x + 140, y2 = dec.y2 ?? dec.y;
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  // vivid red 아이콘 톤 — 외곽선 없음, 굵은 선, 큰 화살촉
  const ARROW = '#E5202B';
  const lineWidth = selected ? 28 : 24;
  const arrowSize = 44;
  const points = `${-arrowSize},${-arrowSize * 0.7} ${arrowSize * 0.5},0 ${-arrowSize},${arrowSize * 0.7}`;

  return (
    <g data-decoration={dec.id} className="deco">
      {/* 클릭 영역 */}
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="transparent" strokeWidth={lineWidth + 12}
        onPointerDown={onSelect}
      />
      {/* 선택 표시는 양 끝 핸들로 — halo 없음 */}
      {/* 본선 — 굵은 vivid red, 아웃라인 없음 */}
      <line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={ARROW}
        strokeWidth={lineWidth}
        strokeLinecap="round"
        pointerEvents="none"
      />
      {/* 화살촉 — 큰 vivid red, 아웃라인 없음 */}
      <polygon
        points={points}
        fill={ARROW}
        stroke="none"
        strokeLinejoin="round"
        transform={`translate(${x2} ${y2}) rotate(${angle})`}
        pointerEvents="none"
      />
      {/* 끝점 핸들 */}
      {selected && (
        <>
          <circle
            cx={x1} cy={y1} r="6"
            fill="var(--paper-50)" stroke="var(--brick)" strokeWidth="1.4"
            className="deco-handle"
            onPointerDown={(e) => onEndpointDown(e, dec.id, 'start')}
          />
          <circle
            cx={x2} cy={y2} r="6"
            fill="var(--paper-50)" stroke="var(--brick)" strokeWidth="1.4"
            className="deco-handle"
            onPointerDown={(e) => onEndpointDown(e, dec.id, 'end')}
          />
        </>
      )}
    </g>
  );
}

/* ───── Ellipse (회색, 아웃라인 없음) ───── */
function EllipseDeco({
  dec, selected, onSelect, onResizeDown,
}: {
  dec: TDecoration; selected: boolean;
  onSelect: (e: React.PointerEvent) => void;
  onResizeDown: (e: React.PointerEvent, id: string) => void;
}) {
  const w = dec.width ?? 140;
  const h = dec.height ?? 90;
  const rx = w / 2;
  const ry = h / 2;
  return (
    <g
      data-decoration={dec.id}
      transform={`translate(${dec.x} ${dec.y})`}
      className="deco"
      onPointerDown={onSelect}
    >
      <ellipse cx="0" cy="0" rx={rx} ry={ry} fill="#C9C4B8" stroke="none" />
      {selected && (
        <ellipse
          cx="0" cy="0" rx={rx + 6} ry={ry + 6}
          fill="none" stroke="var(--brick)" strokeWidth="1.4" strokeDasharray="5 4"
          pointerEvents="none"
        />
      )}
      {selected && (
        <circle
          cx={rx * 0.707 + 4} cy={ry * 0.707 + 4} r="6"
          fill="var(--paper-50)" stroke="var(--blueprint)" strokeWidth="1.4"
          className="deco-handle deco-handle-resize"
          onPointerDown={(e) => onResizeDown(e, dec.id)}
        />
      )}
    </g>
  );
}

/* ───── Text (자동 크기, 테두리 없음) ───── */
function TextDeco({
  dec, selected, onSelect, onResizeDown,
}: {
  dec: TDecoration; selected: boolean;
  onSelect: (e: React.PointerEvent) => void;
  onResizeDown: (e: React.PointerEvent, id: string) => void;
}) {
  const updateDecoration = useProject((s) => s.updateDecoration);
  const w = dec.width ?? 180;
  const h = dec.height ?? 40;
  const text = dec.text ?? '텍스트';
  const [editing, setEditing] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);

  // 박스 크기에 자동 맞춤되는 폰트 크기 추정
  // 텍스트 길이 + 박스 너비/높이 비율로 가늠
  const charCount = Math.max(1, text.length);
  const koreanCount = (text.match(/[가-힯]/g) || []).length;
  const avgCharW = (koreanCount * 1.5 + (charCount - koreanCount)) / charCount;
  // 한 줄에 들어갈 글자 수 추정 → fontSize
  const lineFontSize = Math.min(48, Math.max(12, h * 0.7));
  const widthFontSize = Math.min(48, Math.max(12, (w / charCount) / avgCharW * 1.4));
  const fontSize = Math.min(lineFontSize, widthFontSize);

  useEffect(() => {
    if (editing && taRef.current) {
      taRef.current.focus();
      taRef.current.select();
    }
  }, [editing]);

  return (
    <g
      data-decoration={dec.id}
      transform={`translate(${dec.x} ${dec.y})`}
      className="deco"
      onPointerDown={(e) => {
        if (editing) return;
        onSelect(e);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        setEditing(true);
      }}
    >
      <foreignObject x={-w / 2} y={-h / 2} width={w} height={h} style={{ overflow: 'visible' }}>
        {editing ? (
          <textarea
            ref={taRef}
            className="deco-text-input"
            style={{ fontSize: `${fontSize}px`, width: '100%', height: '100%' }}
            value={text}
            onChange={(e) => updateDecoration(dec.id, { text: e.target.value })}
            onBlur={() => setEditing(false)}
            onKeyDown={(e) => { if (e.key === 'Escape') setEditing(false); }}
          />
        ) : (
          <div
            className="deco-text"
            style={{ fontSize: `${fontSize}px`, width: '100%', height: '100%' }}
          >
            {text || <span className="deco-text-placeholder">더블클릭으로 편집</span>}
          </div>
        )}
      </foreignObject>
      {selected && (
        <>
          <rect
            x={-w / 2 - 4} y={-h / 2 - 4}
            width={w + 8} height={h + 8}
            fill="none" stroke="var(--brick)" strokeWidth="1.4" strokeDasharray="5 4"
            pointerEvents="none"
          />
          <circle
            cx={w / 2 + 4} cy={h / 2 + 4} r="6"
            fill="var(--paper-50)" stroke="var(--blueprint)" strokeWidth="1.4"
            className="deco-handle deco-handle-resize"
            onPointerDown={(e) => onResizeDown(e, dec.id)}
          />
        </>
      )}
    </g>
  );
}
