package com.example.file_management.naver.controller;

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

    @Autowired
    public NaverAuthController(NaverOAuth2Service naverOAuth2Service) {
        this.naverOAuth2Service = naverOAuth2Service;
    }

    @PostMapping("/auth/naver")
    public ResponseEntity<?> authenticateNave(@RequestBody NaverAuthCodeDto authRequest) {
        String naverAuthCode = authRequest.getAuthCode();

        System.out.println("Received auth code(naver): " + naverAuthCode);

        String accessToken = naverOAuth2Service.getAccessToken(authRequest);

        System.out.println("Received access token(naver): " + accessToken);

        return ResponseEntity.ok("Received auth code(naver): " + naverAuthCode);
    }
}
