package com.gatequestpro.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "revisions")
public class Revision {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String revisionStage;

    @Column(nullable = false)
    private LocalDate revisionDate;

    @Column(nullable = false)
    private Integer reviewCount;

    @Column(nullable = false)
    private Integer interval;

    @Column(nullable = false)
    private LocalDate nextDueDate;

    @Column(nullable = false)
    private Boolean completed;

    @Column
    private LocalDate lastReviewedDate;

    @ManyToOne
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    /*
     * A Revision owns its Revision History records.
     *
     * When a Revision is deleted, its history
     * records should also be deleted.
     */
    @OneToMany(
            mappedBy = "revision",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<RevisionHistory> revisionHistory =
            new ArrayList<>();

    public Revision() {
    }

    public Revision(
            String revisionStage,
            LocalDate revisionDate,
            Integer reviewCount,
            Integer interval,
            LocalDate nextDueDate,
            Boolean completed,
            LocalDate lastReviewedDate,
            Topic topic
    ) {
        this.revisionStage = revisionStage;
        this.revisionDate = revisionDate;
        this.reviewCount = reviewCount;
        this.interval = interval;
        this.nextDueDate = nextDueDate;
        this.completed = completed;
        this.lastReviewedDate = lastReviewedDate;
        this.topic = topic;
    }

    public Long getId() {
        return id;
    }

    public String getRevisionStage() {
        return revisionStage;
    }

    public void setRevisionStage(String revisionStage) {
        this.revisionStage = revisionStage;
    }

    public LocalDate getRevisionDate() {
        return revisionDate;
    }

    public void setRevisionDate(LocalDate revisionDate) {
        this.revisionDate = revisionDate;
    }

    public Integer getReviewCount() {
        return reviewCount;
    }

    public void setReviewCount(Integer reviewCount) {
        this.reviewCount = reviewCount;
    }

    public Integer getInterval() {
        return interval;
    }

    public void setInterval(Integer interval) {
        this.interval = interval;
    }

    public LocalDate getNextDueDate() {
        return nextDueDate;
    }

    public void setNextDueDate(LocalDate nextDueDate) {
        this.nextDueDate = nextDueDate;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public LocalDate getLastReviewedDate() {
        return lastReviewedDate;
    }

    public void setLastReviewedDate(
            LocalDate lastReviewedDate
    ) {
        this.lastReviewedDate = lastReviewedDate;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
    }

    public List<RevisionHistory> getRevisionHistory() {
        return revisionHistory;
    }

    public void setRevisionHistory(
            List<RevisionHistory> revisionHistory
    ) {
        this.revisionHistory = revisionHistory;
    }
}