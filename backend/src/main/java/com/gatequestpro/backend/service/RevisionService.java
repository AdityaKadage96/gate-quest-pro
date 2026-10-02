package com.gatequestpro.backend.service;

import com.gatequestpro.backend.entity.Revision;
import com.gatequestpro.backend.entity.User;
import com.gatequestpro.backend.repository.RevisionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RevisionService {

    private final RevisionRepository revisionRepository;
    private final CurrentUserService currentUserService;

    public RevisionService(
            RevisionRepository revisionRepository,
            CurrentUserService currentUserService
    ) {
        this.revisionRepository = revisionRepository;
        this.currentUserService = currentUserService;
    }

    public List<Revision> getAllRevisions() {

        User currentUser =
                currentUserService.getCurrentUser();

        return revisionRepository
                .findByTopicSubjectUser(currentUser);
    }

    public Optional<Revision> getRevisionById(Long id) {

        User currentUser =
                currentUserService.getCurrentUser();

        return revisionRepository
                .findByIdAndTopicSubjectUser(
                        id,
                        currentUser
                );
    }

    public Revision createRevision(
            Revision revision
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        if (revision.getTopic() == null
                || revision.getTopic().getSubject() == null
                || revision.getTopic().getSubject().getUser() == null
                || !revision.getTopic()
                .getSubject()
                .getUser()
                .getId()
                .equals(currentUser.getId())) {

            throw new RuntimeException(
                    "Topic not found for current user"
            );
        }

        return revisionRepository.save(revision);
    }

    public Revision updateRevision(
            Long id,
            Revision updatedRevision
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        Revision existingRevision =
                revisionRepository
                        .findByIdAndTopicSubjectUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Revision not found with id: "
                                                + id
                                )
                        );

        if (updatedRevision.getTopic() == null
                || updatedRevision.getTopic().getSubject() == null
                || updatedRevision.getTopic().getSubject().getUser() == null
                || !updatedRevision.getTopic()
                .getSubject()
                .getUser()
                .getId()
                .equals(currentUser.getId())) {

            throw new RuntimeException(
                    "Topic not found for current user"
            );
        }

        existingRevision.setRevisionStage(
                updatedRevision.getRevisionStage()
        );

        existingRevision.setRevisionDate(
                updatedRevision.getRevisionDate()
        );

        existingRevision.setReviewCount(
                updatedRevision.getReviewCount()
        );

        existingRevision.setInterval(
                updatedRevision.getInterval()
        );

        existingRevision.setNextDueDate(
                updatedRevision.getNextDueDate()
        );

        existingRevision.setCompleted(
                updatedRevision.getCompleted()
        );

        existingRevision.setLastReviewedDate(
                updatedRevision.getLastReviewedDate()
        );

        existingRevision.setTopic(
                updatedRevision.getTopic()
        );

        return revisionRepository.save(
                existingRevision
        );
    }

    public void deleteRevision(Long id) {

        User currentUser =
                currentUserService.getCurrentUser();

        Revision existingRevision =
                revisionRepository
                        .findByIdAndTopicSubjectUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Revision not found with id: "
                                                + id
                                )
                        );

        revisionRepository.delete(
                existingRevision
        );
    }
}