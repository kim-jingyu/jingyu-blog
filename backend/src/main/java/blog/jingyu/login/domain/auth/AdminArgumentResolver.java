package blog.jingyu.login.domain.auth;

import blog.jingyu.admin.domain.AdminCheck;
import blog.jingyu.admin.repository.AdminRepository;
import blog.jingyu.login.domain.provider.jwt.BearerExtractor;
import blog.jingyu.login.domain.provider.jwt.JwtProvider;
import blog.jingyu.login.domain.token.MemberTokens;
import blog.jingyu.login.exception.InvalidJwtException;
import blog.jingyu.login.repository.RefreshTokenRepository;
import blog.jingyu.member.exception.MemberNotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.BadRequestException;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import java.util.Arrays;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Component
@RequiredArgsConstructor
public class AdminArgumentResolver implements HandlerMethodArgumentResolver {
    private final JwtProvider jwtProvider;
    private final BearerExtractor bearerExtractor;
    private final RefreshTokenRepository refreshTokenRepository;
    private final AdminRepository adminRepository;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.withContainingClass(Long.class)
                .hasParameterAnnotation(AdminCheck.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
        if (request == null) {
            throw new BadRequestException();
        }

        String refreshToken = extractRefreshToken(request.getCookies());
        String accessToken = bearerExtractor.extractAccessToken(webRequest.getHeader(AUTHORIZATION));
        jwtProvider.validateTokens(new MemberTokens(accessToken, refreshToken));

        String adminId = String.valueOf(jwtProvider.getSubject(accessToken));
        if (!adminRepository.existsById(adminId)) {
            throw new MemberNotFoundException();
        }
        return Accessor.admin(adminId);
    }

    private String extractRefreshToken(Cookie[] cookies) {
        if (cookies == null) {
            throw new InvalidJwtException();
        }
        return Arrays.stream(cookies)
                .filter(this::isValidRefreshToken)
                .findFirst()
                .orElseThrow(InvalidJwtException::new)
                .getValue();
    }

    private boolean isValidRefreshToken(Cookie cookie) {
        return "refreshToken".equals(cookie.getName()) && refreshTokenRepository.existsById(cookie.getValue());
    }
}
