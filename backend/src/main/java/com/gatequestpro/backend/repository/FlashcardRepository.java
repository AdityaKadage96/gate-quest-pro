package com.gatequestpro.backend.repository;

import com.gatequestpro.backend.entity.Flashcard;
import com.gatequestpro.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FlashcardRepository
        extends JpaRepository<Flashcard, Long> {

    List<Flashcard> findByTopicSubjectUser(
            User user
    );

    Optional<Flashcard> findByIdAndTopicSubjectUser(
            Long id,
            User user
    );
}