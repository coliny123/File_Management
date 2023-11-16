package com.example.file_management.config;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeRequests(auth -> auth
                        .antMatchers("/download/**").permitAll()  // 다운로드 관련 API에 대해 모든 요청 허용
                        .anyRequest().authenticated()  // 그 외의 모든 요청은 인증 필요
                )
                .csrf(AbstractHttpConfigurer::disable)  // CSRF 공격 방어 기능 비활성화
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration configuration = new CorsConfiguration();
                    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://file-management-ten.vercel.app"));  // 허용할 도메인
                    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));  // 허용할 HTTP 메소드
                    configuration.setAllowedHeaders(List.of("*"));
                    return configuration;
                }));

        return http.build();
    }
}