//package com.gatequestpro.backend.service;
//
//import com.gatequestpro.backend.entity.RevisionHistory;
//import com.gatequestpro.backend.repository.RevisionHistoryRepository;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class RevisionHistoryService {
//
//    private final RevisionHistoryRepository revisionHistoryRepository;
//
//    public RevisionHistoryService(
//            RevisionHistoryRepository revisionHistoryRepository
//    ) {
//        this.revisionHistoryRepository =
//                revisionHistoryRepository;
//    }
//
//    public List<RevisionHistory> getAllRevisionHistory() {
//        return revisionHistoryRepository.findAll();
//    }
//
//    public Optional<RevisionHistory> getRevisionHistoryById(
//            Long id
//    ) {
//        return revisionHistoryRepository.findById(id);
//    }
//
//    public RevisionHistory createRevisionHistory(
//            RevisionHistory revisionHistory
//    ) {
//        return revisionHistoryRepository.save(
//                revisionHistory
//        );
//    }
//
//    public RevisionHistory updateRevisionHistory(
//            Long id,
//            RevisionHistory updatedRevisionHistory
//    ) {
//        RevisionHistory existingRevisionHistory =
//                revisionHistoryRepository.findById(id)
//                        .orElseThrow(
//                                () -> new RuntimeException(
//                                        "Revision history not found with id: " + id
//                                )
//                        );
//
//        existingRevisionHistory.setRevisionStage(
//                updatedRevisionHistory.getRevisionStage()
//        );
//
//        existingRevisionHistory.setCompletedDate(
//                updatedRevisionHistory.getCompletedDate()
//        );
//
//        existingRevisionHistory.setRevision(
//                updatedRevisionHistory.getRevision()
//        );
//
//        return revisionHistoryRepository.save(
//                existingRevisionHistory
//        );
//    }
//
//    public void deleteRevisionHistory(Long id) {
//        RevisionHistory existingRevisionHistory =
//                revisionHistoryRepository.findById(id)
//                        .orElseThrow(
//                                () -> new RuntimeException(
//                                        "Revision history not found with id: " + id
//                                )
//                        );
//
//        revisionHistoryRepository.delete(
//                existingRevisionHistory
//        );
//    }
//}

package com.gatequestpro.backend.service;

import com.gatequestpro.backend.entity.Revision;
import com.gatequestpro.backend.entity.RevisionHistory;
import com.gatequestpro.backend.entity.User;
import com.gatequestpro.backend.repository.RevisionHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RevisionHistoryService {

    private final RevisionHistoryRepository revisionHistoryRepository;
    private final CurrentUserService currentUserService;

    public RevisionHistoryService(
            RevisionHistoryRepository revisionHistoryRepository,
            CurrentUserService currentUserService
    ) {
        this.revisionHistoryRepository = revisionHistoryRepository;
        this.currentUserService = currentUserService;
    }

    public List<RevisionHistory> getAllRevisionHistory() {

        User currentUser =
                currentUserService.getCurrentUser();

        return revisionHistoryRepository
                .findByRevisionTopicSubjectUser(
                        currentUser
                );
    }

    public Optional<RevisionHistory> getRevisionHistoryById(
            Long id
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        return revisionHistoryRepository
                .findByIdAndRevisionTopicSubjectUser(
                        id,
                        currentUser
                );
    }

    public RevisionHistory createRevisionHistory(
            RevisionHistory revisionHistory
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        Revision revision =
                revisionHistory.getRevision();

        if (revision == null
                || revision.getTopic() == null
                || revision.getTopic().getSubject() == null
                || revision.getTopic().getSubject().getUser() == null
                || !revision
                .getTopic()
                .getSubject()
                .getUser()
                .getId()
                .equals(currentUser.getId())) {

            throw new RuntimeException(
                    "Revision not found for current user"
            );
        }

        return revisionHistoryRepository.save(
                revisionHistory
        );
    }

    public RevisionHistory updateRevisionHistory(
            Long id,
            RevisionHistory updatedRevisionHistory
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        RevisionHistory existingRevisionHistory =
                revisionHistoryRepository
                        .findByIdAndRevisionTopicSubjectUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Revision history not found with id: "
                                                + id
                                )
                        );

        Revision revision =
                updatedRevisionHistory.getRevision();

        if (revision == null
                || revision.getTopic() == null
                || revision.getTopic().getSubject() == null
                || revision.getTopic().getSubject().getUser() == null
                || !revision
                .getTopic()
                .getSubject()
                .getUser()
                .getId()
                .equals(currentUser.getId())) {

            throw new RuntimeException(
                    "Revision not found for current user"
            );
        }

        existingRevisionHistory.setRevisionStage(
                updatedRevisionHistory.getRevisionStage()
        );

        existingRevisionHistory.setCompletedDate(
                updatedRevisionHistory.getCompletedDate()
        );

        existingRevisionHistory.setRevision(
                updatedRevisionHistory.getRevision()
        );

        return revisionHistoryRepository.save(
                existingRevisionHistory
        );
    }

    public void deleteRevisionHistory(
            Long id
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        RevisionHistory existingRevisionHistory =
                revisionHistoryRepository
                        .findByIdAndRevisionTopicSubjectUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Revision history not found with id: "
                                                + id
                                )
                        );

        revisionHistoryRepository.delete(
                existingRevisionHistory
        );
    }
}