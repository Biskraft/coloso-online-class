import { useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { useProject } from '../../store/project';
import { downloadJSON } from '../../store/persistence';
import { buildMarkdown } from './md-export';
import { nodeRadii } from '../canvas/node-shapes';
import './ExportPanel.css';

export function ExportPanel() {
  const project = useProject((s) => s.project);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [pngTransparent, setPngTransparent] = useState(true);
  const [pngForceLight, setPngForceLight] = useState(true);
  const [pngSquareSize, setPngSquareSize] = useState<512 | 1024 | 2048 | 4096>(2048);

  /** PNG 캡처 중 한정 라이트 테마 강제 적용. 종료 후 원복. */
  const withForcedLight = async <T,>(fn: () => Promise<T>): Promise<T> => {
    if (!pngForceLight) return fn();
    const html = document.documentElement;
    const original = html.dataset.theme;
    if (original === 'light') return fn();
    html.dataset.theme = 'light';
    // CSS 변수 전파 보장 — 2 프레임 대기
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r as any)));
    try {
      return await fn();
    } finally {
      if (original === undefined) delete html.dataset.theme;
      else html.dataset.theme = original;
    }
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportPNG = async () => {
    setBusy(true); setNote(null);
    try {
      await withForcedLight(async () => {
        const wrap = document.querySelector('.canvas-wrap') as HTMLElement;
        if (!wrap) throw new Error('캔버스를 찾을 수 없음');
        const opts: Parameters<typeof htmlToImage.toPng>[1] = {
          pixelRatio: 2,
          filter: (n) => {
            if (n instanceof HTMLElement) {
              if (n.classList?.contains('canvas-minimap')) return false;
              if (n.classList?.contains('canvas-toolbar')) return false;
              if (n.classList?.contains('canvas-drop-banner')) return false;
              if (n.classList?.contains('canvas-empty')) return false;
            }
            return true;
          },
        };
        if (pngTransparent) {
          opts.backgroundColor = undefined;
          opts.style = {
            background: 'transparent',
            backgroundColor: 'transparent',
            backgroundImage: 'none',
          };
        } else {
          opts.backgroundColor = '#F4EFE6';
        }
        const dataUrl = await htmlToImage.toPng(wrap, opts);
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${project.name || 'level'}${pngTransparent ? '_transparent' : ''}.png`;
        a.click();
      });
      setNote(pngTransparent ? 'PNG 저장 완료 (투명 배경)' : 'PNG 저장 완료');
    } catch (e: any) {
      setNote(`PNG 실패: ${e.message ?? e}`);
    } finally { setBusy(false); }
  };

  /** 모든 노드 + 데코의 월드 좌표 바운딩 박스 */
  const computeWorldBBox = () => {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let hasContent = false;

    for (const n of project.nodes) {
      const { rx, ry } = nodeRadii(n.type, n.size ?? 1, n.aspect ?? 1);
      // 아이콘 태그 영역(아래) + 타입 라벨 여유
      const iconTagRows = n.icons.length > 0 ? Math.ceil(Math.min(n.icons.length, 8) / 4) : 0;
      const tagH = iconTagRows * 18 + (iconTagRows > 0 ? 10 : 0);
      minX = Math.min(minX, n.x - rx - 12);
      minY = Math.min(minY, n.y - ry - 12);
      maxX = Math.max(maxX, n.x + rx + 12);
      maxY = Math.max(maxY, n.y + ry + 12 + tagH);
      hasContent = true;
    }
    for (const d of project.decorations) {
      if (d.kind === 'arrow') {
        const x2 = d.x2 ?? d.x + 140;
        const y2 = d.y2 ?? d.y;
        minX = Math.min(minX, d.x - 32, x2 - 32);
        minY = Math.min(minY, d.y - 32, y2 - 32);
        maxX = Math.max(maxX, d.x + 32, x2 + 32);
        maxY = Math.max(maxY, d.y + 32, y2 + 32);
      } else {
        const w = (d.width ?? 180) / 2 + 8;
        const h = (d.height ?? (d.kind === 'text' ? 40 : 90)) / 2 + 8;
        minX = Math.min(minX, d.x - w);
        minY = Math.min(minY, d.y - h);
        maxX = Math.max(maxX, d.x + w);
        maxY = Math.max(maxY, d.y + h);
      }
      hasContent = true;
    }
    for (const im of project.images ?? []) {
      minX = Math.min(minX, im.x - im.width / 2 - 8);
      minY = Math.min(minY, im.y - im.height / 2 - 8);
      maxX = Math.max(maxX, im.x + im.width / 2 + 8);
      maxY = Math.max(maxY, im.y + im.height / 2 + 8);
      hasContent = true;
    }
    if (!hasContent) return null;
    return { minX, minY, maxX, maxY };
  };

  /** 정사각 PNG — 콘텐츠를 중앙 정렬·여백 8%. 해상도는 인자로 받음 */
  const exportPNGSquare = async (size: 512 | 1024 | 2048 | 4096) => {
    setBusy(true); setNote(null);
    try {
      const bbox = computeWorldBBox();
      if (!bbox) {
        setNote('내보낼 노드/데코가 없음');
        return;
      }
      await withForcedLight(async () => {
        const svg = document.querySelector('.canvas-svg') as SVGSVGElement | null;
        if (!svg) throw new Error('SVG를 찾을 수 없음');

        const contentW = bbox.maxX - bbox.minX;
        const contentH = bbox.maxY - bbox.minY;
        const side = Math.max(contentW, contentH);
        const pad = side * 0.08;
        const fullSide = side + pad * 2;
        const cx = (bbox.minX + bbox.maxX) / 2;
        const cy = (bbox.minY + bbox.maxY) / 2;
        const vbX = cx - fullSide / 2;
        const vbY = cy - fullSide / 2;

        const clone = svg.cloneNode(true) as SVGSVGElement;
        clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        clone.setAttribute('width', String(size));
        clone.setAttribute('height', String(size));
        clone.setAttribute('viewBox', `${vbX} ${vbY} ${fullSide} ${fullSide}`);
        clone.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        const world = clone.querySelector('[data-cv-world]') as SVGGElement | null;
        if (world) world.removeAttribute('transform');
        clone.querySelectorAll('[data-handle]').forEach((el) => el.remove());
        clone.querySelectorAll('.deco-handle').forEach((el) => el.remove());
        clone.querySelectorAll('.img-handle').forEach((el) => el.remove());
        clone.querySelectorAll('.bn-handle').forEach((el) => el.remove());
        clone.querySelectorAll('[data-bg]').forEach((el) => el.remove());

        const holder = document.createElement('div');
        holder.style.cssText = `position:fixed;left:-99999px;top:0;width:${size}px;height:${size}px;pointer-events:none;background:transparent;`;
        holder.appendChild(clone);
        document.body.appendChild(holder);

        let dataUrl: string;
        try {
          dataUrl = await htmlToImage.toPng(clone as unknown as HTMLElement, {
            width: size,
            height: size,
            canvasWidth: size,
            canvasHeight: size,
            pixelRatio: 1,
            backgroundColor: pngTransparent ? undefined : '#F4EFE6',
            style: pngTransparent
              ? { background: 'transparent', backgroundColor: 'transparent', backgroundImage: 'none' }
              : { background: '#F4EFE6' },
          });
        } finally {
          document.body.removeChild(holder);
        }

        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `${project.name || 'level'}_${size}${pngTransparent ? '_transparent' : ''}.png`;
        a.click();
      });
      setNote(`PNG ${size}×${size} 저장 완료`);
    } catch (e: any) {
      setNote(`PNG ${size} 실패: ${e.message ?? e}`);
    } finally { setBusy(false); }
  };

  const exportSVG = async () => {
    setBusy(true); setNote(null);
    try {
      const svg = document.querySelector('.canvas-svg') as SVGSVGElement | null;
      if (!svg) throw new Error('SVG를 찾을 수 없음');
      const clone = svg.cloneNode(true) as SVGSVGElement;
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      const ser = new XMLSerializer();
      const text = ser.serializeToString(clone);
      const blob = new Blob([`<?xml version="1.0"?>\n${text}`], { type: 'image/svg+xml' });
      downloadBlob(blob, `${project.name || 'level'}.svg`);
      setNote('SVG 저장 완료');
    } catch (e: any) {
      setNote(`SVG 실패: ${e.message ?? e}`);
    } finally { setBusy(false); }
  };

  const exportMarkdown = () => {
    const md = buildMarkdown(project);
    const blob = new Blob([md], { type: 'text/markdown' });
    downloadBlob(blob, `${project.name || 'level'}.md`);
    setNote('Markdown 저장 완료');
  };

  const exportJSON = () => {
    downloadJSON(project, `${project.name || 'level'}.json`);
    setNote('JSON 저장 완료');
  };

  const stats = {
    nodes: project.nodes.length,
    edges: project.edges.length,
    postits: project.postits.length,
  };

  return (
    <div className="exp-panel">
      <section className="exp-stats">
        <div><strong>{stats.nodes}</strong><span>노드</span></div>
        <div><strong>{stats.edges}</strong><span>간선</span></div>
        <div><strong>{stats.postits}</strong><span>포스트잇</span></div>
      </section>

      <div className="exp-buttons">
        <button onClick={exportPNG} disabled={busy} className="exp-btn exp-btn--primary">
          {busy ? '저장 중…' : `PNG 이미지${pngTransparent ? ' (투명)' : ''}`}
        </button>
        <div className="exp-square">
          <div className="exp-square-label">정사각 PNG (콘텐츠 자동 맞춤·8% 여백)</div>
          <div className="exp-seg">
            {([512, 1024, 2048, 4096] as const).map((sz) => (
              <button
                key={sz}
                className={`exp-seg-btn ${pngSquareSize === sz ? 'is-on' : ''}`}
                onClick={() => setPngSquareSize(sz)}
                disabled={busy}
                type="button"
              >
                {sz}
              </button>
            ))}
          </div>
          <button
            onClick={() => exportPNGSquare(pngSquareSize)}
            disabled={busy}
            className="exp-btn exp-btn--primary"
          >
            {busy ? '저장 중…' : `PNG ${pngSquareSize}×${pngSquareSize}${pngTransparent ? ' (투명)' : ''}`}
          </button>
        </div>
        <label className="exp-opt">
          <input
            type="checkbox"
            checked={pngTransparent}
            onChange={(e) => setPngTransparent(e.target.checked)}
          />
          <span>투명 배경 (언리얼/포토샵 임포트용)</span>
        </label>
        <label className="exp-opt">
          <input
            type="checkbox"
            checked={pngForceLight}
            onChange={(e) => setPngForceLight(e.target.checked)}
          />
          <span>라이트 테마로 강제 출력 (포트폴리오·인쇄용)</span>
        </label>
        <button onClick={exportSVG} disabled={busy} className="exp-btn">SVG 벡터</button>
        <button onClick={exportMarkdown} disabled={busy} className="exp-btn">Markdown 명세서</button>
        <button onClick={exportJSON} disabled={busy} className="exp-btn">JSON 프로젝트</button>
      </div>

      {note && <p className="exp-note caption">{note}</p>}

      <details className="exp-help">
        <summary>도움말</summary>
        <ul>
          <li><strong>PNG</strong> — 현재 캔버스 뷰 그대로. 기본은 투명 배경, 체크 해제 시 종이톤 포함. 그리드·미니맵 항상 제외.</li>
          <li><strong>라이트 강제</strong> — 화면이 다크 모드여도 PNG는 항상 라이트로 출력. 포트폴리오 PDF·인쇄·면접관 화면 호환 보장. 출력 직후 화면은 원래 테마로 복원.</li>
          <li><strong>정사각 PNG</strong> — 모든 노드/데코를 정사각 프레임에 8% 여백으로 자동 맞춤. 512 / 1024 / 2048 / 4096 중 선택. 언리얼 Texture2D 표준 크기 (BC7 호환).</li>
          <li><strong>SVG</strong> — 벡터. Illustrator/Figma 추가 편집용.</li>
          <li><strong>Markdown</strong> — 룸 명세서 텍스트. 포트폴리오 README용.</li>
          <li><strong>JSON</strong> — 프로젝트 원본. 동료에게 공유·백업용.</li>
        </ul>
      </details>
    </div>
  );
}
