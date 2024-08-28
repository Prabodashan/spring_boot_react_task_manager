package com.prabod.backend.controller;

import com.prabod.backend.model.Task;
import com.prabod.backend.model.User;
import com.prabod.backend.response.Response;
import com.prabod.backend.service.TaskService;
import com.prabod.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/task")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;
    private final UserService userService;

    @GetMapping("/user/{id}")
    public ResponseEntity<?> findAllByUserId(@PathVariable long id) {
        List<Task> tasks = taskService.getTaskUserById(id);

        // Check if the list is empty
        if (tasks.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response.ResponseBuilder()
                    .status(false)
                    .message("Task not found.")
                    .data(null)
                    .build());
        } else {
            // The list is not empty
            return ResponseEntity.status(HttpStatus.OK).body(new Response.ResponseBuilder()
                    .status(true)
                    .message("Successfully fetched task!")
                    .data(tasks)
                    .build());
        }

    }

    @GetMapping("/user/{id}/filter")
    public ResponseEntity<?> findFilterByUserId(@PathVariable long id,
                                                @RequestParam(required = false) String title,
                                                @RequestParam(required = false) String category,
                                                @RequestParam(required = false) String priority,
                                                @RequestParam(required = false) String status,
                                                @RequestParam(required = false) String dueDate) {

        List<Task> tasks = taskService.filterTasksByUser(title, category, priority, status, dueDate, id);


        // Check if the list is empty
        if (tasks.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response.ResponseBuilder()
                    .status(false)
                    .message("Tasks not found.")
                    .data(null)
                    .build());
        } else {
            // The list is not empty
            return ResponseEntity.status(HttpStatus.OK).body(new Response.ResponseBuilder()
                    .status(true)
                    .message("Successfully fetched tasks!")
                    .data(tasks)
                    .build());
        }


    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findTaskById(@PathVariable long id) {

        Optional<Task> getTask = taskService.getTaskById(id);

        if (getTask.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(new Response.ResponseBuilder()
                    .status(true)
                    .message("Successfully fetched task!")
                    .data(getTask)
                    .build());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response.ResponseBuilder()
                .status(false)
                .message("Task not found.")
                .data(null)
                .build());
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@Valid @RequestBody Task task) {
        User user = userService.getUserById(task.getUserId());
        if (user != null) {
            Task newTask = taskService.createTask(task);
            return ResponseEntity.status(HttpStatus.CREATED).body(new Response.ResponseBuilder()
                    .status(true)
                    .message("Task successfully created!")
                    .data(newTask)
                    .build());
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response.ResponseBuilder()
                .status(false)
                .message("User not found.")
                .data(null)
                .build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@Valid @RequestBody Task content, @PathVariable Integer id) {
        if (!taskService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response.ResponseBuilder()
                    .status(false)
                    .message("Task not found.")
                    .data(null)
                    .build());
        }
        Task updatedTask = taskService.updateTaskById(id, content);
        return ResponseEntity.status(HttpStatus.OK).body(new Response.ResponseBuilder()
                .status(true)
                .message("Task successfully updated!")
                .data(updatedTask)
                .build());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable long id) {
        if (!taskService.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Response.ResponseBuilder()
                    .status(false)
                    .message("Task not found.")
                    .data(null)
                    .build());
        }
        taskService.deleteTaskById(id);
        return ResponseEntity.status(HttpStatus.OK).body(new Response.ResponseBuilder()
                .status(true)
                .message("Task successfully deleted!")
                .data(null)
                .build());
    }
}
