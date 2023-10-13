package com.example.file_management.oauth.kakao.client;


import com.example.file_management.oauth.OauthServerType;
import com.example.file_management.oauth.domain.OauthMember;
import com.example.file_management.oauth.domain.OauthMemberClient;
import com.example.file_management.oauth.kakao.KakaoOauthConfig;
import com.example.file_management.oauth.kakao.dto.KakaoMemberResponse;
import com.example.file_management.oauth.kakao.dto.KakaoToken;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Component
@RequiredArgsConstructor
public class KakaoMemberClient implements OauthMemberClient {
//    private KakaoApiClient kakaoApiClient;
//    private KakaoOauthConfig kakaoOauthConfig;

    private final KakaoApiClient kakaoApiClient;
    private final KakaoOauthConfig kakaoOauthConfig;



    @Override
    public OauthServerType supportServer() {
        OauthServerType serverType = OauthServerType.KAKAO;
        System.out.println("Supporting Server Type: " + serverType);
        return serverType;

    }

    @Override
    public OauthMember fetch(String authCode) {
        KakaoToken tokenInfo = kakaoApiClient.fetchToken(tokenRequestParams(authCode)); // (1)

        System.out.println("Kakao Access Token: " + tokenInfo.accessToken());
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

//        System.out.println("params : " + params);
        return params;
    }
}
