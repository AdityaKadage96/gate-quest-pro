package com.gatequestpro.backend.repository;

import com.gatequestpro.backend.entity.Mistake;
import com.gatequestpro.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MistakeRepository
        extends JpaRepository<Mistake, Long> {

    List<Mistake> findByTopicSubjectUser(
            User user
    );

    Optional<Mistake> findByIdAndTopicSubjectUser(
            Long id,
            User user
    );
}