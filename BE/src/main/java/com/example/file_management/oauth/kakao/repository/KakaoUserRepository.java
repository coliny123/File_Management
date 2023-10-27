package com.example.file_management.oauth.kakao.repository;

import com.example.file_management.oauth.kakao.model.entity.KakaoUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KakaoUserRepository extends JpaRepository<KakaoUser, Long> {
    // KakaoUser 전용 메소드들 정의

    // kakaoUser 중복 확인 for 이메일
    List<KakaoUser> findByEmail(String email);
}
