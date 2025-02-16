## Clush Task Manager
![image](https://obsidian-images-diligentp.s3.ap-northeast-2.amazonaws.com/fe2af3c2f94fdb0d269c60cda0eef1af.png)
**Clush Task Manager**는 할일 관리와 일정 관리를 통합한 생산성 관리 도구입니다.

**주요기능**
- 📝 **스마트 할일 관리**: 제목/설명 작성, 완료 상태 관리, 필터링 기능
- 🗓️ **통합 캘린더**: 월별/주별/일별 일정 조회, 드래그 앤 드롭으로 일정 이동
- 🔗 **일정 공유**: 공유 가능한 링크 생성을 통한 팀 일정 협업

**핵심 기능**
- 실시간 할일 상태 동기화
- 반응형 캘린더 뷰 (Ant Design Calendar 기반)
- RESTful API 기반 백엔드 (Spring Boot)
- MySQL을 이용한 데이터 영속성 관리


## 기술 스택
**백엔드**
- Spring Boot 3.3.8, Java 17
- DB: H2 (테스트), MySQL (개발)
- MapStruct: DTO 변환
- Lombok: 보일러플레이트 코드 감소

**프론트엔드**
- React 18, TypeScript, Vite
- Moment.js: 날짜 관리
- Ant Design v4: UI 컴포넌트

**데이터베이스**: MySQL 8.0

**개발환경**: Docker Compose

## 실행 방법
1. **Docker 설치**
2. **프로젝트 클론**
   ```bash
   git clone https://github.com/DiligentP/clush-assignment.git
   cd clush
   ```
3. **Docker Compose 실행**
   ```bash
   docker-compose up --build
   ```
4. **프론트엔드 접근**: `http://localhost:3000`
5. **백엔드 접근**: `http://localhost:8080`

## 디렉토리 구조
```bash
clush/
├── backend/ # Spring Boot 애플리케이션
├── frontend/ # React 애플리케이션
├── db/ # 데이터베이스 벡업 및 초기화 스크립트
└── docker-compose.yaml
```
