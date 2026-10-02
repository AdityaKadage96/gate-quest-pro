package com.gatequestpro.backend.service;

import com.gatequestpro.backend.entity.Flashcard;
import com.gatequestpro.backend.entity.Topic;
import com.gatequestpro.backend.entity.User;
import com.gatequestpro.backend.repository.FlashcardRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlashcardService {

    private final FlashcardRepository flashcardRepository;
    private final CurrentUserService currentUserService;

    public FlashcardService(
            FlashcardRepository flashcardRepository,
            CurrentUserService currentUserService
    ) {
        this.flashcardRepository = flashcardRepository;
        this.currentUserService = currentUserService;
    }

    public List<Flashcard> getAllFlashcards() {

        User currentUser =
                currentUserService.getCurrentUser();

        return flashcardRepository
                .findByTopicSubjectUser(currentUser);
    }

    public Optional<Flashcard> getFlashcardById(
            Long id
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        return flashcardRepository
                .findByIdAndTopicSubjectUser(
                        id,
                        currentUser
                );
    }

    public Flashcard createFlashcard(
            Flashcard flashcard
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        Topic topic =
                flashcard.getTopic();

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

        return flashcardRepository.save(
                flashcard
        );
    }

    public Flashcard updateFlashcard(
            Long id,
            Flashcard updatedFlashcard
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        Flashcard existingFlashcard =
                flashcardRepository
                        .findByIdAndTopicSubjectUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Flashcard not found with id: "
                                                + id
                                )
                        );

        Topic topic =
                updatedFlashcard.getTopic();

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

        existingFlashcard.setQuestion(
                updatedFlashcard.getQuestion()
        );

        existingFlashcard.setAnswer(
                updatedFlashcard.getAnswer()
        );

        existingFlashcard.setMastered(
                updatedFlashcard.getMastered()
        );

        existingFlashcard.setTopic(
                updatedFlashcard.getTopic()
        );

        return flashcardRepository.save(
                existingFlashcard
        );
    }

    public void deleteFlashcard(
            Long id
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        Flashcard existingFlashcard =
                flashcardRepository
                        .findByIdAndTopicSubjectUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Flashcard not found with id: "
                                                + id
                                )
                        );

        flashcardRepository.delete(
                existingFlashcard
        );
    }
}