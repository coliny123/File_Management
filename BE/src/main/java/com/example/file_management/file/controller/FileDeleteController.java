package com.example.file_management.file.controller;

import com.example.file_management.file.service.FileService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@RestController
@RequiredArgsConstructor
public class FileDeleteController {

    private final FileService fileService;

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFile(@PathVariable Long id, HttpServletRequest request){
        String response;
        try {
            response = fileService.deleteFile(id, request);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

        return ResponseEntity.status(200).body(response);
    }
}
