package blog.jingyu.post.dto;

import blog.jingyu.post.domain.Comments;

import java.time.LocalDateTime;

public record CommentsResponse(String commentId, String content, String memberName, LocalDateTime date) {
    public CommentsResponse(Comments comments) {
        this(comments.getCommentId(), comments.getContent(), comments.getMember().getName(), comments.getCreatedAt());
    }
}
