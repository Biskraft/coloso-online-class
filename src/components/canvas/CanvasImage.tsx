import type { ImageItem } from '../../types';
import { useProject } from '../../store/project';

interface Props {
  image: ImageItem;
  selected: boolean;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  onResizeDown: (e: React.PointerEvent, id: string) => void;
}

/** 캔버스에 자유 배치된 참조 이미지. 중심 좌표 기준, 코너 핸들로 비율 유지 리사이즈 */
export function CanvasImage({ image, selected, onPointerDown, onResizeDown }: Props) {
  const select = useProject((s) => s.select);
  const w = image.width;
  const h = image.height;

  const onSelect = (e: React.PointerEvent) => {
    e.stopPropagation();
    if (!selected) select({ kind: 'image', id: image.id });
    onPointerDown(e, image.id);
  };

  return (
    <g
      data-image={image.id}
      transform={`translate(${image.x} ${image.y})`}
      className="cv-image"
      onPointerDown={onSelect}
    >
      <image
        href={image.src}
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        preserveAspectRatio="xMidYMid meet"
      />
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
            className="img-handle img-handle-resize"
            onPointerDown={(e) => onResizeDown(e, image.id)}
          />
        </>
      )}
    </g>
  );
}
