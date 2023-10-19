<<<<<<<< HEAD:BE/src/main/java/com/example/file_management/security/JwtUtil.java
package com.example.file_management.security;
========
package com.example.file_management.oauth.google.security;
>>>>>>>> featureBE-hw:BE/src/main/java/com/example/file_management/oauth/google/security/JwtUtil.java

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtUtil {

    private static final String SECRET_KEY =  System.getenv("JWT_SECRET_KEY");
    private static final int EXPIRATION_TIME = 3600000;  // 1 hour

    public static String generateToken(String email, String name) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("email", email);
        claims.put("name", name);

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        Date expiryDate = new Date(nowMillis + EXPIRATION_TIME);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }
}