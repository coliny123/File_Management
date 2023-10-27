package com.example.file_management.oauth.google.service;

import com.example.file_management.oauth.AuthCodeDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class GoogleOAuth2Service {

    private static final Logger log = LoggerFactory.getLogger(GoogleOAuth2Service.class);

    @Value("${oauth.google.clientId}")
    private String clientId;
    @Value("${oauth.google.clientSecret}")
    private String clientSecret;
    @Value("${oauth.google.tokenUrl}")
    private String tokenUrl;

    @Value("${oauth.google.redirect_uri}")
    private String redirectUri;
    WebClient webClient = WebClient.create();

    public String getAccessToken(AuthCodeDto authCodeDto) {
        Mono<String> responseMono = webClient.post()
                .uri(tokenUrl)
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters.fromFormData("code", authCodeDto.getAuthCode())
                        .with("client_id", clientId)
                        .with("client_secret", clientSecret)
                        .with("redirect_uri",  this.redirectUri)
                        .with("grant_type", "authorization_code"))
                .retrieve()

                .onStatus(status -> status.value() >= 400, clientResponse ->
                        clientResponse.bodyToMono(String.class).map(errorMessage -> {
                            log.error("Error occurred while calling Google OAuth2 API: " + errorMessage);
                            return new RuntimeException(errorMessage);
                        })
                )
                // successful responses (200-299)
                .bodyToMono(String.class);

        String responseString = responseMono.block();

        JSONObject jsonObject = new JSONObject(responseString);
        return jsonObject.getString("access_token");

    }
}