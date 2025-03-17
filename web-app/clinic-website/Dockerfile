# 1. Chọn base image Node.js LTS
FROM node:18-alpine AS builder

# 2. Tạo thư mục làm việc
WORKDIR /app

# 3. Copy file package.json và package-lock.json (nếu có)
COPY package*.json ./

# 4. Cài đặt dependencies
RUN npm install

# 5. Copy toàn bộ mã nguồn
COPY . .

# 6. Build dự án Next.js
RUN npm run build

# 7. Dùng một image nhỏ hơn để chạy
FROM node:18-alpine AS runner

WORKDIR /app

# Copy thư mục .next, node_modules, package.json từ giai đoạn build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# 8. Expose cổng
EXPOSE 3000

# 9. Lệnh chạy server Next.js
CMD ["npm", "run", "start"]
