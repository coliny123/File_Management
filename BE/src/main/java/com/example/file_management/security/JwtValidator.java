package com.example.file_management.security;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtValidator {
    private final JwtUtil jwtUtil;

    public boolean validateAccessToken(String token) {
        token = token.replace("Bearer ", ""); // 토큰에서 "Bearer " 문자열 제거
        return JwtUtil.validateRefreshToken(token);
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

    // 리프레시 토큰의 유효성을 검사하고 새로운 엑세스 토큰을 발급
    public String removeBearerFromToken(String refreshToken) {
        return refreshToken.replace("Bearer ", "");
    }

    public ResponseEntity<?> validateAndGenerateAccessToken(String refreshToken) {
        refreshToken = removeBearerFromToken(refreshToken);

        String refreshTokenInDb = jwtUtil.getRefreshTokenFromToken(refreshToken);

        if (refreshTokenInDb == null || !JwtUtil.validateRefreshToken(refreshTokenInDb)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않는 refresh token 입니다.");
        }

        String newAccessToken = jwtUtil.generateAccessTokenFromRefreshToken(refreshTokenInDb);

        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("accessToken", newAccessToken);

        return ResponseEntity.ok(responseBody);
    }
}


