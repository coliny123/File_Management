package com.example.file_management.oauth.naver.service;

import com.example.file_management.oauth.naver.model.dto.response.NaverUserResponse;
import com.example.file_management.oauth.naver.model.entity.NaverUser;
import com.example.file_management.security.JwtUtil;
import com.example.file_management.oauth.naver.repository.NaverUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class NaverUserService {
    private final NaverUserRepository naverUserRepository;

    @Autowired
    public NaverUserService(NaverUserRepository naverUserRepository) {
        this.naverUserRepository = naverUserRepository;
    }

    public NaverUserResponse updateUserInfo(String accessToken) {
        try {
            NaverUserResponse userInfo = getUserInfo(accessToken);

            if (userInfo != null) {
                // 새 User 객체 생성
                NaverUser naverUser = new NaverUser();

                // User 객체의 필드들을 설정
                naverUser.setEmail(userInfo.getResponse().getEmail());
                naverUser.setName(userInfo.getResponse().getName());

                // DB에 새 사용자 정보 저장. 이 때 id는 자동으로 생성됨.
                naverUserRepository.save(naverUser);

                System.out.println("Successfully updated user info in the database: " + userInfo);

                // JWT 토큰, Refresh 토큰 생성
                String jwtToken = JwtUtil.generateToken(naverUser.getEmail(), naverUser.getName());

                String refreshToken = JwtUtil.generateRefreshToken(naverUser.getEmail());

                // JWT, Refresh 토큰을 응답 DTO에 추가
                userInfo.getResponse().setToken(jwtToken);
                userInfo.getResponse().setRefreshToken(refreshToken);

                System.out.println("Generated JWT token: " + jwtToken);

                // 반환 값 출력
                System.out.println("Returning user info: " + userInfo);

                return userInfo;

            } else {
                System.out.println("No user info found.");
                return null;
            }
        } catch (Exception e){
            System.out.println("Error while saving user info to the database: " + e.getMessage());
            e.printStackTrace();

            return null;
        }
    }


    public NaverUserResponse getUserInfo(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        try {
            ResponseEntity<NaverUserResponse> response = restTemplate.exchange(
                    "https://openapi.naver.com/v1/nid/me",
                    HttpMethod.GET,
                    entity,
                    NaverUserResponse.class);

            System.out.println("Successfully retrieved user info from Nave API: "+ response.getBody());

            return response.getBody();

        } catch (RestClientException e){
            System.out.println("Error while calling Nav Use Info API:" + e.getMessage());
            e.printStackTrace();

            return null;
        }
    }
}


