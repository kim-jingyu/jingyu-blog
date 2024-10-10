package blog.jingyu.login.domain.provider.jwt;

import blog.jingyu.login.exception.InvalidJwtException;
import org.springframework.stereotype.Component;

@Component
public class BearerExtractor {
    private static final String BEARER_TYPE = "Bearer ";

    public String extractAccessToken(String header) {
        if (header != null && header.startsWith(BEARER_TYPE)) {
            return header.substring(BEARER_TYPE.length()).trim();
        }
        throw new InvalidJwtException();
    }
}
