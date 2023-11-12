package com.example.file_management.security;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;

// JwtAuthenticationFilter가 만든 Authentication 객체의 유효성을 검사
public class JwtAuthenticationProvider implements AuthenticationProvider {

    private final JwtValidator jwtValidator;

    public JwtAuthenticationProvider(JwtValidator jwtValidator) {
        this.jwtValidator = jwtValidator;
    }

    @Override
    public Authentication authenticate(Authentication authentication) {
        JwtAuthenticationToken authenticationToken = (JwtAuthenticationToken) authentication;
        if (!jwtValidator.validateAccessToken((String) authenticationToken.getCredentials())) {
            return null;
        }
        authenticationToken.setAuthenticated(true);
        return authenticationToken;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return JwtAuthenticationToken.class.isAssignableFrom(authentication);
    }
}

