# 퇴직금 회수 가이드 (Retirement Pay Recovery Guide)

퇴직금 미지급 피해자가 스스로 회수 절차를 밟을 수 있도록, 9단계 회수 로드맵과 맞춤형 진단 도구를 제공하는 웹 애플리케이션입니다.

"고용노동부에 신고하면 회사가 돈을 준다"는 흔한 오해를 바로잡고, 진정 → 시정명령 → 집행권원 확보 → 강제집행으로 이어지는 정확한 법적 절차를 안내하는 것을 목표로 만들었습니다.

> ⚠️ 이 프로젝트는 법률 자문을 대체하지 않는 일반 정보 제공 도구입니다. 구체적인 사안은 대한법률구조공단(국번없이 132) 등 전문가 상담을 권장합니다.

---
<img width="938" height="945" alt="스크린샷 2026-08-14 175607" src="https://github.com/user-attachments/assets/78f09622-3538-4d01-9bf1-af95d1d4232c" />
<img width="901" height="937" alt="스크린샷 2026-08-14 175615" src="https://github.com/user-attachments/assets/087aaab7-2d99-43de-a99f-7ea497cc447a" />
<img width="959" height="937" alt="스크린샷 2026-08-14 175638" src="https://github.com/user-attachments/assets/280c5e1c-f774-4e4e-9e8e-7a41aeb0ab18" />
<img width="953" height="933" alt="스크린샷 2026-08-14 175648" src="https://github.com/user-attachments/assets/5ca39adc-536f-4aa6-8254-7c5b3782762f" />
<img width="1052" height="927" alt="스크린샷 2026-08-14 175658" src="https://github.com/user-attachments/assets/12bef980-3836-4a1d-8622-fe1ec7330617" />
<img width="939" height="944" alt="스크린샷 2026-08-14 175707" src="https://github.com/user-attachments/assets/dc06e5d8-4009-415e-bc31-66041eb20925" />


## 주요 기능

- **회수 타임라인** — 9단계 회수 절차를 카드형 타임라인으로 제공
- **진단 마법사** — 7개 질문으로 사용자의 현재 상황을 파악해 맞춤 행동 지침 출력
- **법령·판례 실시간 조회** — 진단 단계에 매핑된 키워드로 법제처 API를 조회해 관련 법령·판례 표시
- **내용증명 5단 템플릿** — 제3채무자 대상 내용증명 구성 안내 및 클립보드 복사
- **형사고소 트랙** — 재산명시 허위 제출 시 형사고소 절차·핵심 법리 별도 안내
- **진행 상태 저장** — 새로고침 후에도 진단 진행 상태 유지 (localStorage)

---

## 기술 스택

### 프론트엔드

| 분류 | 기술 |
|---|---|
| 프레임워크 | React 19.2 (Vite 8.1, TypeScript 6.0) |
| 라우팅 | react-router-dom 7.18 |
| 서버 상태 | TanStack Query 5.101 |
| 클라이언트 상태 | Zustand 5.0 (persist 미들웨어) |
| HTTP 클라이언트 | axios 1.18 |
| 스타일 | Tailwind CSS 3.4 |

### 백엔드

| 분류 | 기술 |
|---|---|
| 런타임 | Node.js (CommonJS) |
| 프레임워크 | Express 5.2 |
| HTTP 클라이언트 | axios 1.18 |
| 기타 | cors 2.8, dotenv 17.4 |

### 외부 API

- **법제처 법령검색 Open API** — 법령(`target=law`) / 판례(`target=prec`) 조회

---

## 아키텍처 원칙

1. **상태와 파생 로직의 분리** — Zustand 스토어에는 직렬화 가능한 상태만 저장하고, 추천 행동 계산 같은 파생 로직은 `useMemo` 훅에서 처리합니다. persist 미들웨어가 함수를 저장할 수 없기 때문입니다.

2. **단방향 콜백 기반 진단 흐름** — 각 질문 컴포넌트는 다음 단계를 알지 못하며 `onAnswer` 콜백만 호출합니다. 단계 전환 로직은 `DiagnosisWizard` 한 곳에서만 관리됩니다.

3. **도메인 기반 캐싱 전략** — 법령·판례 쿼리는 `staleTime`을 1시간으로 설정했습니다. 법령은 국회 심의·공포 절차를 거치므로 짧은 주기로 바뀌지 않는다는 특성을 반영한 값입니다.

4. **API 키 없이도 동작하는 폴백** — `LAW_API_OC_ID` 환경변수가 없으면 Mock 데이터로 폴백해 서버가 계속 기동됩니다.

---

## 로컬 실행 방법

### 사전 준비

- Node.js 설치
- 법제처 Open API 인증키(OC ID) — [법제처 Open API 신청](https://open.law.go.kr) (없어도 Mock 데이터로 실행 가능)

### 백엔드

```bash
cd retirement-pay-recovery-backend
cp .env.example .env   # LAW_API_OC_ID 값 입력
npm install
npm run dev             # http://localhost:5001
```

### 프론트엔드

```bash
cd retirement-pay-recovery-frontend
npm install
npm run dev             # http://localhost:3001
```

프론트엔드는 Vite 프록시를 통해 `/api/*` 요청을 백엔드(`localhost:5001`)로 전달합니다.

---

## 프로젝트 구조 (요약)

```
retirement-pay-recovery-frontend/
├── src/
│   ├── features/
│   │   ├── timeline/         # 회수 타임라인
│   │   ├── diagnosis/        # 진단 마법사
│   │   └── criminalTrack/    # 형사고소 트랙
│   ├── stores/                # Zustand 스토어
│   ├── api/                   # TanStack Query 훅
│   └── shared/                 # 공통 컴포넌트 (법적 고지 등)

retirement-pay-recovery-backend/
├── src/
│   ├── routes/                 # Express 라우트
│   ├── services/               # 법제처 API 연동 로직
│   └── config/
```

---

## 알려진 제약 사항

- 실제 법제처 API 키 미연동 상태 — 현재는 Mock 데이터로 동작 (하드코딩된 가상 판례번호 포함)
- 테스트 코드 없음 (단위/통합 테스트 미작성)
- 배포 환경 설정 없음 (Dockerfile, CI/CD 미구성)
- `CaseDetails.unpaidAmount` 필드가 정의만 되어 있고 아직 입력/활용되지 않음

---

## 진행 현황

- 진행 기간: 2026.07.21 – 2026.07.27
- 현재 상태: 실사용자 확보 전 데모 단계 (포트폴리오·기술 검증 목적)
