package com.example.file_management.file.dto;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DownloadDTO {
//파일명, 올린날짜, 공유권한, 다운로드 코드, 다운로드 링크
    private String originalFileName;
    private LocalDateTime uploadTime;
    public boolean shared;
    public String authenticationCode;
    public String savedPath;
    public long size;
    public String originFormat;



}
