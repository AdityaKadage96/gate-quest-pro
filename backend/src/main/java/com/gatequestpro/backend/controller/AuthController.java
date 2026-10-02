package com.gatequestpro.backend.controller;

import com.gatequestpro.backend.dto.AuthRequest;
import com.gatequestpro.backend.dto.AuthResponse;
import com.gatequestpro.backend.dto.RegisterRequest;
import com.gatequestpro.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(
            AuthService authService
    ) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {
        AuthResponse response =
                authService.register(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody AuthRequest request
    ) {
        AuthResponse response =
                authService.login(request);

        return ResponseEntity.ok(response);
    }
}