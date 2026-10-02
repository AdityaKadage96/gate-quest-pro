package com.gatequestpro.backend.service;

import com.gatequestpro.backend.entity.StudyLog;
import com.gatequestpro.backend.entity.User;
import com.gatequestpro.backend.repository.StudyLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudyLogService {

    private final StudyLogRepository studyLogRepository;
    private final CurrentUserService currentUserService;

    public StudyLogService(
            StudyLogRepository studyLogRepository,
            CurrentUserService currentUserService
    ) {
        this.studyLogRepository = studyLogRepository;
        this.currentUserService = currentUserService;
    }

    public List<StudyLog> getAllStudyLogs() {

        User currentUser =
                currentUserService.getCurrentUser();

        return studyLogRepository.findByUser(
                currentUser
        );
    }

    public Optional<StudyLog> getStudyLogById(
            Long id
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        return studyLogRepository.findByIdAndUser(
                id,
                currentUser
        );
    }

    public StudyLog createStudyLog(
            StudyLog studyLog
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        studyLog.setUser(currentUser);

        return studyLogRepository.save(
                studyLog
        );
    }

    public StudyLog updateStudyLog(
            Long id,
            StudyLog updatedStudyLog
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        StudyLog existingStudyLog =
                studyLogRepository.findByIdAndUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Study log not found with id: "
                                                + id
                                )
                        );

        existingStudyLog.setLogDate(
                updatedStudyLog.getLogDate()
        );

        existingStudyLog.setMinutes(
                updatedStudyLog.getMinutes()
        );

        return studyLogRepository.save(
                existingStudyLog
        );
    }

    public void deleteStudyLog(
            Long id
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        StudyLog existingStudyLog =
                studyLogRepository.findByIdAndUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Study log not found with id: "
                                                + id
                                )
                        );

        studyLogRepository.delete(
                existingStudyLog
        );
    }
}