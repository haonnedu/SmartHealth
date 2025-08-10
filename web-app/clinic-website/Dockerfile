# ---------- BUILD STAGE ----------
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    # Cài deps theo lockfile
    COPY package.json package-lock.json* ./
    RUN npm ci
    
    # Copy code
    COPY . .
    
    # (Tuỳ) Nếu bạn muốn nhúng biến PUBLIC vào client tại build-time:
    # ARG NEXT_PUBLIC_API_URL
    # ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
    
    # Build Next ở chế độ standalone (Next 13/14)
    ENV NODE_ENV=production
    RUN npm run build
    
    # ---------- RUNTIME STAGE ----------
    FROM node:20-alpine AS runner
    WORKDIR /app
    
    # Chỉ copy những gì cần cho runtime
    # Standalone có kèm node_modules tối thiểu
    COPY --from=builder /app/.next/standalone ./
    COPY --from=builder /app/.next/static ./.next/static
    COPY --from=builder /app/public ./public
    
    # Bảo mật: chạy non-root
    RUN addgroup -S app && adduser -S app -G app
    USER app
    
    # Cloud Run sẽ set PORT động; standalone server đọc process.env.PORT
    # Không bắt buộc EXPOSE với Cloud Run
    ENV NODE_ENV=production
    
    # Server.js nằm ở root của standalone
    CMD ["node", "server.js"]
    