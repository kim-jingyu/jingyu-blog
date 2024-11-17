package blog.jingyu.post.dto;

public record PreSignedUrlAbortRequest(String objectKey, String uploadId) {
}
