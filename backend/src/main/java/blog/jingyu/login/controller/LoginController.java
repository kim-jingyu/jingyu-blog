package blog.jingyu.login.controller;

import blog.jingyu.login.domain.auth.Accessor;
import blog.jingyu.login.domain.token.MemberTokens;
import blog.jingyu.login.dto.AccessTokenResponse;
import blog.jingyu.login.dto.LoginRequest;
import blog.jingyu.login.service.LoginService;
import blog.jingyu.member.domain.MemberCheck;
import blog.jingyu.member.domain.MemberOnly;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpHeaders.SET_COOKIE;
import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;

    @PostMapping(value = "/login/{provider}")
    public ResponseEntity<AccessTokenResponse> login(@PathVariable String provider, @RequestBody @Validated LoginRequest loginRequest, HttpServletResponse httpServletResponse) {
        MemberTokens memberTokens = loginService.login(provider, loginRequest.code());
        ResponseCookie cookie = ResponseCookie.from("refreshToken", memberTokens.refreshToken())
                .maxAge(604800)
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .path("/")
                .build();
        httpServletResponse.addHeader(SET_COOKIE, cookie.toString());
        return ResponseEntity.status(CREATED)
                .body(new AccessTokenResponse(memberTokens.accessToken()));
    }

    @PostMapping(value = "/token")
    public ResponseEntity<AccessTokenResponse> extendLogin(@CookieValue("refreshToken") String refreshToken, @RequestHeader("Authorization") String authHeader) {
        String accessToken = loginService.renewalAccessToken(refreshToken, authHeader);
        return ResponseEntity.status(CREATED)
                .body(new AccessTokenResponse(accessToken));
    }

    @MemberOnly
    @DeleteMapping(value = "/logout")
    public ResponseEntity<Void> logout(@MemberCheck Accessor accessor, @CookieValue("refreshToken") String refreshToken) {
        loginService.removeRefreshToken(refreshToken);
        return ResponseEntity.noContent().build();
    }
}
