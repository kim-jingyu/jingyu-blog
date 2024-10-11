package blog.jingyu.admin.dto;

import jakarta.validation.constraints.NotBlank;

public record AdminPwUpdateRequest(
        @NotBlank(message = "비밀번호를 입력해주세요.")
        String password
) {
}
