package com.gatequestpro.backend.service;

import com.gatequestpro.backend.entity.Mistake;
import com.gatequestpro.backend.entity.Topic;
import com.gatequestpro.backend.entity.User;
import com.gatequestpro.backend.repository.MistakeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MistakeService {

    private final MistakeRepository mistakeRepository;
    private final CurrentUserService currentUserService;

    public MistakeService(
            MistakeRepository mistakeRepository,
            CurrentUserService currentUserService
    ) {
        this.mistakeRepository = mistakeRepository;
        this.currentUserService = currentUserService;
    }

    public List<Mistake> getAllMistakes() {

        User currentUser =
                currentUserService.getCurrentUser();

        return mistakeRepository
                .findByTopicSubjectUser(currentUser);
    }

    public Optional<Mistake> getMistakeById(
            Long id
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        return mistakeRepository
                .findByIdAndTopicSubjectUser(
                        id,
                        currentUser
                );
    }

    public Mistake createMistake(
            Mistake mistake
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        Topic topic =
                mistake.getTopic();

        if (topic == null
                || topic.getSubject() == null
                || topic.getSubject().getUser() == null
                || !topic
                .getSubject()
                .getUser()
                .getId()
                .equals(currentUser.getId())) {

            throw new RuntimeException(
                    "Topic not found for current user"
            );
        }

        return mistakeRepository.save(
                mistake
        );
    }

    public Mistake updateMistake(
            Long id,
            Mistake updatedMistake
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        Mistake existingMistake =
                mistakeRepository
                        .findByIdAndTopicSubjectUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Mistake not found with id: "
                                                + id
                                )
                        );

        Topic topic =
                updatedMistake.getTopic();

        if (topic == null
                || topic.getSubject() == null
                || topic.getSubject().getUser() == null
                || !topic
                .getSubject()
                .getUser()
                .getId()
                .equals(currentUser.getId())) {

            throw new RuntimeException(
                    "Topic not found for current user"
            );
        }

        existingMistake.setQuestion(
                updatedMistake.getQuestion()
        );

        existingMistake.setCorrectAnswer(
                updatedMistake.getCorrectAnswer()
        );

        existingMistake.setExplanation(
                updatedMistake.getExplanation()
        );

        existingMistake.setResolved(
                updatedMistake.getResolved()
        );

        existingMistake.setTopic(
                updatedMistake.getTopic()
        );

        return mistakeRepository.save(
                existingMistake
        );
    }

    public void deleteMistake(
            Long id
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        Mistake existingMistake =
                mistakeRepository
                        .findByIdAndTopicSubjectUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Mistake not found with id: "
                                                + id
                                )
                        );

        mistakeRepository.delete(
                existingMistake
        );
    }
}