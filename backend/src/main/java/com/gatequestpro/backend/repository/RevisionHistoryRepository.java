package com.gatequestpro.backend.repository;

import com.gatequestpro.backend.entity.RevisionHistory;
import com.gatequestpro.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RevisionHistoryRepository
        extends JpaRepository<RevisionHistory, Long> {

    List<RevisionHistory> findByRevisionTopicSubjectUser(
            User user
    );

    Optional<RevisionHistory> findByIdAndRevisionTopicSubjectUser(
            Long id,
            User user
    );
}