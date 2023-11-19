package com.example.file_management.file.controller;

import com.example.file_management.file.service.FileService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
public class FileDeleteController {

    private final FileService fileService;

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFile(@PathVariable("id") String requestId, HttpServletRequest request){
        String response;
        Long id = Long.valueOf(requestId);
        try {
            response = fileService.deleteFile(id, request);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

        return ResponseEntity.status(200).body(response);
    }

//    @PostMapping("/delete")
//    public ResponseEntity<String> deleteFile(@RequestBody requestDTO requestDTO, HttpServletRequest request){
//        String response;
//        Long id = Long.valueOf(requestDTO.getId());
//        try {
//            response = fileService.deleteFile(id, request);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
//        }
//
//        return ResponseEntity.status(200).body(response);
//    }
}
