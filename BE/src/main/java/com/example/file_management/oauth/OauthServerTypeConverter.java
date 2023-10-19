package com.example.file_management.oauth;

<<<<<<< HEAD
import com.example.file_management.oauth.naver.model.OauthServerType;
=======

>>>>>>> featureBE-hw
import org.springframework.core.convert.converter.Converter;

public class OauthServerTypeConverter implements Converter<String, OauthServerType> {

<<<<<<< HEAD
    // String을 OauthServerType으로 변환
=======
>>>>>>> featureBE-hw
    @Override
    public OauthServerType convert(String source) {
        return OauthServerType.fromName(source);
    }
}
<<<<<<< HEAD

=======
>>>>>>> featureBE-hw
