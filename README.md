# clush-project

## 프로젝트 개요


## 기술 스택
- **프론트엔드**: React 18, TypeScript, Vite, Ant Design v4
- **백엔드**: Spring Boot 3.3.8, Java 17
- **데이터베이스**: MySQL 8.0
- **인프라**: Docker Compose

## 실행 방법
1. **Docker 설치**: Docker가 설치되어 있어야 합니다.
2. **프로젝트 클론**: 이 저장소를 클론합니다.
   ```bash
   git clone https://github.com/DiligentP/clush.git
   cd clush
   ```
3. **Docker Compose 실행**: 다음 명령어로 모든 서비스를 실행합니다.
   ```bash
   docker-compose up --build
   ```
4. **프론트엔드 접근**: 브라우저에서 `http://localhost:3000`에 접속하여 프론트엔드 애플리케이션을 확인합니다.
5. **백엔드 접근**: 백엔드 API는 `http://localhost:8080`에서 사용할 수 있습니다.

## 디렉토리 구조
```bash
clush/
├── backend/ # Spring Boot 애플리케이션
├── frontend/ # React 애플리케이션
├── db/ # 데이터베이스 벡업 및 초기화 스크립트
└── docker-compose.yaml
```