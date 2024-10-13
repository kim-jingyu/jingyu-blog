package blog.jingyu.member.domain;

import blog.jingyu.login.domain.auth.Accessor;
import blog.jingyu.login.exception.AuthException;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class MemberOnlyChecker {
    @Before("@annotation(blog.jingyu.member.domain.MemberOnly)")
    public void check(JoinPoint joinPoint) {
        System.out.println("joinPoint = " + Arrays.toString(joinPoint.getArgs()));

        Arrays.stream(joinPoint.getArgs())
                .filter(Accessor.class::isInstance)
                .map(Accessor.class::cast)
                .filter(Accessor::isMember)
                .findFirst()
                .orElseThrow(AuthException::new);
    }
}
