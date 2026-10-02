package com.gatequestpro.backend.dto;

public class SubjectResponse {

    private Long id;
    private String name;
    private String branch;
    private Integer weight;

    public SubjectResponse() {
    }

    public SubjectResponse(
            Long id,
            String name,
            String branch,
            Integer weight
    ) {
        this.id = id;
        this.name = name;
        this.branch = branch;
        this.weight = weight;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getBranch() {
        return branch;
    }

    public Integer getWeight() {
        return weight;
    }
}