package com.gatequestpro.backend.controller;

import com.gatequestpro.backend.dto.FlashcardRequest;
import com.gatequestpro.backend.dto.FlashcardResponse;
import com.gatequestpro.backend.entity.Flashcard;
import com.gatequestpro.backend.entity.Topic;
import com.gatequestpro.backend.service.FlashcardService;
import com.gatequestpro.backend.service.TopicService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.gatequestpro.backend.exception.ResourceNotFoundException;
@RestController
@RequestMapping("/api/flashcards")
@CrossOrigin(origins = "http://localhost:5173")
public class FlashcardController {

    private final FlashcardService flashcardService;
    private final TopicService topicService;

    public FlashcardController(
            FlashcardService flashcardService,
            TopicService topicService
    ) {
        this.flashcardService = flashcardService;
        this.topicService = topicService;
    }

    @GetMapping
    public ResponseEntity<List<FlashcardResponse>> getAllFlashcards() {

        List<FlashcardResponse> flashcards =
                flashcardService.getAllFlashcards()
                        .stream()
                        .map(this::convertToResponse)
                        .toList();

        return ResponseEntity.ok(flashcards);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FlashcardResponse> getFlashcardById(
            @PathVariable Long id
    ) {

        return flashcardService.getFlashcardById(id)
                .map(this::convertToResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<FlashcardResponse> createFlashcard(
            @Valid @RequestBody FlashcardRequest request
    ) {

        Topic topic =
                topicService.getTopicById(request.getTopicId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Topic not found with id: "
                                                + request.getTopicId()
                                )
                        );

        Flashcard flashcard = new Flashcard(
                request.getQuestion(),
                request.getAnswer(),
                request.getMastered(),
                topic
        );

        Flashcard savedFlashcard =
                flashcardService.createFlashcard(flashcard);

        return ResponseEntity.ok(
                convertToResponse(savedFlashcard)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<FlashcardResponse> updateFlashcard(
            @PathVariable Long id,
            @Valid @RequestBody FlashcardRequest request
    ) {

        Topic topic =
                topicService.getTopicById(request.getTopicId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Topic not found with id: "
                                                + request.getTopicId()
                                )
                        );

        Flashcard flashcard = new Flashcard(
                request.getQuestion(),
                request.getAnswer(),
                request.getMastered(),
                topic
        );

        Flashcard updatedFlashcard =
                flashcardService.updateFlashcard(id, flashcard);

        return ResponseEntity.ok(
                convertToResponse(updatedFlashcard)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFlashcard(
            @PathVariable Long id
    ) {

        flashcardService.deleteFlashcard(id);

        return ResponseEntity.noContent().build();
    }

    private FlashcardResponse convertToResponse(
            Flashcard flashcard
    ) {

        return new FlashcardResponse(
                flashcard.getId(),
                flashcard.getQuestion(),
                flashcard.getAnswer(),
                flashcard.getMastered(),
                flashcard.getTopic().getId(),
                flashcard.getTopic().getName()
        );
    }
}