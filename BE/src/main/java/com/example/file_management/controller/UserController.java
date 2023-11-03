package com.example.file_management.controller;

import com.example.file_management.security.JwtUtil;
import com.example.file_management.oauth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/me")
    public ResponseEntity<?> User (@RequestHeader(value="Authorization") String token) {
        token = token.replace("Bearer ", ""); // 토큰에서 "Bearer " 문자열 제거

        boolean isValid = jwtUtil.validateRefreshToken(token);

        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않는 access token 입니다.");
        }

        return ResponseEntity.ok("유효한 access token 입니다.");
    }
}