# ---------- BUILD STAGE ----------
    FROM node:20-alpine AS build
    WORKDIR /app
    
    # Cài deps dựa trên lockfile để build tái lập
    COPY package.json yarn.lock ./
    RUN yarn install --frozen-lockfile
    
    # Copy code và build
    COPY . .
    # Nếu dùng Prisma, uncomment:
    # RUN npx prisma generate
    RUN yarn build
    
    # ---------- RUNTIME STAGE ----------
    FROM node:20-alpine AS runtime
    WORKDIR /app
    
    ENV NODE_ENV=production
    ENV HOST=0.0.0.0
    
    # Copy lockfile và cài production deps
    COPY package.json yarn.lock ./
    RUN yarn install --frozen-lockfile --production
    
    # Copy output build từ stage build, đảm bảo quyền thuộc về user 'node'
    COPY --chown=node:node --from=build /app/dist ./dist
    
    # Nếu app cần các file runtime khác (ví dụ prisma schema, .env.example...), copy thêm tại đây
    # COPY --chown=node:node --from=build /app/prisma ./prisma
    
    # Chạy bằng user 'node' có sẵn trong image
    USER node
    
    # NestJS build mặc định ra dist/main.js
    CMD ["node", "dist/main.js"]
    