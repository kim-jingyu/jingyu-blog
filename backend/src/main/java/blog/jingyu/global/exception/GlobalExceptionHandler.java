package blog.jingyu.global.exception;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.stream.Collectors;

import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    public static final String INTERNAL_SERVER_ERROR_MSG = "서버에서 에러가 발생했습니다.";

    @ExceptionHandler(JingyuException.class)
    public ResponseEntity<ErrorResponse> handleApplicationException(JingyuException exception) {
        ErrorCode errorCode = exception.getErrorCode();
        return ResponseEntity.status(errorCode.status())
                .body(ErrorResponse.builder()
                        .message(errorCode.message())
                        .status(errorCode.status().value())
                        .build());
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleServerException(Exception exception) {
        return ResponseEntity.status(INTERNAL_SERVER_ERROR)
                .body(ErrorResponse.builder()
                        .message(INTERNAL_SERVER_ERROR_MSG)
                        .status(INTERNAL_SERVER_ERROR.value())
                        .build());
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        if (isAlreadyCommitted(request)) {
            return null;
        }
        return ResponseEntity.status(status)
                .body(ErrorResponse.builder()
                        .message(ex.getBindingResult().getAllErrors().stream()
                                .map(ObjectError::getDefaultMessage)
                                .collect(Collectors.joining()))
                        .status(status.value()));
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatusCode statusCode, WebRequest request) {
        if (isAlreadyCommitted(request)) {
            return null;
        }
        return ResponseEntity.status(statusCode)
                .body(ErrorResponse.builder()
                        .message(ex.getMessage())
                        .status(statusCode.value()));
    }

    private boolean isAlreadyCommitted(WebRequest request) {
        HttpServletResponse response = ((ServletWebRequest) request).getResponse();
        return response != null && response.isCommitted();
    }
}
