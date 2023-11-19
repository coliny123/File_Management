package com.example.file_management.service;

import com.example.file_management.file.domain.entity.FileInfo;
import com.example.file_management.file.repository.FileRepository;
import com.example.file_management.oauth.model.entity.User;
import com.example.file_management.oauth.repository.UserRepository;
import com.example.file_management.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserInfoService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final FileRepository fileRepository;

    public Map<String, Object> getUserInfoAndFiles(HttpServletRequest request) {
//        String userName = getUserName(request);
        String userEmail = getUserEmail(request);
//        User userByName = userRepository.findByName(userName) ;
        User user = userRepository.findByEmail(userEmail);
        List<FileInfo> files = fileRepository.findAllByUserId(user.getId());

        Map<String, Object> response = new HashMap<>();
        response.put("userName", user.getName());
        response.put("userEmail",user.getEmail());
        response.put("files", files.stream().map(file -> {
            Map<String, Object> fileMap = new HashMap<>();
            fileMap.put("fileName", file.getOriginalFileName());
            fileMap.put("uploadTime", file.getUploadTime());
            fileMap.put("shared", file.isShared());
            fileMap.put("downloadCode", file.getAuthenticationCode());
            fileMap.put("fileId", file.getId());
            fileMap.put("fileSize", file.getSize());
            fileMap.put("originFormat", file.getOriginFormat());
            return fileMap;
        }).collect(Collectors.toList()));

        return response;
    }

    // 유저 name 추출
    private String getUserName(HttpServletRequest request) {
        return jwtUtil.getUserNameFromToken(request);
    }

    private String getUserEmail(HttpServletRequest request) {
        return jwtUtil.getEmailFromToken(request);
    }
}