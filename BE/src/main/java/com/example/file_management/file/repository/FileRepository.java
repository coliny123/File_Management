package com.example.file_management.file.repository;

import com.example.file_management.file.domain.entity.FileInfo;
import com.example.file_management.oauth.model.entity.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FileRepository extends JpaRepository<FileInfo, Long> {

    List<FileInfo> findAllByUser(User user);
    FileInfo save(FileInfo file);

    @Query("SELECT f.savedPath FROM FileInfo f WHERE f.id = :id")
    String findSavedPathById(@Param("id") Long id);

    Long findIdByAuthenticationCode(String authenticationCode);

    Optional<FileInfo> findById(Long id);
}
