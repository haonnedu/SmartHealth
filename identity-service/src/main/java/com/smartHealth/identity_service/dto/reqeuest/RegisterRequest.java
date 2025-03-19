package com.smartHealth.identity_service.dto.reqeuest;

import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
}
