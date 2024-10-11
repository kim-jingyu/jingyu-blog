package blog.jingyu.post.dto;

import java.util.List;

public record PostRequest(String title, String contents, List<HashtagRequest> hashtags) {
}
