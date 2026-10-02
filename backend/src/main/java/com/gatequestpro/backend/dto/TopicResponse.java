package com.gatequestpro.backend.dto;

import java.time.LocalDate;

public class TopicResponse {

    private Long id;

    private String name;

    private String description;

    private Long subjectId;

    private String subjectName;

    private boolean lectures;

    private boolean pyq;

    private boolean notes;

    private boolean rev1;

    private boolean rev2;

    private LocalDate lastRevisionDate;

//    public TopicResponse() {
//    }

//    public TopicResponse(
//            Long id,
//            String name,
//            String description,
//            Long subjectId,
//            String subjectName
//    ) {
//        this.id = id;
//        this.name = name;
//        this.description = description;
//        this.subjectId = subjectId;
//        this.subjectName = subjectName;
//    }

    public TopicResponse(
            Long id,
            String name,
            String description,
            Long subjectId,
            String subjectName,
            boolean lectures,
            boolean pyq,
            boolean notes,
            boolean rev1,
            boolean rev2,
            LocalDate lastRevisionDate
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.lectures = lectures;
        this.pyq = pyq;
        this.notes = notes;
        this.rev1 = rev1;
        this.rev2 = rev2;
        this.lastRevisionDate = lastRevisionDate;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public String getSubjectName() {
        return subjectName;
    }


    public boolean isLectures() {
        return lectures;
    }

    public boolean isPyq() {
        return pyq;
    }

    public boolean isNotes() {
        return notes;
    }

    public boolean isRev1() {
        return rev1;
    }

    public boolean isRev2() {
        return rev2;
    }

    public LocalDate getLastRevisionDate() {
        return lastRevisionDate;
    }


}