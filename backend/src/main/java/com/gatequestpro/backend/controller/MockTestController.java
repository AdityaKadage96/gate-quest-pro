package com.gatequestpro.backend.controller;

import com.gatequestpro.backend.dto.MockTestRequest;
import com.gatequestpro.backend.dto.MockTestResponse;
import com.gatequestpro.backend.entity.MockTest;
import com.gatequestpro.backend.service.MockTestService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mocks")
@CrossOrigin(origins = "http://localhost:5173")
public class MockTestController {

    private final MockTestService mockTestService;

    public MockTestController(MockTestService mockTestService) {
        this.mockTestService = mockTestService;
    }

    @GetMapping
    public ResponseEntity<List<MockTestResponse>> getAllMockTests() {

        List<MockTestResponse> mockTests =
                mockTestService.getAllMockTests()
                        .stream()
                        .map(this::convertToResponse)
                        .toList();

        return ResponseEntity.ok(mockTests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MockTestResponse> getMockTestById(
            @PathVariable Long id
    ) {

        return mockTestService.getMockTestById(id)
                .map(this::convertToResponse)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MockTestResponse> createMockTest(
            @Valid @RequestBody MockTestRequest request
    ) {

        MockTest mockTest = new MockTest(
                request.getName(),
                request.getTestDate(),
                request.getScore(),
                request.getAccuracy(),
                request.getPercentile()
        );

        MockTest savedMockTest =
                mockTestService.createMockTest(mockTest);

        return ResponseEntity.ok(
                convertToResponse(savedMockTest)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<MockTestResponse> updateMockTest(
            @PathVariable Long id,
            @Valid @RequestBody MockTestRequest request
    ) {

        MockTest mockTest = new MockTest(
                request.getName(),
                request.getTestDate(),
                request.getScore(),
                request.getAccuracy(),
                request.getPercentile()
        );

        MockTest updatedMockTest =
                mockTestService.updateMockTest(id, mockTest);

        return ResponseEntity.ok(
                convertToResponse(updatedMockTest)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMockTest(
            @PathVariable Long id
    ) {

        mockTestService.deleteMockTest(id);

        return ResponseEntity.noContent().build();
    }

    private MockTestResponse convertToResponse(
            MockTest mockTest
    ) {

        return new MockTestResponse(
                mockTest.getId(),
                mockTest.getName(),
                mockTest.getTestDate(),
                mockTest.getScore(),
                mockTest.getAccuracy(),
                mockTest.getPercentile()
        );
    }
}