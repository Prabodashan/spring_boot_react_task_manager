package com.prabod.backend.dto;

import com.prabod.backend.model.Role;
import jakarta.persistence.Column;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {

    @Valid

    @NotBlank(message = "Name is required")
    @NotNull(message = "Name is required")
    private String name;
    @NotBlank(message = "Email is required")
    @NotNull(message = "Email is required")
    @Email(message = "Email should be valid")
    @Column(unique=true)
    private String email;
    @NotBlank(message = "Password is required")
    @NotNull(message = "Password is required")
    @Size(min = 6, message = "Password should be at least 6 characters long")
    private String password;
    private Role role;
}
