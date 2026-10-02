package com.gatequestpro.backend.service;

import com.gatequestpro.backend.entity.Subject;
import com.gatequestpro.backend.entity.User;
import com.gatequestpro.backend.repository.SubjectRepository;
import com.gatequestpro.backend.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final CurrentUserService currentUserService;

    public SubjectService(
            SubjectRepository subjectRepository,
            CurrentUserService currentUserService
    ) {
        this.subjectRepository = subjectRepository;
        this.currentUserService = currentUserService;
    }

    public List<Subject> getAllSubjects() {

        User currentUser =
                currentUserService.getCurrentUser();

        return subjectRepository
                .findByUser(currentUser);
    }

    public Optional<Subject> getSubjectById(Long id) {

        User currentUser =
                currentUserService.getCurrentUser();

        return subjectRepository
                .findByIdAndUser(id, currentUser);
    }

    public Subject createSubject(
            Subject subject
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        subject.setUser(currentUser);

        return subjectRepository.save(subject);
    }

    public Subject updateSubject(
            Long id,
            Subject updatedSubject
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        Subject existingSubject =
                subjectRepository
                        .findByIdAndUser(id, currentUser)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Subject not found with id: " + id
                                )
                        );

        existingSubject.setName(
                updatedSubject.getName()
        );

        existingSubject.setBranch(
                updatedSubject.getBranch()
        );

        existingSubject.setWeight(
                updatedSubject.getWeight()
        );

        return subjectRepository.save(
                existingSubject
        );
    }

    public void deleteSubject(Long id) {

        User currentUser =
                currentUserService.getCurrentUser();

        Subject existingSubject =
                subjectRepository
                        .findByIdAndUser(id, currentUser)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Subject not found with id: " + id
                                )
                        );

        subjectRepository.delete(
                existingSubject
        );
    }
}