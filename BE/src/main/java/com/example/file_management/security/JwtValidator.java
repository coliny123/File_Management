package com.example.file_management.security;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class JwtValidator {
    private final JwtUtil jwtUtil;

    @Autowired
    public JwtValidator(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    public boolean validateAccessToken(String token) {
        token = token.replace("Bearer ", ""); // 토큰에서 "Bearer " 문자열 제거
        return jwtUtil.validateAccessToken(token);
    }

    public ResponseEntity checkTokenValidity(String token) {
        boolean isValid = validateAccessToken(token);
        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않는 access token 입니다.");
        }
        return null;
    }

    public ResponseEntity validateRequestToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        return checkTokenValidity(token);
    }

}

