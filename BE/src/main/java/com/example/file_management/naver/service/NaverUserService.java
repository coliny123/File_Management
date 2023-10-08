package com.example.file_management.naver.service;

import com.example.file_management.naver.repository.NaverUserRepository;
import com.example.file_management.naver.model.dto.response.NaverUserResponse;
import com.example.file_management.naver.model.entity.NaverUser;
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

    @Autowired
    public NaverUserService(NaverUserRepository naverUserRepository) {
        this.naverUserRepository = naverUserRepository;
    }

    public NaverUserResponse updateUserInfo(String accessToken) {
        NaverUserResponse userInfo = getUserInfo(accessToken);

        if (userInfo != null) {
            // 네이버 API로부터 받은 사용자 ID나 이메일 등을 통해 기존 사용자인지 판별
            Optional<NaverUser> optionalUser = naverUserRepository.findByEmail(userInfo.getResponse().getEmail());

            NaverUser naverUser;
            // 새로운 사용자면 새 User 객체를 생성
            naverUser = optionalUser.orElseGet(NaverUser::new);

            // User 객체의 필드들을 업데이트
            naverUser.setEmail(userInfo.getResponse().getEmail());
            naverUser.setNickname(userInfo.getResponse().getNickname());
            naverUser.setName(userInfo.getResponse().getName());

            try {
                naverUserRepository.save(naverUser);  // DB에 사용자 정보 저장

                System.out.println("Successfully updated user info in the database: " + userInfo);

            } catch (Exception e) {
                System.out.println("Error while saving user info to the database: " + e.getMessage());
                e.printStackTrace();
            }
        }
        return null;
    }


    public NaverUserResponse getUserInfo(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

//        HttpHeaders headers = new HttpHeaders();
//        headers.add("Authorization", "Bearer " + accessToken);
//
//        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

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


