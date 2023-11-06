package com.example.file_management.file.service;

import com.example.file_management.file.domain.entity.FileInfo;
import com.example.file_management.file.dto.UploadResult;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

public interface FileService {
    UploadResult fileUpload(MultipartFile file, HttpServletRequest request) throws IOException;

    // 다운로드 메소드
//
    // 확장자 변환 메소드
//    FileInfo convertFiles(String originalFileName, String targetExtension) throws Exception;
    // 저장된 파일 가져오는 메서드
    FileInfo getFile(Long fileId) throws FileNotFoundException;

    String fileDownload(Long id) throws IOException;

    Long getUserId(HttpServletRequest request);

    String getUserEmail(HttpServletRequest request);
}
