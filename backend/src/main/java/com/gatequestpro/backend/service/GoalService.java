package com.gatequestpro.backend.service;

import com.gatequestpro.backend.entity.Goal;
import com.gatequestpro.backend.entity.User;
import com.gatequestpro.backend.repository.GoalRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GoalService {

    private final GoalRepository goalRepository;
    private final CurrentUserService currentUserService;

    public GoalService(
            GoalRepository goalRepository,
            CurrentUserService currentUserService
    ) {
        this.goalRepository = goalRepository;
        this.currentUserService = currentUserService;
    }

    public List<Goal> getAllGoals() {

        User currentUser =
                currentUserService.getCurrentUser();

        return goalRepository.findByUser(
                currentUser
        );
    }

    public Optional<Goal> getGoalById(
            Long id
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        return goalRepository.findByIdAndUser(
                id,
                currentUser
        );
    }

    public Goal createGoal(
            Goal goal
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        goal.setUser(currentUser);

        return goalRepository.save(
                goal
        );
    }

    public Goal updateGoal(
            Long id,
            Goal updatedGoal
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        Goal existingGoal =
                goalRepository.findByIdAndUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Goal not found with id: " + id
                                )
                        );

        existingGoal.setName(
                updatedGoal.getName()
        );

        existingGoal.setTargetMinutes(
                updatedGoal.getTargetMinutes()
        );

        existingGoal.setActive(
                updatedGoal.getActive()
        );

        existingGoal.setTargetExamDate(
                updatedGoal.getTargetExamDate()
        );

        return goalRepository.save(
                existingGoal
        );
    }

    public void deleteGoal(
            Long id
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        Goal existingGoal =
                goalRepository.findByIdAndUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Goal not found with id: " + id
                                )
                        );

        goalRepository.delete(
                existingGoal
        );
    }
}