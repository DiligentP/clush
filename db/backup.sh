#!/bin/bash
set -euo pipefail

# MySQL 접속 정보
MYSQL_USER="clush"
DATABASE="clush_db"
CONTAINER_NAME="clush-assignment-db-1"
TMP_DIR="./db/init/tmp"
TMP_FILE="$TMP_DIR/.tmp_backup.sql"
TARGET_FILE="./db/init/02-initial-data.sql"

# 환경 변수를 통한 패스워드 설정 (컨테이너 내부 전용)
export MYSQL_PWD="clush"

# 백업 디렉토리 생성
mkdir -p "$TMP_DIR"

# 임시 파일 초기화
> "$TMP_FILE"

# 완전한 INSERT 문 생성 (컬럼명 포함)
docker exec -e MYSQL_PWD="$MYSQL_PWD" "$CONTAINER_NAME" mysqldump -u "$MYSQL_USER" \
  --no-tablespaces \
  --single-transaction \
  --no-create-info \
  --skip-triggers \
  --compact \
  --complete-insert \
  --ignore-table="$DATABASE.calendar_event_share" \
  "$DATABASE" todo calendar_event > "$TMP_FILE"

# 데이터 초기화 명령어 추가
sed -i '1i DELETE FROM calendar_event;' "$TMP_FILE"
sed -i '1i DELETE FROM todo;' "$TMP_FILE"

# 파일 이동 및 기존 데이터 덮어쓰기
mv -f "$TMP_FILE" "$TARGET_FILE"

echo "✅ 초기 데이터 파일 업데이트 완료: 02-initial-data.sql"
