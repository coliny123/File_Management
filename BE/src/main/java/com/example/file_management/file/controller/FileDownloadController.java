package com.example.file_management.file.controller;

import com.example.file_management.file.dto.DownloadDTO;
import com.example.file_management.file.service.FileService;
import java.io.IOException;

import com.example.file_management.security.JwtValidator;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FileDownloadController {

    private final FileService fileService;

    private final JwtValidator jwtValidator;

    @GetMapping("/details/{id}")
    public ResponseEntity getFileDownloadInfo(@PathVariable Long id) throws IOException {

        DownloadDTO fileDownloadInfo = fileService.fileDownload(id);

        return ResponseEntity.status(200).body(fileDownloadInfo);
    }

    @GetMapping("/download/{authenticationCode}")
    public ResponseEntity<Long> getFileId(@PathVariable String authenticationCode){

        Long id = fileService.getFileId(authenticationCode);

        return ResponseEntity.status(200).body(id);
    }


}
