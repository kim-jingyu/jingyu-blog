package blog.jingyu.global.exception;

import org.springframework.http.HttpStatus;

public record ErrorCode(HttpStatus status, String message) {
}
