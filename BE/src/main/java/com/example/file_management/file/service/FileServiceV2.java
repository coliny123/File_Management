package com.example.file_management.file.service;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.example.file_management.file.domain.entity.FileInfo;
import com.example.file_management.file.repository.FileRepository;
import com.example.file_management.oauth.model.entity.User;
import com.example.file_management.oauth.repository.UserRepository;
import com.example.file_management.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class FileServiceV2 implements FileService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final FileRepository fileRepository;
    private final AmazonS3 amazonS3;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @Override
    public void fileUpload(MultipartFile multipartFile, HttpServletRequest request) throws IOException {
        String originalFilename = multipartFile.getOriginalFilename();

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        amazonS3.putObject(bucket, originalFilename, multipartFile.getInputStream(), metadata);
        String fileUrl = amazonS3.getUrl(bucket, originalFilename).toString();

        String userEmail = getUserEmail(request);
        User user = userRepository.findByEmail(userEmail);

        FileInfo fileInfo = new FileInfo();
        fileInfo.originalFileName = multipartFile.getOriginalFilename();
        fileInfo.savedPath = fileUrl;
        fileInfo.email = user;


        fileRepository.save(fileInfo);
    }

    public String extractExt(String originalFilename) {  // 파일 확장자 추출 메소드
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }

    public String createSavedFileName(
            String originalFilename) {    // 로컬 storage에 저장되는 savedFileName 생성 메소드
        String ext = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString();     // 식별자
        return uuid + "." + ext;
    }

    @Override
    public FileInfo getFile(String fileName) throws FileNotFoundException {
        return fileRepository.findById(fileName)
                .orElseThrow(() -> new FileNotFoundException("File not found"));
    }

    @Override
    public String fileDownload(Long id) {
        return fileRepository.findSavedPathById(id);
    }

    @Override
    public Long getUserId(HttpServletRequest request) {
        return jwtUtil.getIdFromToken(request);
    }

    @Override
    public String getUserEmail(HttpServletRequest request) {
        return jwtUtil.getEmailFromToken(request);
    }
}