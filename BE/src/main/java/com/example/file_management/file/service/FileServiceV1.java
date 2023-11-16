package com.example.file_management.file.service;

import com.amazonaws.services.s3.AmazonS3;
import com.example.file_management.file.domain.entity.FileInfo;
import com.example.file_management.file.dto.DownloadDTO;
import com.example.file_management.file.dto.SharedStateDTO;
import com.example.file_management.file.dto.UploadResult;
import com.example.file_management.file.repository.FileRepository;
import com.example.file_management.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
public class FileServiceV1 implements FileService{

    private FileRepository fileRepository;
    private final AmazonS3 amazonS3;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final JwtUtil jwtUtil;


    public UploadResult fileUpload(MultipartFile multipartFile, HttpServletRequest request) throws IOException {
        return null;
    }

    @Override
    public Optional<FileInfo> getFile(Long fileId) {
        return fileRepository.findById(fileId);
    }

    @Override
    public DownloadDTO fileDownload(Long id) throws FileNotFoundException {
        FileInfo file = getFile(id).orElseThrow(() -> new FileNotFoundException("파일을 찾을 수 없습니다."));

        return DownloadDTO.builder()
                .originalFileName(file.getOriginalFileName())
                .uploadTime(file.getUploadTime())
                .shared(file.isShared())
                .authenticationCode(file.getAuthenticationCode())
                .savedPath(file.getSavedPath())
                .build();
    }

    @Override
    public Long getUserId(HttpServletRequest request) {
        return jwtUtil.getIdFromToken(request);
    }

    @Override
    public String getUserEmail(HttpServletRequest request) {
        return jwtUtil.getEmailFromToken(request);
    }

    @Override
    @Transactional
    public SharedStateDTO setSharedState(Long id, Boolean shared)  throws FileNotFoundException {
        FileInfo targetFile = getFile(id).orElseThrow(() -> new FileNotFoundException("파일을 찾을 수 없습니다."));
        targetFile.shared = shared;

        return SharedStateDTO.builder()
                .id(targetFile.getId())
                .shared(targetFile.isShared())
                .build();
    }

    @Override
    public Long getFileId(String authenticationCode){
        return fileRepository.findIdByAuthenticationCode(authenticationCode);
    }
}