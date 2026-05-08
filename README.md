# 🚀 StorePilot
AI 기반 매장 관리 및 데이터 분석 플랫폼  
매장의 매출, 메뉴, 재고, 스케줄 데이터를 분석하여 효율적인 운영을 지원합니다.

## 🌐 배포

Vercel을 통해 배포되어 있습니다.

👉 **[https://kd-storepilot.vercel.app](https://kd-storepilot.vercel.app)**

## 📌 프로젝트 소개
StorePilot는 매장 운영 데이터를 기반으로  
AI 분석 및 시각화를 제공하는 스마트 매장 관리 서비스입니다.

### 주요 기능
- 📊 매출 데이터 분석
- 🍽 메뉴 판매량 관리
- 📦 재고 관리
- 👨‍💼 직원 스케줄 관리
- 🤖 AI 기반 운영 인사이트 제공
- 📈 데이터 시각화 대시보드

## 🛠 기술 스택

### Frontend
- React
- Next.js
- SCSS Module
- Zustand

### Backend
- Next.js API Route
- MongoDB
- Mongoose

### AI
- Gemini API

### Deployment
- Vercel

## 📆 기간 및 인원
- 2026.04.14 ~ 2026.05.08
- 팀원: 5명

## 👩🏻‍🤝‍🧑🏻 팀원 소개
<table>
  <thead>
    <tr>
      <th>이름</th>
      <th>주요 페이지</th>
      <th>해당</th>
    </tr>
  </thead>
  
  <tbody>
    <tr>
      <td>이태현</td> <!-- 이름 -->
      <td>매출 관리 페이지, QuickOrder, aiStore</td> <!-- 맡은 분야 --> 
      <td>✔</td> <!-- 본인 깃허브에 올리면 그때 체크표시 -->
    </tr>
    <tr>
      <td>박소영</td> <!-- 이름 -->
      <td>메인 페이지, 사이드 바, 설정 페이지</td> <!-- 맡은 분야 --> 
      <td></td> <!-- 본인 깃허브에 올리면 그때 체크표시 -->
    </tr>
    <tr>
      <td>이예원</td> <!-- 이름 -->
      <td>직원 관리 페이지, 근무표 관리 페이지</td> <!-- 맡은 분야 --> 
      <td></td> <!-- 본인 깃허브에 올리면 그때 체크표시 -->
    </tr>
    <tr>
      <td>김나영</td> <!-- 이름 -->
      <td>랜딩 페이지, 메뉴 관리 페이지</td> <!-- 맡은 분야 --> 
      <td></td> <!-- 본인 깃허브에 올리면 그때 체크표시 -->
    </tr>
    <tr>
      <td>진윤서</td>
      <td>온보딩 페이지, NextAuth 세션 관리</td> <!-- 맡은 분야 --> 
      <td></td> <!-- 본인 깃허브에 올리면 그때 체크표시 -->
    </tr>
  </tbody>
</table>

## 📂 프로젝트 구조

```
📂src/
┣━━ 📂app/
┃   ┣━━ 📂(pages)/
┃   ┃   ┣━━ 📂(auth)/                   # 인증 관련 페이지
┃   ┃   ┃   ┣━━ 📂login/    
┃   ┃   ┃   ┣━━ 📂signup/   
┃   ┃   ┃   ┣━━ 📂welcome/  
┃   ┃   ┃   ┗━━ 📂onboarding/   
┃   ┃   ┃       ┣━━ 📂store-info/       # 매장 정보 입력
┃   ┃   ┃       ┗━━ 📂store-setting/    # 메뉴·재고·직원 초기 세팅
┃   ┃   ┣━━ 📂dashboard/                # 대시보드
┃   ┃   ┣━━ 📂sales/                    # 매출 관리
┃   ┃   ┣━━ 📂menu/                     # 메뉴 관리
┃   ┃   ┣━━ 📂stock/                    # 재고 관리
┃   ┃   ┣━━ 📂staff/                    # 직원 관리
┃   ┃   ┣━━ 📂schedule/                 # 스케줄 관리
┃   ┃   ┗━━ 📂setting/                  # 계정·매장 설정
┃   ┣━━ 📂api/  
┃   ┃   ┣━━ 📂auth/                     # NextAuth 인증
┃   ┃   ┣━━ 📂menu/                     # 메뉴 CRUD + AI 분석
┃   ┃   ┣━━ 📂sales/                    # 매출 CRUD
┃   ┃   ┣━━ 📂stock/                    # 재고 CRUD
┃   ┃   ┣━━ 📂employee/                 # 직원 CRUD
┃   ┃   ┣━━ 📂ai/                       # AI 카테고리 추천
┃   ┃   ┣━━ 📂chat/                     # AI 채팅 (OpenAI)
┃   ┃   ┣━━ 📂setting/                  # 계정·매장 설정 API
┃   ┃   ┣━━ 📂store/    
┃   ┃   ┗━━ 📂user/ 
┃   ┗━━ layout.js   
┣━━ 📂components/   
┃   ┣━━ 📂sales/                        # 매출 차트, 요약, AI 컴포넌트
┃   ┣━━ 📂menu/                         # 메뉴 AI 컴포넌트
┃   ┣━━ 📂stock/                        # 재고 클라이언트
┃   ┗━━ 📂setting/                      # 설정 클라이언트
┗━━ 📂lib/  
    ┣━━ 📂ai/tools/                     # Gemini AI 툴 (메뉴·재고·직원·매출)
    ┣━━ 📂db/                           # DB 헬퍼 함수
    ┗━━ 📂utils/                        # 유틸리티 (급여 계산 등)
```


