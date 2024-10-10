package blog.jingyu.login.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "인증 코드를 입력해주세요.")
        String code
) {
}
