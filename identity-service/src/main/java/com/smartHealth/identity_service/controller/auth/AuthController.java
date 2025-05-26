package com.smartHealth.identity_service.controller.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.smartHealth.identity_service.dto.reqeuest.ForgotPasswordRequest;
import com.smartHealth.identity_service.dto.reqeuest.LoginRequest;
import com.smartHealth.identity_service.dto.reqeuest.RegisterRequest;
import com.smartHealth.identity_service.dto.response.LoginResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.PostConstruct;
import jakarta.ws.rs.core.Response;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Authentication endpoints")
public class AuthController {
    @Value("${keycloak.admin.server-url}")
    private String keycloakServerUrl;

    @Value("${keycloak.realm}")
    private String realm;

    @Value("${keycloak.client-id}")
    private String clientId;

    @Value("${keycloak.client-secret}")
    private String clientSecret;

    @Value("${keycloak.admin.username}")
    private String adminUsername;

    @Value("${keycloak.admin.password}")
    private String adminPassword;

    private final RestTemplate restTemplate = new RestTemplate();
    private Keycloak keycloakAdmin;

    @PostConstruct
    public void init() {
        keycloakAdmin = KeycloakBuilder.builder()
                .serverUrl(keycloakServerUrl)
                .realm("master") // Realm master để dùng admin
                .username(adminUsername)
                .password(adminPassword)
                .clientId("admin-cli")
                .grantType("password")
                .build();
    }

    @PostMapping("/login")
    @Operation(summary = "Login", description = "Authenticate user and return JWT tokens")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Login successful",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = LoginResponse.class)
            )
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Invalid credentials",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = String.class)
            )
        )
    })
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        String tokenEndpoint = keycloakServerUrl + "/realms/" + realm + "/protocol/openid-connect/token";

        // Chuẩn bị dữ liệu gửi tới Keycloak
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "password");
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);
        body.add("username", loginRequest.getUsername());
        body.add("password", loginRequest.getPassword());

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(tokenEndpoint, request, String.class);
            // Parse JSON
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(response.getBody());

            String accessToken = jsonNode.get("access_token").asText();
            String refreshToken = jsonNode.get("refresh_token").asText();
            String tokenType = jsonNode.get("token_type").asText();
            long expiresIn = jsonNode.get("expires_in").asLong();

            // Decode JWT to extract user info
            DecodedJWT decodedJWT = JWT.decode(accessToken);
            String username = decodedJWT.getClaim("preferred_username").asString();
            String email = decodedJWT.getClaim("email").asString();
            String fullName = decodedJWT.getClaim("name").asString();

            List<String> roles = decodedJWT.getClaim("realm_access").asMap() != null
                    ? (List<String>) ((Map<String, Object>) decodedJWT.getClaim("realm_access").asMap()).get("roles")
                    : new ArrayList<>();

            // Build response
            LoginResponse loginResponse = new LoginResponse();
            loginResponse.setAccessToken(accessToken);
            loginResponse.setRefreshToken(refreshToken);
            loginResponse.setTokenType(tokenType);
            loginResponse.setExpiresIn(expiresIn);

            loginResponse.setUsername(username);
            loginResponse.setEmail(email);
            loginResponse.setFullName(fullName);
            loginResponse.setRoles(roles);

            return ResponseEntity.ok(loginResponse);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        UserRepresentation user = new UserRepresentation();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setEnabled(true);

        CredentialRepresentation passwordCred = new CredentialRepresentation();
        passwordCred.setTemporary(false);
        passwordCred.setType(CredentialRepresentation.PASSWORD);
        passwordCred.setValue(registerRequest.getPassword());
        user.setCredentials(Collections.singletonList(passwordCred));

        try {
            Response response = keycloakAdmin.realm(realm).users().create(user);
            if (response.getStatus() == 201) {
                return ResponseEntity.ok("User registered successfully");
            }
            List<UserRepresentation> users = keycloakAdmin.realm(realm).users().search(registerRequest.getUsername());
            if (users.isEmpty()) {
                return ResponseEntity.status(500).body("User created but not found");
            }
            String userId = users.get(0).getId();

            // Gán role "user" (Realm Role)
            RoleRepresentation userRole = keycloakAdmin.realm(realm).roles().get("user").toRepresentation();
            keycloakAdmin.realm(realm).users().get(userId).roles().realmLevel().add(Collections.singletonList(userRole));

            return ResponseEntity.ok("User registered successfully with role 'user'");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Registration failed: " + e.getMessage());
        }
    }

    // Forgot Password
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        try {
            // Tìm user theo email
            var users = keycloakAdmin.realm(realm).users().search(
                    null,
                    null,
                    null,
                    forgotPasswordRequest.getEmail(),
                    0,
                    1
            );
            if (users.isEmpty()) {
                return ResponseEntity.status(404).body("User not found");
            }

            // Gửi email đặt lại mật khẩu
            String userId = users.get(0).getId();
            System.out.println("Found user with ID: " + userId);
            String clientId = "smarthealth-app";
            String redirectUri = "http://localhost:3000/reset-password";
            System.out.println("Sending reset email for user: " + userId);
            keycloakAdmin.realm(realm).users().get(userId)
                    .executeActionsEmail(clientId, redirectUri, Collections.singletonList("UPDATE_PASSWORD"));
            return ResponseEntity.ok("Password reset email sent");
        } catch (Exception e) {
            System.err.println("Failed to send reset email: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to send reset email: " + e.getMessage());
        }
    }

}
