package blog.jingyu.login.service;

import blog.jingyu.login.domain.provider.jwt.BearerExtractor;
import blog.jingyu.login.domain.provider.jwt.JwtProvider;
import blog.jingyu.login.domain.provider.oauth.OauthProviders;
import blog.jingyu.login.domain.token.MemberTokens;
import blog.jingyu.login.domain.token.RefreshToken;
import blog.jingyu.login.domain.userinfo.OauthUserInfo;
import blog.jingyu.login.exception.AuthException;
import blog.jingyu.login.repository.RefreshTokenRepository;
import blog.jingyu.member.domain.Member;
import blog.jingyu.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static blog.jingyu.login.domain.auth.Authority.MEMBER;

@Service
@Transactional
@RequiredArgsConstructor
public class LoginService {
    public static final int TRT_COUNT = 5;
    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;
    private final OauthProviders oauthProviders;
    private final JwtProvider jwtProvider;
    private final BearerExtractor bearerExtractor;

    public MemberTokens login(String providerName, String code) {
        OauthUserInfo oauthUserInfo = oauthProviders.mapping(providerName).getUserInfo(code);
        Member member = memberRepository.findBySocialLoginId(oauthUserInfo.getSocialLoginId())
                .orElseGet(() -> createMember(oauthUserInfo));
        MemberTokens memberTokens = jwtProvider.generateLoginToken(member.getMemberId().toString(), MEMBER);
        refreshTokenRepository.save(new RefreshToken(memberTokens.refreshToken(), member.getMemberId()));
        return memberTokens;
    }

    public String renewalAccessToken(String refreshTokenRequest, String authorizationHeader) {
        String accessToken = bearerExtractor.extractAccessToken(authorizationHeader);
        if (jwtProvider.checkValidRefreshAndInvalidAccess(refreshTokenRequest, accessToken)) {
            RefreshToken refreshToken = refreshTokenRepository.findById(refreshTokenRequest).orElseThrow(AuthException::new);
            return jwtProvider.regenerateAccessToken(refreshToken.memberId().toString(), MEMBER);
        }
        if (jwtProvider.checkValidRefreshAndAccess(refreshTokenRequest, accessToken)) {
            return accessToken;
        }
        throw new AuthException();
    }

    public void removeRefreshToken(String refreshToken) {
        refreshTokenRepository.deleteById(refreshToken);
    }

    private Member createMember(OauthUserInfo oauthUserInfo) {
        int tryCount = 0;
        while (tryCount < TRT_COUNT) {
            String nickname = oauthUserInfo.getName() + generateRandomCode();
            if (!memberRepository.existsByName(nickname)) {
                return memberRepository.save(Member.createMember(oauthUserInfo.getSocialLoginId(), nickname, oauthUserInfo.getProfileImg()));
            }
            tryCount += 1;
        }
        throw new AuthException();
    }

    private String generateRandomCode() {
        return String.format("%04d", (int) (Math.random() * 10000));
    }
}
