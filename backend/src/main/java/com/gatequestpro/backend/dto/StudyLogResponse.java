package com.gatequestpro.backend.dto;

import java.time.LocalDate;

public class StudyLogResponse {

    private Long id;
    private LocalDate logDate;
    private Integer minutes;

    public StudyLogResponse() {
    }

    public StudyLogResponse(
            Long id,
            LocalDate logDate,
            Integer minutes
    ) {
        this.id = id;
        this.logDate = logDate;
        this.minutes = minutes;
    }

    public Long getId() {
        return id;
    }

    public LocalDate getLogDate() {
        return logDate;
    }

    public Integer getMinutes() {
        return minutes;
    }
}