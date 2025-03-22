package com.smartHealth.identity_service.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(
                title = "Smart Health Identity API",
                version = "1.0",
                description = "API Swagger for identity service"
        )
)
@Configuration
public class SwaggerConfig {
}