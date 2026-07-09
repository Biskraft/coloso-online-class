import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import type { PacingDoc } from '../../types';
import { hintForTension, monotoneCubic, segmentBounds, sortedSamples } from './pacing-utils';
import { usePacing } from '../../store/pacing';

/* ─────────────────────────────────────────────────────────
   51강 유형 힌트 사이드 — 선택 구간의 대표 tension(구간 중앙 곡선값)으로
   권장 공간 유형(hintForTension)을 표시. 곡선 캔버스 옆 사이드 슬롯에 붙는다.
   50강: 구간 이름/폭 편집 + 삭제 — store의 renameSegment/setSegmentWidth/
   removeSegment를 이 사이드 패널에 배선한다(스펙 §5·§8).
   기존 `.pac-side`/`.pac-side-title`/`.pac-side-hint`/`.pac-seg-list`/`.pac-seg-item`
   클래스(PacingShell.css)를 그대로 재사용 — 편집 컨트롤은 인라인 스타일로만 추가.
   밴드 배지 색만 네이비(상승)/옐로우(간극)/잉크 회색(아늑) 토큰으로 인라인 지정. */

const BAND_COLOR: Record<string, string> = {
  '아늑': 'var(--ink-500)',
  '상승': 'var(--blueprint)',
  '간극': 'var(--ochre-deep)',
};

const fieldStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--fs-xs)',
  color: 'var(--ink-500)',
};

const inputStyle: CSSProperties = {
  padding: '4px 8px',
  border: '1px solid var(--ink-300)',
  borderRadius: 'var(--r-sm)',
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--fs-sm)',
  color: 'var(--ink-700)',
  background: 'var(--paper-50)',
};

export function PacingSide({ doc, selectedSegId }: { doc: PacingDoc; selectedSegId: string | null }) {
  const renameSegment = usePacing((s) => s.renameSegment);
  const setSegmentWidth = usePacing((s) => s.setSegmentWidth);
  const removeSegment = usePacing((s) => s.removeSegment);

  const seg = selectedSegId ? doc.segments.find((s) => s.id === selectedSegId) ?? null : null;

  // 이름 입력은 로컬 드래프트로 받아두고 blur/Enter에서만 store에 반영(타이핑 중 저장 스팸 방지)
  const [nameDraft, setNameDraft] = useState(seg?.name ?? '');
  useEffect(() => { setNameDraft(seg?.name ?? ''); }, [seg?.id, seg?.name]);

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
  const canDelete = doc.segments.length > 1;

  const commitName = () => {
    const trimmed = nameDraft.trim();
    if (trimmed && trimmed !== seg.name) renameSegment(doc.id, seg.id, trimmed);
    else setNameDraft(seg.name);
  };

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

      {/* 구간 이름/폭 편집 + 삭제 — 50강 시연: 구간 이름 붙이고 폭 늘리고 줄이기 */}
      <div style={{ padding: 'var(--sp-2) var(--sp-3) var(--sp-3)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)', borderTop: 'var(--line-thin)' }}>
        <label style={fieldStyle}>
          구간 이름
          <input
            data-testid="pac-seg-name"
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            onBlur={commitName}
            onKeyDown={(e) => {
              if (e.key === 'Enter') { commitName(); (e.target as HTMLInputElement).blur(); }
              if (e.key === 'Escape') setNameDraft(seg.name);
            }}
            style={inputStyle}
          />
        </label>

        <label style={fieldStyle}>
          체류 비중
          <input
            data-testid="pac-seg-width"
            type="number"
            min={0.25}
            step={0.25}
            value={seg.width}
            onChange={(e) => {
              const v = parseFloat(e.target.value);
              if (!Number.isNaN(v)) setSegmentWidth(doc.id, seg.id, v);
            }}
            style={inputStyle}
          />
        </label>

        <button
          className="td-btn"
          data-testid="pac-seg-remove"
          onClick={() => removeSegment(doc.id, seg.id)}
          disabled={!canDelete}
          title={canDelete ? '이 구간을 삭제합니다' : '마지막 구간은 삭제할 수 없습니다'}
          style={{ alignSelf: 'flex-start', color: 'var(--ochre-deep)', borderColor: 'var(--ochre-deep)' }}
        >구간 삭제</button>
      </div>
    </div>
  );
}
