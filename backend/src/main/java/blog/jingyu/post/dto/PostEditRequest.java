package blog.jingyu.post.dto;

import java.util.List;

public record PostEditRequest(String title, String contents, List<HashtagEditRequest> hashtags) {
}
