package com.example.file_management.google.repository;

import com.example.file_management.google.model.entity.GoogleUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GoogleUserRepository extends JpaRepository<GoogleUser, Long> {
    Optional<GoogleUser> findByEmail(String email);
}
