package blog.jingyu.post.exception;

import blog.jingyu.global.exception.ErrorCode;
import blog.jingyu.global.exception.JingyuException;
import org.springframework.http.HttpStatus;

public class PostNotFoundException extends JingyuException {
    public PostNotFoundException() {
        super(new ErrorCode(HttpStatus.NOT_FOUND, "게시글 찾기에 실패했습니다."));
    }
}
