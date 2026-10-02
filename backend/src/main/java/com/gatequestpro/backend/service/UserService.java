package com.gatequestpro.backend.service;

import com.gatequestpro.backend.dto.UserRequest;
import com.gatequestpro.backend.entity.User;
import com.gatequestpro.backend.exception.DuplicateResourceException;
import com.gatequestpro.backend.exception.ResourceNotFoundException;
import com.gatequestpro.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {

        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {

        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {

        return userRepository.findByEmail(email);
    }

    public User createUser(
            UserRequest request
    ) {

        if (userRepository
                .findByEmail(request.getEmail())
                .isPresent()) {

            throw new DuplicateResourceException(
                    "User already exists with email: "
                            + request.getEmail()
            );
        }

        String encodedPassword =
                passwordEncoder.encode(
                        request.getPassword()
                );

        User user = new User(
                request.getName(),
                request.getEmail(),
                encodedPassword,
                request.getBranch()
        );

        return userRepository.save(user);
    }

    public User updateUser(
            Long id,
            UserRequest request
    ) {

        User existingUser =
                userRepository.findById(id)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "User not found with id: " + id
                                )
                        );

        Optional<User> userWithSameEmail =
                userRepository.findByEmail(
                        request.getEmail()
                );

        if (userWithSameEmail.isPresent()
                && !userWithSameEmail
                .get()
                .getId()
                .equals(id)) {

            throw new DuplicateResourceException(
                    "User already exists with email: "
                            + request.getEmail()
            );
        }

        existingUser.setName(
                request.getName()
        );

        existingUser.setEmail(
                request.getEmail()
        );

        existingUser.setBranch(
                request.getBranch()
        );

        if (request.getPassword() != null
                && !request.getPassword().isBlank()) {

            String encodedPassword =
                    passwordEncoder.encode(
                            request.getPassword()
                    );

            existingUser.setPassword(
                    encodedPassword
            );
        }

        return userRepository.save(
                existingUser
        );
    }

    public void deleteUser(Long id) {

        User existingUser =
                userRepository.findById(id)
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "User not found with id: " + id
                                )
                        );

        userRepository.delete(
                existingUser
        );
    }
}