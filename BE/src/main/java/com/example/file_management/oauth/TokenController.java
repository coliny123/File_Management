package com.example.file_management.oauth;

import com.example.file_management.security.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class TokenController {
    private final JwtUtil jwtUtil;

    @Autowired
    public TokenController(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/test/fileinfo/me")
    public ResponseEntity<?> validateToken(@RequestHeader(value="Authorization") String token) {
        token = token.replace("Bearer ", ""); // 토큰에서 "Bearer " 문자열 제거

        boolean isValid = jwtUtil.validateRefreshToken(token);

        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않는 access token 입니다.");
        }

        return ResponseEntity.ok("유효한 access token 입니다.");
    }

    @GetMapping("/auth/refresh")
    public ResponseEntity<?> refreshAccessToken(@RequestHeader(value="Authorization") String refreshToken, HttpServletResponse response) {
        refreshToken = refreshToken.replace("Bearer ", ""); // 토큰에서 "Bearer " 문자열 제거

        // DB에서 리프레시 토큰을 조회
        String refreshTokenInDb = jwtUtil.getRefreshTokenFromToken(refreshToken);

        if (refreshTokenInDb == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않는 refresh token 입니다.");
        }

        // DB에 저장된 리프레시 토큰 유효성 검사
        boolean isValid = jwtUtil.validateRefreshToken(refreshTokenInDb);

        if (!isValid) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효하지 않는 refresh token 입니다.");
        }

        // 새로운 엑세스 토큰 생성
        String newAccessToken = jwtUtil.generateAccessTokenFromRefreshToken(refreshTokenInDb);

        // 응답 본문에 새로운 엑세스 토큰을 담아서 클라이언트에 전송
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("accessToken", newAccessToken);

        return ResponseEntity.ok(responseBody);
    }
}



