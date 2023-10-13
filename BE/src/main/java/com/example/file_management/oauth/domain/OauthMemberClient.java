package com.example.file_management.oauth.domain;


import com.example.file_management.oauth.OauthServerType;

// auth code를 통해 oauth member 생성
public interface OauthMemberClient {

    OauthServerType supportServer(); // KAKAO 출력
    OauthMember fetch(String code);
}
