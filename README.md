## Clush Task Manager
![image](https://obsidian-images-diligentp.s3.ap-northeast-2.amazonaws.com/f3c4d56f137fd2c024e5b40dedb6659c.png)
**Clush Task Manager**는 할일 관리와 일정 관리를 통합한 생산성 관리 도구입니다.

**주요 기능**
- ✅**스마트 할일 관리**: 제목/설명 작성, 완료 상태 관리, 필터링 기능
- ✅**통합 캘린더**: 월별 일정 조회, 드래그 앤 드롭으로 일정 이동
- ✅ **일정 공유**: 공유 가능한 링크 생성을 통한 팀 일정 전달


**기술 스택**

| **구분**          | **기술**                                                                                            |
|--------------------|----------------------------------------------------------------------------------------------------|
| **백엔드**        | - Spring Boot 3.3.8 <br> - Java 17 <br> - MapStruct (DTO 변환) <br> - Lombok (보일러플레이트 감소)   |
| **데이터베이스**   | - MySQL 8.0 (개발)<br> - H2 (테스트)                                                               |
| **프론트엔드**     | - React 18 <br> - TypeScript <br> - Vite <br> - Moment.js (날짜 관리) <br> - Ant Design v4 (UI)    |
| **개발 환경**     | - Docker Compose                                                                                   |


## 주요 접속 정보 (실행 방법 가이드)
### 옵션 1: 로컬 개발 환경 실행 (Docker-Compose 사용)
1. **프로젝트 클론**
```bash
git clone https://github.com/DiligentP/clush-assignment.git
cd clush-assignment
```
2. **Docker Compose 실행**
```bash
docker-compose up --build  또는  docker compose up --build
```

| 서비스    | URL                          | 비고                          |
|-----------|------------------------------|-------------------------------|
| 프론트엔드 | http://localhost:3000       | Ant Design 기반 UI           |
| 백엔드    | http://localhost:8080       | Swagger 문서 리다이렉트            |
| MySQL     | jdbc:mysql://localhost:3306 | 사용자: clush, 비밀번호: clush |

### 옵션 2: 배포 서버 바로 사용
| 서비스    | URL                                | 주요 기능                     |
|-----------|------------------------------------|-----------------------------|
| 프론트엔드 | https://clush.diligentp.com       | 할일 관리 + 캘린더 조회      |
| 백엔드 API | https://clush-be.diligentp.com    | Swagger 문서 리다이렉트 |

## API 명세서
![image](https://obsidian-images-diligentp.s3.ap-northeast-2.amazonaws.com/281009a38e03c716ac5e03c8cda2aba6.png)
https://clush-be.diligentp.com

## 테스트 케이스
**TodoService 테스트**
| 테스트 이름 | 설명 |
|------------|------|
| `createTodo_Success` | 할일 생성 성공 시 올바른 응답 반환 및 저장 로직 검증 |
| `updateTodo_InvalidId` | 존재하지 않는 ID로 수정 시도 시 예외 발생 확인 |
| `updateTodoStatus_Success` | 할일 완료 상태 업데이트 정상 동작 검증 |
| `updateTodoStatus_NotFound` | 존재하지 않는 ID로 상태 업데이트 시도 시 예외 처리 확인 |

**CalendarService 테스트**
| 테스트 이름 | 설명 |
|------------|------|
| `createEvent_Success` | 새 일정 생성 시 정상 응답 및 저장 로직 검증 |
| `getEventsByMonth_NoEvents` | 해당 월에 일정이 없을 때 빈 리스트 반환 확인 |
| `getEventsByMonth_WithEvents` | 월별 일정 조회 시 데이터 매핑 및 필터링 정상 동작 검증 |
| `deleteEvent_WithValidId` | 유효한 ID로 삭제 시도 시 repository delete 호출 확인 |
| `updateEvent_Success` | 기존 일정 수정 시 변경 사항 반영 및 저장 로직 검증 |
| `updateEvent_InvalidId` | 존재하지 않는 ID로 수정 시도 시 예외 발생 확인 |

**공통 테스트 패턴**
- Mockito를 이용한 의존성 모킹
- Given-When-Then 패턴 적용
- 예외 발생 시나리오 검증

## 디렉토리 구조
```bash
clush/
├── backend/ # Spring Boot 애플리케이션
├── frontend/ # React 애플리케이션
├── db/ # 데이터베이스 벡업 및 초기화 스크립트
└── docker-compose.yaml
```
