package com.example.file_management.oauth;

<<<<<<< HEAD
//OauthServerType을 받아서 해당 인증 서버에서 Auth Code를 받아오기 위한 URL 주소를 생성
=======
>>>>>>> featureBE-hw

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
<<<<<<< HEAD

        OauthMember oauthMember = oauthMemberClientComposite.fetch(oauthServerType, authCode);

        // 로그인이 안 됐다면 회원 가입 진행
=======
        OauthMember oauthMember = oauthMemberClientComposite.fetch(oauthServerType, authCode);
>>>>>>> featureBE-hw
        OauthMember saved = oauthMemberRepository.findByOauthId(oauthMember.oauthId())
                .orElseGet(() -> oauthMemberRepository.save(oauthMember));
        return saved.id();
    }
}
<<<<<<< HEAD

=======
>>>>>>> featureBE-hw
