package com.prabod.backend.service.impl;

import com.prabod.backend.model.Task;
import com.prabod.backend.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

class TaskServiceImplTest {

    //declare the dependencies
    @Mock
    TaskRepository taskRepository;
    //service to test
    @InjectMocks
    private TaskServiceImpl taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void shouldSuccessfullyCreateTask() {
        //Given
        Task task = new Task();
        task.setTitle("New Task");
        task.setDescription("New Description");
        task.setCategory("personal");
        task.setPriority("medium");
        task.setStatus("created");
        task.setDueDate(LocalDate.parse("2024-08-30"));

        Task newTask = new Task();
        newTask.setId(1);
        newTask.setTitle("New Task");
        newTask.setDescription("New Description");
        newTask.setCategory("personal");
        newTask.setPriority("medium");
        newTask.setStatus("created");
        newTask.setDueDate(LocalDate.parse("2024-08-30"));

        //Mock the call
        Mockito.when(taskRepository.save(task)).thenReturn(newTask);

        //When
        Task createdTask = taskService.createTask(task);

        //Then
        assertEquals(task.getTitle(),
                createdTask.getTitle());
        assertEquals(task.getDescription(),
                createdTask.getDescription());
        assertEquals(task.getCategory()
                , createdTask.getCategory());
        assertEquals(task.getPriority(),
                createdTask.getPriority());
        assertEquals(task.getDueDate(),
                createdTask.getDueDate());

        Mockito.verify(taskRepository,
                Mockito.times(1)).save(task);
    }

    @Test
    public void  shouldReturnAllTasks() {
        //Given
        long taskId = 1;
        Task task1 = new Task();
        task1.setTitle("New Task");
        task1.setDescription("New Description");
        task1.setCategory("personal");
        task1.setPriority("medium");
        task1.setStatus("created");
        task1.setDueDate(LocalDate.parse("2024-08-30"));
        task1.setUserId(1);

        List<Task> tasks = new ArrayList<>();
        tasks.add(task1);

        //Mock the calls
        Mockito.when(taskRepository.findAllByUserId(taskId)).thenReturn(tasks);

        //When
       List<Task> userTask = taskService.getTaskUserById(taskId);

       //Then
        assertEquals(tasks.size(), userTask.size());
        Mockito.verify(taskRepository,
                Mockito.times(1)).findAllByUserId(1);

    }

    @Test
    public void testFilterTasksByUser_AllParameters() {
       //Given
        String title = "Test Title";
        String category = "Work";
        String priority = "High";
        String status = "In Progress";
        String dueDate = "2024-09-01";
        long userId = 1L;

        List<Task> mockTasks = new ArrayList<>();
        mockTasks.add(new Task()); // Add mock tasks as needed

        //Mock the call
        when(taskRepository.filterTasksByUserId(
                eq(title),
                eq(category),
                eq(priority),
                eq(status),
                eq(LocalDate.parse(dueDate)),
                eq(userId)
        )).thenReturn(mockTasks);

        //When
        List<Task> filteredTasks = taskService.filterTasksByUser(title, category, priority, status, dueDate, userId);

        //Then
        assertEquals(mockTasks, filteredTasks);
        verify(taskRepository).filterTasksByUserId(
                eq(title),
                eq(category),
                eq(priority),
                eq(status),
                eq(LocalDate.parse(dueDate)),
                eq(userId)
        );
    }


    @Test
    public void testFilterTasksByUser_NullParameters() {
        //Given
        String title = null;
        String category = null;
        String priority = null;
        String status = null;
        String dueDate = null;
        long userId = 1L;

        List<Task> mockTasks = new ArrayList<>();
        mockTasks.add(new Task()); // Add mock tasks as needed

        //Mock the call
        when(taskRepository.filterTasksByUserId(
                eq(null),
                eq(null),
                eq(null),
                eq(null),
                eq(null),
                eq(userId)
        )).thenReturn(mockTasks);

        //When
        List<Task> filteredTasks = taskService.filterTasksByUser(title, category, priority, status, dueDate, userId);

        //Then
        assertEquals(mockTasks, filteredTasks);
        verify(taskRepository).filterTasksByUserId(
                eq(null),
                eq(null),
                eq(null),
                eq(null),
                eq(null),
                eq(userId)
        );
    }


    @Test
    public void testFilterTasksByUser_EmptyStringParameters() {
        //Given
        String title = "";
        String category = "";
        String priority = "";
        String status = "";
        String dueDate = "";
        long userId = 1L;

        List<Task> mockTasks = new ArrayList<>();
        mockTasks.add(new Task()); // Add mock tasks as needed

        //Mock the call
        when(taskRepository.filterTasksByUserId(
                eq(null),
                eq(null),
                eq(null),
                eq(null),
                eq(null),
                eq(userId)
        )).thenReturn(mockTasks);

        //When
        List<Task> filteredTasks = taskService.filterTasksByUser(title, category, priority, status, dueDate, userId);

        //Then
        assertEquals(mockTasks, filteredTasks);
        verify(taskRepository).filterTasksByUserId(
                eq(null),
                eq(null),
                eq(null),
                eq(null),
                eq(null),
                eq(userId)
        );
    }

    @Test
    public void  shouldReturnTaskById() {

        //Given
        long taskId = 1;
        Task task = new Task();
        task.setTitle("New Task");
        task.setDescription("New Description");
        task.setCategory("personal");
        task.setPriority("medium");
        task.setStatus("created");
        task.setDueDate(LocalDate.parse("2024-08-30"));
        task.setUserId(taskId);

        //Mock the calls
        Mockito.when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

        //When
        Optional<Task> userTask = taskService.getTaskById(taskId);

        //Then
        assertEquals(task.getTitle(),
                userTask.get().getTitle());
        assertEquals(task.getDescription(),
                userTask.get().getDescription());
        assertEquals(task.getCategory()
                , userTask.get().getCategory());
        Mockito.verify(taskRepository,
                Mockito.times(1)).findById(taskId);
    }

    @Test
    public void testUpdateTaskById_TaskExists() {
        //Given
        long taskId = 1L;
        long userId = 2L;
        Task existingTask = new Task();
        existingTask.setId(taskId);
        existingTask.setTitle("Old Title");
        existingTask.setDescription("Old Description");
        existingTask.setCategory("personal");
        existingTask.setPriority("High");
        existingTask.setStatus("In Progress");
        existingTask.setDueDate(LocalDate.now());
        existingTask.setUserId(userId);

        Task newTaskData = new Task();
        newTaskData.setId(taskId);
        newTaskData.setTitle("New Title");
        newTaskData.setDescription("New Description");
        newTaskData.setCategory("personal");
        newTaskData.setPriority("High");
        newTaskData.setStatus("In Progress");
        newTaskData.setDueDate(LocalDate.now());
        newTaskData.setUserId(userId);

        //Mock the calls
        Mockito.when(taskRepository.findById(taskId)).thenReturn(Optional.of(existingTask));
        Mockito.when(taskRepository.save(newTaskData)).thenReturn(newTaskData);

        // When
        Task updatedTask = taskService.updateTaskById(taskId, newTaskData);

        // Then
        assertEquals(newTaskData.getTitle(), updatedTask.getTitle());
        assertEquals(newTaskData.getDescription(), updatedTask.getDescription());
        assertEquals(newTaskData.getCategory(), updatedTask.getCategory());
        assertEquals(newTaskData.getPriority(), updatedTask.getPriority());
        assertEquals(newTaskData.getStatus(), updatedTask.getStatus());
        assertEquals(newTaskData.getDueDate(), updatedTask.getDueDate());
        Mockito.verify(taskRepository).save(existingTask);
        Mockito.verify(taskRepository,
                Mockito.times(1)).findById(taskId);
        Mockito.verify(taskRepository,
                Mockito.times(1)).save(newTaskData);
    }

    @Test
    public void testUpdateTaskById_TaskDoesNotExist() {
        // Arrange
        long taskId = 1L;
        Task newTaskData = new Task();
        newTaskData.setTitle("New Title");
        newTaskData.setDescription("New Description");

        // Mocking findById to return an empty Optional
        Mockito.when(taskRepository.findById(taskId)).thenReturn(Optional.empty());

        // Act
        Task updatedTask = taskService.updateTaskById(taskId, newTaskData);

        // Assert
        assertNull(updatedTask);  // The method should return null if the task was not found
        Mockito.verify(taskRepository).findById(taskId);
        Mockito.verify(taskRepository, never()).save(newTaskData);  // save should not be called
    }

    @Test
    public void testDeleteTaskById() {
        // Given
        long taskId = 1L;

        // When
        taskService.deleteTaskById(taskId);

        // Then
       Mockito.verify(taskRepository, Mockito.times(1)).deleteById(taskId);
    }
}