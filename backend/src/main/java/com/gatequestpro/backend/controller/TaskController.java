package com.gatequestpro.backend.controller;

import com.gatequestpro.backend.dto.TaskRequest;
import com.gatequestpro.backend.dto.TaskResponse;
import com.gatequestpro.backend.entity.Task;
import com.gatequestpro.backend.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> getAllTasks() {

        List<TaskResponse> tasks =
                taskService.getAllTasks()
                        .stream()
                        .map(this::convertToResponse)
                        .toList();

        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTaskById(
            @PathVariable Long id
    ) {

        return taskService.getTaskById(id)
                .map(this::convertToResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(
            @Valid @RequestBody TaskRequest request
    ) {

        Task task = new Task(
                request.getTitle(),
                request.getDescription(),
                request.getTaskDate(),
                request.getStartTime(),
                request.getEndTime(),
                request.getDuration(),
                request.getCompleted(),
                request.getCompletedDate(),
                request.getPriority()
        );

        Task savedTask =
                taskService.createTask(task);

        return ResponseEntity.ok(
                convertToResponse(savedTask)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequest request
    ) {

        Task task = new Task(
                request.getTitle(),
                request.getDescription(),
                request.getTaskDate(),
                request.getStartTime(),
                request.getEndTime(),
                request.getDuration(),
                request.getCompleted(),
                request.getCompletedDate(),
                request.getPriority()
        );

        Task updatedTask =
                taskService.updateTask(id, task);

        return ResponseEntity.ok(
                convertToResponse(updatedTask)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable Long id
    ) {

        taskService.deleteTask(id);

        return ResponseEntity.noContent().build();
    }

    private TaskResponse convertToResponse(
            Task task
    ) {

        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getTaskDate(),
                task.getStartTime(),
                task.getEndTime(),
                task.getDuration(),
                task.getCompleted(),
                task.getCompletedDate(),
                task.getPriority()
        );
    }
}