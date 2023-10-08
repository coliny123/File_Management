package com.example.file_management.oauth.domain;

import com.example.file_management.oauth.OauthServerType;

public interface OauthMemberClient {

    OauthServerType supportServer();
    OauthMember fetch(String code);
}
