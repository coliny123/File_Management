package com.example.file_management.file.controller;

import com.example.file_management.file.dto.SharedStateDTO;
import com.example.file_management.file.service.FileService;
import com.example.file_management.security.JwtValidator;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class FileDetailController {

    private final FileService fileService;
    private final JwtValidator jwtValidator;


    @PostMapping("/setShared")
    public ResponseEntity setAuthenticationCode(@RequestBody SharedStateDTO sharedStateDTO, HttpServletRequest request) throws IOException {
        ResponseEntity responseEntity = jwtValidator.validateRequestToken(request);
        if (responseEntity != null) return responseEntity;

        SharedStateDTO result = fileService.setSharedState(sharedStateDTO.getId(), sharedStateDTO.isShared());

        return ResponseEntity.status(200).body(result);
    }

}
