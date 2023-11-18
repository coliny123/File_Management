package com.example.file_management.file.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.example.file_management.file.domain.entity.FileInfo;
import com.example.file_management.file.dto.DownloadDTO;
import com.example.file_management.file.dto.SharedStateDTO;
import com.example.file_management.file.dto.UploadResult;
import com.example.file_management.file.repository.FileRepository;
import com.example.file_management.oauth.model.entity.User;
import com.example.file_management.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
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

    @Override
    public String deleteFile(Long id, HttpServletRequest request) throws FileNotFoundException, AccessDeniedException {
        String result;

        // 1. 파일 존재하는지 확인
        FileInfo file = getFile(id).orElseThrow(() -> new FileNotFoundException("파일을 찾을 수 없습니다."));

        // 2. 삭제 요청 userId와 실제 file uploader id 일치하는지 비교
        Long requestUserId = jwtUtil.getIdFromToken(request);
        User uploadUser = file.getUser();
        if(!Objects.equals(uploadUser.getId(), requestUserId)){
            throw new AccessDeniedException("파일 삭제 권한이 없습니다.");
        }

        // 3. S3, DB 에서 파일 삭제
        String SavedFileName = fileRepository.findSavedPathById(id);
        // savedPath 문자열 slice 과정 필요


        try {
            boolean isObjectExist = amazonS3.doesObjectExist(bucket, SavedFileName);
            if (isObjectExist) {
                amazonS3.deleteObject(bucket, SavedFileName);
                fileRepository.deleteById(id);
                result = "파일 삭제 성공";
            } else {
                throw new AmazonS3Exception("파일이 존재하지 않습니다.");
            }
        } catch (Exception e) {
            throw new AmazonS3Exception("파일 삭제 실패");
        }

        return result;
    }
}
