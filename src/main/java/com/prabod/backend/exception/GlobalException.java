package com.prabod.backend.exception;

import com.prabod.backend.response.Response;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalException {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Response> handle(ResponseStatusException ex) {
        return ResponseEntity.status(ex.getStatusCode()).body(new Response.ResponseBuilder()
                .status(false)
                .message(ex.getReason())
                .data(null)
                .build());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Response> handle(MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response.ResponseBuilder()
                .status(false)
                .message("Invalid data")
                .data(errors)
                .build());
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
        String errorMessage = "Email address already exists. Please use a different email.";
        String fieldName = "email";
        Map<String, String> errors = new HashMap<>();
        errors.put(fieldName, errorMessage);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response.ResponseBuilder()
                .status(false)
                .message("Invalid data")
                .data(errors)
                .build());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Response> handle(Exception ex) {

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new Response.ResponseBuilder()
                .status(false)
                .message(ex.getMessage())
                .data(null)
                .build());
    }
}
