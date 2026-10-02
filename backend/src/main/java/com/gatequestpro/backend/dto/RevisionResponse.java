package com.gatequestpro.backend.dto;

import java.time.LocalDate;

public class RevisionResponse {

    private Long id;

    private String revisionStage;

    private LocalDate revisionDate;

    private Integer reviewCount;

    private Integer interval;

    private LocalDate nextDueDate;

    private Boolean completed;

    private LocalDate lastReviewedDate;

    private Long topicId;

    private String topicName;

    public RevisionResponse() {
    }

    public RevisionResponse(
            Long id,
            String revisionStage,
            LocalDate revisionDate,
            Integer reviewCount,
            Integer interval,
            LocalDate nextDueDate,
            Boolean completed,
            LocalDate lastReviewedDate,
            Long topicId,
            String topicName
    ) {
        this.id = id;
        this.revisionStage = revisionStage;
        this.revisionDate = revisionDate;
        this.reviewCount = reviewCount;
        this.interval = interval;
        this.nextDueDate = nextDueDate;
        this.completed = completed;
        this.lastReviewedDate = lastReviewedDate;
        this.topicId = topicId;
        this.topicName = topicName;
    }

    public Long getId() {
        return id;
    }

    public String getRevisionStage() {
        return revisionStage;
    }

    public LocalDate getRevisionDate() {
        return revisionDate;
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public Integer getInterval() {
        return interval;
    }

    public LocalDate getNextDueDate() {
        return nextDueDate;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public LocalDate getLastReviewedDate() {
        return lastReviewedDate;
    }

    public Long getTopicId() {
        return topicId;
    }

    public String getTopicName() {
        return topicName;
    }
}