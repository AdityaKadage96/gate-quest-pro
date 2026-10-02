package com.gatequestpro.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class SubjectRequest {

    @NotBlank(message = "Subject name is required")
    @Size(
            min = 2,
            max = 100,
            message = "Subject name must be between 2 and 100 characters"
    )
    private String name;

    @NotBlank(message = "Branch is required")
    private String branch;

    @NotNull(message = "Weight is required")
    @Min(value = 1, message = "Weight must be at least 1")
    @Max(value = 100, message = "Weight must not exceed 100")
    private Integer weight;

    public SubjectRequest() {
    }

    public SubjectRequest(
            String name,
            String branch,
            Integer weight
    ) {
        this.name = name;
        this.branch = branch;
        this.weight = weight;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }
}