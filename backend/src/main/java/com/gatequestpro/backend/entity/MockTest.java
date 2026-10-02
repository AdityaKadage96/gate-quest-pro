package com.gatequestpro.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "mock_tests")
public class MockTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDate testDate;

    @Column(nullable = false)
    private Double score;

    @Column(nullable = false)
    private Double accuracy;

    @Column
    private Double percentile;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public MockTest() {
    }

    public MockTest(
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

    public Long getId() {
        return id;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}