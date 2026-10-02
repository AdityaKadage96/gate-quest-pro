package com.gatequestpro.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private LocalDate taskDate;

    @Column
    private LocalTime startTime;

    @Column
    private LocalTime endTime;

    @Column
    private Double duration;

    @Column(nullable = false)
    private Boolean completed;

    @Column
    private LocalDate completedDate;

    @Column(nullable = false)
    private String priority;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Task() {
    }

    public Task(
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

    public Task(
            String title,
            String description,
            LocalDate taskDate,
            Boolean completed,
            String priority
    ) {
        this.title = title;
        this.description = description;
        this.taskDate = taskDate;
        this.completed = completed;
        this.priority = priority;
    }

    public Long getId() {
        return id;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}