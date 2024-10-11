package blog.jingyu.admin.domain;

import blog.jingyu.login.domain.auth.Accessor;
import blog.jingyu.login.exception.AuthException;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class AdminOnlyChecker {
    @Before("@annotation(blog.jingyu.admin.domain.AdminOnly)")
    public void check(JoinPoint joinPoint) {
        Arrays.stream(joinPoint.getArgs())
                .filter(Accessor.class::isInstance)
                .map(Accessor.class::cast)
                .filter(Accessor::isAdmin)
                .findFirst()
                .orElseThrow(AuthException::new);
    }
}
