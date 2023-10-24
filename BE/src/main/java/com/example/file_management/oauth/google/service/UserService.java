package com.example.file_management.oauth.google.service;

import com.example.file_management.oauth.google.model.entity.GoogleUser;
import com.example.file_management.oauth.model.entity.RefreshToken;
import com.example.file_management.oauth.repository.RefreshTokenRepository;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import com.example.file_management.oauth.google.model.dto.response.UserResponse;
import com.example.file_management.oauth.google.repository.GoogleUserRepository;
import java.util.Optional;

import com.example.file_management.security.JwtUtil;

@Service
public class UserService {
    private final WebClient webClient;
    private final GoogleUserRepository googleUserRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Autowired
    public UserService(GoogleUserRepository googleUserRepository, RefreshTokenRepository refreshTokenRepository) {
        this.googleUserRepository = googleUserRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.webClient = WebClient.builder().filter(logRequest()).build();
    }

    // 로그 출력용 ExchangeFilterFunction
    private ExchangeFilterFunction logRequest() {
        return (clientRequest, next) -> {
            System.out.println("Request: " + clientRequest.method() + " " + clientRequest.url());
            clientRequest.headers().forEach((name, values) -> values.forEach(value -> System.out.println(name + ":" + value)));
            return next.exchange(clientRequest);
        };
    }

    public UserResponse getUserInfoAndSave(String accessToken) {
        String userEndpointUrl="https://www.googleapis.com/oauth2/v3/userinfo";

        String userInfoResponse = webClient.get()
                .uri(userEndpointUrl)
                .headers(headers -> headers.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(String.class)
                .onErrorResume(e -> {  // 에러 발생 시 로그 출력 및 빈 Mono 반환
                    System.out.println("WebClient request error: " + e.getMessage());
                    return Mono.empty();
                })
                .block();


        // 구글 서버에서 받아온 JSON 문자열 출력
        System.out.println(userInfoResponse);

        try {
            JSONObject jsonObject = new JSONObject(userInfoResponse);
            String email = jsonObject.getString("email");
            Optional<GoogleUser> existingUserOptional = googleUserRepository.findByEmail(email);

            GoogleUser googleUser;
            if (existingUserOptional.isPresent()) {
                // 이미 존재하는 사용자라면 가져옴
                googleUser = existingUserOptional.get();
                System.out.println("Existing user found. Updating info.");
            } else {
                // 새로운 사용자라면 새 User 객체를 생성
                googleUser = new GoogleUser();
                System.out.println("Creating new user.");
            }

            // 사용자 정보 설정
            googleUser.setEmail(email);
            String name = jsonObject.getString("name");
            googleUser.setName(name);

            try {
                // DB에 사용자 정보 저장 (새로운 사용자면 생성, 기존 생성자면 업데이트)
                googleUserRepository.save(googleUser);
                System.out.println("User saved successfully.");

                String jwtToken = JwtUtil.generateToken(googleUser.getEmail(), googleUser.getName());
                String refreshToken = JwtUtil.generateRefreshToken(googleUser.getEmail());

                // 리프레시 토큰 저장
                RefreshToken refreshTokenEntity = new RefreshToken();
                refreshTokenEntity.setEmail(email);
                refreshTokenEntity.setRefreshToken(refreshToken);
                refreshTokenRepository.save(refreshTokenEntity);

                return new UserResponse(jwtToken, email, name, refreshToken);

            } catch (Exception e) {
                System.out.println("Error saving user: " + e.getMessage());
            }
        } catch (JSONException e) {
            System.out.println("JSON parsing error: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Other error: " + e.getMessage());
        }

        return null;  // 에러 발생 시 null 반환.
    }
}