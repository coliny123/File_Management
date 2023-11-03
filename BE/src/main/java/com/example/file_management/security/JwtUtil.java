package com.example.file_management.security;

import com.example.file_management.exception.InvalidTokenException;
import com.example.file_management.oauth.model.entity.RefreshToken;
import com.example.file_management.oauth.repository.RefreshTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Component
public class JwtUtil {

    private final RefreshTokenRepository refreshTokenRepository;
    private static final Logger log = LoggerFactory.getLogger(JwtUtil.class);

    @Autowired
    public JwtUtil(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    private static final String SECRET_KEY =  System.getenv("JWT_SECRET_KEY");
//    private static final long EXPIRATION_TIME = TimeUnit.HOURS.toMillis(1);  // 1 hour
    private static final long EXPIRATION_TIME = TimeUnit.SECONDS.toMillis(30);  // 30 seconds

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

    // 토큰 유효성 검사 로직
    public boolean validateRefreshToken(String token) {
        try {
            Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
            System.out.println("Token claims: " + claims.toString());  // 토큰의 클레임을 콘솔에 출력
            return true;

        } catch (Exception e) {
            log.error("토큰의 유효성 검사에 실패했습니다.", e);
            throw new InvalidTokenException("타당하지 않는 토큰입니다.");
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


    public String getRefreshTokenFromToken(String refreshToken) {
        // refreshTokenRepository를 이용해 DB에서 토큰을 조회
        RefreshToken refreshTokenInDb = refreshTokenRepository.findRefreshTokenByRefreshToken(refreshToken);

        // DB에 해당 토큰이 없으면 InvalidTokenException 발생
        if (refreshTokenInDb == null) {
            throw new InvalidTokenException("유효하지 않은 리프레시 토큰입니다.");
        }

        // DB에 저장된 토큰 값 반환
        return refreshTokenInDb.getRefreshToken();
    }

    public Long getIdFromToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7); // "Bearer " 제거
        Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
        return claims.get("id", Long.class);
    }
}
