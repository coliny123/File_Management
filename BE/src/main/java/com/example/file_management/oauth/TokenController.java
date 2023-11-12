package com.example.file_management.oauth;

import com.example.file_management.security.JwtValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TokenController {
    private final JwtValidator jwtValidator;

    @GetMapping("/auth/refresh")
    public ResponseEntity<?> refreshAccessToken(@RequestHeader(value="Authorization") String refreshToken) {
        return jwtValidator.validateAndGenerateAccessToken(refreshToken);
    }
}



