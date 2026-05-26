# 버블 아틀리에 (Bubble Atelier)

레벨 디자인을 위한 **컨셉 + 포스트잇 + 버블 다이어그램** 워크벤치.
서버리스 로컬 정적 빌드. 한국 학생용 한국어 UI.

## 핵심 가치

1. **컨셉** 한 줄로 시작 → AI 또는 50개 오프라인 템플릿
2. **포스트잇 패드**에 자유롭게 메모 → 캔버스로 드래그하면 **노드로 승격**
3. **버블 다이어그램**으로 공간 관계 정리 (Boss Keys 표기 규약)
4. **Midjourney v8.1 프롬프트** 자동 생성 — 마스터 + 노드별
5. PNG/SVG/Markdown/JSON 내보내기

## 기술 스택

- Vite + React + TypeScript
- Vanilla SVG + d3-zoom (React Flow 미사용 — 디자인 자유도·번들 절감)
- @dagrejs/dagre 자동 레이아웃
- Zustand 상태 관리
- Google Gemini API (BYOK, 선택사항)
- Playwright E2E (13/13 통과)

## 디자인 토큰

- 폰트: Gowun Batang (제목), Pretendard (본문), Caveat (손글씨), JetBrains Mono (코드)
- 팔레트: 종이톤 베이스 + 잉크/벽돌/청사진/오크르/모스 액센트
- 미감: **건축 제도판 × 게임 디자이너 노트북**

## 실행

```bash
npm install
npm run dev          # 개발 서버
npm run build        # 정적 빌드 → dist/
npm run preview      # 빌드 미리보기
npm test             # Playwright E2E
```

## 배포 방식 (학생용)

1. `npm run build` → `dist/` 폴더
2. `dist/`를 zip으로 압축 또는 GitHub Pages에 업로드
3. 학생은 zip을 풀고 `index.html` 더블클릭 (file:// 실행 가능)
4. AI 기능을 원하면 **본인의 Gemini 무료 API 키** 등록 (필수 아님)

## AI 사용 (선택)

- [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)에서 무료 키 발급
- 첫 실행 시 위저드에서 등록 또는 우측 패널 [AI] 탭에서 등록
- Gemini 2.5 Pro 우선 사용 → 한도 소진 시 Flash 자동 폴백
- 일일 한도: Pro 50회, Flash 1,500회 (Google 무료 등급)

## 디렉터리

```
src/
├── App.tsx, main.tsx
├── store/            zustand + localStorage 자동저장
├── types.ts
├── utils/            rough-path, layout-dagre, id
├── styles/           tokens, global, paper
└── components/
    ├── shell/        ConceptBar, PostitPad, CanvasShell, Inspector, Legend
    ├── canvas/       SvgCanvas, BubbleNode, Edge, Minimap, usePanZoom, node-shapes
    ├── postit/       PostitCard
    ├── templates/    concept-library (50종), TemplatePicker, mj-keyword-dict
    ├── ai/           gemini, prompts, OnboardingWizard, AIPanel, UsageMeter
    └── export/       ExportPanel, md-export
```
