package com.prabod.backend.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequest {

    @NotBlank(message = "Email is required")
    @NotNull(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(unique=true)
    private String email;
    @NotBlank(message = "Password is required")
    @NotNull(message = "Password is required")
    @Size(min = 6, message = "Password should be at least 6 characters long")
    private String password;
}
