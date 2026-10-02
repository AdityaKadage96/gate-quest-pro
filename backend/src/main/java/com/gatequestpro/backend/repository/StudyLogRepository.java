package com.gatequestpro.backend.repository;

import com.gatequestpro.backend.entity.StudyLog;
import com.gatequestpro.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudyLogRepository
        extends JpaRepository<StudyLog, Long> {

    List<StudyLog> findByUser(User user);

    Optional<StudyLog> findByIdAndUser(
            Long id,
            User user
    );
}