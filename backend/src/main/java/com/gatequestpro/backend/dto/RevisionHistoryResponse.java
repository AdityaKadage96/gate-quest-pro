package com.gatequestpro.backend.dto;

import java.time.LocalDate;

public class RevisionHistoryResponse {

    private Long id;
    private String revisionStage;
    private LocalDate completedDate;
    private Long revisionId;

    public RevisionHistoryResponse() {
    }

    public RevisionHistoryResponse(
            Long id,
            String revisionStage,
            LocalDate completedDate,
            Long revisionId
    ) {
        this.id = id;
        this.revisionStage = revisionStage;
        this.completedDate = completedDate;
        this.revisionId = revisionId;
    }

    public Long getId() {
        return id;
    }

    public String getRevisionStage() {
        return revisionStage;
    }

    public LocalDate getCompletedDate() {
        return completedDate;
    }

    public Long getRevisionId() {
        return revisionId;
    }
}