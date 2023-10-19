package com.example.file_management.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.ExchangeFilterFunctions;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AppConfig {
    @Bean
    public WebClient webClient() {
        return WebClient.create();

//        return WebClient.builder()
//                .filter(ExchangeFilterFunctions.basicAuthentication("a6f22a74964f7bed67c0c5713fb357f9", "UhbeLsSE1g6JzEN0UCtOqhEMXy5hbV4c"))
//                .build();
    }
}