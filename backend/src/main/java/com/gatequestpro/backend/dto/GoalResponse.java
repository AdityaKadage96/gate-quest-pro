//package com.gatequestpro.backend.dto;
//
//public class GoalResponse {
//
//    private Long id;
//    private String name;
//    private Integer targetMinutes;
//    private Boolean active;
//
//    public GoalResponse() {
//    }
//
//    public GoalResponse(
//            Long id,
//            String name,
//            Integer targetMinutes,
//            Boolean active
//    ) {
//        this.id = id;
//        this.name = name;
//        this.targetMinutes = targetMinutes;
//        this.active = active;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public Integer getTargetMinutes() {
//        return targetMinutes;
//    }
//
//    public Boolean getActive() {
//        return active;
//    }
//}


package com.gatequestpro.backend.dto;

import java.time.LocalDate;

public class GoalResponse {

    private Long id;
    private String name;
    private Integer targetMinutes;
    private Boolean active;
    private LocalDate targetExamDate;

    public GoalResponse() {}

    public GoalResponse(
            Long id,
            String name,
            Integer targetMinutes,
            Boolean active,
            LocalDate targetExamDate
    ) {
        this.id = id;
        this.name = name;
        this.targetMinutes = targetMinutes;
        this.active = active;
        this.targetExamDate = targetExamDate;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getTargetMinutes() {
        return targetMinutes;
    }

    public Boolean getActive() {
        return active;
    }

    public LocalDate getTargetExamDate() {
        return targetExamDate;
    }
}