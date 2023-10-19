package com.example.file_management.oauth.kakao.controller;


import com.example.file_management.oauth.AuthCodeDto;
import com.example.file_management.oauth.kakao.model.dto.response.KakaoUserResponse;
import com.example.file_management.oauth.kakao.service.KakaoOAuth2Service;
import com.example.file_management.oauth.kakao.service.KakaoUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

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
    public ResponseEntity<?> authenticateNave(@RequestBody AuthCodeDto authRequest) {
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

        //사용자 정보 얻기
        KakaoUserResponse kakaoUserResponse = kakaoUserService.updateUserInfo(accessToken);

        if (kakaoUserResponse == null || kakaoUserResponse.getToken() == null) {  // getResponse() 대신 getToken() 호출
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while updating user info.");
        }

        return ResponseEntity.ok(kakaoUserResponse);
    }

}

