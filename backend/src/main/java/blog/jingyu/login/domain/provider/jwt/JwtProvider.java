package blog.jingyu.login.domain.provider.jwt;

import blog.jingyu.login.domain.token.MemberTokens;
import blog.jingyu.login.exception.ExpiredPeriodJwtException;
import blog.jingyu.login.exception.InvalidJwtException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

import static io.jsonwebtoken.Header.JWT_TYPE;
import static io.jsonwebtoken.Header.TYPE;
import static io.jsonwebtoken.SignatureAlgorithm.HS256;
import static java.nio.charset.StandardCharsets.UTF_8;

@Component
public class JwtProvider {
    public static final String PREV = "${security.jwt.";

    private final SecretKey secretKey;
    private final Long accessExTime;
    private final Long refreshExTime;

    public JwtProvider(
            @Value(PREV + "secret-key}") String secretKey,
            @Value(PREV + "access-expiration-time}") Long accessExTime,
            @Value(PREV + "refresh-expiration-time}") Long refreshExTime
    ) {
        this.secretKey = Keys.hmacShaKeyFor(secretKey.getBytes(UTF_8));
        this.accessExTime = accessExTime;
        this.refreshExTime = refreshExTime;
    }

    public MemberTokens generateLoginToken(String subject) {
        return new MemberTokens(createToken(subject, accessExTime), createToken("", refreshExTime));
    }

    private String createToken(String subject, Long exTime) {
        Date now = new Date();
        return Jwts.builder()
                .setHeaderParam(TYPE, JWT_TYPE)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + exTime))
                .signWith(secretKey, HS256)
                .compact();
    }

    public void validateTokens(MemberTokens memberTokens) {
        validateRefreshToken(memberTokens.refreshToken());
        validateAccessToken(memberTokens.accessToken());
    }

    public String getSubject(String token) {
        return parseToken(token)
                .getBody()
                .getSubject();
    }

    public String regenerateAccessToke(String subject) {
        return createToken(subject, accessExTime);
    }

    public boolean checkValidRefreshAndInvalidAccess(String refreshToken, String accessToken) {
        validateRefreshToken(refreshToken);
        try {
            validateAccessToken(accessToken);
        } catch (ExpiredPeriodJwtException e) {
            return true;
        }
        return false;
    }

    public boolean checkValidRefreshAndAccess(String refreshToken, String accessToken) {
        try {
            validateRefreshToken(refreshToken);
            validateAccessToken(accessToken);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    private void validateRefreshToken(String refreshToken) {
        try {
            parseToken(refreshToken);
        } catch (ExpiredJwtException e) {
            throw new ExpiredPeriodJwtException();
        } catch (JwtException | IllegalArgumentException e) {
            throw new InvalidJwtException();
        }
    }

    private void validateAccessToken(String accessToken) {
        try {
            parseToken(accessToken);
        } catch (ExpiredJwtException e) {
            throw new ExpiredPeriodJwtException();
        } catch (JwtException | IllegalArgumentException e) {
            throw new InvalidJwtException();
        }
    }

    private Jws<Claims> parseToken(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token);
    }
}
