# clush-project

## 프로젝트 개요

## 요구사항

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
