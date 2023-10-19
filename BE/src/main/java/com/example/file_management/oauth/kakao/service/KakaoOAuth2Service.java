package com.example.file_management.oauth.kakao.service;

import com.example.file_management.oauth.AuthCodeDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.core.type.TypeReference;
import java.util.Map;

@Service
public class KakaoOAuth2Service {
    @Value("${oauth.kakao.clientId}")
    private String clientId;
    @Value("${oauth.kakao.clientSecret}")
    private String clientSecret;
    @Value("${oauth.kakao.redirectUri}")
    private String redirectUri;

    public String getAccessToken(AuthCodeDto authRequest) throws Exception {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params= new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("code", authRequest.getAuthCode());

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(
                "https://kauth.kakao.com/oauth/token",
                request,
                String.class);

        ObjectMapper mapper = new ObjectMapper();

        Map<String, Object> responseMap = mapper.readValue(response.getBody(), new TypeReference<Map<String,Object>>() {});

        return (String)responseMap.get("access_token");
    }
}
