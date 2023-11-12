package com.example.file_management.service;

import com.example.file_management.oauth.repository.UserRepository;
import com.example.file_management.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserInfoService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;


    // 유저 id 가져오기
    private Long getUserId(HttpServletRequest request) {
        String userName = getUserName(request);
        return userRepository.findByName(userName).getId();
    }

    // 유저 name 추출
    private String getUserName(HttpServletRequest request) {
        return jwtUtil.getUserNameFromToken(request);
    }
}
