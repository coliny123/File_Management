package com.example.file_management.oauth.naver.controller;

import com.example.file_management.oauth.AuthCodeDto;
import com.example.file_management.oauth.naver.model.dto.response.NaverUserResponse;
import com.example.file_management.oauth.naver.service.NaverOAuth2Service;
import com.example.file_management.oauth.naver.service.NaverUserService;
import com.example.file_management.security.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class NaverOAuthController {

    private final NaverOAuth2Service naverOAuth2Service;
    private final NaverUserService naverUserService;

    @PostMapping("/auth/naver")
    public ResponseEntity<?> authenticateNave(@RequestBody AuthCodeDto authRequest, HttpServletResponse response) {

        String accessToken;
        try {
            accessToken = naverOAuth2Service.getAccessToken(authRequest);
            System.out.println("Received access token(naver): " + accessToken);
        } catch (Exception e) {
            System.out.println("Error while getting access token: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while getting access token.");
        }

        //사용자 정보 얻기
        NaverUserResponse naverUserResponse = naverUserService.updateUserInfo(accessToken);
        if (naverUserResponse == null || naverUserResponse.getResponse() == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while updating user info.");
        }

        String email = naverUserResponse.getResponse().getEmail();
        String name = naverUserResponse.getResponse().getName();

        String jwtToken = JwtUtil.generateToken(email, name);
        String refreshToken = JwtUtil.generateRefreshToken(email);

        // 리프레시 토큰 DB에 저장
        naverUserService.saveRefreshToken(email, refreshToken);

        Cookie jwtTokenCookie = new Cookie("jwt_token", jwtToken);
        jwtTokenCookie.setHttpOnly(true);
        jwtTokenCookie.setMaxAge(60 * 60);

        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setMaxAge(60 * 60 * 24 * 14);

        response.addCookie(jwtTokenCookie);
        response.addCookie(refreshTokenCookie);

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("email", email);
        responseBody.put("name", name);
        responseBody.put("token", jwtToken);
        responseBody.put("refreshToken", refreshToken);

        return ResponseEntity.ok(responseBody);

    }
}
