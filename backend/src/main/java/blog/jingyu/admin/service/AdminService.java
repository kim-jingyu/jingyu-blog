package blog.jingyu.admin.service;

import blog.jingyu.admin.domain.Admin;
import blog.jingyu.admin.dto.AdminPwUpdateRequest;
import blog.jingyu.admin.dto.AdminRequest;
import blog.jingyu.admin.exception.AdminAlreadyExistsException;
import blog.jingyu.admin.infra.PasswordEncoder;
import blog.jingyu.admin.repository.AdminRepository;
import blog.jingyu.login.domain.provider.jwt.BearerExtractor;
import blog.jingyu.login.domain.provider.jwt.JwtProvider;
import blog.jingyu.login.domain.token.MemberTokens;
import blog.jingyu.login.domain.token.RefreshToken;
import blog.jingyu.login.exception.AuthException;
import blog.jingyu.login.exception.InvalidJwtException;
import blog.jingyu.login.repository.RefreshTokenRepository;
import blog.jingyu.member.exception.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static blog.jingyu.login.domain.auth.Authority.ADMIN;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminService {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final BearerExtractor bearerExtractor;

    public Long createAdmin(AdminRequest request) {
        if (adminRepository.existsByLoginId(request.loginId())) {
            throw new AdminAlreadyExistsException();
        }
        return adminRepository.save(Admin.createAdmin(request.loginId(), passwordEncoder.encode(request.password()))).getAdminId();
    }

    public Long updatePassword(Long adminId, AdminPwUpdateRequest request) {
        Admin admin = adminRepository.findById(adminId).orElseThrow(MemberNotFoundException::new);
        if (!passwordEncoder.match(request.password(), admin.getPassword())) {
            throw new AuthException();
        }
        admin.updatePassword(passwordEncoder.encode(request.password()));
        return adminId;
    }

    public MemberTokens login(AdminRequest request) {
        Admin admin = adminRepository.findByLoginId(request.loginId()).orElseThrow(MemberNotFoundException::new);
        if (!passwordEncoder.match(request.password(), admin.getPassword())) {
            throw new AuthException();
        }
        MemberTokens memberTokens = jwtProvider.generateLoginToken(admin.getAdminId().toString(), ADMIN);
        refreshTokenRepository.save(new RefreshToken(memberTokens.refreshToken(), admin.getAdminId()));
        return memberTokens;
    }

    public String renewalAccessToken(String refreshToken, String authorizationHeader) {
        String accessToken = bearerExtractor.extractAccessToken(authorizationHeader);
        if (jwtProvider.checkValidRefreshAndInvalidAccess(refreshToken, accessToken)) {
            RefreshToken findRefreshToken = refreshTokenRepository.findById(refreshToken).orElseThrow(InvalidJwtException::new);
            return jwtProvider.regenerateAccessToken(findRefreshToken.memberId().toString(), ADMIN);
        }
        if (jwtProvider.checkValidRefreshAndAccess(refreshToken, accessToken)) {
            return accessToken;
        }
        throw new AuthException();
    }

    public void removeRefreshToken(String refreshToken) {
        refreshTokenRepository.deleteById(refreshToken);
    }
}
