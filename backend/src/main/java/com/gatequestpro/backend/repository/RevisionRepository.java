package com.gatequestpro.backend.repository;

import com.gatequestpro.backend.entity.Revision;
import com.gatequestpro.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RevisionRepository
        extends JpaRepository<Revision, Long> {

    List<Revision> findByTopicSubjectUser(User user);

    Optional<Revision> findByIdAndTopicSubjectUser(
            Long id,
            User user
    );
}