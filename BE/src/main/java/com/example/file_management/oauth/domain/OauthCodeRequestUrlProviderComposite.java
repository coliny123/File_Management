package com.example.file_management.oauth.domain;

//oauthservertype 종류에 따라, 이에 해당하는 AuthCodeRequestUrlProvier를 사용하여 URL을 생성할 수 있는 클래스
import com.example.file_management.oauth.OauthServerType;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.Optional;
import java.util.Set;

import static java.util.function.UnaryOperator.identity;
import static java.util.stream.Collectors.toMap;

@Component
public class OauthCodeRequestUrlProviderComposite {

    private final Map<OauthServerType, OauthCodeRequestUrlProvider> mapping;

    public OauthCodeRequestUrlProviderComposite(Set<OauthCodeRequestUrlProvider> providers) {
        mapping = providers.stream()
                .collect(toMap(
                        OauthCodeRequestUrlProvider::supportServer, identity()
                ));
    }

    public String provide(OauthServerType oauthServerType) {
        return getProvider(oauthServerType).provide();
    }

    public OauthCodeRequestUrlProvider getProvider(OauthServerType oauthServerType) {
        return Optional.ofNullable(mapping.get(oauthServerType))
                .orElseThrow(() -> new RuntimeException("지원하지 않는 로그인 타입입니다."));
    }
}

