package com.gatequestpro.backend.dto;

public class FlashcardResponse {

    private Long id;
    private String question;
    private String answer;
    private Boolean mastered;
    private Long topicId;
    private String topicName;

    public FlashcardResponse() {
    }

    public FlashcardResponse(
            Long id,
            String question,
            String answer,
            Boolean mastered,
            Long topicId,
            String topicName
    ) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.mastered = mastered;
        this.topicId = topicId;
        this.topicName = topicName;
    }

    public Long getId() {
        return id;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }

    public Boolean getMastered() {
        return mastered;
    }

    public Long getTopicId() {
        return topicId;
    }

    public String getTopicName() {
        return topicName;
    }
}