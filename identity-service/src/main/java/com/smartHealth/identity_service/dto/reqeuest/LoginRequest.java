package com.smartHealth.identity_service.dto.reqeuest;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
