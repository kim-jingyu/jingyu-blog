package blog.jingyu.login.exception;

import blog.jingyu.global.exception.ErrorCode;
import blog.jingyu.global.exception.JingyuException;
import org.springframework.http.HttpStatus;

public class InvalidJwtException extends JingyuException {
    public InvalidJwtException() {
        super(new ErrorCode(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰"));
    }
}
