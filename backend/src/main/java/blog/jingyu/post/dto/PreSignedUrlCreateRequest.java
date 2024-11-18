package blog.jingyu.post.dto;

public record PreSignedUrlCreateRequest(
        String objectName,
        String uploadId,
        Integer partNum
) {
}
