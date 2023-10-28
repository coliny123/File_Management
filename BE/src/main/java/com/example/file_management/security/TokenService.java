package com.example.file_management.security;

import com.example.file_management.oauth.kakao.model.entity.KakaoUser;
import com.example.file_management.oauth.kakao.repository.KakaoUserRepository;
import com.example.file_management.oauth.model.entity.RefreshToken;
import com.example.file_management.oauth.repository.RefreshTokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

// 클라이언트로부터 받은 엑세스 토큰의 유효성을 검사하고, 필요한 경우 새 엑세스 토큰을 발급하는 역할
@Service
public class TokenService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private KakaoUserRepository kakaoUserRepository;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    public void validateAndRefreshTokens(HttpServletRequest request, HttpServletResponse response) {
        String accessToken = request.getHeader("Authorization");
        String refreshToken = request.getHeader("Refresh-Token");

        if (accessToken != null) {
            if (!jwtUtil.validateRefreshToken(accessToken)) {
                // access token이 유효하지 않을 때 Refresh token
                Optional<KakaoUser> kakaoUserOptional = kakaoUserRepository.findByEmail(jwtUtil.getEmailFromToken(accessToken));
                if (kakaoUserOptional.isPresent()) {
                    KakaoUser kakaoUser = kakaoUserOptional.get();
                    Optional<RefreshToken> refreshTokenOptional = refreshTokenRepository.findByEmail(kakaoUser.getEmail());
                    if (refreshTokenOptional.isPresent() && refreshToken.equals(refreshTokenOptional.get().getRefreshToken())) {
                        String newAccessToken = jwtUtil.generateToken(kakaoUser.getEmail(), kakaoUser.getName());
                        response.setHeader("Authorization", newAccessToken);
                    }
                }
            }
        }
    }
}


