package com.prabod.backend.service;

import com.prabod.backend.model.Task;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    Task createTask(Task task);

    List<Task> getTaskUserById(long id);

    List<Task> filterTasksByUser(String title, String category, String priority, String status, String dueDate, long userId);

    Optional<Task> getTaskById(long id);

    Task updateTaskById(long id, Task task);

    Boolean existsById(long id);

    void deleteTaskById(long id);
}
