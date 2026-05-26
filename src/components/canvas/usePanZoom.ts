import { useEffect, useRef, useState } from 'react';
import { select } from 'd3-selection';
import { zoom, zoomIdentity, type ZoomTransform } from 'd3-zoom';

export interface ViewTransform {
  x: number;
  y: number;
  k: number;
}

export function usePanZoom(svgRef: React.RefObject<SVGSVGElement>) {
  const [transform, setTransform] = useState<ViewTransform>({ x: 0, y: 0, k: 1 });
  const zoomBehaviorRef = useRef<ReturnType<typeof zoom<SVGSVGElement, unknown>> | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const sel = select(svg);
    const zb = zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.2, 3])
      .filter((event) => {
        // 노드·엣지·데코 위에서 시작된 드래그는 panZoom이 가로채지 않음
        const target = event.target as HTMLElement | SVGElement;
        if (target && (
          target.closest('[data-node]') ||
          target.closest('[data-edge]') ||
          target.closest('[data-handle]') ||
          target.closest('[data-decoration]')
        )) {
          if (event.type === 'wheel') return true;
          return false;
        }
        return !event.button;
      })
      .on('zoom', (ev) => {
        const t = ev.transform as ZoomTransform;
        setTransform({ x: t.x, y: t.y, k: t.k });
      });
    zoomBehaviorRef.current = zb;
    sel.call(zb);
    // 초기 transform 적용 (저장된 값이 있으면)
    sel.call(zb.transform, zoomIdentity.translate(transform.x, transform.y).scale(transform.k));
    return () => {
      sel.on('.zoom', null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fitTo = (bbox: { x: number; y: number; w: number; h: number }) => {
    const svg = svgRef.current;
    const zb = zoomBehaviorRef.current;
    if (!svg || !zb) return;
    const rect = svg.getBoundingClientRect();
    const pad = 80;
    const k = Math.min(
      (rect.width - pad * 2) / bbox.w,
      (rect.height - pad * 2) / bbox.h,
      1.5,
    );
    const x = rect.width / 2 - (bbox.x + bbox.w / 2) * k;
    const y = rect.height / 2 - (bbox.y + bbox.h / 2) * k;
    select(svg).call(zb.transform, zoomIdentity.translate(x, y).scale(k));
  };

  const reset = () => {
    const svg = svgRef.current;
    const zb = zoomBehaviorRef.current;
    if (!svg || !zb) return;
    select(svg).call(zb.transform, zoomIdentity);
  };

  const zoomBy = (factor: number) => {
    const svg = svgRef.current;
    const zb = zoomBehaviorRef.current;
    if (!svg || !zb) return;
    select(svg).call(zb.scaleBy, factor);
  };

  return { transform, fitTo, reset, zoomBy };
}

export function screenToWorld(t: ViewTransform, sx: number, sy: number) {
  return {
    x: (sx - t.x) / t.k,
    y: (sy - t.y) / t.k,
  };
}
