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

        // 클라이언트에게 보낼 새로운 응답 객체 생성
        Map<String, Object> response = new HashMap<>();
        response.put("email", kakaoUserResponse.getKakaoAccount().get("email"));
        response.put("name", kakaoUserResponse.getProperties().get("nickname"));
        response.put("token", kakaoUserResponse.getToken());


        return ResponseEntity.ok(response);
    }

}

