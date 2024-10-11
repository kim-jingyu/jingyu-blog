package blog.jingyu.admin.dto;

import jakarta.validation.constraints.NotBlank;

public record AdminRequest(
        @NotBlank(message = "ID를 입력해주세요.")
        String loginId,
        @NotBlank(message = "비밀번호를 입력해주세요.")
        String password
) {
}
