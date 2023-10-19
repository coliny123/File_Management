package com.example.file_management.oauth.kakao;

<<<<<<< HEAD

=======
>>>>>>> featureBE-hw
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "oauth.kakao")
public record KakaoOauthConfig(
        String redirectUri,
        String clientId,
        String clientSecret,
        String[] scope
) {
}
