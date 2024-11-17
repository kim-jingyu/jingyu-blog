package blog.jingyu.post.dto;

public record PreSignedUrlCreateRequest(
        String objectKey,
        String uploadId,
        Integer partNum
) {
}
