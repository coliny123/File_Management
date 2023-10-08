package com.example.file_management.naver.service;

import com.example.file_management.google.model.entity.User;
import com.example.file_management.google.repository.UserRepository;
import com.example.file_management.naver.model.dto.response.NaverUserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;


@Service
public class NaverUserService {

    private final UserRepository userRepository;

    @Autowired
    public NaverUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void updateUserInfo(String accessToken) {
        NaverUserResponse userInfo = getUserInfo(accessToken);

        if (userInfo != null) {
            // 네이버 API로부터 받은 사용자 ID나 이메일 등을 통해 기존 사용자인지 판별
            Optional<User> optionalUser = userRepository.findByEmail(userInfo.getResponse().getEmail());

            User user;
            // 새로운 사용자면 새 User 객체를 생성
            user = optionalUser.orElseGet(User::new);

            // User 객체의 필드들을 업데이트
            user.setEmail(userInfo.getResponse().getEmail());
            user.setNickname(userInfo.getResponse().getNickname());

            userRepository.save(user);  // DB에 사용자 정보 저장
        }
    }


    public NaverUserResponse getUserInfo(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        try {
            ResponseEntity<NaverUserResponse> response = restTemplate.exchange(
                    "https://openapi.naver.com/v1/nid/me",
                    HttpMethod.GET,
                    entity,
                    NaverUserResponse.class);

            System.out.println("naver user info: " + response.getBody());

            return response.getBody();

        } catch (RestClientException e) {
            System.out.println("Error while calling Naver User Info API: " + e.getMessage());
            e.printStackTrace();

            // 에러가 발생했을 때 null을 반환
            return null;
        }
    }
}
