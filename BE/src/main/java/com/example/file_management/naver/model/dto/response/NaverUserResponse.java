package com.example.file_management.naver.model.dto.response;

import lombok.*;

@Data
@NoArgsConstructor  // 기본 생성자 자동 추가
@AllArgsConstructor  // 모든 필드 값을 파라미터로 받는 생성자 자동 추가
public class NaverUserResponse {

    private String resultcode;
    private String message;
    private Response response;

    @Data
    public static class Response {
        private String email;
        private String nickname;
        private String name;
    }
}
