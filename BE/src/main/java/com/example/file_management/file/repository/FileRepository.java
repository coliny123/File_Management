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

    List<FileInfo> findAllByUserId(Long userId);
    FileInfo save(FileInfo file);

    @Query("SELECT f.savedPath FROM FileInfo f WHERE f.id = :id")
    String findSavedPathById(@Param("id") Long id);

    Optional<FileInfo> findById(Long id);

    @Query("SELECT f.id FROM FileInfo f WHERE f.authenticationCode = :authenticationCode")
    Long findIdByAuthenticationCode(@Param("authenticationCode") String authenticationCode);

    @Query("SELECT f.s3SavedFileName FROM FileInfo f WHERE f.id = :id")
    String findS3SavedFileNameById(Long id);


}
