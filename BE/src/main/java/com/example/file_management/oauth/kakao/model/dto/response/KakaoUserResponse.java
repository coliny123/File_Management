package com.example.file_management.oauth.kakao.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor  // 기본 생성자 자동 추가
@AllArgsConstructor  // 모든 필드 값을 파라미터로 받는 생성자 자동 추가
public class KakaoUserResponse {
//    private String token;
//    private String refreshToken;

    @JsonProperty("kakao_account")
    private Map<String, Object> kakaoAccount;

    @JsonProperty("properties")
    private Map<String, Object> properties;

}


