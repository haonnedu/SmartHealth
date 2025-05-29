# Base image để build
FROM node:18-alpine AS builder

WORKDIR /app

# Copy file cấu hình env
COPY .env.production .env.production

# Copy package trước để cache hiệu quả
COPY package*.json ./

RUN npm install

# Copy toàn bộ source
COPY . .

# Build với env production
ENV NODE_ENV=production
RUN npm run build

# Image nhỏ để chạy production
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

EXPOSE 3000
CMD ["npm", "run", "start"]
