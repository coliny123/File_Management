package com.example.file_management.oauth.google.controller;

import com.example.file_management.oauth.AuthCodeDto;
import com.example.file_management.oauth.google.model.dto.response.UserResponse;
import com.example.file_management.oauth.google.model.entity.GoogleUser;
import com.example.file_management.oauth.google.service.GoogleOAuth2Service;
import com.example.file_management.oauth.google.service.UserService;
import com.example.file_management.security.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class AuthController {
    private final GoogleOAuth2Service googleOAuth2Service;
    private final UserService userService;
    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    public AuthController(GoogleOAuth2Service googleOAuth2Service, UserService userService) {
        this.googleOAuth2Service = googleOAuth2Service;
        this.userService = userService;
    }

    @PostMapping("/auth/google")
    public ResponseEntity<?> authenticate(@RequestBody AuthCodeDto authRequest, HttpServletResponse response) {

        log.info("Received auth code(google): " + authRequest.getAuthCode());

        String accessToken = googleOAuth2Service.getAccessToken(authRequest);

        //인증 코드를 바탕으로 Google OAuth2 서버로부터 받은 액세스 토큰
        log.info("Received access token(google): " + accessToken);

        GoogleUser googleUser = userService.getUserInfoAndSave(accessToken);
        if (googleUser == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while updating user info.");
        }

        String jwtToken = JwtUtil.generateToken(googleUser.getEmail(), googleUser.getName());
        String refreshToken = JwtUtil.generateRefreshToken(googleUser.getEmail());

        // 리프레시 토큰 DB에 저장
        userService.saveRefreshToken(googleUser.getEmail(), refreshToken);

        Cookie jwtTokenCookie = new Cookie("jwt_token", jwtToken);
        jwtTokenCookie.setHttpOnly(true);
        jwtTokenCookie.setMaxAge(60 * 60);

        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setMaxAge(60 * 60 * 24 * 14);

        response.addCookie(jwtTokenCookie);
        response.addCookie(refreshTokenCookie);

        UserResponse userResponse = new UserResponse(jwtToken, googleUser.getEmail(), googleUser.getName(), refreshToken);

        return ResponseEntity.ok(userResponse);  // HTTP 200 OK와 함께 JSON 응답 전송
    }
}