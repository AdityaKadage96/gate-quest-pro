package com.gatequestpro.backend.controller;

import com.gatequestpro.backend.dto.GoalRequest;
import com.gatequestpro.backend.dto.GoalResponse;
import com.gatequestpro.backend.entity.Goal;
import com.gatequestpro.backend.service.GoalService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
@CrossOrigin(origins = "http://localhost:5173")
public class GoalController {

    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping
    public ResponseEntity<List<GoalResponse>> getAllGoals() {

        List<GoalResponse> goals =
                goalService.getAllGoals()
                        .stream()
                        .map(this::convertToResponse)
                        .toList();

        return ResponseEntity.ok(goals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GoalResponse> getGoalById(
            @PathVariable Long id
    ) {

        return goalService.getGoalById(id)
                .map(this::convertToResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<GoalResponse> createGoal(
            @Valid @RequestBody GoalRequest request
    ) {

//        Goal goal = new Goal(
//                request.getName(),
//                request.getTargetMinutes(),
//                request.getActive()
//        );
        Goal goal = new Goal(
                request.getName(),
                request.getTargetMinutes(),
                request.getActive(),
                request.getTargetExamDate()
        );

        Goal savedGoal =
                goalService.createGoal(goal);

        return ResponseEntity.ok(
                convertToResponse(savedGoal)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<GoalResponse> updateGoal(
            @PathVariable Long id,
            @Valid @RequestBody GoalRequest request
    ) {

//        Goal goal = new Goal(
//                request.getName(),
//                request.getTargetMinutes(),
//                request.getActive()
//        );

        Goal goal = new Goal(
                request.getName(),
                request.getTargetMinutes(),
                request.getActive(),
                request.getTargetExamDate()
        );

        Goal updatedGoal =
                goalService.updateGoal(id, goal);

        return ResponseEntity.ok(
                convertToResponse(updatedGoal)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGoal(
            @PathVariable Long id
    ) {

        goalService.deleteGoal(id);

        return ResponseEntity.noContent().build();
    }

    private GoalResponse convertToResponse(
            Goal goal
    ) {

//        return new GoalResponse(
//                goal.getId(),
//                goal.getName(),
//                goal.getTargetMinutes(),
//                goal.getActive()
//        );

        return new GoalResponse(
                goal.getId(),
                goal.getName(),
                goal.getTargetMinutes(),
                goal.getActive(),
                goal.getTargetExamDate()
        );
    }
}