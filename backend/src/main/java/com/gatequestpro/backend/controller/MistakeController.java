package com.gatequestpro.backend.controller;

import com.gatequestpro.backend.dto.MistakeRequest;
import com.gatequestpro.backend.dto.MistakeResponse;
import com.gatequestpro.backend.entity.Mistake;
import com.gatequestpro.backend.entity.Topic;
import com.gatequestpro.backend.service.MistakeService;
import com.gatequestpro.backend.service.TopicService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.gatequestpro.backend.exception.ResourceNotFoundException;
@RestController
@RequestMapping("/api/mistakes")
@CrossOrigin(origins = "http://localhost:5173")
public class MistakeController {

    private final MistakeService mistakeService;
    private final TopicService topicService;

    public MistakeController(
            MistakeService mistakeService,
            TopicService topicService
    ) {
        this.mistakeService = mistakeService;
        this.topicService = topicService;
    }

    @GetMapping
    public ResponseEntity<List<MistakeResponse>> getAllMistakes() {

        List<MistakeResponse> mistakes =
                mistakeService.getAllMistakes()
                        .stream()
                        .map(this::convertToResponse)
                        .toList();

        return ResponseEntity.ok(mistakes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MistakeResponse> getMistakeById(
            @PathVariable Long id
    ) {

        return mistakeService.getMistakeById(id)
                .map(this::convertToResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MistakeResponse> createMistake(
            @Valid @RequestBody MistakeRequest request
    ) {

        Topic topic =
                topicService.getTopicById(request.getTopicId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Topic not found with id: "
                                                + request.getTopicId()
                                )
                        );

        Mistake mistake = new Mistake(
                request.getQuestion(),
                request.getCorrectAnswer(),
                request.getExplanation(),
                request.getResolved(),
                topic
        );

        Mistake savedMistake =
                mistakeService.createMistake(mistake);

        return ResponseEntity.ok(
                convertToResponse(savedMistake)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<MistakeResponse> updateMistake(
            @PathVariable Long id,
            @Valid @RequestBody MistakeRequest request
    ) {

        Topic topic =
                topicService.getTopicById(request.getTopicId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Topic not found with id: "
                                                + request.getTopicId()
                                )
                        );

        Mistake mistake = new Mistake(
                request.getQuestion(),
                request.getCorrectAnswer(),
                request.getExplanation(),
                request.getResolved(),
                topic
        );

        Mistake updatedMistake =
                mistakeService.updateMistake(id, mistake);

        return ResponseEntity.ok(
                convertToResponse(updatedMistake)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMistake(
            @PathVariable Long id
    ) {

        mistakeService.deleteMistake(id);

        return ResponseEntity.noContent().build();
    }

    private MistakeResponse convertToResponse(
            Mistake mistake
    ) {

        return new MistakeResponse(
                mistake.getId(),
                mistake.getQuestion(),
                mistake.getCorrectAnswer(),
                mistake.getExplanation(),
                mistake.getResolved(),
                mistake.getTopic().getId(),
                mistake.getTopic().getName()
        );
    }
}