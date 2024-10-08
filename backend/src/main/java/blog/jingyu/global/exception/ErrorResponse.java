package blog.jingyu.global.exception;

import lombok.Builder;

@Builder
public record ErrorResponse(int status, String message) {
    @Override
    public String toString() {
        return "status=" + status +
                ", message='" + message;
    }
}
