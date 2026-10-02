package com.gatequestpro.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class RevisionRequest {

    @NotBlank(message = "Revision stage is required")
    private String revisionStage;

    @NotNull(message = "Revision date is required")
    private LocalDate revisionDate;

    @NotNull(message = "Review count is required")
    @Min(value = 0, message = "Review count cannot be negative")
    private Integer reviewCount;

    @NotNull(message = "Interval is required")
    @Min(value = 1, message = "Interval must be at least 1 day")
    private Integer interval;

    @NotNull(message = "Next due date is required")
    private LocalDate nextDueDate;

    @NotNull(message = "Completed status is required")
    private Boolean completed;

    private LocalDate lastReviewedDate;

    @NotNull(message = "Topic ID is required")
    private Long topicId;

    public RevisionRequest() {
    }

    public RevisionRequest(
            String revisionStage,
            LocalDate revisionDate,
            Integer reviewCount,
            Integer interval,
            LocalDate nextDueDate,
            Boolean completed,
            LocalDate lastReviewedDate,
            Long topicId
    ) {
        this.revisionStage = revisionStage;
        this.revisionDate = revisionDate;
        this.reviewCount = reviewCount;
        this.interval = interval;
        this.nextDueDate = nextDueDate;
        this.completed = completed;
        this.lastReviewedDate = lastReviewedDate;
        this.topicId = topicId;
    }

    public String getRevisionStage() {
        return revisionStage;
    }

    public void setRevisionStage(String revisionStage) {
        this.revisionStage = revisionStage;
    }

    public LocalDate getRevisionDate() {
        return revisionDate;
    }

    public void setRevisionDate(LocalDate revisionDate) {
        this.revisionDate = revisionDate;
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public Integer getInterval() {
        return interval;
    }

    public void setInterval(Integer interval) {
        this.interval = interval;
    }

    public LocalDate getNextDueDate() {
        return nextDueDate;
    }

    public void setNextDueDate(LocalDate nextDueDate) {
        this.nextDueDate = nextDueDate;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public LocalDate getLastReviewedDate() {
        return lastReviewedDate;
    }

    public void setLastReviewedDate(LocalDate lastReviewedDate) {
        this.lastReviewedDate = lastReviewedDate;
    }

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }
}