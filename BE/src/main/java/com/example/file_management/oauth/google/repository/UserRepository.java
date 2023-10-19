package com.example.file_management.oauth.google.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.file_management.oauth.google.model.entity.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
}