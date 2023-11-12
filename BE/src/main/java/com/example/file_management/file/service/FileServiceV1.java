package com.example.file_management.file.service;

import com.amazonaws.services.s3.AmazonS3;
import com.example.file_management.file.domain.entity.FileInfo;
import com.example.file_management.file.dto.SharedStateDTO;
import com.example.file_management.file.dto.UploadResult;
import com.example.file_management.file.repository.FileRepository;
import com.example.file_management.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.io.FileNotFoundException;
import java.io.IOException;
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
    public FileInfo getFile(Long fileId) throws FileNotFoundException {
        return fileRepository.findById(fileId)
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

    @Override
    @Transactional
    public SharedStateDTO setSharedState(Long id, Boolean shared)  throws FileNotFoundException {
        SharedStateDTO result = new SharedStateDTO();

        FileInfo targetFile = getFile(id);
        targetFile.shared = shared;

        result.setId(id);
        result.setShared(targetFile.shared);

        return result;
    }
}
