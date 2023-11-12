package com.example.file_management.file.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.example.file_management.file.repository.FileRepository;
import org.junit.jupiter.api.Test;
import com.example.file_management.file.service.FileServiceImpl;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class FileServiceImplTest {

    @Test
    void generateRandomDownloadCode() {
        //given
        FileRepository mockRepository = mock(FileRepository.class);
        AmazonS3Client mockS3Client = mock(AmazonS3Client.class);
        FileServiceImpl fileService = new FileServiceImpl(mockRepository, mockS3Client);

        //when
        String downloadCode = fileService.generateRandomDownloadCode();

        //then
        assertNotNull(downloadCode);
        assertEquals(6, downloadCode.length());
        assertTrue(downloadCode instanceof String);
        System.out.println("downloadCode = " + downloadCode);
    }
}