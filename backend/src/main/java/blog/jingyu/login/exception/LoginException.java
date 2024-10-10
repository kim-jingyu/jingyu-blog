package blog.jingyu.login.exception;

import blog.jingyu.global.exception.ErrorCode;
import blog.jingyu.global.exception.JingyuException;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;

public class LoginException extends JingyuException {
    public LoginException() {
        super(new ErrorCode(UNAUTHORIZED, "인증에 실패했습니다."));
    }
}
