package com.gatequestpro.backend.service;

import com.gatequestpro.backend.entity.Task;
import com.gatequestpro.backend.entity.User;
import com.gatequestpro.backend.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final CurrentUserService currentUserService;

    public TaskService(
            TaskRepository taskRepository,
            CurrentUserService currentUserService
    ) {
        this.taskRepository = taskRepository;
        this.currentUserService = currentUserService;
    }

    public List<Task> getAllTasks() {

        User currentUser =
                currentUserService.getCurrentUser();

        return taskRepository.findByUser(currentUser);
    }

    public Optional<Task> getTaskById(
            Long id
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        return taskRepository.findByIdAndUser(
                id,
                currentUser
        );
    }

    public Task createTask(
            Task task
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        task.setUser(currentUser);

        return taskRepository.save(task);
    }

    public Task updateTask(
            Long id,
            Task updatedTask
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        Task existingTask =
                taskRepository.findByIdAndUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Task not found with id: " + id
                                )
                        );

        existingTask.setTitle(
                updatedTask.getTitle()
        );

        existingTask.setDescription(
                updatedTask.getDescription()
        );

        existingTask.setTaskDate(
                updatedTask.getTaskDate()
        );

        existingTask.setStartTime(
                updatedTask.getStartTime()
        );

        existingTask.setEndTime(
                updatedTask.getEndTime()
        );

        existingTask.setDuration(
                updatedTask.getDuration()
        );

        existingTask.setCompleted(
                updatedTask.getCompleted()
        );

        existingTask.setCompletedDate(
                updatedTask.getCompletedDate()
        );

        existingTask.setPriority(
                updatedTask.getPriority()
        );

        return taskRepository.save(
                existingTask
        );
    }

    public void deleteTask(
            Long id
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        Task existingTask =
                taskRepository.findByIdAndUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Task not found with id: " + id
                                )
                        );

        taskRepository.delete(
                existingTask
        );
    }
}