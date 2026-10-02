package com.gatequestpro.backend.service;

import com.gatequestpro.backend.dto.AuthRequest;
import com.gatequestpro.backend.dto.AuthResponse;
import com.gatequestpro.backend.dto.RegisterRequest;
import com.gatequestpro.backend.entity.User;
import com.gatequestpro.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.gatequestpro.backend.exception.DuplicateResourceException;
import com.gatequestpro.backend.exception.InvalidCredentialsException;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
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

        User savedUser =
                userRepository.save(user);

        String token =
                jwtService.generateToken(
                        savedUser.getEmail()
                );

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getBranch()
        );
    }

    public AuthResponse login(AuthRequest request) {

        User user =
                userRepository.findByEmail(
                                request.getEmail()
                        )
                        .orElseThrow(
                                () -> new InvalidCredentialsException(
                                        "Invalid email or password"
                                )
                        );

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {

            throw new InvalidCredentialsException(
                    "Invalid email or password"
            );
        }

        String token =
                jwtService.generateToken(
                        user.getEmail()
                );

        return new AuthResponse(
                token,
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getBranch()
        );
    }
}