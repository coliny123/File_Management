package com.example.file_management.google.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.file_management.google.model.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
