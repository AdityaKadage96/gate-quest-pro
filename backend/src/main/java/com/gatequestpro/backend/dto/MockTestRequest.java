package com.gatequestpro.backend.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class MockTestRequest {

    @NotBlank(message = "Mock test name is required")
    @Size(
            min = 2,
            max = 200,
            message = "Mock test name must be between 2 and 200 characters"
    )
    private String name;

    @NotNull(message = "Test date is required")
    private LocalDate testDate;

    @NotNull(message = "Score is required")
    @DecimalMin(
            value = "0.0",
            message = "Score cannot be negative"
    )
    private Double score;

    @NotNull(message = "Accuracy is required")
    @DecimalMin(
            value = "0.0",
            message = "Accuracy cannot be negative"
    )
    @DecimalMax(
            value = "100.0",
            message = "Accuracy cannot exceed 100"
    )
    private Double accuracy;

    @DecimalMin(
            value = "0.0",
            message = "Percentile cannot be negative"
    )
    @DecimalMax(
            value = "100.0",
            message = "Percentile cannot exceed 100"
    )
    private Double percentile;

    public MockTestRequest() {
    }

    public MockTestRequest(
            String name,
            LocalDate testDate,
            Double score,
            Double accuracy,
            Double percentile
    ) {
        this.name = name;
        this.testDate = testDate;
        this.score = score;
        this.accuracy = accuracy;
        this.percentile = percentile;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getTestDate() {
        return testDate;
    }

    public void setTestDate(LocalDate testDate) {
        this.testDate = testDate;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public Double getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(Double accuracy) {
        this.accuracy = accuracy;
    }

    public Double getPercentile() {
        return percentile;
    }

    public void setPercentile(Double percentile) {
        this.percentile = percentile;
    }
}