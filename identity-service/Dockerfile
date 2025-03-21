# Stage 1: Build ứng dụng Spring Boot
FROM maven:3.9.6-eclipse-temurin-17 AS builder

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file pom.xml và tải dependencies
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy toàn bộ mã nguồn và build
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Tạo image chạy ứng dụng
FROM eclipse-temurin:17-jre-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy file JAR từ stage build
COPY --from=builder /app/target/*.jar app.jar

# Mở port ứng dụng
EXPOSE 8081

# Lệnh chạy ứng dụng
ENTRYPOINT ["java", "-jar", "app.jar"]