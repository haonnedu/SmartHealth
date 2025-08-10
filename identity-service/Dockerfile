# ---------- BUILD ----------
    FROM maven:3.9.6-eclipse-temurin-17 AS builder
    WORKDIR /app
    COPY pom.xml .
    RUN mvn -B -q dependency:go-offline
    COPY src ./src
    RUN mvn -B -q -DskipTests clean package
    
    # ---------- RUNTIME ----------
    FROM eclipse-temurin:17-jre-alpine
    WORKDIR /app
    
    # Tạo user non-root
    RUN addgroup -S app && adduser -S app -G app
    USER app
    
    ARG JAR_FILE=/app/target/*-SNAPSHOT.jar
    COPY --from=builder ${JAR_FILE} /app/app.jar
    
    ENV JAVA_OPTS="-XX:MaxRAMPercentage=75 -XX:InitialRAMPercentage=25 -XX:+UseG1GC"
    ENV SPRING_PROFILES_ACTIVE=prod
    
    # Quan trọng: đọc PORT Cloud Run (dùng shell để expand biến)
    CMD sh -c 'exec java $JAVA_OPTS -jar /app/app.jar --server.port=${PORT:-8080}'
    