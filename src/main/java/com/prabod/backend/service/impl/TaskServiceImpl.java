package com.prabod.backend.service.impl;

import com.prabod.backend.model.Task;
import com.prabod.backend.repository.TaskRepository;
import com.prabod.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getTaskUserById(long id) {
        return taskRepository.findAllByUserId(id);
    }

    public List<Task> filterTasksByUser(String title, String category, String priority, String status, String dueDate, long userId) {

        return taskRepository.filterTasksByUserId(
                title != null && !title.isEmpty() ? title : null,
                category != null && !category.isEmpty() ? category : null,
                priority != null && !priority.isEmpty() ? priority : null,
                status != null && !status.isEmpty() ? status : null,
                dueDate != null && !dueDate.isEmpty() ? LocalDate.parse(dueDate) : null,
                userId
        );
    }

    @Override
    public Optional<Task> getTaskById(long id) {
        return taskRepository.findById(id);
    }


    @Override
    public Task updateTaskById(long id, Task task) {
        Task updateTask = taskRepository.findById(id).orElse(null);

        if (updateTask == null) return null;

        updateTask.setTitle(task.getTitle());
        updateTask.setDescription(task.getDescription());
        updateTask.setCategory(task.getCategory());
        updateTask.setPriority(task.getPriority());
        updateTask.setStatus(task.getStatus());
        updateTask.setDueDate(task.getDueDate());

        return taskRepository.save(updateTask);

    }

    @Override
    public Boolean existsById(long id) {
        return taskRepository.existsById(id);
    }

    @Override
    public void deleteTaskById(long id) {
        taskRepository.deleteById(id);
    }

}
