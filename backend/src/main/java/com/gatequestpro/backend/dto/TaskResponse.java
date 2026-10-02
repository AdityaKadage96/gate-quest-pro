package com.gatequestpro.backend.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class TaskResponse {

    private Long id;
    private String title;
    private String description;
    private LocalDate taskDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Double duration;
    private Boolean completed;
    private LocalDate completedDate;
    private String priority;

    public TaskResponse() {
    }

    public TaskResponse(
            Long id,
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
        this.id = id;
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

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public LocalDate getTaskDate() {
        return taskDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public Double getDuration() {
        return duration;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public LocalDate getCompletedDate() {
        return completedDate;
    }

    public String getPriority() {
        return priority;
    }
}