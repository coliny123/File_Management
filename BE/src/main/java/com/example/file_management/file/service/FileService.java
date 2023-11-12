package com.example.file_management.file.service;

import com.example.file_management.file.domain.entity.FileInfo;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;

public interface FileService {
    // 업로드 메소드
    void fileUpload(MultipartFile file) throws IOException;
    // 확장자 변환 메소드
//    FileInfo convertFiles(String originalFileName, String targetExtension) throws Exception;
    // 저장된 파일 가져오는 메서드
    FileInfo getFile(String fileName) throws FileNotFoundException;

    // 로컬에 저장된 파일 경로 가져오는 함수-> 향후 삭제
    String getFullPath(String saveFileName);

    // 파일에서 확장자 추출 함수
    String extractExt(String originalFilename);

    // uuid를 통해 저장되는 파일 이름 생성 함수
    String createSavedFileName(String originalFilename);


}
