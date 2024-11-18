package blog.jingyu.post.dto;

import jakarta.validation.constraints.NotNull;

public record PreSignedUploadInitiateRequest(
        @NotNull String objectName,
        String originalFileName,
        String fileType,
        Long fileSize
) {
}
