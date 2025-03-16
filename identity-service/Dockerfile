FROM eclipse-temurin:23-jdk-alpine
LABEL authors="hao.nn"
# Đặt thư mục làm việc trong container
WORKDIR /app

# Copy file JAR từ thư mục target vào container
COPY target/identity-service-0.0.1-SNAPSHOT.jar identity-service.jar

# Expose cổng 8081 để ứng dụng có thể truy cập từ bên ngoài
EXPOSE 8081

# Chạy ứng dụng Spring Boot
CMD ["java", "-jar", "identity-service.jar"]
