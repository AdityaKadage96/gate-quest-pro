package com.gatequestpro.backend.repository;

import com.gatequestpro.backend.entity.Topic;
import com.gatequestpro.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TopicRepository
        extends JpaRepository<Topic, Long> {

    List<Topic> findBySubjectUser(User user);

    Optional<Topic> findByIdAndSubjectUser(
            Long id,
            User user
    );
}