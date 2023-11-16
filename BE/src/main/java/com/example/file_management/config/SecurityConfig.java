package com.example.file_management.config;

import com.example.file_management.security.JwtValidationFilter;
import com.example.file_management.security.JwtValidator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtValidator jwtValidator;

    public SecurityConfig(JwtValidator jwtValidator) {
        this.jwtValidator = jwtValidator;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(new AntPathRequestMatcher("/users/files"), new AntPathRequestMatcher("/upload")).authenticated()
                        .anyRequest().permitAll())
                .addFilterBefore(jwtValidationFilter(), AnonymousAuthenticationFilter.class)
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

    private JwtValidationFilter jwtValidationFilter() {
        return new JwtValidationFilter(jwtValidator);
    }
}
