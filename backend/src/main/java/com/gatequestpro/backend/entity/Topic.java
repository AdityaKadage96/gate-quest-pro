package com.gatequestpro.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "topics")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private boolean lectures;

    @Column(nullable = false)
    private boolean pyq;

    @Column(nullable = false)
    private boolean notes;

    @Column(nullable = false)
    private boolean rev1;

    @Column(nullable = false)
    private boolean rev2;

    private LocalDate lastRevisionDate;

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    /*
     * A Topic owns its Revisions.
     *
     * When a Topic is deleted, its Revisions
     * should also be deleted.
     */
    @OneToMany(
            mappedBy = "topic",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Revision> revisions = new ArrayList<>();

    /*
     * A Topic owns its Flashcards.
     *
     * When a Topic is deleted, its Flashcards
     * should also be deleted.
     */
    @OneToMany(
            mappedBy = "topic",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Flashcard> flashcards = new ArrayList<>();

    /*
     * A Topic owns its Mistakes.
     *
     * When a Topic is deleted, its Mistakes
     * should also be deleted.
     */
    @OneToMany(
            mappedBy = "topic",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Mistake> mistakes = new ArrayList<>();

    public Topic() {
    }

    public Topic(
            String name,
            String description,
            Subject subject
    ) {
        this.name = name;
        this.description = description;
        this.subject = subject;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }

    public boolean isLectures() {
        return lectures;
    }

    public void setLectures(boolean lectures) {
        this.lectures = lectures;
    }

    public boolean isPyq() {
        return pyq;
    }

    public void setPyq(boolean pyq) {
        this.pyq = pyq;
    }

    public boolean isNotes() {
        return notes;
    }

    public void setNotes(boolean notes) {
        this.notes = notes;
    }

    public boolean isRev1() {
        return rev1;
    }

    public void setRev1(boolean rev1) {
        this.rev1 = rev1;
    }

    public boolean isRev2() {
        return rev2;
    }

    public void setRev2(boolean rev2) {
        this.rev2 = rev2;
    }

    public LocalDate getLastRevisionDate() {
        return lastRevisionDate;
    }

    public void setLastRevisionDate(
            LocalDate lastRevisionDate
    ) {
        this.lastRevisionDate = lastRevisionDate;
    }

    public List<Revision> getRevisions() {
        return revisions;
    }

    public void setRevisions(
            List<Revision> revisions
    ) {
        this.revisions = revisions;
    }

    public List<Flashcard> getFlashcards() {
        return flashcards;
    }

    public void setFlashcards(
            List<Flashcard> flashcards
    ) {
        this.flashcards = flashcards;
    }

    public List<Mistake> getMistakes() {
        return mistakes;
    }

    public void setMistakes(
            List<Mistake> mistakes
    ) {
        this.mistakes = mistakes;
    }
}