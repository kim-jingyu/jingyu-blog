package blog.jingyu.global.exception;

import lombok.Getter;

@Getter
public class JingyuException extends RuntimeException {
    private final ErrorCode errorCode;

    public JingyuException(ErrorCode errorCode) {
        super(errorCode.message());
        this.errorCode = errorCode;
    }
}
