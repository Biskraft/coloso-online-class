import { useRef, useState, useCallback, useMemo } from 'react';
import { useProject } from '../../store/project';
import { BubbleNode } from './BubbleNode';
import { Edge } from './Edge';
import { Minimap } from './Minimap';
import { NODE_STYLES } from './node-shapes';
import { usePanZoom, screenToWorld } from './usePanZoom';
import type { NodeType } from '../../types';
import './SvgCanvas.css';

interface DragState {
  kind: 'node' | 'edge' | 'resize' | 'none';
  nodeId?: string;
  edgeFrom?: string;
  startWorld?: { x: number; y: number };
  nodeStart?: { x: number; y: number };
  cursorWorld?: { x: number; y: number };
}

export function SvgCanvas() {
  const svgRef = useRef<SVGSVGElement>(null);
  const nodes = useProject((s) => s.project.nodes);
  const edges = useProject((s) => s.project.edges);
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
    const n = useProject.getState().project.nodes.find((x) => x.id === id);
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
      // SE 핸들이 커서를 따라감 → 노드의 가로/세로를 독립적으로 자유 변형
      const n = useProject.getState().project.nodes.find((x) => x.id === drag.nodeId);
      if (!n) return;
      const base = NODE_STYLES[n.type];
      // SE 핸들 = (rx*cos45 + 4, ry*sin45 + 4)에서 cursor (world) 가져옴
      // local offset = cursor - node center
      const dx = Math.abs(sw.x - n.x);
      const dy = Math.abs(sw.y - n.y);
      // 핸들 위치 = corner. rx = (dx - 4) / cos45
      const SQRT2 = Math.SQRT2;
      const newRx = Math.max(20, (dx - 4) * SQRT2);
      const newRy = Math.max(15, (dy - 4) * SQRT2);
      // size + aspect로 분해
      const newSize = Math.sqrt((newRx * newRy) / (base.rx * base.ry));
      const newAspect = (newRx * base.ry) / (newRy * base.rx);
      resizeNode(drag.nodeId, newSize);
      setNodeAspect(drag.nodeId, newAspect);
    }
  }, [drag, transform, moveNode, resizeNode, setNodeAspect]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (drag.kind === 'edge' && drag.edgeFrom) {
      // 떨어진 대상이 노드인지 검사
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const g = target?.closest('[data-node]') as SVGGElement | null;
      const toId = g?.getAttribute('data-node');
      if (toId && toId !== drag.edgeFrom) {
        addEdge(drag.edgeFrom, toId, 'open');
      }
    }
    setDrag({ kind: 'none' });
  }, [drag, addEdge]);

  const onBgPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.target === svgRef.current || (e.target as SVGElement).hasAttribute('data-bg')) {
      select({ kind: 'none' });
    }
  }, [select]);

  const onDragOver = (e: React.DragEvent) => {
    if (e.dataTransfer.types.includes('application/x-postit-id')) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
      setDropHover(true);
    }
  };
  const onDragLeave = () => setDropHover(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDropHover(false);
    const pid = e.dataTransfer.getData('application/x-postit-id');
    if (!pid || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const sw = screenToWorld(transform, e.clientX - rect.left, e.clientY - rect.top);
    promotePostit(pid, sw.x, sw.y);
  };

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
    // 약간의 무작위 오프셋
    const offsetX = (Math.random() - 0.5) * 60;
    const offsetY = (Math.random() - 0.5) * 60;
    addNode({ x: center.x + offsetX, y: center.y + offsetY, type, name: defaultName(type) });
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
        <defs>
          <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.6" fill="rgba(44, 95, 124, 0.20)" />
          </pattern>
        </defs>
        <rect data-bg x="-100000" y="-100000" width="200000" height="200000" fill="transparent" />

        <g transform={`translate(${transform.x} ${transform.y}) scale(${transform.k})`}>
          {/* 엣지 (먼저, 노드 아래). 같은 노드쌍 중복 엣지는 평행 offset */}
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
              selected={selection.kind === 'node' && selection.id === n.id}
              onPointerDownNode={onPointerDownNode}
              onHandlePointerDown={onHandlePointerDown}
              onResizePointerDown={onResizePointerDown}
            />
          ))}
        </g>
      </svg>

      {/* 빈 상태 */}
      {nodes.length === 0 && (
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
        <button onClick={fitToContent} title="화면 맞춤">⇲ 맞춤</button>
        <button onClick={() => zoomBy(1.25)} title="확대">＋</button>
        <button onClick={() => zoomBy(0.8)} title="축소">−</button>
        <span className="ct-zoom caption">{Math.round(transform.k * 100)}%</span>
      </div>

      {view.showMinimap && nodes.length > 0 && (
        <div className="canvas-minimap">
          <Minimap nodes={nodes} viewBox={viewport} />
        </div>
      )}

      {dropHover && (
        <div className="canvas-drop-banner hand">여기에 놓아 노드로 승격</div>
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
