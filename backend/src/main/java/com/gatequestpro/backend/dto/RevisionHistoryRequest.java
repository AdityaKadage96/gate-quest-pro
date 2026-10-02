package com.gatequestpro.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class RevisionHistoryRequest {

    @NotBlank(message = "Revision stage is required")
    private String revisionStage;

    @NotNull(message = "Completed date is required")
    private LocalDate completedDate;

    @NotNull(message = "Revision ID is required")
    private Long revisionId;

    public RevisionHistoryRequest() {
    }

    public RevisionHistoryRequest(
            String revisionStage,
            LocalDate completedDate,
            Long revisionId
    ) {
        this.revisionStage = revisionStage;
        this.completedDate = completedDate;
        this.revisionId = revisionId;
    }

    public String getRevisionStage() {
        return revisionStage;
    }

    public void setRevisionStage(String revisionStage) {
        this.revisionStage = revisionStage;
    }

    public LocalDate getCompletedDate() {
        return completedDate;
    }

    public void setCompletedDate(LocalDate completedDate) {
        this.completedDate = completedDate;
    }

    public Long getRevisionId() {
        return revisionId;
    }

    public void setRevisionId(Long revisionId) {
        this.revisionId = revisionId;
    }
}