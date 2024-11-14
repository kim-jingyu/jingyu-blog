package blog.jingyu.post.dto;

import blog.jingyu.post.domain.Post;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public record PostResponse(String postId, String title, String content, LocalDateTime date, List<HashtagResponse> hashtags) {
    public PostResponse(Post post) {
        this(post.getPostId(),
                post.getTitle(),
                post.getContents(),
                post.getCreatedAt(),
                post.getHashtags().stream()
                    .map(HashtagResponse::new)
                    .collect(Collectors.toList()));
    }
}
