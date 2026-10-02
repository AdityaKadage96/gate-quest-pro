package com.gatequestpro.backend.controller;

import com.gatequestpro.backend.dto.TopicRequest;
import com.gatequestpro.backend.dto.TopicResponse;
import com.gatequestpro.backend.entity.Subject;
import com.gatequestpro.backend.entity.Topic;
import com.gatequestpro.backend.service.SubjectService;
import com.gatequestpro.backend.service.TopicService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.gatequestpro.backend.exception.ResourceNotFoundException;
@RestController
@RequestMapping("/api/topics")
@CrossOrigin(origins = "http://localhost:5173")
public class TopicController {

    private final TopicService topicService;
    private final SubjectService subjectService;

    public TopicController(
            TopicService topicService,
            SubjectService subjectService
    ) {
        this.topicService = topicService;
        this.subjectService = subjectService;
    }

    @GetMapping
    public ResponseEntity<List<TopicResponse>> getAllTopics() {

        List<TopicResponse> topics =
                topicService.getAllTopics()
                        .stream()
                        .map(this::convertToResponse)
                        .toList();

        return ResponseEntity.ok(topics);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TopicResponse> getTopicById(
            @PathVariable Long id
    ) {

        return topicService.getTopicById(id)
                .map(this::convertToResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TopicResponse> createTopic(
            @Valid @RequestBody TopicRequest request
    ) {

        Subject subject =
                subjectService.getSubjectById(request.getSubjectId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Subject not found with id: "
                                                + request.getSubjectId()
                                )
                        );

//        Topic topic = new Topic(
//                request.getName(),
//                request.getDescription(),
//                subject
//        );

        Topic topic = new Topic(
                request.getName(),
                request.getDescription(),
                subject
        );

        topic.setLectures(request.isLectures());
        topic.setPyq(request.isPyq());
        topic.setNotes(request.isNotes());
        topic.setRev1(request.isRev1());
        topic.setRev2(request.isRev2());
        topic.setLastRevisionDate(
                request.getLastRevisionDate()
        );

        Topic savedTopic =
                topicService.createTopic(topic);

        return ResponseEntity.ok(
                convertToResponse(savedTopic)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<TopicResponse> updateTopic(
            @PathVariable Long id,
            @Valid @RequestBody TopicRequest request
    ) {

        Subject subject =
                subjectService.getSubjectById(request.getSubjectId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Subject not found with id: "
                                                + request.getSubjectId()
                                )
                        );


//        Topic topic = new Topic(
//                request.getName(),
//                request.getDescription(),
//                subject
//        );

        Topic topic = new Topic(
                request.getName(),
                request.getDescription(),
                subject
        );

        topic.setLectures(request.isLectures());
        topic.setPyq(request.isPyq());
        topic.setNotes(request.isNotes());
        topic.setRev1(request.isRev1());
        topic.setRev2(request.isRev2());
        topic.setLastRevisionDate(
                request.getLastRevisionDate()
        );

        Topic updatedTopic =
                topicService.updateTopic(id, topic);

        return ResponseEntity.ok(
                convertToResponse(updatedTopic)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTopic(
            @PathVariable Long id
    ) {

        topicService.deleteTopic(id);

        return ResponseEntity.noContent().build();
    }

    private TopicResponse convertToResponse(
            Topic topic
    ) {

//        return new TopicResponse(
//                topic.getId(),
//                topic.getName(),
//                topic.getDescription(),
//                topic.getSubject().getId(),
//                topic.getSubject().getName()
//        );

        return new TopicResponse(
                topic.getId(),
                topic.getName(),
                topic.getDescription(),
                topic.getSubject().getId(),
                topic.getSubject().getName(),
                topic.isLectures(),
                topic.isPyq(),
                topic.isNotes(),
                topic.isRev1(),
                topic.isRev2(),
                topic.getLastRevisionDate()
        );
    }
}