package com.gatequestpro.backend.dto;

public class MistakeResponse {

    private Long id;
    private String question;
    private String correctAnswer;
    private String explanation;
    private Boolean resolved;
    private Long topicId;
    private String topicName;

    public MistakeResponse() {
    }

    public MistakeResponse(
            Long id,
            String question,
            String correctAnswer,
            String explanation,
            Boolean resolved,
            Long topicId,
            String topicName
    ) {
        this.id = id;
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.explanation = explanation;
        this.resolved = resolved;
        this.topicId = topicId;
        this.topicName = topicName;
    }

    public Long getId() {
        return id;
    }

    public String getQuestion() {
        return question;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public String getExplanation() {
        return explanation;
    }

    public Boolean getResolved() {
        return resolved;
    }

    public Long getTopicId() {
        return topicId;
    }

    public String getTopicName() {
        return topicName;
    }
}