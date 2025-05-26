package com.smartHealth.identity_service.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Schema(description = "Response object for login endpoint")
public class LoginResponse {
    @Schema(description = "JWT access token", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String accessToken;

    @Schema(description = "JWT refresh token", example = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
    private String refreshToken;

    @Schema(description = "Token type", example = "Bearer")
    private String tokenType;

    @Schema(description = "Token expiration time in seconds", example = "3600")
    private long expiresIn;

    @Schema(description = "Username of the logged-in user", example = "john.doe")
    private String username;

    @Schema(description = "Email of the logged-in user", example = "john.doe@example.com")
    private String email;

    @Schema(description = "Full name of the logged-in user", example = "John Doe")
    private String fullName;

    @Schema(description = "List of roles assigned to the user", example = "[\"PATIENT\", \"USER\"]")
    private List<String> roles;
}
