package com.example.file_management.file.domain.entity;

import com.example.file_management.oauth.model.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "fileinfo")
public class FileInfo {
    // 파일 이름, 파일 형식, 피일 크기, 다운로드 링크 .... 수정 예정입니다.

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;    // uuid로 만든 저장되는 파일 이름

    public String originalFileName; // 사용자가 upload한 파일 이름

//    public String uploader;     // 업로더 아이디
//    public String contentType;  // 파일 형식? text/plain 같은거

    @Column(length = 1000)
    public String savedPath;  // 로컬 저장 주소(다운로드 링크로 변경예정)

    @ManyToOne
    @JoinColumn(name="email", nullable=false)
    public User email;
}