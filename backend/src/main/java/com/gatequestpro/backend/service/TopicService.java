//package com.gatequestpro.backend.service;
//
//import com.gatequestpro.backend.entity.Topic;
//import com.gatequestpro.backend.repository.TopicRepository;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class TopicService {
//
//    private final TopicRepository topicRepository;
//
//    public TopicService(
//            TopicRepository topicRepository
//    ) {
//        this.topicRepository = topicRepository;
//    }
//
//    public List<Topic> getAllTopics() {
//        return topicRepository.findAll();
//    }
//
//    public Optional<Topic> getTopicById(Long id) {
//        return topicRepository.findById(id);
//    }
//
//    public Topic createTopic(Topic topic) {
//        return topicRepository.save(topic);
//    }
//
//    public Topic updateTopic(
//            Long id,
//            Topic updatedTopic
//    ) {
//        Topic existingTopic =
//                topicRepository.findById(id)
//                        .orElseThrow(
//                                () -> new RuntimeException(
//                                        "Topic not found with id: " + id
//                                )
//                        );
//
//        existingTopic.setName(
//                updatedTopic.getName()
//        );
//
//        existingTopic.setDescription(
//                updatedTopic.getDescription()
//        );
//
//        existingTopic.setSubject(
//                updatedTopic.getSubject()
//        );
//
//        existingTopic.setLectures(
//                updatedTopic.isLectures()
//        );
//
//        existingTopic.setPyq(
//                updatedTopic.isPyq()
//        );
//
//        existingTopic.setNotes(
//                updatedTopic.isNotes()
//        );
//
//        existingTopic.setRev1(
//                updatedTopic.isRev1()
//        );
//
//        existingTopic.setRev2(
//                updatedTopic.isRev2()
//        );
//
//        existingTopic.setLastRevisionDate(
//                updatedTopic.getLastRevisionDate()
//        );
//
//        return topicRepository.save(
//                existingTopic
//        );
//    }
//
//    public void deleteTopic(Long id) {
//        Topic existingTopic =
//                topicRepository.findById(id)
//                        .orElseThrow(
//                                () -> new RuntimeException(
//                                        "Topic not found with id: " + id
//                                )
//                        );
//
//        topicRepository.delete(
//                existingTopic
//        );
//    }
//}


package com.gatequestpro.backend.service;

import com.gatequestpro.backend.entity.Topic;
import com.gatequestpro.backend.entity.User;
import com.gatequestpro.backend.repository.TopicRepository;
import com.gatequestpro.backend.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TopicService {

    private final TopicRepository topicRepository;
    private final CurrentUserService currentUserService;

    public TopicService(
            TopicRepository topicRepository,
            CurrentUserService currentUserService
    ) {
        this.topicRepository = topicRepository;
        this.currentUserService = currentUserService;
    }

    public List<Topic> getAllTopics() {

        User currentUser =
                currentUserService.getCurrentUser();

        return topicRepository
                .findBySubjectUser(currentUser);
    }

    public Optional<Topic> getTopicById(Long id) {

        User currentUser =
                currentUserService.getCurrentUser();

        return topicRepository
                .findByIdAndSubjectUser(
                        id,
                        currentUser
                );
    }

    public Topic createTopic(
            Topic topic
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        if (topic.getSubject() == null
                || topic.getSubject().getUser() == null
                || !topic.getSubject()
                .getUser()
                .getId()
                .equals(currentUser.getId())) {

            throw new ResourceNotFoundException(
                    "Subject not found for current user"
            );
        }

        return topicRepository.save(topic);
    }

    public Topic updateTopic(
            Long id,
            Topic updatedTopic
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        Topic existingTopic =
                topicRepository
                        .findByIdAndSubjectUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Topic not found with id: " + id
                                )
                        );

        existingTopic.setName(
                updatedTopic.getName()
        );

        existingTopic.setDescription(
                updatedTopic.getDescription()
        );

        existingTopic.setSubject(
                updatedTopic.getSubject()
        );

        existingTopic.setLectures(
                updatedTopic.isLectures()
        );

        existingTopic.setPyq(
                updatedTopic.isPyq()
        );

        existingTopic.setNotes(
                updatedTopic.isNotes()
        );

        existingTopic.setRev1(
                updatedTopic.isRev1()
        );

        existingTopic.setRev2(
                updatedTopic.isRev2()
        );

        existingTopic.setLastRevisionDate(
                updatedTopic.getLastRevisionDate()
        );

        return topicRepository.save(
                existingTopic
        );
    }

    public void deleteTopic(Long id) {

        User currentUser =
                currentUserService.getCurrentUser();

        Topic existingTopic =
                topicRepository
                        .findByIdAndSubjectUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Topic not found with id: " + id
                                )
                        );

        topicRepository.delete(
                existingTopic
        );
    }
}