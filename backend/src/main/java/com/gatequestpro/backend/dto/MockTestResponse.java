package com.gatequestpro.backend.dto;

import java.time.LocalDate;

public class MockTestResponse {

    private Long id;
    private String name;
    private LocalDate testDate;
    private Double score;
    private Double accuracy;
    private Double percentile;

    public MockTestResponse() {
    }

    public MockTestResponse(
            Long id,
            String name,
            LocalDate testDate,
            Double score,
            Double accuracy,
            Double percentile
    ) {
        this.id = id;
        this.name = name;
        this.testDate = testDate;
        this.score = score;
        this.accuracy = accuracy;
        this.percentile = percentile;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public LocalDate getTestDate() {
        return testDate;
    }

    public Double getScore() {
        return score;
    }

    public Double getAccuracy() {
        return accuracy;
    }

    public Double getPercentile() {
        return percentile;
    }
}