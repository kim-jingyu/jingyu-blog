package blog.jingyu.login.domain.provider.oauth;

import blog.jingyu.login.domain.userinfo.OauthUserInfo;
import org.springframework.web.client.RestTemplate;

public interface OauthProvider {
    RestTemplate restTemplate = new RestTemplate();
    boolean is(String providerName);
    OauthUserInfo getUserInfo(String code);
}
