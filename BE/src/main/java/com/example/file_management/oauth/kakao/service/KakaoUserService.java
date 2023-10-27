package com.example.file_management.oauth.kakao.service;

import com.example.file_management.oauth.kakao.model.dto.response.KakaoUserResponse;
import com.example.file_management.oauth.kakao.model.entity.KakaoUser;
import com.example.file_management.oauth.kakao.repository.KakaoUserRepository;
import com.example.file_management.oauth.model.entity.RefreshToken;
import com.example.file_management.oauth.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class KakaoUserService {
    private final KakaoUserRepository kakaoUserRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    @Autowired
    public KakaoUserService(KakaoUserRepository kakaoUserRepository, RefreshTokenRepository refreshTokenRepository) {
        this.kakaoUserRepository = kakaoUserRepository;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public void saveRefreshToken(String email, String refreshToken) {
        RefreshToken token = RefreshToken.builder()
                .email(email)
                .refreshToken(refreshToken)
                .build();

        refreshTokenRepository.save(token);
    }

    public KakaoUserResponse updateUserInfo(String accessToken) {
        try {
            KakaoUserResponse userInfo = getUserInfo(accessToken);

            if (userInfo != null) {

                String email = (String)userInfo.getKakaoAccount().get("email");
                String name = (String)userInfo.getProperties().get("nickname");

                // DB에서 이메일로 사용자 중복 확인
                List<KakaoUser> existingUser = kakaoUserRepository.findByEmail(email);

                // 사용자가 존재하지 않으면 새로운 사용자를 생성하고 저장
                if (!existingUser.isEmpty()) {
                    KakaoUser kakaoUser = new KakaoUser();
                    kakaoUser.setEmail(email);
                    kakaoUser.setName(name);

                    // DB에 새 사용자 정보 저장. 이 때 id는 자동으로 생성됨.
                    kakaoUserRepository.save(kakaoUser);

                    System.out.println("데이터베이스에 사용자 정보를 성공적으로 업데이트했습니다: " + kakaoUser);
                } else {
                    System.out.println("이미 존재하는 사용자입니다: " + existingUser.get(0));
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

    public KakaoUserResponse getUserInfo(String accessToken) {

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        try{
            ResponseEntity<KakaoUserResponse> response= restTemplate.exchange(
                    "https://kapi.kakao.com/v2/user/me",
                    HttpMethod.GET,
                    entity,
                    KakaoUserResponse.class);
            System.out.println("카카오 API에서 사용자 정보를 성공적으로 가져왔습니다: "+ response.getBody());

            // 이메일과 닉네임 추출하기
            String email = (String)response.getBody().getKakaoAccount().get("email");
            String nickname = (String)response.getBody().getProperties().get("nickname");

            // 새로운 KakaoUserResonse 객체 생성하지 않고, 이미 받아온 response의 body를 반환
            return response.getBody();

        } catch (RestClientException e){
            System.out.println("Kakao Use Info API 호출 중 오류가 발생했습니다:" + e.getMessage());
            e.printStackTrace();

            return null;
        }
    }
}
