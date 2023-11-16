//package com.example.file_management.file.controller;
//
//
//import com.example.file_management.file.domain.entity.FileInfo;
//import com.example.file_management.file.service.FileService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.io.FileNotFoundException;
//import java.io.IOException;
//
//
//@RestController
//@RequiredArgsConstructor
//public class FileConversionController {
//
//    private final FileService fileService;
//
////    @PostMapping("/convert")
////    public ResponseEntity<FileInfo> convert(@RequestParam("filename") String fileName,
////                                            @RequestParam("desiredExtension") String desiredExtension) {
////        try {
////            FileInfo convertedFile = this.fileService.convertFile(fileName, desiredExtension);
////            return new ResponseEntity<>(convertedFile, HttpStatus.OK);
////        } catch (Exception e) {
////            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
////        }
////    }
////
//    @GetMapping("/{fileId}")
//    public ResponseEntity<FileInfo> getFile(@PathVariable Long fileId) {
//        try {
//            FileInfo fileInfo = this.fileService.getFile(fileId);
//            return new ResponseEntity<>(fileInfo, HttpStatus.OK);
//        } catch (FileNotFoundException e) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//
//    }
//}
