import type { PacingDoc } from '../../types';
import { hintForTension, monotoneCubic, segmentBounds, sortedSamples } from './pacing-utils';

/* ─────────────────────────────────────────────────────────
   51강 유형 힌트 사이드 — 선택 구간의 대표 tension(구간 중앙 곡선값)으로
   권장 공간 유형(hintForTension)을 표시. 곡선 캔버스 옆 사이드 슬롯에 붙는다.
   기존 `.pac-side`/`.pac-side-title`/`.pac-side-hint`/`.pac-seg-list`/`.pac-seg-item`
   클래스(PacingShell.css)를 그대로 재사용 — 이 파일은 CSS를 추가하지 않는다.
   밴드 배지 색만 네이비(상승)/옐로우(간극)/잉크 회색(아늑) 토큰으로 인라인 지정. */

const BAND_COLOR: Record<string, string> = {
  '아늑': 'var(--ink-500)',
  '상승': 'var(--blueprint)',
  '간극': 'var(--ochre-deep)',
};

export function PacingSide({ doc, selectedSegId }: { doc: PacingDoc; selectedSegId: string | null }) {
  const seg = selectedSegId ? doc.segments.find((s) => s.id === selectedSegId) ?? null : null;

  if (!seg) {
    return (
      <div className="pac-side">
        <div className="pac-side-title">유형 힌트</div>
        <p className="pac-side-hint">구간을 선택하면 권장 공간 유형을 봅니다.</p>
      </div>
    );
  }

  const bounds = segmentBounds(doc.segments).find((b) => b.id === seg.id);
  const midX = bounds ? (bounds.x0 + bounds.x1) / 2 : 0;
  const tension = monotoneCubic(sortedSamples(doc))(midX);
  const { band, items } = hintForTension(tension);
  const bandColor = BAND_COLOR[band];

  return (
    <div className="pac-side">
      <div className="pac-side-title">유형 힌트 — {seg.name}</div>
      <p className="pac-side-hint" style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
        <span>대표 긴장도 {Math.round(tension)}</span>
        <span
          style={{
            padding: '1px 8px',
            borderRadius: 'var(--r-sm)',
            border: `1px solid ${bandColor}`,
            color: bandColor,
            fontWeight: 600,
          }}
        >{band}</span>
      </p>
      <ul className="pac-seg-list">
        {items.map((item) => (
          <li key={item} className="pac-seg-item" style={{ cursor: 'default' }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
