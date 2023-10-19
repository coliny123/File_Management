package com.example.file_management.oauth.naver.controller;

import com.example.file_management.oauth.AuthCodeDto;
import com.example.file_management.oauth.naver.model.dto.response.NaverUserResponse;
import com.example.file_management.oauth.naver.service.NaverUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.file_management.oauth.naver.service.NaverOAuth2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class NaverOAuthController {

    private final NaverOAuth2Service naverOAuth2Service;
    private final NaverUserService naverUserService;

    @Autowired
    public NaverOAuthController(NaverOAuth2Service naverOAuth2Service, NaverUserService naverUserService) {
        this.naverOAuth2Service = naverOAuth2Service;
        this.naverUserService =  naverUserService;
    }
    @PostMapping("/auth/naver")
    public ResponseEntity<?> authenticateNave(@RequestBody AuthCodeDto authRequest) {
        String naverAuthCode = authRequest.getAuthCode();

        System.out.println("Received auth code(naver): " + naverAuthCode);

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

        // 클라이언트에게 보낼 새로운 응답 객체 생성
        Map<String, Object> response = new HashMap<>();
        response.put("email",  naverUserResponse.getResponse().getEmail());
        response.put("name",  naverUserResponse.getResponse().getName());
        response.put("token",  naverUserResponse.getResponse().getToken());

        return ResponseEntity.ok(response);
    }
}
