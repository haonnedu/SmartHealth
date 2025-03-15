package com.smartHealth.identity_service.exception;

import com.smartHealth.identity_service.dto.response.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(value = RuntimeException.class)
    ResponseEntity<ApiResponse> handleRuntimeException(RuntimeException e) {
        logger.error("Unexpected error occurred: ", e);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        apiResponse.setMessage(e.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }
    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse> handleAppException(RuntimeException e) {
        logger.error("Unexpected error occurred: ", e);
        ApiResponse apiResponse = new ApiResponse();
        apiResponse.setCode(HttpStatus.INTERNAL_SERVER_ERROR.value());
        apiResponse.setMessage(e.getMessage());
        return ResponseEntity.badRequest().body(apiResponse);
    }
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Map<String, String>> handleTypeMismatchException(MethodArgumentTypeMismatchException ex) {
        logger.error("Exception occurred: Invalid input provided - {}", ex.getMessage());

        Map<String, String> errorResponse = new HashMap<>();

        if (ex.getRequiredType() != null && ex.getRequiredType().equals(UUID.class)) {
            errorResponse.put("error", "Invalid UUID format");
            errorResponse.put("message", "The provided ID must be a valid UUID");
        } else {
            errorResponse.put("error", "Invalid argument type");
            errorResponse.put("message", ex.getMessage());
        }

        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

}
