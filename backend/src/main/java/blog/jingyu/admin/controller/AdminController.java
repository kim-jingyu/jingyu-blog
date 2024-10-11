package blog.jingyu.admin.controller;

import blog.jingyu.admin.domain.AdminCheck;
import blog.jingyu.admin.domain.AdminOnly;
import blog.jingyu.admin.dto.AdminPwUpdateRequest;
import blog.jingyu.admin.dto.AdminRequest;
import blog.jingyu.admin.service.AdminService;
import blog.jingyu.login.domain.auth.Accessor;
import blog.jingyu.login.domain.token.MemberTokens;
import blog.jingyu.login.dto.AccessTokenResponse;
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
@RequestMapping(value = "/admin")
public class AdminController {
    private final AdminService adminService;

    @PostMapping
    public ResponseEntity<Long> createAdmin(@RequestBody @Validated AdminRequest request) {
        return ResponseEntity.status(CREATED)
                .body(adminService.createAdmin(request));
    }

    @AdminOnly
    @PatchMapping(value = "/password")
    public ResponseEntity<Long> updatePassword(@AdminCheck Accessor accessor, @RequestBody @Validated AdminPwUpdateRequest request) {
        return ResponseEntity.ok().body(adminService.updatePassword(accessor.getMemberId(), request));
    }

    @PostMapping("/login")
    public ResponseEntity<AccessTokenResponse> loginAdmin(@RequestBody @Validated AdminRequest request, HttpServletResponse response) {
        MemberTokens memberTokens = adminService.login(request);
        ResponseCookie cookie = ResponseCookie.from("refreshToken", memberTokens.refreshToken())
                .maxAge(604800)
                .sameSite("None")
                .secure(true)
                .httpOnly(true)
                .path("/")
                .build();
        response.addHeader(SET_COOKIE, cookie.toString());
        return ResponseEntity.status(CREATED).body(new AccessTokenResponse(memberTokens.accessToken()));
    }

    @PostMapping("/token")
    public ResponseEntity<AccessTokenResponse> extendLogin(@CookieValue("refreshToken") String refreshToken, @RequestHeader("Authorization") String authorizationHeader) {
        return ResponseEntity.status(CREATED).body(new AccessTokenResponse(adminService.renewalAccessToken(refreshToken, authorizationHeader)));
    }

    @AdminOnly
    @DeleteMapping("/logout")
    public ResponseEntity<Void> logout(@CookieValue("refreshToken") String refreshToken) {
        adminService.removeRefreshToken(refreshToken);
        return ResponseEntity.noContent().build();
    }
}
