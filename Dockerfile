# Node 18-alpine 베이스 이미지 사용
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json (또는 yarn.lock) 먼저 복사하여 의존성 설치
COPY package*.json ./
RUN npm install

# 나머지 소스 코드 전체 복사
COPY . .

# 프론트엔드 개발 모드 실행을 위한 포트 3000 노출
EXPOSE 3000

# 개발 모드 실행 (npm run dev)
CMD ["npm", "run", "dev"]
