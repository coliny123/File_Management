package com.example.file_management.oauth.naver.service;

import com.example.file_management.oauth.model.entity.RefreshToken;
import com.example.file_management.oauth.naver.model.dto.response.NaverUserResponse;
import com.example.file_management.oauth.naver.model.entity.NaverUser;
import com.example.file_management.oauth.naver.repository.NaverUserRepository;
import com.example.file_management.oauth.repository.RefreshTokenRepository;
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
    private final NaverUserRepository naverUserRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Autowired
    public NaverUserService(NaverUserRepository naverUserRepository, RefreshTokenRepository refreshTokenRepository) {
        this.naverUserRepository = naverUserRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public void saveRefreshToken(String email, String refreshToken) {
        Optional<RefreshToken> existingToken = refreshTokenRepository.findByEmail(email);

        if (existingToken.isEmpty()) {
            RefreshToken token = RefreshToken.builder()
                    .email(email)
                    .refreshToken(refreshToken)
                    .build();

            refreshTokenRepository.save(token);
        }
    }

    public NaverUserResponse updateUserInfo(String accessToken) {
        try {
            NaverUserResponse userInfo = getUserInfo(accessToken);

            if (userInfo != null) {
                String email = userInfo.getResponse().getEmail();
                String name = userInfo.getResponse().getName();

                // DB에서 이메일로 사용자 중복 확인
                Optional<NaverUser> existingUser = naverUserRepository.findByEmail(email);

                // 사용자가 존재하지 않으면 새로운 사용자를 생성하고 저장
                if (existingUser.isEmpty()) {

                    NaverUser naverUser = new NaverUser();
                    naverUser.setEmail(email);
                    naverUser.setName(name);

                    // DB에 새 사용자 정보 저장. 이 때 id는 자동으로 생성됨.
                    naverUserRepository.save(naverUser);

                    System.out.println("데이터베이스에 사용자 정보를 성공적으로 업데이트했습니다: " + naverUser);
                } else {
                    System.out.println("이미 존재하는 사용자입니다: " + existingUser.get());
                }
                return userInfo;

            } else {
                System.out.println("사용자 정보를 찾을 수 없습니다.");
                return null;
            }

        } catch (Exception e){
            System.out.println("사용자 정보를 데이터베이스에 저장하는 중 오류가 발생했습니다: " + e.getMessage());
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


