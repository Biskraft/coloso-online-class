import { useState } from 'react';
import { useProject } from '../../store/project';
import { geminiCall } from './gemini';
import './OnboardingWizard.css';

export function OnboardingWizard() {
  const setApiKey = useProject((s) => s.setApiKey);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [keyInput, setKeyInput] = useState('');
  const [testing, setTesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const skip = () => {
    localStorage.setItem('bubble-atelier::onboarded', '1');
    window.location.reload();
  };

  const test = async () => {
    if (!keyInput.trim()) return;
    setTesting(true);
    setError(null);
    setApiKey(keyInput.trim());
    try {
      await geminiCall({
        system: '단답으로 응답하세요.',
        user: '안녕이라고 답하세요.',
        maxTokens: 12,
      });
      localStorage.setItem('bubble-atelier::onboarded', '1');
      setStep(3);
    } catch (e: any) {
      setError(e?.message ?? '키 검증 실패');
      setApiKey(undefined);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="ow-backdrop">
      <div className="ow-card paper-grain">
        <header className="ow-head">
          <span className="caption">버블 아틀리에</span>
          <h2 className="hand">시작하기</h2>
          <p className="ow-subtitle">레벨 디자인을 위한 컨셉 + 포스트잇 + 버블 다이어그램 워크벤치</p>
        </header>

        {step === 1 && (
          <div className="ow-body">
            <div className="ow-paths">
              <article className="ow-path ow-path--offline">
                <h3>오프라인 모드로 시작</h3>
                <p>50개의 컨셉 템플릿과 결정론적 Midjourney 프롬프트 생성기로 즉시 작업 가능. AI 호출 없음, 비용 0.</p>
                <button onClick={skip} className="ow-btn ow-btn--ghost">오프라인으로 시작</button>
              </article>
              <article className="ow-path ow-path--ai">
                <h3>AI 어시스턴트 활성화</h3>
                <p>Google Gemini의 <strong>무료</strong> API 키로 컨셉 자동 생성, 비평, 노드별 MJ 프롬프트 생성. 신용카드 불필요.</p>
                <button onClick={() => setStep(2)} className="ow-btn">키 등록하기</button>
              </article>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="ow-body">
            <ol className="ow-steps">
              <li>
                <strong>① 키 발급</strong>
                <p>아래 주소로 이동 → 구글 계정 로그인 → <em>「Get API key」</em> 클릭 → <em>「Create API key」</em> 클릭</p>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="ow-link"
                >aistudio.google.com/app/apikey →</a>
              </li>
              <li>
                <strong>② 키 붙여넣기</strong>
                <p>발급받은 키를 아래 칸에 붙여넣으세요. 이 키는 본인 브라우저에만 저장됩니다.</p>
                <input
                  type="password"
                  className="ow-input"
                  placeholder="AIzaSy…"
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                />
                {error && <div className="ow-error">⚠ {error}</div>}
              </li>
            </ol>
            <div className="ow-actions">
              <button onClick={skip} className="ow-btn ow-btn--ghost">건너뛰기 (오프라인)</button>
              <button onClick={test} className="ow-btn" disabled={!keyInput.trim() || testing}>
                {testing ? '검증 중…' : '키 검증하고 시작'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="ow-body ow-success">
            <div className="ow-checkmark hand">✓</div>
            <h3>준비 완료</h3>
            <p>키가 정상적으로 등록되었습니다.<br />좌측 패널에서 컨셉 템플릿을 골라 시작하거나, 직접 포스트잇을 추가해 보세요.</p>
            <button onClick={() => { localStorage.setItem('bubble-atelier::onboarded', '1'); window.location.reload(); }} className="ow-btn">
              시작
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
