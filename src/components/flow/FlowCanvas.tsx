import { useEffect, useRef, useState, useCallback } from 'react';
import { select } from 'd3-selection';
import { zoom, zoomIdentity, type ZoomTransform } from 'd3-zoom';
import type { FlowDoc, FlowBox, FlowDisc } from '../../types';
import { useFlow } from '../../store/flow';
import { uid } from '../../utils/id';
import { gridFade } from '../topdown/topdown-utils';
import {
  M, streamline, seedLine, pressureAt, hitFlowBox, hitFlowDisc,
  toWorld, type Pt,
} from './flow-utils';
import '../topdown/TopdownCanvas.css';

/* ─────────────────────────────────────────────────────────
   흐름 캔버스 — 직접 조작: 어느 도구에서나 기존 질량은
   드래그로 이동, 선택된 질량은 핸들로 크기·회전·반경 조절.
   빈 곳 드래그만 현재 도구의 생성 동작.
   ───────────────────────────────────────────────────────── */

export type FlTool = 'select' | 'box' | 'pillar' | 'hill';

/** 시각화 옵션 — 셸의 토글·슬라이더가 내려준다 (문서 데이터 아님, undo 미포함) */
export interface FlowView {
  normals: boolean;     // ① 법선 화살표
  pressure: boolean;    // ② 압력 그라디언트
  lineGap: number;      // 유선 간격 (m)
  lineAlpha: number;    // 유선 진하기 (0~1)
}

const FIT_MARGIN = 48;
const KNOB_PX = 24;       // 회전 손잡이 — 윗변에서 띄우는 화면 px
const HANDLE_PX = 8;      // 핸들 한 변 화면 px
const TOL_PX = 10;        // 핸들 픽킹 허용 화면 px
const ROT_SNAP = Math.PI / 12;   // 회전 스냅 15°

interface Props {
  doc: FlowDoc;
  tool: FlTool;
  view: FlowView;
  onStatus?: (text: string) => void;
}

type DragKind = { kind: 'box' | 'disc'; id: string } | { kind: 'start' } | null;

type HandleDrag =
  | { type: 'resize'; id: string; gx: 1 | -1; gy: 1 | -1; fx: number; fy: number; rot: number }
  | { type: 'rotate'; id: string; cx: number; cy: number }
  | { type: 'radius'; id: string; cx: number; cy: number; kind: 'pillar' | 'hill' };

const rotVec = (rot: number, x: number, y: number): [number, number] =>
  [x * Math.cos(rot) - y * Math.sin(rot), x * Math.sin(rot) + y * Math.cos(rot)];

export function FlowCanvas({ doc, tool, view, onStatus }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tRef = useRef<ZoomTransform>(zoomIdentity);
  const rafRef = useRef(0);
  const spaceRef = useRef(false);

  const dragStartRef = useRef<[number, number] | null>(null);   // 생성 드래그 (m)
  const dragCurRef = useRef<[number, number] | null>(null);
  const [selId, setSelId] = useState<string | null>(null);
  const moveRef = useRef<{ what: DragKind; sx: number; sy: number; dx: number; dy: number } | null>(null);
  const handleRef = useRef<HandleDrag | null>(null);
  const previewRef = useRef<(Partial<FlowBox> & Partial<FlowDisc>) | null>(null);

  const addBox = useFlow((s) => s.addBox);
  const addDisc = useFlow((s) => s.addDisc);
  const removeObjs = useFlow((s) => s.removeObjs);
  const translateObjs = useFlow((s) => s.translateObjs);
  const patchObj = useFlow((s) => s.patchObj);
  const updateDoc = useFlow((s) => s.updateDoc);
  const N = doc.grid;

  /* ── 좌표 (m) ── */
  const meterAt = (e: { clientX: number; clientY: number }): [number, number] | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const r = canvas.getBoundingClientRect();
    const t = tRef.current;
    return [t.invertX(e.clientX - r.left) / M, t.invertY(e.clientY - r.top) / M];
  };
  const snap1 = (v: number) => Math.max(0, Math.min(N, Math.round(v)));

  /* ── 드래그 미리보기 적용 상태 ── */
  const effective = (): { boxes: FlowBox[]; discs: FlowDisc[]; start: Pt } => {
    const mv = moveRef.current;
    let boxes = doc.boxes;
    let discs = doc.discs;
    let start = doc.start;
    if (mv && (mv.dx || mv.dy)) {
      if (mv.what?.kind === 'box') {
        const id = mv.what.id;
        boxes = boxes.map((b) => (b.id === id ? { ...b, x: b.x + mv.dx, y: b.y + mv.dy } : b));
      } else if (mv.what?.kind === 'disc') {
        const id = mv.what.id;
        discs = discs.map((c) => (c.id === id ? { ...c, x: c.x + mv.dx, y: c.y + mv.dy } : c));
      } else if (mv.what?.kind === 'start') {
        start = { x: start.x + mv.dx, y: start.y + mv.dy };
      }
    }
    const hd = handleRef.current, pv = previewRef.current;
    if (hd && pv) {
      boxes = boxes.map((b) => (b.id === hd.id ? { ...b, ...pv } : b));
      discs = discs.map((c) => (c.id === hd.id ? { ...c, ...pv } : c));
    }
    return { boxes, discs, start };
  };

  /* ── 핸들 픽킹 — 선택된 질량의 모서리/회전 손잡이/반경 ── */
  const hitHandle = (p: [number, number]): HandleDrag | null => {
    if (!selId) return null;
    const k = tRef.current.k;
    const tol = TOL_PX / k / M;
    const b = doc.boxes.find((o) => o.id === selId);
    if (b) {
      const rot = b.rot ?? 0;
      const cx = b.x + b.w / 2, cy = b.y + b.h / 2;
      // 회전 손잡이 — 윗변 중앙 위
      const [kx, ky] = toWorld(b, 0, -b.h / 2 - KNOB_PX / k / M);
      if (Math.hypot(p[0] - kx, p[1] - ky) <= tol) {
        return { type: 'rotate', id: b.id, cx, cy };
      }
      // 모서리 4개 — 반대 모서리를 고정점으로
      for (const [gx, gy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]] as [1 | -1, 1 | -1][]) {
        const [hx, hy] = toWorld(b, gx * b.w / 2, gy * b.h / 2);
        if (Math.hypot(p[0] - hx, p[1] - hy) <= tol) {
          const [fx, fy] = toWorld(b, -gx * b.w / 2, -gy * b.h / 2);
          return { type: 'resize', id: b.id, gx, gy, fx, fy, rot };
        }
      }
      return null;
    }
    const c = doc.discs.find((o) => o.id === selId);
    if (c) {
      if (Math.hypot(p[0] - (c.x + c.r), p[1] - c.y) <= tol) {
        return { type: 'radius', id: c.id, cx: c.x, cy: c.y, kind: c.kind };
      }
    }
    return null;
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
    const W = N * M;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#ECE5D6';
    ctx.fillRect(0, 0, w, h);
    ctx.setTransform(dpr * t.k, 0, 0, dpr * t.k, dpr * t.x, dpr * t.y);

    // 작업 범위 + 옅은 그리드
    ctx.fillStyle = '#FAF6EE';
    ctx.fillRect(0, 0, W, W);
    const ga = gridFade(t.k * M, 3, 6);
    if (ga > 0) {
      ctx.globalAlpha = ga;
      ctx.strokeStyle = 'rgba(44,95,124,0.08)';
      ctx.lineWidth = 1 / t.k;
      ctx.beginPath();
      for (let i = 0; i <= N; i += 2) {
        ctx.moveTo(i * M, 0); ctx.lineTo(i * M, W);
        ctx.moveTo(0, i * M); ctx.lineTo(W, i * M);
      }
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    ctx.strokeStyle = 'rgba(44,95,124,0.25)';
    ctx.lineWidth = 1.4 / t.k;
    ctx.strokeRect(0, 0, W, W);

    const { boxes, discs, start } = effective();

    // ② 압력 그라디언트 — 질량 주변 파란 농도 (거리장, 2m 셀 샘플링)
    if (view.pressure && (boxes.length || discs.length)) {
      const step = 2;
      for (let gy = 0; gy < N; gy += step) {
        for (let gx = 0; gx < N; gx += step) {
          const p = pressureAt(gx + step / 2, gy + step / 2, boxes, discs);
          const a = Math.min(0.34, p * 0.16);
          if (a < 0.015) continue;
          ctx.fillStyle = `rgba(44,95,124,${a.toFixed(3)})`;
          ctx.fillRect(gx * M, gy * M, step * M, step * M);
        }
      }
    }

    // ③ 유선 — 화면 전체 높이를 채우는 다발 (기류는 +x 직선)
    const seeds = seedLine(start, N, view.lineGap);
    const la = view.lineAlpha;
    ctx.strokeStyle = `rgba(26,24,20,${la.toFixed(2)})`;
    ctx.lineWidth = 1.3 / t.k;
    ctx.lineJoin = 'round';
    for (const sd of seeds) {
      const pts = streamline(sd.x, sd.y, boxes, discs, N);
      if (pts.length < 2) continue;
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x! * M, y! * M) : ctx.moveTo(x! * M, y! * M)));
      ctx.stroke();
      // 끝점 화살촉 — 진행 방향
      const [ax, ay] = pts[pts.length - 2]!;
      const [bx, by] = pts[pts.length - 1]!;
      const ang = Math.atan2(by! - ay!, bx! - ax!);
      ctx.save();
      ctx.translate(bx! * M, by! * M);
      ctx.rotate(ang);
      ctx.fillStyle = `rgba(26,24,20,${Math.min(1, la + 0.02).toFixed(2)})`;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-4.5 / t.k, -2.2 / t.k);
      ctx.lineTo(-4.5 / t.k, 2.2 / t.k);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // 언덕 — 등고선 둔덕 (종이톤, 표면 없음)
    for (const c of discs) {
      if (c.kind !== 'hill') continue;
      for (let i = 3; i >= 1; i--) {
        const rr = (c.r * i) / 3;
        ctx.beginPath();
        ctx.arc(c.x * M, c.y * M, rr * M, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160,124,62,${(0.07 + 0.05 * (3 - i)).toFixed(2)})`;
        ctx.fill();
        ctx.strokeStyle = 'rgba(110,86,44,0.45)';
        ctx.lineWidth = 1 / t.k;
        ctx.stroke();
      }
    }

    // 박스(질량) — 잉크 솔리드 (중심 기준 회전)
    for (const b of boxes) {
      const rot = b.rot ?? 0;
      ctx.save();
      ctx.translate((b.x + b.w / 2) * M, (b.y + b.h / 2) * M);
      ctx.rotate(rot);
      ctx.fillStyle = '#2A2520';
      ctx.fillRect(-b.w / 2 * M, -b.h / 2 * M, b.w * M, b.h * M);
      ctx.strokeStyle = '#1A1814';
      ctx.lineWidth = 1.2 / t.k;
      ctx.strokeRect(-b.w / 2 * M, -b.h / 2 * M, b.w * M, b.h * M);
      ctx.restore();
    }

    // 기둥 — 잉크 솔리드 원
    for (const c of discs) {
      if (c.kind !== 'pillar') continue;
      ctx.beginPath();
      ctx.arc(c.x * M, c.y * M, c.r * M, 0, Math.PI * 2);
      ctx.fillStyle = '#2A2520';
      ctx.fill();
      ctx.strokeStyle = '#1A1814';
      ctx.lineWidth = 1.2 / t.k;
      ctx.stroke();
    }

    // ① 법선 화살표 — 표면에서 수직으로 뻗는 push (벽돌 빨강)
    if (view.normals) {
      const arrow = (px: number, py: number, nx: number, ny: number, len: number, alpha: number) => {
        const ex = px + nx * len, ey = py + ny * len;
        ctx.strokeStyle = `rgba(184,84,80,${alpha})`;
        ctx.fillStyle = `rgba(184,84,80,${alpha})`;
        ctx.lineWidth = 1.4 / t.k;
        ctx.beginPath();
        ctx.moveTo(px * M, py * M);
        ctx.lineTo(ex * M, ey * M);
        ctx.stroke();
        const ang = Math.atan2(ny, nx);
        ctx.save();
        ctx.translate(ex * M, ey * M);
        ctx.rotate(ang);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-5 / t.k, -2.6 / t.k);
        ctx.lineTo(-5 / t.k, 2.6 / t.k);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      };
      const SPACING = 4, LEN = 2.4;
      for (const b of boxes) {
        const rot = b.rot ?? 0;
        const hw = b.w / 2, hh = b.h / 2;
        const face = (lx: number, ly: number, nx: number, ny: number) => {
          const [px, py] = toWorld(b, lx, ly);
          const [wx, wy] = rotVec(rot, nx, ny);
          arrow(px, py, wx, wy, LEN, 0.85);
        };
        for (let lx = -hw + SPACING / 2; lx <= hw; lx += SPACING) {
          const cl = Math.min(lx, hw - 0.5);
          face(cl, -hh, 0, -1);
          face(cl, hh, 0, 1);
        }
        for (let ly = -hh + SPACING / 2; ly <= hh; ly += SPACING) {
          const cl = Math.min(ly, hh - 0.5);
          face(-hw, cl, -1, 0);
          face(hw, cl, 1, 0);
        }
      }
      for (const c of discs) {
        const n = c.kind === 'hill' ? 10 : 8;
        // 언덕 법선은 위·옆을 향하는 부분 각도 — 짧고 옅게 표시
        const len = c.kind === 'hill' ? LEN * 0.6 : LEN;
        const alpha = c.kind === 'hill' ? 0.55 : 0.85;
        for (let i = 0; i < n; i++) {
          const a = (i / n) * Math.PI * 2;
          const nx = Math.cos(a), ny = Math.sin(a);
          arrow(c.x + nx * c.r, c.y + ny * c.r, nx, ny, len, alpha);
        }
      }
    }

    // 선택 표시 + 조작 핸들 (크기 모서리 · 회전 손잡이 · 반경)
    if (selId) {
      const k = t.k;
      const hs = HANDLE_PX / k / M / 2;      // 핸들 반변 (m)
      const sq = (x: number, y: number) => {
        ctx.fillStyle = '#FAF6EE';
        ctx.strokeStyle = 'rgba(44,95,124,0.95)';
        ctx.lineWidth = 1.4 / k;
        ctx.fillRect((x - hs) * M, (y - hs) * M, hs * 2 * M, hs * 2 * M);
        ctx.strokeRect((x - hs) * M, (y - hs) * M, hs * 2 * M, hs * 2 * M);
      };
      const sb = boxes.find((o) => o.id === selId);
      const sc = discs.find((o) => o.id === selId);
      ctx.setLineDash([6 / k, 4 / k]);
      ctx.strokeStyle = 'rgba(44,95,124,0.95)';
      ctx.lineWidth = 1.8 / k;
      if (sb) {
        const rot = sb.rot ?? 0;
        ctx.save();
        ctx.translate((sb.x + sb.w / 2) * M, (sb.y + sb.h / 2) * M);
        ctx.rotate(rot);
        ctx.strokeRect(
          -sb.w / 2 * M - 2 / k, -sb.h / 2 * M - 2 / k,
          sb.w * M + 4 / k, sb.h * M + 4 / k,
        );
        ctx.restore();
        ctx.setLineDash([]);
        // 회전 손잡이 — 윗변 중앙에서 줄기 + 원
        const [tx, ty] = toWorld(sb, 0, -sb.h / 2);
        const [kx, ky] = toWorld(sb, 0, -sb.h / 2 - KNOB_PX / k / M);
        ctx.strokeStyle = 'rgba(44,95,124,0.7)';
        ctx.lineWidth = 1.2 / k;
        ctx.beginPath();
        ctx.moveTo(tx * M, ty * M);
        ctx.lineTo(kx * M, ky * M);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(kx * M, ky * M, HANDLE_PX / k / M * 0.7 * M, 0, Math.PI * 2);
        ctx.fillStyle = '#FAF6EE';
        ctx.fill();
        ctx.strokeStyle = 'rgba(44,95,124,0.95)';
        ctx.lineWidth = 1.4 / k;
        ctx.stroke();
        // 모서리 핸들 4개
        for (const [gx, gy] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) {
          const [hx, hy] = toWorld(sb, gx! * sb.w / 2, gy! * sb.h / 2);
          sq(hx, hy);
        }
        // 회전 중 각도 라벨
        if (handleRef.current?.type === 'rotate') {
          const deg = Math.round(((sb.rot ?? 0) * 180) / Math.PI);
          ctx.fillStyle = 'rgba(44,95,124,0.95)';
          ctx.font = `${12 / k}px "JetBrains Mono", monospace`;
          ctx.textAlign = 'center';
          ctx.fillText(`${deg}°`, kx * M, ky * M - 12 / k);
        }
      } else if (sc) {
        ctx.beginPath();
        ctx.arc(sc.x * M, sc.y * M, sc.r * M + 3 / k, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        sq(sc.x + sc.r, sc.y);   // 반경 핸들 — 오른쪽
      }
      ctx.setLineDash([]);
    }

    // 시작 ▶ (모스)
    const badge = (p: Pt, color: string, glyph: string) => {
      ctx.save();
      ctx.translate(p.x * M, p.y * M);
      ctx.beginPath();
      ctx.arc(0, 0, 1.1 * M, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = '#1A1814';
      ctx.lineWidth = 1.2 / t.k;
      ctx.stroke();
      ctx.fillStyle = '#FAF6EE';
      ctx.font = `${1.2 * M}px Pretendard, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(glyph, 0, 0.08 * M);
      ctx.restore();
    };
    badge(start, '#6B8E5A', '▶');

    // 생성 미리보기
    if (dragStartRef.current && dragCurRef.current) {
      const [x0, y0] = dragStartRef.current;
      const [x1, y1] = dragCurRef.current;
      ctx.fillStyle = 'rgba(26,24,20,0.18)';
      ctx.strokeStyle = 'rgba(26,24,20,0.9)';
      ctx.lineWidth = 1.6 / t.k;
      ctx.setLineDash([6 / t.k, 4 / t.k]);
      if (tool === 'box') {
        const rx = Math.min(x0, x1) * M, ry = Math.min(y0, y1) * M;
        const rw = Math.abs(x1 - x0) * M, rh = Math.abs(y1 - y0) * M;
        ctx.fillRect(rx, ry, rw, rh);
        ctx.strokeRect(rx, ry, rw, rh);
      } else if (tool === 'pillar' || tool === 'hill') {
        const r = Math.max(tool === 'pillar' ? 1 : 3, Math.round(Math.hypot(x1 - x0, y1 - y0)));
        ctx.beginPath();
        ctx.arc(x0 * M, y0 * M, r * M, 0, Math.PI * 2);
        if (tool === 'hill') ctx.fillStyle = 'rgba(160,124,62,0.18)';
        ctx.fill();
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc, selId, tool, view]);

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

  useEffect(() => {
    setSelId(null);
    dragStartRef.current = null;
    dragCurRef.current = null;
    moveRef.current = null;
    handleRef.current = null;
    previewRef.current = null;
  }, [doc.id]);

  /* ── d3-zoom ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const w = wrap.clientWidth, h = wrap.clientHeight;
    const W = N * M;
    const fitK = Math.max(0.05, Math.min(8, Math.min(
      (w - FIT_MARGIN * 2) / W,
      (h - FIT_MARGIN * 2) / W,
    )));
    const zm = zoom<HTMLCanvasElement, unknown>()
      .scaleExtent([fitK * 0.5, 8])
      .translateExtent([[-W * 0.25, -W * 0.25], [W * 1.25, W * 1.25]])
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
      .translate((w - W * fitK) / 2, (h - W * fitK) / 2)
      .scale(fitK));
    return () => { sel.on('.zoom', null); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc.id, N]);

  /* ── 키보드 ── */
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
      if ((e.key === 'Delete' || e.key === 'Backspace') && selId) {
        removeObjs(doc.id, [selId]);
        setSelId(null);
      }
      if (e.key === 'Escape' && selId) {
        e.stopPropagation();
        setSelId(null);
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
  }, [selId, doc.id, scheduleDraw]);

  /* ── 포인터 — 어느 도구에서나: 핸들 > 시작▶ > 질량 이동 > 빈 곳 생성 ── */

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 || spaceRef.current) return;
    const p = meterAt(e);
    if (!p) return;

    // 1. 선택된 질량의 핸들 (크기/회전/반경)
    const hd = hitHandle(p);
    if (hd) {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      handleRef.current = hd;
      previewRef.current = null;
      scheduleDraw();
      return;
    }

    // 2. 시작 ▶ 마커
    if (Math.hypot(p[0] - doc.start.x, p[1] - doc.start.y) <= 1.4) {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      moveRef.current = { what: { kind: 'start' }, sx: p[0], sy: p[1], dx: 0, dy: 0 };
      return;
    }

    // 3. 기존 질량 — 선택 + 이동 (도구 무관)
    const hitD = hitFlowDisc(p[0], p[1], doc.discs);
    const hit = hitD ?? hitFlowBox(p[0], p[1], doc.boxes);
    if (hit) {
      setSelId(hit);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      moveRef.current = { what: { kind: hitD ? 'disc' : 'box', id: hit }, sx: p[0], sy: p[1], dx: 0, dy: 0 };
      scheduleDraw();
      return;
    }

    // 4. 빈 곳 — 현재 도구의 생성 동작 / 선택 해제
    setSelId(null);
    if (tool === 'box' || tool === 'pillar' || tool === 'hill') {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      const q: [number, number] = [snap1(p[0]), snap1(p[1])];
      dragStartRef.current = q;
      dragCurRef.current = q;
    }
    scheduleDraw();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const p = meterAt(e);
    if (!p) return;

    if (onStatus) {
      const total = doc.boxes.length + doc.discs.length;
      onStatus(
        `(${p[0].toFixed(1)}, ${p[1].toFixed(1)}) · ${N}m × ${N}m · 질량 ${total}` +
        (total === 0 ? ' · 박스(B)를 흐름 위에 놓아보세요 — 흐름이 비켜 갑니다' : ''),
      );
    }

    const hd = handleRef.current;
    if (hd) {
      if (hd.type === 'resize') {
        // 고정점(반대 모서리) 기준 — 로컬 변위로 새 크기·중심 계산
        const c = Math.cos(hd.rot), s = Math.sin(hd.rot);
        const dx = p[0] - hd.fx, dy = p[1] - hd.fy;
        const lx = dx * c + dy * s, ly = -dx * s + dy * c;
        const w = Math.max(1, Math.round(Math.abs(lx)));
        const h = Math.max(1, Math.round(Math.abs(ly)));
        const [ox, oy] = rotVec(hd.rot, hd.gx * w / 2, hd.gy * h / 2);
        const cx = hd.fx + ox, cy = hd.fy + oy;
        previewRef.current = { x: cx - w / 2, y: cy - h / 2, w, h };
      } else if (hd.type === 'rotate') {
        const ang = Math.atan2(p[1] - hd.cy, p[0] - hd.cx) + Math.PI / 2;
        previewRef.current = { rot: Math.round(ang / ROT_SNAP) * ROT_SNAP };
      } else {
        const minR = hd.kind === 'pillar' ? 1 : 3;
        previewRef.current = { r: Math.max(minR, Math.round(Math.hypot(p[0] - hd.cx, p[1] - hd.cy))) };
      }
      scheduleDraw();
      return;
    }

    if (moveRef.current) {
      moveRef.current.dx = Math.round(p[0] - moveRef.current.sx);
      moveRef.current.dy = Math.round(p[1] - moveRef.current.sy);
    } else if (dragStartRef.current) {
      dragCurRef.current = [snap1(p[0]), snap1(p[1])];
    }
    scheduleDraw();
  };

  const onPointerUp = () => {
    const hd = handleRef.current;
    if (hd) {
      const pv = previewRef.current;
      handleRef.current = null;
      previewRef.current = null;
      if (pv) patchObj(doc.id, hd.id, pv);
      scheduleDraw();
      return;
    }
    const mv = moveRef.current;
    if (mv) {
      moveRef.current = null;
      if (mv.dx !== 0 || mv.dy !== 0) {
        if (mv.what?.kind === 'box' || mv.what?.kind === 'disc') {
          translateObjs(doc.id, [mv.what.id], mv.dx, mv.dy);
        } else if (mv.what?.kind === 'start') {
          updateDoc(doc.id, { start: { x: doc.start.x + mv.dx, y: doc.start.y + mv.dy } });
        }
      }
      scheduleDraw();
      return;
    }
    if (dragStartRef.current && dragCurRef.current) {
      const [x0, y0] = dragStartRef.current;
      const [x1, y1] = dragCurRef.current;
      dragStartRef.current = null;
      dragCurRef.current = null;
      if (tool === 'box') {
        const w = Math.abs(x1 - x0), h = Math.abs(y1 - y0);
        if (w >= 1 && h >= 1) {
          const id = uid('fb');
          addBox(doc.id, { id, x: Math.min(x0, x1), y: Math.min(y0, y1), w, h, rot: 0 });
          setSelId(id);
        }
      } else if (tool === 'pillar' || tool === 'hill') {
        const minR = tool === 'pillar' ? 1 : 3;
        const r = Math.max(minR, Math.round(Math.hypot(x1 - x0, y1 - y0)));
        const id = uid('fd');
        addDisc(doc.id, { id, kind: tool, x: x0, y: y0, r });
        setSelId(id);
      }
      scheduleDraw();
    }
  };

  return (
    <div ref={wrapRef} className="td-canvas-wrap" data-tool={tool}>
      <canvas
        ref={canvasRef}
        className="td-canvas"
        data-testid="flow-canvas"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}
