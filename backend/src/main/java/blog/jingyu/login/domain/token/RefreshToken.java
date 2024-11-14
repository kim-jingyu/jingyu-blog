package blog.jingyu.login.domain.token;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "refreshToken", timeToLive = 604800)
public record RefreshToken(
        @Id
        String token,
        String memberId
) {
}
