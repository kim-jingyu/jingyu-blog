package blog.jingyu.post.dto;

import blog.jingyu.post.domain.Comments;

public record CommentsResponse(Long comment, String content, String memberName) {
    public CommentsResponse(Comments comments) {
        this(comments.getCommentId(), comments.getContent(), comments.getMember().getName());
    }
}