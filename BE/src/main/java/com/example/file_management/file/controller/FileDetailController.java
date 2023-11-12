package com.example.file_management.file.controller;

import com.example.file_management.file.dto.SharedStateDTO;
import com.example.file_management.file.service.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
public class FileDetailController {

    private final FileService fileService;


    @PostMapping("/setShared")
    public ResponseEntity setAuthenticationCode(@RequestBody SharedStateDTO request) throws IOException {

        SharedStateDTO result = fileService.setSharedState(request.getId(), request.isShared());

        return ResponseEntity.status(200).body(result);
    }

}
