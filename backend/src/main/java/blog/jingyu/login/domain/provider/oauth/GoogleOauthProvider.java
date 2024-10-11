package blog.jingyu.login.domain.provider.oauth;

import blog.jingyu.login.domain.token.AccessToken;
import blog.jingyu.login.domain.userinfo.GoogleUserInfo;
import blog.jingyu.login.domain.userinfo.OauthUserInfo;
import blog.jingyu.login.exception.AuthException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Optional;

import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED;

@Component
@Slf4j
public class GoogleOauthProvider implements OauthProvider{
    private static final String PREV = "${oauth2.google.";
    private static final String PROVIDER_NAME = "google";

    protected final String clientId;
    protected final String clientSecret;
    protected final String redirectUri;
    protected final String tokenUri;
    protected final String userInfo;

    public GoogleOauthProvider(
            @Value(PREV + "client-id}") String clientId,
            @Value(PREV + "client-secret}") String clientSecret,
            @Value(PREV + "redirect-uri}") String redirectUri,
            @Value(PREV + "token-uri}")  String tokenUri,
            @Value(PREV + "resource-uri}") String userInfo
    ) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.tokenUri = tokenUri;
        this.userInfo = userInfo;
    }

    @Override
    public boolean is(String providerName) {
        return PROVIDER_NAME.equals(providerName);
    }

    @Override
    public OauthUserInfo getUserInfo(String code) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBearerAuth(requestAccessToken(code));
        HttpEntity<MultiValueMap<String, String>> userInfoRequestEntity = new HttpEntity<>(httpHeaders);

        ResponseEntity<GoogleUserInfo> response = restTemplate.exchange(
                userInfo,
                HttpMethod.GET,
                userInfoRequestEntity,
                GoogleUserInfo.class
        );

        log.info("response={}", response);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        }
        throw new AuthException();
    }

    private String requestAccessToken(String code) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setBasicAuth(clientId, clientSecret);
        httpHeaders.setContentType(APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("code", code);
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("redirect_uri", redirectUri);
        params.add("grant_type", "authorization_code");

        HttpEntity<MultiValueMap<String, String>> accessTokenRequestEntity = new HttpEntity<>(params, httpHeaders);
        ResponseEntity<AccessToken> accessTokenResponse = restTemplate.exchange(
                tokenUri,
                HttpMethod.POST,
                accessTokenRequestEntity,
                AccessToken.class
        );

        log.info("accessTokenResponse={}", accessTokenResponse);

        return Optional.ofNullable(accessTokenResponse.getBody())
                .orElseThrow(AuthException::new)
                .accessToken();
    }
}
