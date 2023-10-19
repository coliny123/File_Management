package com.example.file_management.oauth.google.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data  // Getter, Setter, toString 등 자동 생성
@NoArgsConstructor  // 기본 생성자 자동 추가
@AllArgsConstructor  // 모든 필드 값을 파라미터로 받는 생성자 자동 추가
public class UserResponse {
    private String token;
    private String email;
    private String name;

}
