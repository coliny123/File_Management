package com.example.file_management.oauth.google.service;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import com.example.file_management.oauth.google.model.dto.response.UserResponse;
import com.example.file_management.oauth.google.model.entity.User;
import com.example.file_management.oauth.google.repository.UserRepository;
import java.util.Optional;

import com.example.file_management.oauth.google.security.JwtUtil;

@Service
public class UserService {
    private final WebClient webClient;

    @Autowired
    private UserRepository userRepository;

    public UserService(WebClient webClient) {
        this.webClient = webClient;
    }

    public UserResponse getUserInfoAndSave(String accessToken) {
        String userEndpointUrl="https://www.googleapis.com/oauth2/v3/userinfo";

        Mono<String> userInfoResponseMono = webClient.get()
                .uri(userEndpointUrl)
                .headers(headers -> headers.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(String.class);

        String userInfoResponse = userInfoResponseMono.block();

        // 구글 서버에서 받아온 JSON 문자열 출력
        System.out.println(userInfoResponse);

        try {
            JSONObject jsonObject = new JSONObject(userInfoResponse);

//            User user = new User();

            String sub = jsonObject.getString("sub");
            Optional<User> existingUserOptional = userRepository.findById(sub);

            User user;
            if (existingUserOptional.isPresent()) {
                // 이미 존재하는 사용자라면 가져옴
                user = existingUserOptional.get();
                System.out.println("Existing user found. Updating info.");
            } else {
                // 새로운 사용자라면 새 User 객체를 생성
                user = new User();
                System.out.println("Creating new user.");
            }

            // 사용자 정보 설정
            user.setSub(sub);
            user.setEmail(jsonObject.getString("email"));
            user.setName(jsonObject.getString("name"));

            try {
                // DB에 사용자 정보 저장 (새로운 사용자면 생성, 기존 생성자면 업데이트)
                userRepository.save(user);
                //user 정보와 함께 JWT token도 반환
                String jwtToken = JwtUtil.generateToken(user.getEmail(), user.getName());
                System.out.println("User saved successfully.");

                return new UserResponse(jwtToken, user.getEmail(), user.getName());
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
