package com.example.file_management.file.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.example.file_management.file.domain.entity.FileInfo;
import com.example.file_management.file.repository.FileRepository;
import com.example.file_management.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.io.FileNotFoundException;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FileServiceV1 implements FileService{

    private FileRepository fileRepository;
    private final AmazonS3 amazonS3;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final JwtUtil jwtUtil;

    @Override
    public void fileUpload(MultipartFile multipartFile) throws IOException {
        String originalFileName = multipartFile.getOriginalFilename();

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        amazonS3.putObject(bucket, originalFileName, multipartFile.getInputStream(), metadata);
        String fileUrl = amazonS3.getUrl(bucket, originalFileName).toString();

        FileInfo fileInfo = new FileInfo();
        fileInfo.originalFileName = multipartFile.getOriginalFilename();
        fileInfo.savedPath = fileUrl;

        fileRepository.save(fileInfo);
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
}
