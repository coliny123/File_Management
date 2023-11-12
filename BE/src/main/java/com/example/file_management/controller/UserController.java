package com.example.file_management.controller;

import com.example.file_management.security.JwtUtil;
import com.example.file_management.security.JwtValidator;
import com.example.file_management.service.UserInfoService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/me")
    public ResponseEntity<?> User (@RequestHeader(value="Authorization") String token) {
        token = token.replace("Bearer ", ""); // 토큰에서 "Bearer " 문자열 제거

        boolean isValid = jwtUtil.validateRefreshToken(token);

        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않는 access token 입니다.");
        }

        return ResponseEntity.ok("유효한 access token 입니다.");
    }

    @GetMapping("/files")
    public ResponseEntity<?> getUserFiles(HttpServletRequest request) {
        ResponseEntity responseEntity = jwtValidator.validateRequestToken(request);
        if (responseEntity != null) return responseEntity;

        return ResponseEntity.ok(userInfoService.getUserInfoAndFiles(request));
    }
}
