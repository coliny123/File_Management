package com.example.file_management.oauth.naver.service;

import com.example.file_management.oauth.naver.model.dto.auth.NaverAuthCodeDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.core.type.TypeReference;

import java.util.Base64;
import java.util.Map;

@Service
public class NaverOAuth2Service {
    @Value("${oauth.naver.clientId}")
    private String clientId;

    @Value("${oauth.naver.clientSecret}")
    private String clientSecret;

    public String getAccessToken(NaverAuthCodeDto authRequest)  throws Exception{
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

        ObjectMapper mapper = new ObjectMapper();

        Map<String, Object> responseMap = mapper.readValue(response.getBody(), new TypeReference<>() {});



        return (String)responseMap.get("access_token");
    }


}

