# clush-recruit project

## 프로젝트 개요
MERN 스택 기반의 웹 애플리케이션으로, 사용자 관리 및 실시간 데이터 동기화 기능을 제공합니다.

## 기술 스택
- **프론트엔드**: React 18, TypeScript, Vite
- **백엔드**: Spring Boot 3.3.8, Java 17
- **데이터베이스**: MySQL 8.0
- **인프라**: Docker Compose

## 디렉토리 구조
```bash
clush-recruit/
├── backend/ # Spring Boot 애플리케이션
├── frontend/ # React 애플리케이션
├── db/ # 데이터베이스 벡업 및 초기화 스크립트
└── docker-compose.yaml
```

## 주요 설정
### 백엔드 데이터베이스 설정
```bash
backend/src/main/resources/application.yml
backend/src/test/resources/application-test.yml
```