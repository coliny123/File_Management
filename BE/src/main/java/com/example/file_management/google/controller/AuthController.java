package com.example.file_management.google.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.file_management.google.model.dto.auth.AuthCodeDto;
import com.example.file_management.google.service.GoogleOAuth2Service;
import com.example.file_management.google.service.UserService;
import com.example.file_management.google.model.dto.response.UserResponse;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class AuthController {
    private final GoogleOAuth2Service googleOAuth2Service;
    private final UserService userService;

    @Autowired
    public AuthController(GoogleOAuth2Service googleOAuth2Service, UserService userService) {
        this.googleOAuth2Service = googleOAuth2Service;
        this.userService = userService;
    }

    @PostMapping("/auth/google")
    public ResponseEntity<?> authenticate(@RequestBody AuthCodeDto authRequest) {
        String redirectUri = "http://localhost:3000/auth/google/callback";

        System.out.println("Received auth code(google): " + authRequest.getAuthCode());

        String accessToken = googleOAuth2Service.getAccessToken(authRequest, redirectUri);

        //인증 코드를 바탕으로 Google OAuth2 서버로부터 받은 액세스 토큰
        System.out.println("Received access token(google): " + accessToken);

        //사용자 정보 얻고, 데이터베이스에 저장 및 JWT 토큰 생성 후 반환
        UserResponse userResponse = userService.getUserInfoAndSave(accessToken);

        return ResponseEntity.ok(userResponse);  // HTTP 200 OK와 함께 JSON 응답 전송
    }
}
