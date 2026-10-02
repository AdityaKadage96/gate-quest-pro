//package com.gatequestpro.backend.security;
//
//import com.gatequestpro.backend.entity.User;
//import com.gatequestpro.backend.repository.UserRepository;
//import com.gatequestpro.backend.service.JwtService;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//import java.util.Collections;
//import java.util.Optional;
//
//@Component
//public class JwtAuthenticationFilter
//        extends OncePerRequestFilter {
//
//    private final JwtService jwtService;
//    private final UserRepository userRepository;
//
//    public JwtAuthenticationFilter(
//            JwtService jwtService,
//            UserRepository userRepository
//    ) {
//        this.jwtService = jwtService;
//        this.userRepository = userRepository;
//    }
//
////    @Override
////    protected void doFilterInternal(
////            HttpServletRequest request,
////            HttpServletResponse response,
////            FilterChain filterChain
////    ) throws ServletException, IOException {
////
////        String authorizationHeader =
////                request.getHeader("Authorization");
////
////        if (authorizationHeader == null
////                || !authorizationHeader.startsWith("Bearer ")) {
////
////            filterChain.doFilter(request, response);
////            return;
////        }
////
////        String token =
////                authorizationHeader.substring(7);
////
////        if (!jwtService.isTokenValid(token)) {
////
////            filterChain.doFilter(request, response);
////            return;
////        }
////
////        String email =
////                jwtService.extractEmail(token);
////
////        Optional<User> userOptional =
////                userRepository.findByEmail(email);
////
////        if (userOptional.isPresent()
////                && SecurityContextHolder
////                .getContext()
////                .getAuthentication() == null) {
////
////            User user = userOptional.get();
////
////            UsernamePasswordAuthenticationToken authentication =
////                    new UsernamePasswordAuthenticationToken(
////                            user.getEmail(),
////                            null,
////                            Collections.emptyList()
////                    );
////
////            SecurityContextHolder
////                    .getContext()
////                    .setAuthentication(authentication);
////        }
////
////        filterChain.doFilter(request, response);
////    }
//
////    @Override
////    protected void doFilterInternal(
////            HttpServletRequest request,
////            HttpServletResponse response,
////            FilterChain filterChain
////    ) throws ServletException, IOException {
////
////        String authorizationHeader =
////                request.getHeader("Authorization");
////
////        if (authorizationHeader == null
////                || !authorizationHeader.startsWith("Bearer ")) {
////
////            filterChain.doFilter(request, response);
////            return;
////        }
////
////        String token =
////                authorizationHeader.substring(7);
////
////        if (!jwtService.isTokenValid(token)) {
////
////            filterChain.doFilter(request, response);
////            return;
////        }
////
////        String email =
////                jwtService.extractEmail(token);
////
////        Optional<User> userOptional =
////                userRepository.findByEmail(email);
////
////        if (userOptional.isPresent()
////                && SecurityContextHolder
////                .getContext()
////                .getAuthentication() == null) {
////
////            User user = userOptional.get();
////
////            UsernamePasswordAuthenticationToken authentication =
////                    new UsernamePasswordAuthenticationToken(
////                            user.getEmail(),
////                            null,
////                            Collections.emptyList()
////                    );
////
////            SecurityContextHolder
////                    .getContext()
////                    .setAuthentication(authentication);
////        }
////
////        filterChain.doFilter(request, response);
////    }
//
//
//    @Override
//    protected void doFilterInternal(
//            HttpServletRequest request,
//            HttpServletResponse response,
//            FilterChain filterChain
//    ) throws ServletException, IOException {
//
//        String authorizationHeader =
//                request.getHeader("Authorization");
//
//
//
//        if (authorizationHeader == null
//                || !authorizationHeader.startsWith("Bearer ")) {
//
//
//
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//        String token =
//                authorizationHeader.substring(7);
//
//
//
//        if (!jwtService.isTokenValid(token)) {
//
//
//            filterChain.doFilter(request, response);
//            return;
//        }
//
//
//
//        String email =
//                jwtService.extractEmail(token);
//
//
//
//        Optional<User> userOptional =
//                userRepository.findByEmail(email);
//
//
//
//        if (userOptional.isPresent()
//                && SecurityContextHolder
//                .getContext()
//                .getAuthentication() == null) {
//
//            User user = userOptional.get();
//
//            UsernamePasswordAuthenticationToken authentication =
//                    new UsernamePasswordAuthenticationToken(
//                            user.getEmail(),
//                            null,
//                            Collections.emptyList()
//                    );
//
//            SecurityContextHolder
//                    .getContext()
//                    .setAuthentication(authentication);
//
//        }
//
//
//
//        filterChain.doFilter(request, response);
//    }
//}



package com.gatequestpro.backend.security;

import com.gatequestpro.backend.entity.User;
import com.gatequestpro.backend.repository.UserRepository;
import com.gatequestpro.backend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(
            JwtService jwtService,
            UserRepository userRepository
    ) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authorizationHeader =
                request.getHeader("Authorization");

        if (authorizationHeader == null
                || !authorizationHeader.startsWith("Bearer ")) {

            filterChain.doFilter(request, response);
            return;
        }

        String token =
                authorizationHeader.substring(7);

        if (!jwtService.isTokenValid(token)) {

            filterChain.doFilter(request, response);
            return;
        }

        String email =
                jwtService.extractEmail(token);

        Optional<User> userOptional =
                userRepository.findByEmail(email);

        if (userOptional.isPresent()
                && SecurityContextHolder
                .getContext()
                .getAuthentication() == null) {

            User user = userOptional.get();

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            user.getEmail(),
                            null,
                            Collections.emptyList()
                    );

            SecurityContextHolder
                    .getContext()
                    .setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }
}