package com.example.file_management.oauth;


import com.example.file_management.security.TokenService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TokenController {

    @Autowired
    private TokenService tokenService;

    @GetMapping("/auth/test")
    public String test(HttpServletRequest request, HttpServletResponse response) {
        tokenService.validateAndRefreshTokens(request, response);
        return "Test refresh successfully";
    }
}
