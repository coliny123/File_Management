package com.example.file_management.google.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.file_management.google.model.entity.User;

public interface UserRepository extends JpaRepository<User, String> {
}