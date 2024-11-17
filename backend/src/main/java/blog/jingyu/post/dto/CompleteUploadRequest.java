package blog.jingyu.post.dto;

import java.util.List;

public record CompleteUploadRequest(String objectKey, String uploadId, List<Part> parts) {
    public record Part(Integer partNum, String eTag) {
    }
}
