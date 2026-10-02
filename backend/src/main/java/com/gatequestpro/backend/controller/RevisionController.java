package com.gatequestpro.backend.controller;

import com.gatequestpro.backend.dto.RevisionRequest;
import com.gatequestpro.backend.dto.RevisionResponse;
import com.gatequestpro.backend.entity.Revision;
import com.gatequestpro.backend.entity.Topic;
import com.gatequestpro.backend.exception.ResourceNotFoundException;
import com.gatequestpro.backend.service.RevisionService;
import com.gatequestpro.backend.service.TopicService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/revisions")
@CrossOrigin(origins = "http://localhost:5173")
public class RevisionController {

    private final RevisionService revisionService;
    private final TopicService topicService;

    public RevisionController(
            RevisionService revisionService,
            TopicService topicService
    ) {
        this.revisionService = revisionService;
        this.topicService = topicService;
    }

    @GetMapping
    public ResponseEntity<List<RevisionResponse>> getAllRevisions() {

        List<RevisionResponse> revisions =
                revisionService.getAllRevisions()
                        .stream()
                        .map(this::convertToResponse)
                        .toList();

        return ResponseEntity.ok(revisions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RevisionResponse> getRevisionById(
            @PathVariable Long id
    ) {

        return revisionService.getRevisionById(id)
                .map(this::convertToResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RevisionResponse> createRevision(
            @Valid @RequestBody RevisionRequest request
    ) {

        Topic topic =
                topicService.getTopicById(request.getTopicId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Topic not found with id: "
                                                + request.getTopicId()
                                )
                        );

        Revision revision = new Revision(
                request.getRevisionStage(),
                request.getRevisionDate(),
                request.getReviewCount(),
                request.getInterval(),
                request.getNextDueDate(),
                request.getCompleted(),
                request.getLastReviewedDate(),
                topic
        );

        Revision savedRevision =
                revisionService.createRevision(revision);

        return ResponseEntity.ok(
                convertToResponse(savedRevision)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<RevisionResponse> updateRevision(
            @PathVariable Long id,
            @Valid @RequestBody RevisionRequest request
    ) {

        Topic topic =
                topicService.getTopicById(request.getTopicId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Topic not found with id: "
                                                + request.getTopicId()
                                )
                        );

        Revision revision = new Revision(
                request.getRevisionStage(),
                request.getRevisionDate(),
                request.getReviewCount(),
                request.getInterval(),
                request.getNextDueDate(),
                request.getCompleted(),
                request.getLastReviewedDate(),
                topic
        );

        Revision updatedRevision =
                revisionService.updateRevision(id, revision);

        return ResponseEntity.ok(
                convertToResponse(updatedRevision)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRevision(
            @PathVariable Long id
    ) {

        revisionService.deleteRevision(id);

        return ResponseEntity.noContent().build();
    }

    private RevisionResponse convertToResponse(
            Revision revision
    ) {

        return new RevisionResponse(
                revision.getId(),
                revision.getRevisionStage(),
                revision.getRevisionDate(),
                revision.getReviewCount(),
                revision.getInterval(),
                revision.getNextDueDate(),
                revision.getCompleted(),
                revision.getLastReviewedDate(),
                revision.getTopic().getId(),
                revision.getTopic().getName()
        );
    }
}