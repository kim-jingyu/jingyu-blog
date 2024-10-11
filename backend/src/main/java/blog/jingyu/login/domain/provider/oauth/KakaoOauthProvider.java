package blog.jingyu.login.domain.provider.oauth;

import blog.jingyu.login.domain.token.AccessToken;
import blog.jingyu.login.domain.userinfo.KakaoUserInfo;
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

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import static java.lang.Boolean.TRUE;
import static org.springframework.http.MediaType.APPLICATION_FORM_URLENCODED;

@Component
@Slf4j
public class KakaoOauthProvider implements OauthProvider{
    private static final String PREV = "${oauth2.kakao.";
    private static final String PROVIDER_NAME = "kakao";
    private static final String SECURE_RESOURCE = "secure_resource";

    protected final String clientId;
    protected final String clientSecret;
    protected final String redirectUri;
    protected final String tokenUri;
    protected final String userInfo;

    public KakaoOauthProvider(
            @Value(PREV + "client-id}") String clientId,
            @Value(PREV + "client-secret}") String clientSecret,
            @Value(PREV + "redirect-uri}") String redirectUri,
            @Value(PREV + "token-uri}")  String tokenUri,
            @Value(PREV + "user-info}") String userInfo
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

        Map<String, Boolean> queryParam = new HashMap<>();
        queryParam.put(SECURE_RESOURCE, TRUE);

        ResponseEntity<KakaoUserInfo> response = restTemplate.exchange(
                userInfo,
                HttpMethod.GET,
                userInfoRequestEntity,
                KakaoUserInfo.class,
                queryParam
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
