# GitHub Pages 배포 가이드

## 사전 준비

- GitHub 계정
- Git 설치 (`git --version`으로 확인)
- 본 폴더(`app/`)에서 모든 명령 실행

## 1. GitHub 저장소 생성

[github.com/new](https://github.com/new)에서 새 저장소 생성:
- 이름: `coloso-online-class` (또는 자유)
- 공개/비공개 선택 (공개 권장 — 학생이 즉시 접근 가능)
- **README/license/.gitignore 추가 옵션은 모두 체크 해제**

## 2. 로컬 저장소 초기화 및 첫 푸시

```bash
cd app
git init
git add .
git commit -m "초기 커밋: 버블 아틀리에 v0.1"
git branch -M main
git remote add origin https://github.com/<본인_GitHub_사용자명>/coloso-online-class.git
git push -u origin main
```

## 3. GitHub Pages 활성화

저장소 페이지에서:
1. **Settings** 탭 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Build and deployment** 섹션:
   - Source: **Deploy from a branch**
   - Branch: **gh-pages** / **/(root)** 선택 (다음 단계의 첫 deploy 후 표시됨)

## 4. 배포

```bash
npm run deploy
```

이 명령은:
1. `npm run build`로 `dist/` 생성 (predeploy 훅)
2. `gh-pages` 브랜치를 생성/업데이트하여 `dist/` 내용 push

첫 실행 시 GitHub Pages가 활성화되는 데 1~2분 소요. 이후 push는 즉시 반영.

## 5. URL 확인

`https://<본인_GitHub_사용자명>.github.io/coloso-online-class/`

저장소 **Settings → Pages** 페이지 상단에 정확한 URL이 표시됩니다.

## 학생에게 공유

위 URL 한 줄을 LMS/디스코드/노션에 공유. 학생은 아무 설치 없이 브라우저에서 즉시 사용.

## 업데이트 배포

수정 후:
```bash
git add .
git commit -m "수정 내용 요약"
git push                # 소스 백업
npm run deploy          # 학생에게 즉시 반영
```

## 자주 부딪치는 함정

### "Pages 빌드가 무한 빌딩 중"
- Settings → Pages에서 branch가 `gh-pages` (root) 인지 확인.
- `npm run deploy`를 한 번 더 실행해서 강제 푸시.

### "URL 접속 시 빈 페이지"
- 브라우저 콘솔(F12) 확인. 보통 404 에러면 `vite.config.ts`의 `base` 설정 문제.
- 현재 `base: './'`로 되어 있어 어떤 저장소 이름에서도 작동합니다 — 수정 불필요.

### "최신 변경이 안 보임"
- 브라우저 강력 새로고침 (Ctrl + Shift + R).
- GitHub Pages CDN 캐시는 1~5분 지연될 수 있음.

## 비용

- GitHub 무료 계정: 월 100GB 트래픽 (이 앱 규모로는 사실상 무제한)
- 빌드 시간 무료
- 도메인 비용 0 (`<user>.github.io` 사용 시)

## 대안

- **Vercel/Netlify**: 한국 CDN 응답이 약간 더 빠를 수 있음. `dist/` 폴더 드래그앤드롭으로 배포 가능. GitHub 연동 시 자동 배포.
- **자체 호스팅**: `dist/`를 어떤 정적 호스팅에도 올릴 수 있음.
