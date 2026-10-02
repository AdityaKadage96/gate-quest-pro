package com.gatequestpro.backend.service;

import com.gatequestpro.backend.entity.User;
import com.gatequestpro.backend.repository.UserRepository;
import com.gatequestpro.backend.exception.ResourceNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class CurrentUserService {

    private final UserRepository userRepository;

    public CurrentUserService(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    public User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || authentication.getName() == null) {

            throw new ResourceNotFoundException(
                    "Authenticated user not found"
            );
        }

        String email =
                authentication.getName();

        return userRepository
                .findByEmail(email)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "User not found with email: "
                                        + email
                        )
                );
    }
}