# 1. 빌드 단계: Node 18 Alpine 이미지를 사용하여 의존성 설치 및 빌드 수행
FROM node:18-bullseye AS builder
WORKDIR /app

# package.json (및 package-lock.json 또는 yarn.lock) 복사
COPY package*.json ./

# 의존성 설치 (npm ci는 package-lock.json이 있을 때 권장)
RUN npm ci

# 소스코드 전체 복사
COPY . .

# production 빌드 실행 (package.json의 build 스크립트 확인)
RUN npm run build

# 2. 실행 단계: production용 Node 18 Alpine 이미지 사용
FROM node:18-alpine AS runner
WORKDIR /app

# NODE_ENV를 production으로 지정
ENV NODE_ENV=production

# 빌드 결과물을 포함한 전체 애플리케이션 복사
COPY --from=builder /app . 

# 포트 3000 노출
EXPOSE 3000

# 실행 명령 (npm start는 package.json의 start 스크립트에 맞게 동작)
CMD ["npm", "run", "dev"]

