package com.example.file_management.oauth.naver.controller;

import com.example.file_management.oauth.naver.model.dto.response.NaverUserResponse;
import com.example.file_management.oauth.naver.service.NaverUserService;
import com.example.file_management.oauth.naver.model.dto.auth.NaverAuthCodeDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.file_management.oauth.naver.service.NaverOAuth2Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class NaverAuthController {

    private final NaverOAuth2Service naverOAuth2Service;
    private final NaverUserService naverUserService;

    @Autowired
    public NaverAuthController(NaverOAuth2Service naverOAuth2Service, NaverUserService naverUserService) {
        this.naverOAuth2Service = naverOAuth2Service;
        this.naverUserService =  naverUserService;
    }
    @PostMapping("/auth/naver")
    public ResponseEntity<?> authenticateNave(@RequestBody NaverAuthCodeDto authRequest) {
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

        return ResponseEntity.ok(naverUserResponse);
    }
}
