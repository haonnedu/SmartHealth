package com.smartHealth.identity_service.dto.reqeuest;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserUpdateRequest {
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private LocalDate dob;
}
