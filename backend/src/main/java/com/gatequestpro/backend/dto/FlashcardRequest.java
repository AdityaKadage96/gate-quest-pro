package com.gatequestpro.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class FlashcardRequest {

    @NotBlank(message = "Question is required")
    @Size(
            max = 1000,
            message = "Question must not exceed 1000 characters"
    )
    private String question;

    @NotBlank(message = "Answer is required")
    @Size(
            max = 5000,
            message = "Answer must not exceed 5000 characters"
    )
    private String answer;

    @NotNull(message = "Mastered status is required")
    private Boolean mastered;

    @NotNull(message = "Topic ID is required")
    private Long topicId;

    public FlashcardRequest() {
    }

    public FlashcardRequest(
            String question,
            String answer,
            Boolean mastered,
            Long topicId
    ) {
        this.question = question;
        this.answer = answer;
        this.mastered = mastered;
        this.topicId = topicId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Boolean getMastered() {
        return mastered;
    }

    public void setMastered(Boolean mastered) {
        this.mastered = mastered;
    }

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }
}