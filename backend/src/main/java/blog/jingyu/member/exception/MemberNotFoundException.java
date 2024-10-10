package blog.jingyu.member.exception;

import blog.jingyu.global.exception.ErrorCode;
import blog.jingyu.global.exception.JingyuException;

import static org.springframework.http.HttpStatus.NOT_FOUND;

public class MemberNotFoundException extends JingyuException {
    public MemberNotFoundException() {
        super(new ErrorCode(NOT_FOUND, "회원 정보를 찾지 못했습니다."));
    }
}
