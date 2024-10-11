package blog.jingyu.login.domain.provider.oauth;

import blog.jingyu.login.exception.AuthException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class OauthProviders {
    private final List<OauthProvider> providers;

    public OauthProvider mapping(String providerName) {
        return providers.stream()
                .filter(provider -> provider.is(providerName))
                .findFirst()
                .orElseThrow(AuthException::new);
    }
}
