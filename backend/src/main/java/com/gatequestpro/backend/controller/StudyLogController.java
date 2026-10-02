package com.gatequestpro.backend.controller;

import com.gatequestpro.backend.dto.StudyLogRequest;
import com.gatequestpro.backend.dto.StudyLogResponse;
import com.gatequestpro.backend.entity.StudyLog;
import com.gatequestpro.backend.service.StudyLogService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/study-logs")
@CrossOrigin(origins = "http://localhost:5173")
public class StudyLogController {

    private final StudyLogService studyLogService;

    public StudyLogController(
            StudyLogService studyLogService
    ) {
        this.studyLogService = studyLogService;
    }

    @GetMapping
    public ResponseEntity<List<StudyLogResponse>> getAllStudyLogs() {

        List<StudyLogResponse> studyLogs =
                studyLogService.getAllStudyLogs()
                        .stream()
                        .map(this::convertToResponse)
                        .toList();

        return ResponseEntity.ok(studyLogs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudyLogResponse> getStudyLogById(
            @PathVariable Long id
    ) {

        return studyLogService.getStudyLogById(id)
                .map(this::convertToResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<StudyLogResponse> createStudyLog(
            @Valid @RequestBody StudyLogRequest request
    ) {

        StudyLog studyLog = new StudyLog(
                request.getLogDate(),
                request.getMinutes()
        );

        StudyLog savedStudyLog =
                studyLogService.createStudyLog(studyLog);

        return ResponseEntity.ok(
                convertToResponse(savedStudyLog)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudyLogResponse> updateStudyLog(
            @PathVariable Long id,
            @Valid @RequestBody StudyLogRequest request
    ) {

        StudyLog studyLog = new StudyLog(
                request.getLogDate(),
                request.getMinutes()
        );

        StudyLog updatedStudyLog =
                studyLogService.updateStudyLog(id, studyLog);

        return ResponseEntity.ok(
                convertToResponse(updatedStudyLog)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudyLog(
            @PathVariable Long id
    ) {

        studyLogService.deleteStudyLog(id);

        return ResponseEntity.noContent().build();
    }

    private StudyLogResponse convertToResponse(
            StudyLog studyLog
    ) {

        return new StudyLogResponse(
                studyLog.getId(),
                studyLog.getLogDate(),
                studyLog.getMinutes()
        );
    }
}