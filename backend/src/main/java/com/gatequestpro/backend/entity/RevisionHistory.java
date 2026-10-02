package com.gatequestpro.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "revision_history")
public class RevisionHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String revisionStage;

    @Column(nullable = false)
    private LocalDate completedDate;

    @ManyToOne
    @JoinColumn(name = "revision_id", nullable = false)
    private Revision revision;

    public RevisionHistory() {
    }

    public RevisionHistory(
            String revisionStage,
            LocalDate completedDate,
            Revision revision
    ) {
        this.revisionStage = revisionStage;
        this.completedDate = completedDate;
        this.revision = revision;
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

    public LocalDate getCompletedDate() {
        return completedDate;
    }

    public void setCompletedDate(LocalDate completedDate) {
        this.completedDate = completedDate;
    }

    public Revision getRevision() {
        return revision;
    }

    public void setRevision(Revision revision) {
        this.revision = revision;
    }
}