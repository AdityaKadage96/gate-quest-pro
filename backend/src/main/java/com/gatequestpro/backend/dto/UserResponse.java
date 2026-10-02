package com.gatequestpro.backend.dto;

public class UserResponse {

    private Long id;

    private String name;

    private String email;

    private String branch;

    public UserResponse() {
    }

    public UserResponse(
            Long id,
            String name,
            String email,
            String branch
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.branch = branch;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getBranch() {
        return branch;
    }
}