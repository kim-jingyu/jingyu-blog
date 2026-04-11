package blog.jingyu.login.domain.auth;

import lombok.Getter;

import static blog.jingyu.login.domain.auth.Authority.*;

@Getter
public class Accessor {
    private final Long memberId;
    private final Authority authority;

    public Accessor(Long memberId, Authority authority) {
        this.memberId = memberId;
        this.authority = authority;
    }

    public static Accessor guest() {
        return new Accessor(0L, GUEST);
    }

    public static Accessor member(Long memberId) {
        return new Accessor(memberId, MEMBER);
    }

    public static Accessor admin(Long memberId) {
        return new Accessor(memberId, ADMIN);
    }

    public boolean isMember() {
        return MEMBER.equals(authority);
    }

    public boolean isAdmin() {
        return ADMIN.equals(authority);
    }
}
