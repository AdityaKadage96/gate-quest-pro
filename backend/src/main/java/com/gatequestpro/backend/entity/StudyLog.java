package com.gatequestpro.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "study_logs")
public class StudyLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate logDate;

    @Column(nullable = false)
    private Integer minutes;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public StudyLog() {
    }

    public StudyLog(
            LocalDate logDate,
            Integer minutes
    ) {
        this.logDate = logDate;
        this.minutes = minutes;
    }

    public Long getId() {
        return id;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}