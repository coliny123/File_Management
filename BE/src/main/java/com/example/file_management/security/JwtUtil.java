package com.example.file_management.security;

import com.example.file_management.exception.InvalidTokenException;
import com.example.file_management.oauth.repository.RefreshTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class JwtUtil {

    private final RefreshTokenRepository refreshTokenRepository;
    private static final Logger log = LoggerFactory.getLogger(JwtUtil.class);

    @Autowired
    public JwtUtil(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    private static final String SECRET_KEY =  System.getenv("JWT_SECRET_KEY");
    private static final long EXPIRATION_TIME = TimeUnit.HOURS.toMillis(1);  // 1 hour
    private static final long REFRESH_EXPIRATION_TIME = TimeUnit.DAYS.toMillis(14); //14 days

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

    public static String generateRefreshToken(String email) {

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        Date expiryDateForRefreshToken= new Date(nowMillis + REFRESH_EXPIRATION_TIME);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiryDateForRefreshToken)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY).compact();
    }

    // 토큰 유효성 검사 로직 (generateAccessTokenFromRefreshToken 내부에서 자동으로 검증됨)
    public boolean validateRefreshToken(String token) {
        try {
            Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            log.error("리프레시 토큰의 유효성 검사에 실패했습니다.", e);
            throw new InvalidTokenException("타당하지 않거나 만료된 리프레시 토큰입니다.");
        }
    }

    // 리프레시 토큰에서 이메일, 이름 정보 추출 후 새로운 엑세스 토큰 생성
    public String generateAccessTokenFromRefreshToken(String refreshToken) {
        Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(refreshToken).getBody();

        Map<String, Object> newClaims = new HashMap<>();
        newClaims.put("email", claims.getSubject());
        newClaims.put("name", claims.get("name"));

        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        Date expiryDate = new Date(nowMillis + EXPIRATION_TIME);

        return Jwts.builder()
                .setClaims(newClaims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }
}
