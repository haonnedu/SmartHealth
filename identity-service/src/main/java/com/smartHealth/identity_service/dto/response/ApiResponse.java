package com.smartHealth.identity_service.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse <T> {

    private int code;
    private String message;
    private T result;

}
