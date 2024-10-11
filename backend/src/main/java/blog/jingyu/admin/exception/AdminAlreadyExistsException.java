package blog.jingyu.admin.exception;

import blog.jingyu.global.exception.ErrorCode;
import blog.jingyu.global.exception.JingyuException;
import org.springframework.http.HttpStatus;

public class AdminAlreadyExistsException extends JingyuException {
    public AdminAlreadyExistsException() {
        super(new ErrorCode(HttpStatus.BAD_REQUEST, "이미 존재하는 회원입니다."));
    }
}
