package com.gatequestpro.backend.dto;

import java.time.LocalDate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class TopicRequest {

    @NotBlank(message = "Topic name is required")
    @Size(
            min = 2,
            max = 150,
            message = "Topic name must be between 2 and 150 characters"
    )
    private String name;

    @NotBlank(message = "Topic description is required")
    @Size(
            max = 1000,
            message = "Topic description must not exceed 1000 characters"
    )
    private String description;

    @NotNull(message = "Subject ID is required")
    private Long subjectId;

    private boolean lectures;

    private boolean pyq;

    private boolean notes;

    private boolean rev1;

    private boolean rev2;

    private LocalDate lastRevisionDate;

    public TopicRequest() {
    }

    public TopicRequest(
            String name,
            String description,
            Long subjectId
    ) {
        this.name = name;
        this.description = description;
        this.subjectId = subjectId;
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

    public Long getSubjectId() {
        return subjectId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
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

    public void setLastRevisionDate(LocalDate lastRevisionDate) {
        this.lastRevisionDate = lastRevisionDate;
    }
}