package blog.jingyu.post.dto;

import blog.jingyu.post.domain.Post;

import java.util.List;
import java.util.stream.Collectors;

public record PostResponse(Long postId, String title, String content, List<HashtagResponse> hashtags) {
    public PostResponse(Post post) {
        this(post.getPostId(),
                post.getTitle(),
                post.getContents(),
                post.getHashtags().stream()
                    .map(HashtagResponse::new)
                    .collect(Collectors.toList()));
    }
}
