package com.example.file_management.file.repository;

import com.example.file_management.file.domain.entity.FileInfo;
import com.example.file_management.oauth.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<FileInfo, String> {

    FileInfo save(FileInfo file);

    @Query("SELECT f.id FROM FileInfo f WHERE f.email.email = :email")
    Long findIdByEmail(@Param("email") String email);

    @Query("SELECT f.savedPath FROM FileInfo f WHERE f.id = :id")
    String findSavedPathById(@Param("id") Long id);

}
