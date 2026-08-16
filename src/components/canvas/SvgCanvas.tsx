import { useRef, useState, useCallback, useMemo, useEffect } from 'react';
import { useProject } from '../../store/project';
import { BubbleNode } from './BubbleNode';
import { Edge } from './Edge';
import { Minimap } from './Minimap';
import { Decoration } from './Decoration';
import { CanvasImage } from './CanvasImage';
import { NODE_STYLES } from './node-shapes';
import { usePanZoom, screenToWorld } from './usePanZoom';
import { fileToSizedImage, MIN_IMAGE_DIM } from '../../utils/image';
import type { NodeType, DecorationKind } from '../../types';
import './SvgCanvas.css';

/**
 * foreignObject 라벨의 정렬 규칙 — SvgCanvas.css의 같은 선언을 내보내기 경로까지 옮겨 심는 사본.
 * html-to-image는 <svg> 서브트리를 네이티브 deep clone으로 통째 복제하고 자식 순회를 멈추므로
 * (node_modules/html-to-image/es/clone-node.js), 내부 HTML에는 계산된 스타일이 인라인되지 않는다.
 * 앱 스타일시트도 내보낸 문서에는 없다 → 정렬만은 SVG 안에 직접 실어 보낸다.
 * 값은 SvgCanvas.css와 동일하게 유지할 것.
 */
const EXPORT_LABEL_CSS = `
.bn-name { text-align: center; }
.bn-icon-tags { display: flex; flex-wrap: wrap; justify-content: center; align-content: flex-start; gap: 3px 4px; }
.deco-text { display: flex; align-items: center; justify-content: center; text-align: center; }
.edge-label { display: inline-flex; align-items: center; justify-content: center; width: 100%; height: 100%; box-sizing: border-box; }
`;

interface DragState {
  kind: 'node' | 'edge' | 'resize' | 'deco-move' | 'deco-arrow' | 'deco-resize' | 'img-move' | 'img-resize' | 'group' | 'box-select' | 'none';
  nodeId?: string;
  edgeFrom?: string;
  decId?: string;
  imgId?: string;
  imgStart?: { x: number; y: number; width: number; height: number };
  arrowEndpoint?: 'start' | 'end';
  startWorld?: { x: number; y: number };
  nodeStart?: { x: number; y: number };
  decStart?: { x: number; y: number; x2?: number; y2?: number; width?: number; height?: number };
  cursorWorld?: { x: number; y: number };
  /** 박스 선택 시 현재 사각형 */
  boxRect?: { x0: number; y0: number; x1: number; y1: number };
}

export function SvgCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const nodes = useProject((s) => s.project.nodes);
  const edges = useProject((s) => s.project.edges);
  const decorations = useProject((s) => s.project.decorations ?? []);
  const images = useProject((s) => s.project.images ?? []);
  const addImage = useProject((s) => s.addImage);
  const moveImage = useProject((s) => s.moveImage);
  const resizeImage = useProject((s) => s.resizeImage);
  const groupSelection = useProject((s) => s.groupSelection);
  const setGroupSelection = useProject((s) => s.setGroupSelection);
  const moveGroup = useProject((s) => s.moveGroup);
  const addDecoration = useProject((s) => s.addDecoration);
  const updateDecoration = useProject((s) => s.updateDecoration);
  const moveDecoration = useProject((s) => s.moveDecoration);
  const view = useProject((s) => s.project.view);
  const selection = useProject((s) => s.selection);
  const moveNode = useProject((s) => s.moveNode);
  const resizeNode = useProject((s) => s.resizeNode);
  const setNodeAspect = useProject((s) => s.setNodeAspect);
  const addEdge = useProject((s) => s.addEdge);
  const select = useProject((s) => s.select);
  const addNode = useProject((s) => s.addNode);
  const promotePostit = useProject((s) => s.promotePostit);

  const { transform, fitTo, reset, zoomBy } = usePanZoom(svgRef);
  const [drag, setDrag] = useState<DragState>({ kind: 'none' });
  const [dropHover, setDropHover] = useState(false);

  const onPointerDownNode = useCallback((e: React.PointerEvent, id: string) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const sw = screenToWorld(transform, e.clientX - rect.left, e.clientY - rect.top);
    const st = useProject.getState();
    // 그룹 선택에 포함된 노드를 잡으면 → 그룹 이동
    if (st.groupSelection.includes(id)) {
      setDrag({ kind: 'group', startWorld: sw, cursorWorld: sw });
      (e.target as Element).setPointerCapture(e.pointerId);
      return;
    }
    const n = st.project.nodes.find((x) => x.id === id);
    if (!n) return;
    setDrag({ kind: 'node', nodeId: id, startWorld: sw, nodeStart: { x: n.x, y: n.y } });
    (e.target as Element).setPointerCapture(e.pointerId);
  }, [transform]);

  const onHandlePointerDown = useCallback((e: React.PointerEvent, fromId: string) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const sw = screenToWorld(transform, e.clientX - rect.left, e.clientY - rect.top);
    setDrag({ kind: 'edge', edgeFrom: fromId, cursorWorld: sw });
    (e.target as Element).setPointerCapture(e.pointerId);
  }, [transform]);

  const onResizePointerDown = useCallback((e: React.PointerEvent, id: string) => {
    setDrag({ kind: 'resize', nodeId: id });
    (e.target as Element).setPointerCapture(e.pointerId);
  }, []);

  // 데코: 이동 (전체 드래그)
  const onDecoPointerDown = useCallback((e: React.PointerEvent, id: string) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const sw = screenToWorld(transform, e.clientX - rect.left, e.clientY - rect.top);
    const st = useProject.getState();
    if (st.groupSelection.includes(id)) {
      setDrag({ kind: 'group', startWorld: sw, cursorWorld: sw });
      (e.target as Element).setPointerCapture(e.pointerId);
      return;
    }
    const d = st.project.decorations.find((x) => x.id === id);
    if (!d) return;
    setDrag({
      kind: 'deco-move',
      decId: id,
      startWorld: sw,
      decStart: { x: d.x, y: d.y, x2: d.x2, y2: d.y2, width: d.width, height: d.height },
    });
    (e.target as Element).setPointerCapture(e.pointerId);
  }, [transform]);

  // 데코: 화살표 끝점 드래그
  const onDecoArrowEndpoint = useCallback((e: React.PointerEvent, id: string, endpoint: 'start' | 'end') => {
    e.stopPropagation();
    setDrag({ kind: 'deco-arrow', decId: id, arrowEndpoint: endpoint });
    (e.target as Element).setPointerCapture(e.pointerId);
  }, []);

  // 데코: 리사이즈 (타원/텍스트 SE 핸들)
  const onDecoResize = useCallback((e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    setDrag({ kind: 'deco-resize', decId: id });
    (e.target as Element).setPointerCapture(e.pointerId);
  }, []);

  // 이미지: 이동 (전체 드래그)
  const onImagePointerDown = useCallback((e: React.PointerEvent, id: string) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const sw = screenToWorld(transform, e.clientX - rect.left, e.clientY - rect.top);
    const st = useProject.getState();
    if (st.groupSelection.includes(id)) {
      setDrag({ kind: 'group', startWorld: sw, cursorWorld: sw });
      (e.target as Element).setPointerCapture(e.pointerId);
      return;
    }
    const im = (st.project.images ?? []).find((x) => x.id === id);
    if (!im) return;
    setDrag({
      kind: 'img-move',
      imgId: id,
      startWorld: sw,
      imgStart: { x: im.x, y: im.y, width: im.width, height: im.height },
    });
    (e.target as Element).setPointerCapture(e.pointerId);
  }, [transform]);

  // 이미지: 리사이즈 (SE 핸들, 비율 유지)
  const onImageResize = useCallback((e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    if (!svgRef.current) return;
    const st = useProject.getState();
    const im = (st.project.images ?? []).find((x) => x.id === id);
    if (!im) return;
    setDrag({ kind: 'img-resize', imgId: id, imgStart: { x: im.x, y: im.y, width: im.width, height: im.height } });
    (e.target as Element).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (drag.kind === 'none' || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const sw = screenToWorld(transform, e.clientX - rect.left, e.clientY - rect.top);
    if (drag.kind === 'node' && drag.nodeId && drag.startWorld && drag.nodeStart) {
      const nx = drag.nodeStart.x + (sw.x - drag.startWorld.x);
      const ny = drag.nodeStart.y + (sw.y - drag.startWorld.y);
      moveNode(drag.nodeId, nx, ny);
    } else if (drag.kind === 'edge') {
      setDrag({ ...drag, cursorWorld: sw });
    } else if (drag.kind === 'resize' && drag.nodeId) {
      const n = useProject.getState().project.nodes.find((x) => x.id === drag.nodeId);
      if (!n) return;
      const base = NODE_STYLES[n.type];
      const dx = Math.abs(sw.x - n.x);
      const dy = Math.abs(sw.y - n.y);
      const SQRT2 = Math.SQRT2;
      const newRx = Math.max(20, (dx - 4) * SQRT2);
      const newRy = Math.max(15, (dy - 4) * SQRT2);
      const newSize = Math.sqrt((newRx * newRy) / (base.rx * base.ry));
      const newAspect = (newRx * base.ry) / (newRy * base.rx);
      resizeNode(drag.nodeId, newSize);
      setNodeAspect(drag.nodeId, newAspect);
    } else if (drag.kind === 'deco-move' && drag.decId && drag.startWorld && drag.decStart) {
      const nx = drag.decStart.x + (sw.x - drag.startWorld.x);
      const ny = drag.decStart.y + (sw.y - drag.startWorld.y);
      moveDecoration(drag.decId, nx, ny);
    } else if (drag.kind === 'deco-arrow' && drag.decId && drag.arrowEndpoint) {
      if (drag.arrowEndpoint === 'start') {
        updateDecoration(drag.decId, { x: sw.x, y: sw.y });
      } else {
        updateDecoration(drag.decId, { x2: sw.x, y2: sw.y });
      }
    } else if (drag.kind === 'deco-resize' && drag.decId) {
      const d = useProject.getState().project.decorations.find((x) => x.id === drag.decId);
      if (!d) return;
      const w = Math.max(40, (sw.x - d.x) * 2);
      const h = Math.max(20, (sw.y - d.y) * 2);
      updateDecoration(drag.decId, { width: w, height: h });
    } else if (drag.kind === 'img-move' && drag.imgId && drag.startWorld && drag.imgStart) {
      const nx = drag.imgStart.x + (sw.x - drag.startWorld.x);
      const ny = drag.imgStart.y + (sw.y - drag.startWorld.y);
      moveImage(drag.imgId, nx, ny);
    } else if (drag.kind === 'img-resize' && drag.imgId && drag.imgStart) {
      const ratio = drag.imgStart.width / drag.imgStart.height || 1;
      const newW = Math.max(MIN_IMAGE_DIM, (sw.x - drag.imgStart.x) * 2);
      const newH = Math.max(MIN_IMAGE_DIM / ratio, newW / ratio);
      resizeImage(drag.imgId, Math.round(newW), Math.round(newH));
    } else if (drag.kind === 'group' && drag.startWorld && drag.cursorWorld) {
      const dx = sw.x - drag.cursorWorld.x;
      const dy = sw.y - drag.cursorWorld.y;
      moveGroup(dx, dy);
      setDrag({ ...drag, cursorWorld: sw });
    } else if (drag.kind === 'box-select' && drag.startWorld) {
      setDrag({
        ...drag,
        boxRect: {
          x0: Math.min(drag.startWorld.x, sw.x),
          y0: Math.min(drag.startWorld.y, sw.y),
          x1: Math.max(drag.startWorld.x, sw.x),
          y1: Math.max(drag.startWorld.y, sw.y),
        },
      });
    }
  }, [drag, transform, moveNode, resizeNode, setNodeAspect, moveDecoration, updateDecoration, moveImage, resizeImage]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (drag.kind === 'edge' && drag.edgeFrom) {
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const g = target?.closest('[data-node]') as SVGGElement | null;
      const toId = g?.getAttribute('data-node');
      if (toId && toId !== drag.edgeFrom) {
        addEdge(drag.edgeFrom, toId, 'open');
      }
    } else if (drag.kind === 'box-select' && drag.boxRect) {
      // 박스 안에 들어가는 노드·데코 찾아 group selection 적용
      const { x0, y0, x1, y1 } = drag.boxRect;
      const st = useProject.getState();
      const ids: string[] = [];
      st.project.nodes.forEach((n) => {
        if (n.x >= x0 && n.x <= x1 && n.y >= y0 && n.y <= y1) ids.push(n.id);
      });
      (st.project.decorations ?? []).forEach((d) => {
        if (d.x >= x0 && d.x <= x1 && d.y >= y0 && d.y <= y1) ids.push(d.id);
      });
      (st.project.images ?? []).forEach((im) => {
        if (im.x >= x0 && im.x <= x1 && im.y >= y0 && im.y <= y1) ids.push(im.id);
      });
      if (ids.length > 0) setGroupSelection(ids);
      else setGroupSelection([]);
    }
    setDrag({ kind: 'none' });
  }, [drag, addEdge, setGroupSelection]);

  const onBgPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.target === svgRef.current || (e.target as SVGElement).hasAttribute('data-bg')) {
      // Shift drag → 박스 선택, 평범 클릭 → 선택 해제
      if (e.shiftKey && svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const sw = screenToWorld(transform, e.clientX - rect.left, e.clientY - rect.top);
        setDrag({ kind: 'box-select', startWorld: sw, boxRect: { x0: sw.x, y0: sw.y, x1: sw.x, y1: sw.y } });
      } else {
        select({ kind: 'none' });
        setGroupSelection([]);
      }
    }
  }, [select, transform, setGroupSelection]);

  const onDragOver = (e: React.DragEvent) => {
    const t = e.dataTransfer.types;
    if (t.includes('application/x-postit-id') || t.includes('Files')) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      setDropHover(true);
    }
  };
  const onDragLeave = () => setDropHover(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDropHover(false);
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const sw = screenToWorld(transform, e.clientX - rect.left, e.clientY - rect.top);

    // 1) 이미지 파일 드롭 — 각 파일을 커서 위치 기준으로 배치 (살짝 계단식 오프셋)
    const imageFiles = Array.from(e.dataTransfer.files ?? []).filter((f) => f.type.startsWith('image/'));
    if (imageFiles.length > 0) {
      imageFiles.forEach(async (file, i) => {
        try {
          const sized = await fileToSizedImage(file);
          if (sized) addImage(sw.x + i * 24, sw.y + i * 24, sized.src, sized.width, sized.height);
        } catch (err) {
          console.warn('이미지 드롭 실패', err);
        }
      });
      return;
    }

    // 2) 포스트잇 → 노드 승격
    const pid = e.dataTransfer.getData('application/x-postit-id');
    if (pid) promotePostit(pid, sw.x, sw.y);
  };

  // Ctrl+V — 클립보드 이미지를 뷰포트 중앙에 배치
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return; // 입력 중에는 무시
      const items = e.clipboardData?.items;
      if (!items || !svgRef.current) return;
      const fileItem = Array.from(items).find((it) => it.kind === 'file' && it.type.startsWith('image/'));
      if (!fileItem) return;
      const blob = fileItem.getAsFile();
      if (!blob) return;
      e.preventDefault();
      const rect = svgRef.current.getBoundingClientRect();
      const center = screenToWorld(transform, rect.width / 2, rect.height / 2);
      fileToSizedImage(blob)
        .then((sized) => { if (sized) addImage(center.x, center.y, sized.src, sized.width, sized.height); })
        .catch((err) => console.warn('이미지 붙여넣기 실패', err));
    };
    window.addEventListener('paste', onPaste);
    return () => window.removeEventListener('paste', onPaste);
  }, [transform, addImage]);

  // 데코 z-order (뒤→앞): 회색 타원 → 화살표 → 텍스트
  // SVG는 먼저 그린 것이 뒤 → 타원을 먼저, 텍스트를 마지막에
  const orderedDecorations = useMemo(() => {
    const text = decorations.filter((d) => d.kind === 'text');
    const arrow = decorations.filter((d) => d.kind === 'arrow');
    const ellipse = decorations.filter((d) => d.kind === 'ellipse');
    return [...ellipse, ...arrow, ...text];
  }, [decorations]);

  // 같은 노드쌍의 엣지를 평행 offset 적용
  const edgesWithOffset = useMemo(() => {
    const groups = new Map<string, string[]>();
    edges.forEach((e) => {
      const key = [e.from, e.to].sort().join('::');
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(e.id);
    });
    const SPACING = 14;
    return edges.map((e) => {
      const key = [e.from, e.to].sort().join('::');
      const ids = groups.get(key)!;
      if (ids.length < 2) return { edge: e, offset: 0 };
      const idx = ids.indexOf(e.id);
      // (idx - (n-1)/2) * SPACING — 중앙 기준 좌우 대칭
      const offset = (idx - (ids.length - 1) / 2) * SPACING;
      return { edge: e, offset };
    });
  }, [edges]);

  const fitToContent = useCallback(() => {
    if (nodes.length === 0) return reset();
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const n of nodes) {
      minX = Math.min(minX, n.x - 100);
      minY = Math.min(minY, n.y - 80);
      maxX = Math.max(maxX, n.x + 100);
      maxY = Math.max(maxY, n.y + 80);
    }
    fitTo({ x: minX, y: minY, w: maxX - minX, h: maxY - minY });
  }, [nodes, fitTo, reset]);

  const addNodeQuick = (type: NodeType) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const center = screenToWorld(transform, rect.width / 2, rect.height / 2);
    const offsetX = (Math.random() - 0.5) * 60;
    const offsetY = (Math.random() - 0.5) * 60;
    addNode({ x: center.x + offsetX, y: center.y + offsetY, type, name: defaultName(type) });
  };

  const addDecoQuick = (kind: DecorationKind) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const center = screenToWorld(transform, rect.width / 2, rect.height / 2);
    const offsetX = (Math.random() - 0.5) * 80;
    const offsetY = (Math.random() - 0.5) * 80;
    addDecoration(kind, center.x + offsetX, center.y + offsetY);
  };

  // 뷰포트 (월드 좌표계)
  const vbRect = svgRef.current?.getBoundingClientRect();
  const viewport = vbRect ? {
    x: (-transform.x) / transform.k,
    y: (-transform.y) / transform.k,
    w: vbRect.width / transform.k,
    h: vbRect.height / transform.k,
  } : { x: 0, y: 0, w: 0, h: 0 };

  return (
    <div
      className={`canvas-wrap blueprint-grid ${dropHover ? 'is-drop-hover' : ''}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <svg
        ref={svgRef}
        className="canvas-svg"
        onPointerDown={onBgPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* 내보내기용 정렬 규칙 — SVG 서브트리 안에 둔다.
            html-to-image는 <svg>를 만나면 네이티브 deep clone 후 자식 순회를 멈춰서
            foreignObject 안 HTML에 계산된 스타일을 인라인하지 못한다. 외부 스타일시트도 따라가지 않는다.
            여기 선언한 규칙만 클론과 함께 복제되어 내보낸 이미지에서도 라벨이 중앙에 남는다. */}
        <style>{EXPORT_LABEL_CSS}</style>

        <defs>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="rgba(44, 95, 124, 0.20)" />
          </pattern>
        </defs>
        <rect data-bg x="-100000" y="-100000" width="200000" height="200000" fill="transparent" />

        <g data-cv-world transform={`translate(${transform.x} ${transform.y}) scale(${transform.k})`}>
          {/* 참조 이미지 — 가장 뒤 레이어 (데코·노드 아래) */}
          {images.map((im) => (
            <CanvasImage
              key={im.id}
              image={im}
              selected={
                (selection.kind === 'image' && selection.id === im.id) ||
                groupSelection.includes(im.id)
              }
              onPointerDown={onImagePointerDown}
              onResizeDown={onImageResize}
            />
          ))}
          {/* 데코 요소 — 다이어그램(엣지·노드)보다 *뒤*에. 내부 순서: 텍스트 → 화살표 → 타원 */}
          {orderedDecorations.map((d) => (
            <Decoration
              key={d.id}
              dec={d}
              selected={
                (selection.kind === 'decoration' && selection.id === d.id) ||
                groupSelection.includes(d.id)
              }
              onPointerDown={onDecoPointerDown}
              onArrowEndpointDown={onDecoArrowEndpoint}
              onResizeDown={onDecoResize}
            />
          ))}
          {/* 엣지 (노드 아래). 같은 노드쌍 중복 엣지는 평행 offset */}
          {edgesWithOffset.map(({ edge: e, offset }) => {
            const from = nodes.find((n) => n.id === e.from);
            const to = nodes.find((n) => n.id === e.to);
            if (!from || !to) return null;
            return (
              <Edge
                key={e.id}
                edge={e}
                from={from}
                to={to}
                rough={view.edgeStyle === 'rough'}
                selected={selection.kind === 'edge' && selection.id === e.id}
                offset={offset}
                onSelect={(id) => select({ kind: 'edge', id })}
              />
            );
          })}
          {/* 드래그 중 임시 엣지 */}
          {drag.kind === 'edge' && drag.edgeFrom && drag.cursorWorld && (
            <TempEdge fromId={drag.edgeFrom} cursor={drag.cursorWorld} />
          )}
          {/* 노드 */}
          {nodes.map((n) => (
            <BubbleNode
              key={n.id}
              node={n}
              rough={view.edgeStyle === 'rough'}
              selected={
                (selection.kind === 'node' && selection.id === n.id) ||
                groupSelection.includes(n.id)
              }
              onPointerDownNode={onPointerDownNode}
              onHandlePointerDown={onHandlePointerDown}
              onResizePointerDown={onResizePointerDown}
            />
          ))}
          {/* 박스 선택 사각형 */}
          {drag.kind === 'box-select' && drag.boxRect && (
            <rect
              x={drag.boxRect.x0} y={drag.boxRect.y0}
              width={drag.boxRect.x1 - drag.boxRect.x0}
              height={drag.boxRect.y1 - drag.boxRect.y0}
              fill="rgba(207, 85, 71, 0.10)"
              stroke="var(--brick)"
              strokeWidth="1.4"
              strokeDasharray="6 4"
              pointerEvents="none"
            />
          )}
        </g>
      </svg>

      {/* 빈 상태 */}
      {nodes.length === 0 && images.length === 0 && decorations.length === 0 && (
        <div className="canvas-empty">
          <div className="canvas-empty-card">
            <h2 className="hand">캔버스가 비어 있습니다</h2>
            <p>왼쪽 포스트잇을 끌어 와서 노드로 만들거나,<br/>아래에서 노드 타입을 선택해 추가하세요.</p>
            <div className="canvas-empty-actions">
              <button onClick={() => addNodeQuick('room')}>+ 방</button>
              <button onClick={() => addNodeQuick('vista')}>+ 전망</button>
              <button onClick={() => addNodeQuick('boss')}>+ 보스</button>
            </div>
          </div>
        </div>
      )}

      {/* 캔버스 툴바 */}
      <div className="canvas-toolbar">
        <div className="ct-group" role="group" aria-label="노드 추가">
          <button onClick={() => addNodeQuick('room')}     title="방 추가">방</button>
          <button onClick={() => addNodeQuick('vista')}    title="전망">전망</button>
          <button onClick={() => addNodeQuick('treasure')} title="보물">보물</button>
          <button onClick={() => addNodeQuick('boss')}     title="보스">보스</button>
          <button onClick={() => addNodeQuick('hub')}      title="허브">허브</button>
          <button onClick={() => addNodeQuick('save')}     title="세이브">세이브</button>
        </div>
        <span className="ct-sep" />
        <div className="ct-group" role="group" aria-label="데코 추가">
          <button onClick={() => addDecoQuick('arrow')} title="화살표">↗ 화살표</button>
          <button onClick={() => addDecoQuick('ellipse')} title="회색 타원">○ 타원</button>
          <button onClick={() => addDecoQuick('text')} title="텍스트">A 텍스트</button>
        </div>
        <span className="ct-sep" />
        <button onClick={fitToContent} title="화면 맞춤">⇲ 맞춤</button>
        <button onClick={() => zoomBy(1.25)} title="확대">＋</button>
        <button onClick={() => zoomBy(0.8)} title="축소">−</button>
        <span className="ct-zoom caption">{Math.round(transform.k * 100)}%</span>
      </div>

      {view.showMinimap && nodes.length > 0 && (
        <div className="canvas-minimap">
          <Minimap nodes={nodes} edges={edges} viewBox={viewport} />
        </div>
      )}

      {dropHover && (
        <div className="canvas-drop-banner hand">여기에 놓기 — 포스트잇은 노드로, 이미지는 캔버스에 배치</div>
      )}
    </div>
  );
}

function TempEdge({ fromId, cursor }: { fromId: string; cursor: { x: number; y: number } }) {
  const from = useProject((s) => s.project.nodes.find((n) => n.id === fromId));
  if (!from) return null;
  return (
    <line
      x1={from.x} y1={from.y}
      x2={cursor.x} y2={cursor.y}
      stroke="var(--brick)"
      strokeWidth="1.6"
      strokeDasharray="4 3"
      opacity="0.8"
      pointerEvents="none"
    />
  );
}

function defaultName(type: NodeType): string {
  return ({
    room: '새 방', vista: '전망 지점', treasure: '보물 챔버',
    boss: '보스 챔버', hub: '허브 광장', save: '세이브 포인트',
  } as Record<NodeType, string>)[type];
}
