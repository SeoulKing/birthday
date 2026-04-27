# Birthday Invitation Landing Page

모바일 청첩장 스타일로 만든 생일파티 초대장 랜딩페이지입니다.  
React + Vite + TypeScript 기반이며, 텍스트/날짜/장소/링크/이미지를 데이터 파일에서 한 번에 수정할 수 있습니다.

## 실행 방법

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

## 주요 구조

```text
src/
  App.tsx
  data/invitationData.ts
  components/
  styles/global.css
  App.css
```

- `src/data/invitationData.ts`: 초대장 내용 전체(문구/날짜/주소/링크/갤러리/방명록)
- `src/assets/*.svg`: 플레이스홀더 이미지 (나중에 실제 이미지로 교체)

## GitHub 업로드 & Pages 배포

이 프로젝트는 `main` 브랜치에 push하면 GitHub Actions로 자동 배포됩니다.

### 1) 로컬에서 Git 초기화/업로드 (PowerShell)

```powershell
git init
git branch -M main
git add .
git commit -m "feat: add birthday invitation landing page"
git remote add origin https://github.com/<YOUR_ID>/<REPO_NAME>.git
git push -u origin main
```

### 2) GitHub Pages 설정

GitHub 저장소 설정에서 아래를 확인하세요.

- `Settings > Pages`
- `Build and deployment`의 Source가 `GitHub Actions`인지 확인

### 3) 배포 확인

- Actions 탭에서 `Deploy to GitHub Pages` 워크플로우 성공 확인
- 배포 주소: `https://<YOUR_ID>.github.io/<REPO_NAME>/`

> 참고: 저장소 이름이 `<YOUR_ID>.github.io`인 경우 루트(`https://<YOUR_ID>.github.io/`)로 배포됩니다.
