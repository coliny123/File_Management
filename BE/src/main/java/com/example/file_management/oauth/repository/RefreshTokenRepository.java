package com.example.file_management.oauth.repository;

import com.example.file_management.oauth.model.entity.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;


public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

}