package blog.jingyu.login.domain.token;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AccessToken(
        @JsonProperty("access_token")
        String accessToken,
        @JsonProperty("expires_in")
        int expiresIn,
        @JsonProperty("token_in")
        int tokenIn,
        @JsonProperty("scope")
        String scope,
        @JsonProperty("refresh_token")
        String refreshToken
) {
}
