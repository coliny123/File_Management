package com.example.file_management.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

public class JwtValidationFilter extends OncePerRequestFilter {

    private final JwtValidator jwtValidator;
    private final List<String> pathsToAuth = Arrays.asList("/upload");

    public JwtValidationFilter(JwtValidator jwtValidator) {
        this.jwtValidator = jwtValidator;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        String requestURI = request.getRequestURI();
        // 리스트에 포함된 엔드포인트에 대한 요청만 토큰을 검증
        if (pathsToAuth.contains(requestURI)) {
            ResponseEntity responseEntity = jwtValidator.validateRequestToken(request);
            if (responseEntity != null) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "권한이 없는 토큰입니다.");
                return;
            }
        }
        filterChain.doFilter(request, response);
    }
}

