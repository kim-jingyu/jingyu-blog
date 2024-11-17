package blog.jingyu.post.dto;

public record PreSignedUploadInitiateRequest(
        String originalFileName,
        String fileType,
        String fileSize
) {
}
