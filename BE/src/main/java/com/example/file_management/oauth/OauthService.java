package com.example.file_management.oauth;


import com.example.file_management.oauth.domain.OauthCodeRequestUrlProviderComposite;
import com.example.file_management.oauth.domain.OauthMember;
import com.example.file_management.oauth.domain.OauthMemberClientComposite;
import com.example.file_management.oauth.domain.OauthMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OauthService {

    private final OauthCodeRequestUrlProviderComposite oauthCodeRequestUrlProviderComposite;
    private final OauthMemberClientComposite oauthMemberClientComposite;
    private final OauthMemberRepository oauthMemberRepository;

    public String getOauthCodeRequestUrl(OauthServerType oauthServerType) {
        return oauthCodeRequestUrlProviderComposite.provide(oauthServerType);
    }

    // 추가
    public Long login(OauthServerType oauthServerType, String authCode) {
        OauthMember oauthMember = oauthMemberClientComposite.fetch(oauthServerType, authCode);
        OauthMember saved = oauthMemberRepository.findByOauthId(oauthMember.oauthId())
                .orElseGet(() -> oauthMemberRepository.save(oauthMember));
        return saved.id();
    }
}
