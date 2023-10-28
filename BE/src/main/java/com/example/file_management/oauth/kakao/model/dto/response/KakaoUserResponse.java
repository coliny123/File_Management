package com.example.file_management.oauth.kakao.model.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class KakaoUserResponse {

    @JsonProperty("kakao_account")
    private Map<String, Object> kakaoAccount;

    @JsonProperty("properties")
    private Map<String, Object> properties;

}


