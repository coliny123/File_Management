package com.example.file_management.naver.service;

import com.example.file_management.naver.model.dto.auth.NaverAuthCodeDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;

@Service
public class NaverOAuth2Service {
    @Value("${oauth.naver.clientId}")
    private String clientId;

    @Value("${oauth.naver.clientSecret}")
    private String clientSecret;

    public String getAccessToken(NaverAuthCodeDto authRequest) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic " + Base64.getEncoder().encodeToString((clientId + ":" + clientSecret).getBytes()));

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        ResponseEntity<String> response = restTemplate.exchange(
                "https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id="
                        + clientId + "&client_secret=" + clientSecret + "&code=" + authRequest.getAuthCode(),
                HttpMethod.GET,
                entity,
                String.class);

        return response.getBody();
    }
}

