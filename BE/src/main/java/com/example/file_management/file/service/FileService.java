package com.example.file_management.file.service;

import com.example.file_management.file.domain.entity.FileInfo;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

public interface FileService {
    void fileUpload(MultipartFile file) throws IOException;

    // 다운로드 메소드
//
    // 확장자 변환 메소드
//    FileInfo convertFiles(String originalFileName, String targetExtension) throws Exception;
    // 저장된 파일 가져오는 메서드
    FileInfo getFile(String fileName) throws FileNotFoundException;


}
