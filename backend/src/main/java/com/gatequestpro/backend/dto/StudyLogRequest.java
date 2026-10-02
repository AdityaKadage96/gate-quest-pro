package com.gatequestpro.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class StudyLogRequest {

    @NotNull(message = "Log date is required")
    private LocalDate logDate;

    @NotNull(message = "Study minutes are required")
    @Min(
            value = 0,
            message = "Study minutes cannot be negative"
    )
    private Integer minutes;

    public StudyLogRequest() {
    }

    public StudyLogRequest(
            LocalDate logDate,
            Integer minutes
    ) {
        this.logDate = logDate;
        this.minutes = minutes;
    }

    public LocalDate getLogDate() {
        return logDate;
    }

    public void setLogDate(LocalDate logDate) {
        this.logDate = logDate;
    }

    public Integer getMinutes() {
        return minutes;
    }

    public void setMinutes(Integer minutes) {
        this.minutes = minutes;
    }
}