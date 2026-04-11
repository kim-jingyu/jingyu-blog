package blog.jingyu.post.dto;

import blog.jingyu.post.domain.Comments;

import java.time.ZoneId;
import java.time.ZonedDateTime;

public record CommentsResponse(Long commentId, String content, String memberName, ZonedDateTime date) {
    public CommentsResponse(Comments comments) {
        this(comments.getCommentId(), comments.getContent(), comments.getMember().getName(), comments.getCreatedAt().atZone(ZoneId.of("Asia/Seoul")));
    }
}
