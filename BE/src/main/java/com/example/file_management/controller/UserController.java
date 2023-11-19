package com.example.file_management.controller;

import com.example.file_management.security.JwtUtil;
import com.example.file_management.security.JwtValidator;
import com.example.file_management.service.UserInfoService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    private final JwtUtil jwtUtil;

    private final UserInfoService userInfoService;

    private final JwtValidator jwtValidator;

    @Autowired
    public UserController(JwtUtil jwtUtil, UserInfoService userInfoService, JwtValidator jwtValidator) {
        this.jwtUtil = jwtUtil;
        this.userInfoService = userInfoService;
        this.jwtValidator = jwtValidator;
    }

    @GetMapping("/files")
    public ResponseEntity<?> getUserFiles(HttpServletRequest request) {
        return ResponseEntity.ok(userInfoService.getUserInfoAndFiles(request));
    }
}
