package com.example.file_management.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import java.util.Optional;

@ConfigurationProperties(prefix = "oauth.naver")
public record NaverOauthConfig(
        String redirect_uri,
        String client_id,
        String client_secret,
        Optional<String[]> scope,
        Optional<String> state
) {
}
