package com.example.file_management.oauth.naver.model;

import static java.util.Locale.ENGLISH;

public enum OauthServerType {

//    KAKAO,
    NAVER,
    ;

    public static OauthServerType fromName(String type) {
        return OauthServerType.valueOf(type.toUpperCase(ENGLISH));
    }
}
