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

## Firebase 연결 (RSVP / 방명록 실사용)

이 프로젝트는 Firestore를 사용해 RSVP와 축하 메시지를 실제 저장합니다.

### 1) Firebase 프로젝트 준비

- Firebase Console에서 프로젝트 생성
- Firestore Database 생성 (Production 또는 Test 모드 선택)
- 웹 앱 추가 후 SDK config 값 확보

### 2) 환경변수 설정 (선택)

현재 저장소에는 Firebase 공개 설정값이 기본 내장되어 있어서, 별도 설정 없이 바로 동작합니다.
프로젝트를 다른 Firebase로 바꾸고 싶을 때만 `.env`를 사용하세요.

```powershell
Copy-Item .env.example .env
```

```env
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

### 3) Firestore 규칙 예시 (개발용)

아래는 빠른 테스트용 예시입니다. 배포 시에는 보안 규칙을 더 엄격하게 설정하세요.

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rsvps/{document=**} {
      allow read, write: if true;
    }
    match /guestbookMessages/{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 4) GitHub Pages 배포 시 Secrets

기본 설정으로는 Secrets 없이 배포됩니다.  
다른 Firebase 프로젝트를 쓸 때만 Actions Secrets를 설정해 오버라이드하면 됩니다.

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
