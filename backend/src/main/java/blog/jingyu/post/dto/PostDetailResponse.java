package blog.jingyu.post.dto;

import blog.jingyu.post.domain.Post;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

public record PostDetailResponse(Long postId, String title, String content, ZonedDateTime date, List<HashtagResponse> hashtags, List<CommentsResponse> comments, String memberName) {
    public PostDetailResponse(Post post) {
        this(post.getPostId(),
                post.getTitle(),
                post.getContents(),
                post.getCreatedAt().atZone(ZoneId.of("Asia/Seoul")),
                post.getHashtags().stream()
                        .map(HashtagResponse::new)
                        .toList(),
                post.getComments().stream()
                        .map(CommentsResponse::new)
                        .toList(),
                post.getAdmin().getLoginId());
    }
}
