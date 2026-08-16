import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import type { PacingDoc, PacingNodeKind } from '../../types';
import { hintForTension, monotoneCubic, segmentBounds, sortedSamples } from './pacing-utils';
import { segColor, NODE_META } from './PacingCanvas';
import { usePacing } from '../../store/pacing';

/* ─────────────────────────────────────────────────────────
   페이싱 사이드 패널 — 세 블록으로 분리:
   ① 구간 목록(항상): 클릭해 선택(곡선 하단 이름 클릭과 이중화한 선택 경로).
   ② 유형 힌트(읽기 전용, 51강): 선택 구간의 대표 tension으로 권장 공간 유형을 자동 표시.
      곡선 값에서 파생되는 가이드라 편집 대상이 아님 — '읽기 전용'을 명시해 편집 영역과 구분.
   ③ 구간 편집(50강): 이름/체류 비중/삭제 — 실제로 고치는 곳.
   ④ 노드 편집(49·50강): 곡선에 찍은 노드의 7유형을 세 계열로 묶어 고른다.
   기존 .pac-side/.pac-side-title/.pac-side-hint/.pac-seg-list/.pac-seg-item 클래스 재사용,
   추가 컨트롤·구분선은 인라인 스타일로만. */

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

/** 블록 구분선 — 읽기 전용 힌트와 편집 영역을 시각적으로 가른다 */
const blockStyle: CSSProperties = { borderTop: 'var(--line-thin)', paddingBottom: 'var(--sp-1)' };

export function PacingSide({
  doc,
  selectedSegId,
  onSelectSeg,
}: {
  doc: PacingDoc;
  selectedSegId: string | null;
  onSelectSeg: (segId: string) => void;
}) {
  const renameSegment = usePacing((s) => s.renameSegment);
  const setSegmentWidth = usePacing((s) => s.setSegmentWidth);
  const removeSegment = usePacing((s) => s.removeSegment);
  const setMarkerNode = usePacing((s) => s.setMarkerNode);
  const nodes = doc.markers.filter((m) => m.kind === 'node').sort((x, y) => x.at - y.at);

  const seg = selectedSegId ? doc.segments.find((s) => s.id === selectedSegId) ?? null : null;

  // 이름 입력은 로컬 드래프트로 받아두고 blur/Enter에서만 store에 반영(타이핑 중 저장 스팸 방지)
  const [nameDraft, setNameDraft] = useState(seg?.name ?? '');
  useEffect(() => { setNameDraft(seg?.name ?? ''); }, [seg?.id, seg?.name]);

  // ① 구간 목록 — 항상 표시(선택 경로 이중화). 곡선 하단 이름 클릭과 동일하게 onSelectSeg 호출.
  const segList = (
    <>
      <div className="pac-side-title">구간 — 클릭해 선택</div>
      <ul className="pac-seg-list" data-testid="pac-seg-list">
        {doc.segments.map((s) => (
          <li
            key={s.id}
            className={`pac-seg-item${s.id === selectedSegId ? ' is-active' : ''}`}
            onClick={() => onSelectSeg(s.id)}
          >
            <span className="pac-seg-swatch" style={{ background: segColor(doc, s.id) }} />
            {s.name}
          </li>
        ))}
      </ul>
    </>
  );

  if (!seg) {
    return (
      <div className="pac-side">
        {segList}
        <p className="pac-side-hint">구간을 클릭해 선택하면 권장 공간 유형과 편집 항목이 열립니다.</p>
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
      {segList}

      {/* ② 유형 힌트 — 읽기 전용(51강 자동 가이드) */}
      <div style={blockStyle}>
        <div className="pac-side-title" style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--sp-2)' }}>
          <span>유형 힌트 — {seg.name}</span>
          <span style={{ fontWeight: 400, color: 'var(--ink-400)', fontSize: 'var(--fs-2xs, 10px)' }}>읽기 전용</span>
        </div>
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
        <ul style={{ listStyle: 'none', margin: 0, padding: 'var(--sp-1) var(--sp-3)', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {items.map((item) => (
            <li
              key={item}
              style={{
                padding: '2px 8px',
                borderRadius: 'var(--r-sm)',
                background: 'var(--paper-200)',
                color: 'var(--ink-600)',
                fontSize: 'var(--fs-xs)',
                cursor: 'default',
              }}
            >{item}</li>
          ))}
        </ul>
        <p className="pac-side-hint" style={{ paddingTop: 0, fontStyle: 'italic', color: 'var(--ink-400)' }}>
          곡선 높이에 따라 자동 계산되는 가이드 — 직접 수정하는 항목이 아닙니다.
        </p>
      </div>

      {/* ③ 구간 편집 — 50강: 이름/폭/삭제(실제로 고치는 곳) */}
      <div style={blockStyle}>
        <div className="pac-side-title">구간 편집</div>
        <div style={{ padding: 'var(--sp-1) var(--sp-3) var(--sp-3)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
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

      {/* ④ 노드 편집 — 곡선에 찍은 노드의 유형을 세 계열로 묶어 선택 */}
      <div className="pac-side-block" data-testid="pac-node-block">
        <div className="pac-side-title">노드 유형</div>
        {nodes.length === 0 ? (
          <div className="pac-side-hint">
            곡선 위에 노드(N)를 찍으면 여기서 유형을 고릅니다. 경로가 꺾이는 사건을 표시하는 표기입니다.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {nodes.map((m, i) => (
              <div key={m.id} data-testid="pac-node-row" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--ink-500)' }}>
                  노드 {i + 1} · {Math.round(m.at * 100)}%
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {(Object.keys(NODE_META) as PacingNodeKind[]).map((nk) => {
                    const on = (m.node ?? 'continue') === nk;
                    return (
                      <button
                        key={nk}
                        className={`td-btn ${on ? 'is-active' : ''}`}
                        data-testid={`pac-node-${nk}`}
                        onClick={() => setMarkerNode(doc.id, m.id, nk)}
                        title={`${NODE_META[nk].family} 계열 — ${NODE_META[nk].label}`}
                        style={{ fontSize: 'var(--fs-xs)', padding: '2px 7px' }}
                      >{NODE_META[nk].label}</button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="pac-side-hint">
              반전과 방향 전환을 여정 초반에 두지 않습니다. 확인 계열로 기대를 쌓은 뒤에 부정 계열을 던집니다.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
