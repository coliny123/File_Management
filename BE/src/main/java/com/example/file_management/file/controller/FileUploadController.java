package com.example.file_management.file.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.example.file_management.file.service.FileService;
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
@CrossOrigin(origins="http://localhost:3000")
public class FileUploadController {

    private final FileService fileService;

    private final AmazonS3Client amazonS3Client;

    @PostMapping("/upload")
    public ResponseEntity upload(@RequestParam("file") MultipartFile file) {
        try {
            fileService.fileUpload(file);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(file.getOriginalFilename());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(file.getOriginalFilename());
    }

    @GetMapping("/test")
    public void test() {
        System.out.println("Endpoint: " + amazonS3Client);;
    }
}
