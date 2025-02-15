# clush-project

## 프로젝트 개요


## 기술 스택
- **프론트엔드**: React 18, TypeScript, Vite, Ant Design v4
- **백엔드**: Spring Boot 3.3.8, Java 17
- **데이터베이스**: MySQL 8.0
- **인프라**: Docker Compose

## 실행 방법
1. **Docker 설치**
2. **프로젝트 클론**
   ```bash
   git clone https://github.com/DiligentP/clush.git
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
