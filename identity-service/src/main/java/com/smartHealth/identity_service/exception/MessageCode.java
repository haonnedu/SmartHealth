package com.smartHealth.identity_service.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public enum MessageCode {
    USER_EXISTED(1000,"User Existed")
    ;
    private int code;
    private String message;
}
