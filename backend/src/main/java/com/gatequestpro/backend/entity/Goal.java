package com.gatequestpro.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "goals")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer targetMinutes;

    @Column(nullable = false)
    private Boolean active;

    @Column
    private LocalDate targetExamDate;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Goal() {
    }

    public Goal(
            String name,
            Integer targetMinutes,
            Boolean active,
            LocalDate targetExamDate
    ) {
        this.name = name;
        this.targetMinutes = targetMinutes;
        this.active = active;
        this.targetExamDate = targetExamDate;
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

    public Integer getTargetMinutes() {
        return targetMinutes;
    }

    public void setTargetMinutes(Integer targetMinutes) {
        this.targetMinutes = targetMinutes;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDate getTargetExamDate() {
        return targetExamDate;
    }

    public void setTargetExamDate(LocalDate targetExamDate) {
        this.targetExamDate = targetExamDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}