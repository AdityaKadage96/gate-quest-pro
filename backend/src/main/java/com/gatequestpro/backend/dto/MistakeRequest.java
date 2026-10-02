package com.gatequestpro.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class MistakeRequest {

    @NotBlank(message = "Question is required")
    @Size(
            max = 5000,
            message = "Question must not exceed 5000 characters"
    )
    private String question;

    @NotBlank(message = "Correct answer is required")
    @Size(
            max = 5000,
            message = "Correct answer must not exceed 5000 characters"
    )
    private String correctAnswer;

    @Size(
            max = 10000,
            message = "Explanation must not exceed 10000 characters"
    )
    private String explanation;

    @NotNull(message = "Resolved status is required")
    private Boolean resolved;

    @NotNull(message = "Topic ID is required")
    private Long topicId;

    public MistakeRequest() {
    }

    public MistakeRequest(
            String question,
            String correctAnswer,
            String explanation,
            Boolean resolved,
            Long topicId
    ) {
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.explanation = explanation;
        this.resolved = resolved;
        this.topicId = topicId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public Boolean getResolved() {
        return resolved;
    }

    public void setResolved(Boolean resolved) {
        this.resolved = resolved;
    }

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }
}