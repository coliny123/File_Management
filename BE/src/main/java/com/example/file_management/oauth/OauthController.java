package com.example.file_management.oauth;

<<<<<<< HEAD
// 사용자가 프론트엔드를 통해 /oauth/servertype 로 접속하면 메서드 실행되는 클래스
=======
>>>>>>> featureBE-hw

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

<<<<<<< HEAD
import java.io.IOException;

@RequiredArgsConstructor
@RequestMapping("/auth")
=======
@RequiredArgsConstructor
@RequestMapping("/oauth")
>>>>>>> featureBE-hw
@RestController
public class OauthController {

    private final OauthService oauthService;

<<<<<<< HEAD
//    @SneakyThrows
    @GetMapping("/{oauthServerType}")
    ResponseEntity<Void> redirectOauthCodeRequestUrl(
            @PathVariable(name = "oauthServerType") String oauthServerTypeName,
            HttpServletResponse response) throws IOException {
        OauthServerType oauthServerType = OauthServerType.fromName(oauthServerTypeName);
=======
    @SneakyThrows
    @GetMapping("/{oauthServerType}")
    ResponseEntity<Void> redirectOauthCodeRequestUrl(
            @PathVariable OauthServerType oauthServerType, HttpServletResponse response)
{
>>>>>>> featureBE-hw
        String redirectUrl = oauthService.getOauthCodeRequestUrl(oauthServerType);
        response.sendRedirect(redirectUrl);
        return ResponseEntity.ok().build();
    }

<<<<<<< HEAD
    // 인증코드 받아옴
    @GetMapping("/login/{oauthServerType}")
    ResponseEntity<Long> login(
            @PathVariable(name = "oauthServerType") String oauthServerTypeName,
            @RequestParam("code") String code
    ) {
        OauthServerType oauthServerType = OauthServerType.fromName(oauthServerTypeName);
        Long login = oauthService.login(oauthServerType, code);
        return ResponseEntity.ok(login);
    }

}

=======
    @GetMapping("/login/{oauthServerType}")
    ResponseEntity<Long> login(
            @PathVariable OauthServerType oauthServerType,
            @RequestParam("code") String code
    ) {
        Long login = oauthService.login(oauthServerType, code);
        return ResponseEntity.ok(login);
    }
}
>>>>>>> featureBE-hw
