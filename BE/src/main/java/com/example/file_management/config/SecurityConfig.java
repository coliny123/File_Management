package com.example.file_management.config;

import com.example.file_management.security.JwtAuthenticationFilter;
import com.example.file_management.security.JwtAuthenticationProvider;
import com.example.file_management.security.JwtValidator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(JwtValidator jwtValidator) {
        return new JwtAuthenticationFilter(jwtValidator);
    }

    @Bean
    public JwtAuthenticationProvider jwtAuthenticationProvider(JwtValidator jwtValidator) {
        return new JwtAuthenticationProvider(jwtValidator);
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http,
                                                   JwtAuthenticationFilter jwtAuthenticationFilter,
                                                   JwtAuthenticationProvider jwtAuthenticationProvider) throws Exception {
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authenticationProvider(jwtAuthenticationProvider)
                .authorizeRequests()
                .anyRequest().permitAll() // 모든 요청 허용
                .and()
                .csrf(AbstractHttpConfigurer::disable) // CSRF 공격 방어 기능 비활성화
                .cors(cors -> cors.configurationSource(request -> {
                    CorsConfiguration configuration = new CorsConfiguration();
                    configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://file-management-ten.vercel.app"));
                    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    configuration.setAllowedHeaders(List.of("*"));
                    return configuration;
                }));

        return http.build();
    }


}