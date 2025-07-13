package blog.jingyu.post.exception;

import blog.jingyu.global.exception.ErrorCode;
import blog.jingyu.global.exception.JingyuException;
import org.springframework.http.HttpStatus;

public class CommentNotFoundException extends JingyuException {
  public CommentNotFoundException() {
    super(new ErrorCode(HttpStatus.NOT_FOUND, "댓글 찾기에 실패했습니다."));
  }
}
