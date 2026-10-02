package com.gatequestpro.backend.controller;

import com.gatequestpro.backend.dto.SubjectRequest;
import com.gatequestpro.backend.dto.SubjectResponse;
import com.gatequestpro.backend.entity.Subject;
import com.gatequestpro.backend.service.SubjectService;
import com.gatequestpro.backend.service.CurrentUserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
@CrossOrigin(origins = "http://localhost:5173")
public class SubjectController {

    private final SubjectService subjectService;
    private final CurrentUserService currentUserService;

    public SubjectController(
            SubjectService subjectService,
            CurrentUserService currentUserService
    ) {
        this.subjectService = subjectService;
        this.currentUserService = currentUserService;
    }
    @GetMapping
    public ResponseEntity<List<SubjectResponse>> getAllSubjects() {

        List<SubjectResponse> subjects =
                subjectService.getAllSubjects()
                        .stream()
                        .map(this::convertToResponse)
                        .toList();

        return ResponseEntity.ok(subjects);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SubjectResponse> getSubjectById(
            @PathVariable Long id
    ) {

        return subjectService.getSubjectById(id)
                .map(this::convertToResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<SubjectResponse> createSubject(
            @Valid @RequestBody SubjectRequest request
    ) {

        Subject subject = new Subject(
                request.getName(),
                request.getBranch(),
                request.getWeight(),
                currentUserService.getCurrentUser()
        );

        Subject savedSubject =
                subjectService.createSubject(subject);

        return ResponseEntity.ok(
                convertToResponse(savedSubject)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<SubjectResponse> updateSubject(
            @PathVariable Long id,
            @Valid @RequestBody SubjectRequest request
    ) {

        Subject subject = new Subject(
                request.getName(),
                request.getBranch(),
                request.getWeight(),
                currentUserService.getCurrentUser()
        );

        Subject updatedSubject =
                subjectService.updateSubject(id, subject);

        return ResponseEntity.ok(
                convertToResponse(updatedSubject)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubject(
            @PathVariable Long id
    ) {

        subjectService.deleteSubject(id);

        return ResponseEntity.noContent().build();
    }

    private SubjectResponse convertToResponse(
            Subject subject
    ) {

        return new SubjectResponse(
                subject.getId(),
                subject.getName(),
                subject.getBranch(),
                subject.getWeight()
        );
    }
}