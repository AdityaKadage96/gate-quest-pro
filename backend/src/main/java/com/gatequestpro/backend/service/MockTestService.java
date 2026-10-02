package com.gatequestpro.backend.service;

import com.gatequestpro.backend.entity.MockTest;
import com.gatequestpro.backend.entity.User;
import com.gatequestpro.backend.repository.MockTestRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MockTestService {

    private final MockTestRepository mockTestRepository;
    private final CurrentUserService currentUserService;

    public MockTestService(
            MockTestRepository mockTestRepository,
            CurrentUserService currentUserService
    ) {
        this.mockTestRepository = mockTestRepository;
        this.currentUserService = currentUserService;
    }

    public List<MockTest> getAllMockTests() {

        User currentUser =
                currentUserService.getCurrentUser();

        return mockTestRepository.findByUser(
                currentUser
        );
    }

    public Optional<MockTest> getMockTestById(
            Long id
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        return mockTestRepository.findByIdAndUser(
                id,
                currentUser
        );
    }

    public MockTest createMockTest(
            MockTest mockTest
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        mockTest.setUser(currentUser);

        return mockTestRepository.save(
                mockTest
        );
    }

    public MockTest updateMockTest(
            Long id,
            MockTest updatedMockTest
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        MockTest existingMockTest =
                mockTestRepository.findByIdAndUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Mock test not found with id: "
                                                + id
                                )
                        );

        existingMockTest.setName(
                updatedMockTest.getName()
        );

        existingMockTest.setTestDate(
                updatedMockTest.getTestDate()
        );

        existingMockTest.setScore(
                updatedMockTest.getScore()
        );

        existingMockTest.setAccuracy(
                updatedMockTest.getAccuracy()
        );

        existingMockTest.setPercentile(
                updatedMockTest.getPercentile()
        );

        return mockTestRepository.save(
                existingMockTest
        );
    }

    public void deleteMockTest(
            Long id
    ) {

        User currentUser =
                currentUserService.getCurrentUser();

        MockTest existingMockTest =
                mockTestRepository.findByIdAndUser(
                                id,
                                currentUser
                        )
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Mock test not found with id: "
                                                + id
                                )
                        );

        mockTestRepository.delete(
                existingMockTest
        );
    }
}