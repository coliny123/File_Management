package com.example.file_management.oauth;

import com.example.file_management.oauth.naver.model.OauthServerType;
import org.springframework.core.convert.converter.Converter;

public class OauthServerTypeConverter implements Converter<String, OauthServerType> {

    // String을 OauthServerType으로 변환
    @Override
    public OauthServerType convert(String source) {
        return OauthServerType.fromName(source);
    }
}

