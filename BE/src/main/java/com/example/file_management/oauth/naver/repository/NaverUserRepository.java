package com.example.file_management.oauth.naver.repository;

import com.example.file_management.oauth.naver.model.entity.NaverUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NaverUserRepository extends JpaRepository<NaverUser, Long> {
    // NaverUser 전용 메소드들 정의
    Optional<NaverUser> findByEmail(String email);
}
