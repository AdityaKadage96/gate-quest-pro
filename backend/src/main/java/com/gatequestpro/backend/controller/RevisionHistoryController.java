package com.gatequestpro.backend.controller;

import com.gatequestpro.backend.dto.RevisionHistoryRequest;
import com.gatequestpro.backend.dto.RevisionHistoryResponse;
import com.gatequestpro.backend.entity.Revision;
import com.gatequestpro.backend.entity.RevisionHistory;
import com.gatequestpro.backend.service.RevisionHistoryService;
import com.gatequestpro.backend.service.RevisionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.gatequestpro.backend.exception.ResourceNotFoundException;
@RestController
@RequestMapping("/api/revision-history")
@CrossOrigin(origins = "http://localhost:5173")
public class RevisionHistoryController {

    private final RevisionHistoryService revisionHistoryService;
    private final RevisionService revisionService;

    public RevisionHistoryController(
            RevisionHistoryService revisionHistoryService,
            RevisionService revisionService
    ) {
        this.revisionHistoryService = revisionHistoryService;
        this.revisionService = revisionService;
    }

    @GetMapping
    public ResponseEntity<List<RevisionHistoryResponse>> getAllRevisionHistory() {

        List<RevisionHistoryResponse> history =
                revisionHistoryService.getAllRevisionHistory()
                        .stream()
                        .map(this::convertToResponse)
                        .toList();

        return ResponseEntity.ok(history);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RevisionHistoryResponse> getRevisionHistoryById(
            @PathVariable Long id
    ) {

        return revisionHistoryService.getRevisionHistoryById(id)
                .map(this::convertToResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RevisionHistoryResponse> createRevisionHistory(
            @Valid @RequestBody RevisionHistoryRequest request
    ) {

        Revision revision =
                revisionService.getRevisionById(request.getRevisionId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Revision not found with id: "
                                                + request.getRevisionId()
                                )
                        );

        RevisionHistory revisionHistory =
                new RevisionHistory(
                        request.getRevisionStage(),
                        request.getCompletedDate(),
                        revision
                );

        RevisionHistory savedHistory =
                revisionHistoryService.createRevisionHistory(
                        revisionHistory
                );

        return ResponseEntity.ok(
                convertToResponse(savedHistory)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<RevisionHistoryResponse> updateRevisionHistory(
            @PathVariable Long id,
            @Valid @RequestBody RevisionHistoryRequest request
    ) {

        Revision revision =
                revisionService.getRevisionById(request.getRevisionId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Revision not found with id: "
                                                + request.getRevisionId()
                                )
                        );

        RevisionHistory revisionHistory =
                new RevisionHistory(
                        request.getRevisionStage(),
                        request.getCompletedDate(),
                        revision
                );

        RevisionHistory updatedHistory =
                revisionHistoryService.updateRevisionHistory(
                        id,
                        revisionHistory
                );

        return ResponseEntity.ok(
                convertToResponse(updatedHistory)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRevisionHistory(
            @PathVariable Long id
    ) {

        revisionHistoryService.deleteRevisionHistory(id);

        return ResponseEntity.noContent().build();
    }

    private RevisionHistoryResponse convertToResponse(
            RevisionHistory revisionHistory
    ) {

        return new RevisionHistoryResponse(
                revisionHistory.getId(),
                revisionHistory.getRevisionStage(),
                revisionHistory.getCompletedDate(),
                revisionHistory.getRevision().getId()
        );
    }
}