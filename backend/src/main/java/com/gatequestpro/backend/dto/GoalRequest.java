//package com.gatequestpro.backend.dto;
//
//import jakarta.validation.constraints.Min;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.NotNull;
//import jakarta.validation.constraints.Size;
//
//public class GoalRequest {
//
//    @NotBlank(message = "Goal name is required")
//    @Size(
//            min = 2,
//            max = 200,
//            message = "Goal name must be between 2 and 200 characters"
//    )
//    private String name;
//
//    @NotNull(message = "Target minutes are required")
//    @Min(
//            value = 1,
//            message = "Target minutes must be at least 1"
//    )
//    private Integer targetMinutes;
//
//    @NotNull(message = "Active status is required")
//    private Boolean active;
//
//    public GoalRequest() {
//    }
//
//    public GoalRequest(
//            String name,
//            Integer targetMinutes,
//            Boolean active
//    ) {
//        this.name = name;
//        this.targetMinutes = targetMinutes;
//        this.active = active;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public Integer getTargetMinutes() {
//        return targetMinutes;
//    }
//
//    public void setTargetMinutes(Integer targetMinutes) {
//        this.targetMinutes = targetMinutes;
//    }
//
//    public Boolean getActive() {
//        return active;
//    }
//
//    public void setActive(Boolean active) {
//        this.active = active;
//    }
//}

package com.gatequestpro.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public class GoalRequest {

    @NotBlank(message = "Goal name is required")
    @Size(
            min = 2,
            max = 200,
            message = "Goal name must be between 2 and 200 characters"
    )
    private String name;

    @NotNull(message = "Target minutes are required")
    @Min(
            value = 1,
            message = "Target minutes must be at least 1"
    )
    private Integer targetMinutes;

    @NotNull(message = "Active status is required")
    private Boolean active;

    private LocalDate targetExamDate;

    public GoalRequest() {}

    public GoalRequest(
            String name,
            Integer targetMinutes,
            Boolean active,
            LocalDate targetExamDate
    ) {
        this.name = name;
        this.targetMinutes = targetMinutes;
        this.active = active;
        this.targetExamDate = targetExamDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getTargetMinutes() {
        return targetMinutes;
    }

    public void setTargetMinutes(Integer targetMinutes) {
        this.targetMinutes = targetMinutes;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDate getTargetExamDate() {
        return targetExamDate;
    }

    public void setTargetExamDate(LocalDate targetExamDate) {
        this.targetExamDate = targetExamDate;
    }
}