# ---------- BUILD STAGE ----------
    FROM node:20-alpine AS builder
    WORKDIR /app
    
    # Cài deps theo lockfile
    COPY package*.json ./
    RUN npm ci
    
    # Copy code và build
    COPY . .
    RUN npm run build
    
    # ---------- RUNTIME STAGE ----------
    FROM node:20-alpine AS runtime
    WORKDIR /app
    
    # Chỉ copy các file cần cho runtime
    COPY package*.json ./
    RUN npm ci --only=production
    
    COPY --from=builder /app/dist ./dist
    
    # Tạo user non-root
    RUN addgroup -S app && adduser -S app -G app
    USER app
    
    # Cloud Run sẽ set biến PORT → app phải đọc process.env.PORT
    # Ví dụ trong main.ts (NestJS/Express):
    # const port = process.env.PORT || 3000;
    # await app.listen(port, '0.0.0.0');
    
    ENV NODE_ENV=production
    
    CMD ["npm", "run", "start:prod"]
    