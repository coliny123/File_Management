package com.example.file_management.oauth.kakao.controller;

import com.example.file_management.oauth.AuthCodeDto;
import com.example.file_management.oauth.kakao.model.dto.response.KakaoUserResponse;
import com.example.file_management.oauth.kakao.service.KakaoOAuth2Service;
import com.example.file_management.oauth.kakao.service.KakaoUserService;
import com.example.file_management.security.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class KakaoOAuthController {

    private final KakaoOAuth2Service kakaoOAuth2Service;
    private final KakaoUserService kakaoUserService;

    @Autowired
    public KakaoOAuthController(KakaoOAuth2Service kakaoOAuth2Service, KakaoUserService kakaoUserService) {
        this.kakaoOAuth2Service = kakaoOAuth2Service;
        this.kakaoUserService = kakaoUserService;
    }

    @PostMapping("/auth/kakao")
    public ResponseEntity<?> authenticateKakao(@RequestBody AuthCodeDto authRequest, HttpServletResponse response) {
        String kakaoAuthCode = authRequest.getAuthCode();

        System.out.println("Received auth code(kakao): " + kakaoAuthCode);

        String accessToken;
        try {
            accessToken = kakaoOAuth2Service.getAccessToken(authRequest);
            System.out.println("Received access token(kakao): " + accessToken);
        } catch (Exception e) {
            System.out.println("Error while getting access token: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while getting access token.");
        }

        KakaoUserResponse kakaoUserResponse = kakaoUserService.updateUserInfo(accessToken);

        if (kakaoUserResponse == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while updating user info.");
        }

        String email = kakaoUserResponse.getKakaoAccount().get("email").toString();
        String nickname = kakaoUserResponse.getProperties().get("nickname").toString();

        String jwtToken = JwtUtil.generateToken(email, nickname);
        String refreshToken = JwtUtil.generateRefreshToken(email);

        // 리프레시 토큰 DB에 저장
        kakaoUserService.saveRefreshToken(email, refreshToken);

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
        responseBody.put("name", nickname);
        responseBody.put("token", jwtToken);
        responseBody.put("refreshToken", refreshToken);

        return ResponseEntity.ok(responseBody);
    }
}
