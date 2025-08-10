# ---------- BUILD STAGE ----------
    FROM node:20-alpine AS build
    WORKDIR /app
    
    # Cài deps dựa trên lockfile để build tái lập
    COPY package.json yarn.lock ./
    RUN yarn install --frozen-lockfile
    
    # Copy code và build
    COPY . .
    # Nếu dùng Prisma: RUN npx prisma generate
    RUN yarn build
    
    # ---------- RUNTIME STAGE ----------
    FROM node:20-alpine AS runtime
    WORKDIR /app
    
    # Chỉ copy những thứ cần cho runtime (code đã build + node_modules prod)
    # Cài đúng prod deps bằng cách re-use lockfile
    COPY package.json yarn.lock ./
    RUN yarn install --frozen-lockfile --production
    
    # Copy output build và bất kỳ file cấu hình runtime cần thiết
    COPY --from=build /app/dist ./dist
    
    # Bảo mật hơn: chạy bằng user không phải root
    RUN addgroup -S nodegrp && adduser -S node -G nodegrp
    USER node
    
    # Cloud Run đặt PORT động -> app của bạn phải listen process.env.PORT
    # (không cần EXPOSE trong Cloud Run, nhưng để lại cũng không sao)
    ENV NODE_ENV=production
    ENV HOST=0.0.0.0
    # Tuỳ NestJS main.ts: đảm bảo dùng process.env.PORT || 3000
    # EXPOSE 8080
    
    CMD ["node", "dist/main"]
    