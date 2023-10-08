package com.example.file_management.oauth.kakao.client;

import com.example.file_management.oauth.OauthServerType;
import com.example.file_management.oauth.domain.OauthMember;
import com.example.file_management.oauth.domain.OauthMemberClient;
import com.example.file_management.oauth.kakao.KakaoOauthConfig;
import com.example.file_management.oauth.kakao.dto.KakaoMemberResponse;
import com.example.file_management.oauth.kakao.dto.KakaoToken;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

public class KakaoMemberClient implements OauthMemberClient {
    private KakaoApiClient kakaoApiClient;
    private KakaoOauthConfig kakaoOauthConfig;

    public KakaoMemberClient() {
    }

    @Override
    public OauthServerType supportServer() {
        return OauthServerType.KAKAO;
    }

    @Override
    public OauthMember fetch(String authCode) {
        KakaoToken tokenInfo = kakaoApiClient.fetchToken(tokenRequestParams(authCode)); // (1)
        KakaoMemberResponse kakaoMemberResponse =
                kakaoApiClient.fetchMember("Bearer " + tokenInfo.accessToken());  // (2)
        return kakaoMemberResponse.toDomain();  // (3)
    }

    private MultiValueMap<String, String> tokenRequestParams(String authCode) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", kakaoOauthConfig.clientId());
        params.add("redirect_uri", kakaoOauthConfig.redirectUri());
        params.add("code", authCode);
        params.add("client_secret", kakaoOauthConfig.clientSecret());
        return params;
    }
}
