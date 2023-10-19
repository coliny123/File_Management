package com.example.file_management;

//import com.example.file_management.oauth.domain.OauthMember;
//import com.example.file_management.oauth.domain.OauthMemberClient;
//import com.example.file_management.oauth.kakao.KakaoOauthConfig;
//import com.example.file_management.oauth.kakao.client.KakaoMemberClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;




@SpringBootApplication
@ConfigurationPropertiesScan
//@EnableConfigurationProperties(KakaoOauthConfig.class)
public class FileManagementApplication {

    public static void main(String[] args) {

        SpringApplication.run(FileManagementApplication.class, args);


        //  OauthMemberClient 실행
//        OauthMemberClient client = new KakaoMemberClient();
//        System.out.println(client.supportServer());  // 출력: KAKAO


    }

}
