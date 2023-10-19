package com.example.file_management.file.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
    void fileUpload(MultipartFile file) throws IOException;

    // 다운로드 메소드

    // 확장자 변환 메소드

    //


}
