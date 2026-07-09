import './BrandMark.css';

/** 앱 브랜드 마크 — 로고 + 명칭. 컨셉바/사이드바 등 위치에 재사용. */
export function BrandMark({ className = '' }: { className?: string }) {
  return (
    <div className={`brand-mark ${className}`}>
      <span className="bm-logo" aria-hidden>
        <svg viewBox="0 0 24 24" width="22" height="22">
          <circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="16" cy="15" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <line x1="11.5" y1="11.5" x2="14" y2="13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="bm-text">
        <strong>버블 아틀리에</strong>
        <em className="caption">Bubble Atelier · Level Design Workbench</em>
      </span>
    </div>
  );
}
