package com.smartHealth.identity_service.exception;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppException extends RuntimeException {

    private MessageCode messageCode;

}
