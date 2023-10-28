package com.example.file_management.oauth;

import com.example.file_management.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import java.util.HashMap;
import java.util.Map;
import com.example.file_management.oauth.model.dto.TokenRequest;

@RestController
public class TokenController {
    @Autowired
    private JwtUtil jwtUtil;
    @PostMapping("/auth/refresh")
    public ResponseEntity<?> refresh(@RequestBody TokenRequest tokenRequest) {
        String refreshToken = tokenRequest.getRefreshToken();

        // 새로운 access token 생성
        String newAccessToken = jwtUtil.generateAccessTokenFromRefreshToken(refreshToken);

        // response body 생성
        Map<String, Object> response = new HashMap<>();
        response.put("accessToken", newAccessToken);

        return ResponseEntity.ok(response);
    }
}
