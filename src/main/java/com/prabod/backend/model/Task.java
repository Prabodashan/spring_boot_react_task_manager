package com.prabod.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @NotBlank(message = "Title is required")
    @NotNull(message = "Title is required")
    @Size(max = 100, message = "Title should not exceed 100 characters")
    private String title;
    @NotBlank(message = "Description is required")
    @NotNull(message = "Description is required")
    @Size(max = 500, message = "Description should not exceed 500 characters")
    private String description;
    @NotBlank(message = "Category is required")
    @NotNull(message = "Category is required")
    private String category;
    @NotBlank(message = "Priority is required")
    @NotNull(message = "Priority is required")
    private String priority;
    @NotBlank(message = "Status is required")
    @NotNull(message = "Status is required")
    private String status;
    @FutureOrPresent(message = "Due date should be in the future or present")
    private LocalDate dueDate;

    @NotNull(message = "UserId is required")
    private long userId;

}
