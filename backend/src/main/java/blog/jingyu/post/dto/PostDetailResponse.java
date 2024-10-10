package blog.jingyu.post.dto;

import blog.jingyu.post.domain.Post;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public record PostDetailResponse(Long postId, String title, String content, LocalDateTime date, List<HashtagResponse> hashtags) {
    public PostDetailResponse(Post post) {
        this(post.getPostId(),
                post.getTitle(),
                post.getContents(),
                post.getCreatedAt(),
                post.getHashtags().stream()
                    .map(HashtagResponse::new)
                    .collect(Collectors.toList()));
    }
}
