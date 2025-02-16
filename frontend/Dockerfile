FROM node:18

WORKDIR /app

# 헬스체크 스크립트 설치
RUN apt-get update && apt-get install -y curl

COPY package*.json ./
RUN npm install --force

COPY . .

# 헬스체크 및 실행 스크립트
COPY wait-for-backend.sh .
RUN chmod +x wait-for-backend.sh

EXPOSE 5173
CMD ["sh", "./wait-for-backend.sh", "npm", "run", "dev"]