package com.example.file_management.file.controller;

import com.example.file_management.file.service.FileService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FileDownloadController {

    private final FileService fileService;

    @GetMapping("/download/{id}")
    public ResponseEntity getSavePath(@PathVariable Long id) throws IOException {
        String savedPath = fileService.fileDownload(id);
        return ResponseEntity.status(200).body(savedPath);
    }
}
