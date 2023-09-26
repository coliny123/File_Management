package com.example.file_management.file.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(title = "FileManagement app",
                description = "FileManagement app api명세",
                version = "v1"))
@RequiredArgsConstructor
@Configuration
public class SwaggerConfig {
}
