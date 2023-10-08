package com.example.file_management.naver.controller;

import com.example.file_management.naver.model.dto.response.NaverUserResponse;
import com.example.file_management.naver.service.NaverUserService;
import com.example.file_management.naver.model.dto.auth.NaverAuthCodeDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.file_management.naver.service.NaverOAuth2Service;
import org.springframework.beans.factory.annotation.Autowired;

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

//        String accessToken = naverOAuth2Service.getAccessToken(authRequest);

        String accessToken = null;
        try {
            accessToken = naverOAuth2Service.getAccessToken(authRequest);
            System.out.println("Received access token(naver): " + accessToken);
        } catch (Exception e) {
            System.out.println("Error while getting access token: " + e.getMessage());
        }

        //사용자 정보 얻기
        NaverUserResponse naverUserResponse = naverUserService.updateUserInfo(accessToken);

        return ResponseEntity.ok(naverUserResponse);
    }
}
