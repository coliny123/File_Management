package com.example.file_management.oauth.kakao.service;

import com.example.file_management.oauth.kakao.model.dto.response.KakaoUserResponse;
import com.example.file_management.oauth.kakao.model.entity.KakaoUser;
import com.example.file_management.oauth.kakao.repository.KakaoUserRepository;
import com.example.file_management.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class KakaoUserService {
    private final KakaoUserRepository kakaoUserRepository;

    @Autowired
    public KakaoUserService(KakaoUserRepository kakaoUserRepository) {
        this.kakaoUserRepository = kakaoUserRepository;
    }

    public KakaoUserResponse updateUserInfo(String accessToken) {
        try {
            KakaoUserResponse userInfo = getUserInfo(accessToken);

            if (userInfo != null) {
                // 새로운 Kakoouser 객체 생성 후 필드 설정
                KakaoUser kakaouser = new KakaoUser();
                kakaouser.setEmail((String)userInfo.getKakaoAccount().get("email"));  // userInfo에 있는 이메일을 가져옵니다.
                kakaouser.setName((String)userInfo.getProperties().get("nickname"));

                // DB에 새 사용자 정보 저장. 이 때 id는 자동으로 생성됨.
                kakaoUserRepository.save(kakaouser);

                System.out.println("데이터베이스에 사용자 정보를 성공적으로 업데이트했습니다: " + userInfo);

                // JWT, Refresh 토큰 생성
                String jwtToken = JwtUtil.generateToken(kakaouser.getEmail(), kakaouser.getName());
                String refreshToken = JwtUtil.generateRefreshToken(kakaouser.getEmail());

                // JWT, Refresh 토큰을 응답 DTO에 추가
                userInfo.setToken(jwtToken);
                userInfo.setToken(refreshToken);

                System.out.println("생성된 JWT 토큰: " + jwtToken);
                System.out.println("생성된 Refresh 토큰: " + refreshToken);
                System.out.println("사용자 정보 반환: " + userInfo);

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
