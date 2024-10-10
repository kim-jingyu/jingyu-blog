package blog.jingyu.login.exception;

import blog.jingyu.global.exception.ErrorCode;
import blog.jingyu.global.exception.JingyuException;
import org.springframework.http.HttpStatus;

public class ExpiredPeriodJwtException extends JingyuException {
    public ExpiredPeriodJwtException() {
        super(new ErrorCode(HttpStatus.UNAUTHORIZED, "만료된 토큰입니다."));
    }
}
