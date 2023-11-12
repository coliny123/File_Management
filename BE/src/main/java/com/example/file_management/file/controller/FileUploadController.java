package com.example.file_management.file.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.example.file_management.file.dto.UploadResult;
import com.example.file_management.file.service.FileService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class FileUploadController {

    private final FileService fileService;
    private final AmazonS3Client amazonS3Client;

    @PostMapping("/upload")
    public ResponseEntity upload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        UploadResult result;
        try {
            result = fileService.fileUpload(file, request);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }




}
