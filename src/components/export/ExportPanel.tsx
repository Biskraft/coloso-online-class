import { useState } from 'react';
import * as htmlToImage from 'html-to-image';
import { useProject } from '../../store/project';
import { downloadJSON } from '../../store/persistence';
import { buildMarkdown } from './md-export';
import './ExportPanel.css';

export function ExportPanel() {
  const project = useProject((s) => s.project);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

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
      const wrap = document.querySelector('.canvas-wrap') as HTMLElement;
      if (!wrap) throw new Error('캔버스를 찾을 수 없음');
      const dataUrl = await htmlToImage.toPng(wrap, {
        backgroundColor: '#F4EFE6',
        pixelRatio: 2,
        filter: (n) => {
          // 미니맵·툴바·드롭 배너 제외
          if (n instanceof HTMLElement) {
            if (n.classList?.contains('canvas-minimap')) return false;
            if (n.classList?.contains('canvas-toolbar')) return false;
            if (n.classList?.contains('canvas-drop-banner')) return false;
            if (n.classList?.contains('canvas-empty')) return false;
          }
          return true;
        },
      });
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${project.name || 'level'}.png`;
      a.click();
      setNote('PNG 저장 완료');
    } catch (e: any) {
      setNote(`PNG 실패: ${e.message ?? e}`);
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
          {busy ? '저장 중…' : 'PNG 이미지'}
        </button>
        <button onClick={exportSVG} disabled={busy} className="exp-btn">SVG 벡터</button>
        <button onClick={exportMarkdown} disabled={busy} className="exp-btn">Markdown 명세서</button>
        <button onClick={exportJSON} disabled={busy} className="exp-btn">JSON 프로젝트</button>
      </div>

      {note && <p className="exp-note caption">{note}</p>}

      <details className="exp-help">
        <summary>도움말</summary>
        <ul>
          <li><strong>PNG</strong> — 노트북/PPT 첨부용. 그리드·미니맵 제외.</li>
          <li><strong>SVG</strong> — 벡터. Illustrator/Figma 추가 편집용.</li>
          <li><strong>Markdown</strong> — 룸 명세서 텍스트. 포트폴리오 README용.</li>
          <li><strong>JSON</strong> — 프로젝트 원본. 동료에게 공유·백업용.</li>
        </ul>
      </details>
    </div>
  );
}
