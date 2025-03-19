package com.smartHealth.identity_service.dto.reqeuest;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ForgotPasswordRequest {
    @NotNull(message = "Email is required")
    @Email(message = "Email must be valid")
    @JsonProperty("email")
    private String email;
}
