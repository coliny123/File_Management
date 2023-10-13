package com.example.file_management.oauth.domain;

import com.example.file_management.oauth.OauthServerType;

public interface OauthCodeRequestUrlProvider {
    /**
     * OauthCode를 발급할 URl 제공
     * 어떤 Type의 Oauth 서비스를 사용할 것인지 설정
     */


    OauthServerType supportServer();
    String provide();
}

