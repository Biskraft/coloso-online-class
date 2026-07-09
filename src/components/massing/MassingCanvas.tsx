import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { select } from 'd3-selection';
import { zoom, zoomIdentity, type ZoomTransform } from 'd3-zoom';
import type { MassingDoc, MassingBlock } from '../../types';
import { useMassing } from '../../store/massing';
import { uid } from '../../utils/id';
import { gridFade } from '../topdown/topdown-utils';
import {
  TILE, groundAt, hitBlock, renderMassing, sceneBounds, screenBBox,
  rotBlockN, rotVecN, invDir,
} from './massing-utils';
import '../topdown/TopdownCanvas.css';

/* ─────────────────────────────────────────────────────────
   매싱 캔버스 — 고정 등각 카메라(4방향 회전), 바닥 드래그로 블록 생성
   렌더·입력은 뷰 좌표, 저장은 원좌표 (dir 역회전으로 변환)
   ───────────────────────────────────────────────────────── */

export type MsTool = 'select' | 'box' | 'column' | 'wall' | 'base' | 'overhead' | 'stone' | 'tone';

const FIT_MARGIN = 48;

interface Props {
  doc: MassingDoc;
  tool: MsTool;
  heightM: number;          // 새 블록 높이 / 머리위판 띄움 높이 (m)
  baseMode: 'elevate' | 'inset';   // 바닥판 — 올림/파임
  stoneZ: number;           // 점(부유석) 띄움 높이 (m)
  toneSel: number;          // 명도 도구 선택값 0~3
  onStatus?: (text: string) => void;
}

export function MassingCanvas({ doc, tool, heightM, baseMode, stoneZ, toneSel, onStatus }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tRef = useRef<ZoomTransform>(zoomIdentity);
  const rafRef = useRef(0);
  const spaceRef = useRef(false);

  const dragStartRef = useRef<[number, number] | null>(null);   // 뷰 그리드 좌표
  const dragCurRef = useRef<[number, number] | null>(null);
  const [selIds, setSelIds] = useState<string[]>([]);
  const moveStartRef = useRef<[number, number] | null>(null);
  const moveDeltaRef = useRef<[number, number]>([0, 0]);        // 뷰 좌표 delta
  const marqueeRef = useRef<{ a: [number, number]; b: [number, number] } | null>(null);  // 월드 px

  const addBlock = useMassing((s) => s.addBlock);
  const addBlocks = useMassing((s) => s.addBlocks);
  const updateBlock = useMassing((s) => s.updateBlock);
  const removeBlocks = useMassing((s) => s.removeBlocks);
  const translateBlocks = useMassing((s) => s.translateBlocks);
  // 복제 클립보드 — 원좌표 사본, 매싱 탭 간 붙여넣기 허용
  const clipRef = useRef<{ blocks: MassingBlock[]; pastes: number } | null>(null);
  const N = doc.grid[0];
  const dir = doc.view?.dir ?? 0;

  /* 뷰 좌표 블록 — 회전 적용 (id 유지) */
  const viewBlocks = useMemo(
    () => doc.blocks.map((b) => rotBlockN(b, dir, N)),
    [doc.blocks, dir, N],
  );

  /* ── 좌표 ── */
  const worldPxAt = (e: { clientX: number; clientY: number }): [number, number] | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const r = canvas.getBoundingClientRect();
    const t = tRef.current;
    return [t.invertX(e.clientX - r.left), t.invertY(e.clientY - r.top)];
  };
  const gridAt = (e: { clientX: number; clientY: number }): [number, number] | null => {
    const p = worldPxAt(e);
    return p ? groundAt(p[0], p[1]) : null;
  };
  const clampCell = (v: number) => Math.max(0, Math.min(N, Math.round(v)));

  /* ── 진행 중 블록 (뷰 좌표, 미리보기·커밋 공용) ── */
  const pendingBlock = (): MassingBlock | null => {
    const a = dragStartRef.current, b = dragCurRef.current;
    if (!a || !b) return null;
    const x0 = Math.min(a[0], b[0]), x1 = Math.max(a[0], b[0]);
    const y0 = Math.min(a[1], b[1]), y1 = Math.max(a[1], b[1]);
    if (tool === 'box') {
      return { id: '_pv', kind: 'mass', x: x0, y: y0, z: 0, w: Math.max(1, x1 - x0), d: Math.max(1, y1 - y0), h: heightM, tone: 1 };
    }
    if (tool === 'wall') {
      const horizontal = x1 - x0 >= y1 - y0;
      if (horizontal) {
        return { id: '_pv', kind: 'wall', x: x0, y: a[1] - 0.125, z: 0, w: Math.max(1, x1 - x0), d: 0.25, h: heightM, tone: 1 };
      }
      return { id: '_pv', kind: 'wall', x: a[0] - 0.125, y: y0, z: 0, w: 0.25, d: Math.max(1, y1 - y0), h: heightM, tone: 1 };
    }
    if (tool === 'base') {
      // 올림: 바닥 위 0.5m 단 / 파임: 바닥 아래로 0.5m
      const z = baseMode === 'elevate' ? 0 : -0.5;
      return { id: '_pv', kind: 'base', x: x0, y: y0, z, w: Math.max(1, x1 - x0), d: Math.max(1, y1 - y0), h: 0.5, tone: baseMode === 'elevate' ? 1 : 2 };
    }
    if (tool === 'overhead') {
      // 머리위판 — heightM 높이에 뜬 얇은 판
      return { id: '_pv', kind: 'overhead', x: x0, y: y0, z: heightM, w: Math.max(1, x1 - x0), d: Math.max(1, y1 - y0), h: 0.25, tone: 1 };
    }
    return null;
  };

  /* 뷰 블록 → 원좌표로 커밋 */
  const commitViewBlock = (vb: MassingBlock) => {
    const real = rotBlockN(vb, invDir(dir), N);
    addBlock(doc.id, { ...real, id: uid('blk') });
  };

  /* ── 메인 드로우 ── */
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = window.devicePixelRatio || 1;
    const w = wrap.clientWidth, h = wrap.clientHeight;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }
    const ctx = canvas.getContext('2d')!;
    const t = tRef.current;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#ECE5D6';
    ctx.fillRect(0, 0, w, h);
    ctx.setTransform(dpr * t.k, 0, 0, dpr * t.k, dpr * t.x, dpr * t.y);

    // 이동 미리보기 — 선택 블록을 뷰 delta만큼 임시 이동
    const [mdx, mdy] = moveDeltaRef.current;
    const selSet = new Set(selIds);
    const blocks = (mdx || mdy) && selIds.length
      ? viewBlocks.map((b) => (selSet.has(b.id) ? { ...b, x: b.x + mdx, y: b.y + mdy } : b))
      : viewBlocks;

    renderMassing(ctx, { ...doc, blocks }, {
      zoomK: t.k,
      gridAlpha: gridFade(t.k * TILE, 3, 6),
      selIds,
      previewBlock: pendingBlock(),
    });

    // 마퀴
    if (marqueeRef.current) {
      const { a, b } = marqueeRef.current;
      ctx.fillStyle = 'rgba(44,95,124,0.08)';
      ctx.strokeStyle = 'rgba(44,95,124,0.8)';
      ctx.lineWidth = 1.2 / t.k;
      ctx.setLineDash([5 / t.k, 4 / t.k]);
      const x = Math.min(a[0], b[0]), y = Math.min(a[1], b[1]);
      const rw = Math.abs(b[0] - a[0]), rh = Math.abs(b[1] - a[1]);
      ctx.fillRect(x, y, rw, rh);
      ctx.strokeRect(x, y, rw, rh);
      ctx.setLineDash([]);
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc, viewBlocks, selIds, tool, heightM, baseMode, stoneZ, toneSel]);

  const drawRef = useRef(draw);
  drawRef.current = draw;
  const scheduleDraw = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      drawRef.current();
    });
  }, []);
  useEffect(() => { scheduleDraw(); }, [draw, scheduleDraw]);

  /* ── 문서 전환 초기화 ── */
  useEffect(() => {
    setSelIds([]);
    dragStartRef.current = null;
    dragCurRef.current = null;
    marqueeRef.current = null;
  }, [doc.id]);

  /* ── d3-zoom ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const w = wrap.clientWidth, h = wrap.clientHeight;
    const bb = sceneBounds(doc);
    const W = bb.maxX - bb.minX, H = bb.maxY - bb.minY;
    const fitK = Math.max(0.02, Math.min(8, Math.min(
      (w - FIT_MARGIN * 2) / W,
      (h - FIT_MARGIN * 2) / H,
    )));
    const zm = zoom<HTMLCanvasElement, unknown>()
      .scaleExtent([fitK * 0.5, 8])
      .translateExtent([
        [bb.minX - W * 0.25, bb.minY - H * 0.25],
        [bb.maxX + W * 0.25, bb.maxY + H * 0.25],
      ])
      .filter((e: any) => {
        if (e.type === 'wheel') return true;
        if (e.type === 'dblclick') return false;
        return spaceRef.current || e.button === 1;
      })
      .on('zoom', (e) => {
        tRef.current = e.transform;
        scheduleDraw();
      });
    const sel = select(canvas);
    sel.call(zm as any);
    sel.call(zm.transform as any, zoomIdentity
      .translate((w - (bb.minX + bb.maxX) * fitK) / 2, (h - (bb.minY + bb.maxY) * fitK) / 2)
      .scale(fitK));
    return () => { sel.on('.zoom', null); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc.id, N]);

  /* ── 키보드: 스페이스 패닝 / Delete / Esc 선택 해제 ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.code === 'Space') {
        if (e.type === 'keydown') { spaceRef.current = true; e.preventDefault(); }
        else spaceRef.current = false;
        if (wrapRef.current) wrapRef.current.dataset.panning = String(spaceRef.current);
        return;
      }
      if (e.type !== 'keydown') return;
      // 복사/붙여넣기 — 선택 블록을 +2셀 오프셋으로 복제 (연속 붙여넣기 누적)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c') {
        if (selIds.length === 0) return;
        const sel = new Set(selIds);
        clipRef.current = {
          blocks: doc.blocks.filter((b) => sel.has(b.id)).map((b) => ({ ...b })),
          pastes: 0,
        };
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
        const clip = clipRef.current;
        if (!clip || clip.blocks.length === 0) return;
        clip.pastes += 1;
        const off = clip.pastes * 2;
        const newIds: string[] = [];
        const pasted = clip.blocks.map((b) => {
          const id = uid('blk');
          newIds.push(id);
          return { ...b, id, x: b.x + off, y: b.y + off };
        });
        addBlocks(doc.id, pasted);
        setSelIds(newIds);
        return;
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selIds.length) {
        removeBlocks(doc.id, selIds);
        setSelIds([]);
      }
      if (e.key === 'Escape' && selIds.length) {
        e.stopPropagation();
        setSelIds([]);
        scheduleDraw();
      }
    };
    window.addEventListener('keydown', onKey, true);
    window.addEventListener('keyup', onKey);
    const ro = new ResizeObserver(() => scheduleDraw());
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      window.removeEventListener('keyup', onKey);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selIds, doc.id, doc.blocks, scheduleDraw]);

  /* ── 포인터 ── */

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || spaceRef.current) return;
    const g = gridAt(e);
    const px = worldPxAt(e);
    if (!g || !px) return;

    if (tool === 'tone') {
      const hit = hitBlock(px[0], px[1], viewBlocks);
      if (hit) updateBlock(doc.id, hit, { tone: toneSel });
      return;
    }
    // 직접 조작 — 어느 도구에서나 기존 블록은 드래그로 이동, 빈 곳만 생성
    {
      const hit = hitBlock(px[0], px[1], viewBlocks);
      if (hit) {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        if (!selIds.includes(hit)) setSelIds([hit]);
        moveStartRef.current = g;
        moveDeltaRef.current = [0, 0];
        scheduleDraw();
        return;
      }
    }
    // 빈 곳 클릭 — 기존 선택 해제 (그리기 도구에서도). 블록 적중은 위에서 early-return 하므로 여기 도달 = 빈 곳.
    if (tool !== 'select' && selIds.length > 0) {
      setSelIds([]);
      scheduleDraw();
    }
    if (tool === 'select') {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      setSelIds([]);
      marqueeRef.current = { a: px, b: px };
      scheduleDraw();
      return;
    }
    if (tool === 'column' || tool === 'stone') {
      const vx = Math.max(0, Math.min(N - 1, Math.floor(g[0])));
      const vy = Math.max(0, Math.min(N - 1, Math.floor(g[1])));
      const vb: MassingBlock = tool === 'column'
        ? { id: '_pv', kind: 'column', x: vx, y: vy, z: 0, w: 1, d: 1, h: heightM, tone: 1 }
        : { id: '_pv', kind: 'stone', x: vx, y: vy, z: stoneZ, w: 1, d: 1, h: 1, tone: 1 };
      commitViewBlock(vb);
      return;
    }
    // box / wall / base / overhead — 드래그 시작
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    const p: [number, number] = [clampCell(g[0]), clampCell(g[1])];
    dragStartRef.current = p;
    dragCurRef.current = p;
    scheduleDraw();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const g = gridAt(e);
    const px = worldPxAt(e);
    if (!g || !px) return;

    if (onStatus) {
      onStatus(
        `(${g[0].toFixed(1)}, ${g[1].toFixed(1)}) · ${N}m × ${N}m · 블록 ${doc.blocks.length} · 뷰 ${dir + 1}/4` +
        (tool === 'stone' ? ` · 띄움 ${stoneZ}m` : tool === 'tone' ? ` · 명도 ${toneSel}` : tool !== 'select' ? ` · 높이 ${heightM}m` : '') +
        (selIds.length > 1 ? ` · 선택 ${selIds.length}개` : '') +
        (doc.blocks.length === 0 ? ' · 박스(B)를 드래그해 첫 덩어리를 놓아보세요' : ''),
      );
    }

    if (tool === 'select' && marqueeRef.current) {
      marqueeRef.current.b = px;
    } else if (moveStartRef.current && selIds.length) {
      const [sx, sy] = moveStartRef.current;
      moveDeltaRef.current = [Math.round(g[0] - sx), Math.round(g[1] - sy)];
    } else if (dragStartRef.current) {
      dragCurRef.current = [clampCell(g[0]), clampCell(g[1])];
    }
    scheduleDraw();
  };

  const onPointerUp = () => {
    if (tool === 'select' && marqueeRef.current) {
      const { a, b } = marqueeRef.current;
      marqueeRef.current = null;
      const x0 = Math.min(a[0], b[0]), x1 = Math.max(a[0], b[0]);
      const y0 = Math.min(a[1], b[1]), y1 = Math.max(a[1], b[1]);
      if (x1 - x0 > 4 || y1 - y0 > 4) {
        const ids = viewBlocks
          .filter((vb) => {
            const bb = screenBBox(vb);
            return bb.x1 >= x0 && bb.x0 <= x1 && bb.y1 >= y0 && bb.y0 <= y1;
          })
          .map((vb) => vb.id);
        setSelIds(ids);
      }
      scheduleDraw();
      return;
    }
    if (moveStartRef.current && selIds.length) {
      const [vdx, vdy] = moveDeltaRef.current;
      moveStartRef.current = null;
      moveDeltaRef.current = [0, 0];
      if (vdx !== 0 || vdy !== 0) {
        const [dx, dy] = rotVecN(vdx, vdy, invDir(dir));
        translateBlocks(doc.id, selIds, dx, dy);
      }
      scheduleDraw();
      return;
    }
    if (dragStartRef.current) {
      const vb = pendingBlock();
      dragStartRef.current = null;
      dragCurRef.current = null;
      if (vb) commitViewBlock(vb);
      scheduleDraw();
    }
  };

  return (
    <div ref={wrapRef} className="td-canvas-wrap" data-tool={tool}>
      <canvas
        ref={canvasRef}
        className="td-canvas"
        data-testid="massing-canvas"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}
