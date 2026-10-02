package com.gatequestpro.backend.repository;

import com.gatequestpro.backend.entity.MockTest;
import com.gatequestpro.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MockTestRepository
        extends JpaRepository<MockTest, Long> {

    List<MockTest> findByUser(User user);

    Optional<MockTest> findByIdAndUser(
            Long id,
            User user
    );
}