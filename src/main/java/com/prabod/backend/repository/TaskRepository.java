package com.prabod.backend.repository;

import com.prabod.backend.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByUserId(long id);

    @Query("SELECT t FROM Task t WHERE " +
            "(:title IS NULL OR t.title LIKE %:title%) AND " +
            "(:category IS NULL OR t.category = :category) AND " +
            "(:priority IS NULL OR t.priority = :priority) AND " +
            "(:status IS NULL OR t.status = :status) AND " +
            "(:dueDate IS NULL OR t.dueDate <= :dueDate) AND " +
            "t.userId = :userId")
    List<Task> filterTasksByUserId(
            @Param("title") String title,
            @Param("category") String category,
            @Param("priority") String priority,
            @Param("status") String status,
            @Param("dueDate") LocalDate dueDate,
            @Param("userId") long userId
    );

}
