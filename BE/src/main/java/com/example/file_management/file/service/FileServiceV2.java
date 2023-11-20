package com.example.file_management.file.service;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.example.file_management.file.domain.entity.FileInfo;
import com.example.file_management.file.dto.DownloadDTO;
import com.example.file_management.file.dto.SharedStateDTO;
import com.example.file_management.file.dto.UploadResult;
import com.example.file_management.file.repository.FileRepository;
import com.example.file_management.oauth.model.entity.User;
import com.example.file_management.oauth.repository.UserRepository;
import com.example.file_management.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
import java.util.Random;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class FileServiceV2 implements FileService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final FileRepository fileRepository;
    private final AmazonS3 amazonS3;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(FileServiceV2.class);

    @Override
    public UploadResult fileUpload(MultipartFile multipartFile, HttpServletRequest request) throws IOException {
        String uniqueFilename = generateUniqueFilename(multipartFile.getOriginalFilename());
        String originFormat = request.getParameter("originFormat");
        String fileUrl = uploadToS3(multipartFile, uniqueFilename);

        String userEmail = getUserEmail(request);
        User user = userRepository.findByEmail(userEmail);
        String authenticationCode = generateRandomDownloadCode();
        long size = multipartFile.getSize();

        FileInfo fileInfo = createFileInfo(multipartFile.getOriginalFilename(), fileUrl, user, authenticationCode, size, originFormat, true, uniqueFilename);
        FileInfo savedFileInfo = fileRepository.save(fileInfo);

        UploadResult result = new UploadResult();
        result.setId(savedFileInfo.getId());
        result.setUserName(user.getName());

        return result;
    }

    // S3 업로드
    private String uploadToS3(MultipartFile multipartFile, String uniqueFilename) throws IOException {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        amazonS3.putObject(bucket, uniqueFilename, multipartFile.getInputStream(), metadata);

        return amazonS3.getUrl(bucket, uniqueFilename).toString();
    }

    // fileInfo 생성
    private FileInfo createFileInfo(String originalFilename, String fileUrl, User user, String authenticationCode, long size, String originFormat, boolean shared, String uniqueFilename) {
        FileInfo fileInfo = new FileInfo();
        fileInfo.originalFileName = originalFilename;
        fileInfo.savedPath = fileUrl;
        fileInfo.user = user;
        fileInfo.authenticationCode = authenticationCode;
        fileInfo.size = size;
        fileInfo.originFormat = originFormat;
        fileInfo.shared = shared;
        fileInfo.s3SavedFileName = uniqueFilename;

        return fileInfo;
    }

    // UUID
    private String generateUniqueFilename(String originalFilename) {
        String uuid = UUID.randomUUID().toString();
        return uuid + "_" + originalFilename;
    }

    @Override
    public Optional<FileInfo> getFile(Long fileId) {
        return fileRepository.findById(fileId);
    }

    private String generateRandomDownloadCode() {
        StringBuilder downloadCode = new StringBuilder();
        Random random = new Random();

        for(int i = 0; i < 6; i++){
            downloadCode.append(random.nextInt(10)); // 0부터 9까지의 랜덤한 숫자 생성 6번함
        }
        return downloadCode.toString();
    }

    // userId에 대한 SavedPath 반환
    // 전체 정보를 받으려면 list로 구현해야하고, String으로 하려면 파일 정보 추가 인덱싱 필요
    @Override
    public DownloadDTO fileDownload(Long id) throws FileNotFoundException {
        FileInfo file = getFile(id).orElseThrow(() -> new FileNotFoundException("파일을 찾을 수 없습니다."));

        return DownloadDTO.builder()
                .originalFileName(file.getOriginalFileName())
                .uploadTime(file.getUploadTime())
                .shared(file.isShared())
                .authenticationCode(file.getAuthenticationCode())
                .savedPath(file.getSavedPath())
                .size(file.getSize())
                .originFormat(file.getOriginFormat())
                .build();
    }

    // 토큰에서 user의 id값 추출
    @Override
    public Long getUserId(HttpServletRequest request) {
        return jwtUtil.getIdFromToken(request);
    }

    // 토큰에서 user의 email값 추출
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
    public String deleteFile(Long id, HttpServletRequest request) throws FileNotFoundException, AccessDeniedException{
        String result;

        // 1. 파일 존재하는지 확인
        FileInfo file = getFile(id).orElseThrow(() -> new FileNotFoundException("파일을 찾을 수 없습니다."));

        // 1-1. 파일 이름이 null인지 확인
        if (file.getS3SavedFileName() == null) {
            throw new FileNotFoundException("S3에 저장된 파일 이름을 찾을 수 없습니다.");
        }

        // 2. 삭제 요청 userId와 실제 file uploader id 일치하는지 비교
        String requestUserEmail = getUserEmail(request);
        User requestUser = userRepository.findByEmail(requestUserEmail);
        User uploadUser = file.getUser();



        logger.info("requestUserId = " + requestUser.getId());
        logger.info("uploadUser id = " + uploadUser.getId());

        if(!Objects.equals(uploadUser.getId(), requestUser.getId())){
            throw new AccessDeniedException("파일 삭제 권한이 없습니다.");
        }

        // 3. S3, DB 에서 파일 삭제
        String S3SavedFileName = fileRepository.findS3SavedFileNameById(id);
        logger.info("S3SavedFileName = " + S3SavedFileName);

        try {
            boolean isObjectExist = amazonS3.doesObjectExist(bucket, S3SavedFileName);
            logger.info("isObjectExist = " + isObjectExist);
            if (isObjectExist) {
                amazonS3.deleteObject(bucket, S3SavedFileName);
                logger.info("파일 삭제 성공");
                fileRepository.deleteById(id);
                result = "파일 삭제 성공";
            } else {
                logger.info("파일 존재 x");
                throw new AmazonS3Exception("파일이 존재하지 않습니다.");
            }
        } catch (Exception e) {
            logger.info("파일 삭제 실패");
            throw new AmazonS3Exception("파일 삭제 실패");
        }

        return result;
    }
}