package com.gatequestpro.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.time.LocalTime;

public class TaskRequest {

    @NotBlank(message = "Task title is required")
    @Size(
            min = 2,
            max = 200,
            message = "Task title must be between 2 and 200 characters"
    )
    private String title;

    @Size(
            max = 2000,
            message = "Task description must not exceed 2000 characters"
    )
    private String description;

    @NotNull(message = "Task date is required")
    private LocalDate taskDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private Double duration;

    @NotNull(message = "Completed status is required")
    private Boolean completed;

    private LocalDate completedDate;

    @NotBlank(message = "Priority is required")
    @Size(
            max = 20,
            message = "Priority must not exceed 20 characters"
    )
    private String priority;

    public TaskRequest() {
    }

    public TaskRequest(
            String title,
            String description,
            LocalDate taskDate,
            LocalTime startTime,
            LocalTime endTime,
            Double duration,
            Boolean completed,
            LocalDate completedDate,
            String priority
    ) {
        this.title = title;
        this.description = description;
        this.taskDate = taskDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.duration = duration;
        this.completed = completed;
        this.completedDate = completedDate;
        this.priority = priority;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getTaskDate() {
        return taskDate;
    }

    public void setTaskDate(LocalDate taskDate) {
        this.taskDate = taskDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public Double getDuration() {
        return duration;
    }

    public void setDuration(Double duration) {
        this.duration = duration;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public LocalDate getCompletedDate() {
        return completedDate;
    }

    public void setCompletedDate(LocalDate completedDate) {
        this.completedDate = completedDate;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
}