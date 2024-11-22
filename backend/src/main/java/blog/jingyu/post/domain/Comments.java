package blog.jingyu.post.domain;

import blog.jingyu.global.entity.BaseEntity;
import blog.jingyu.member.domain.Member;
import blog.jingyu.post.dto.CommentRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import static lombok.AccessLevel.PROTECTED;

@Document(collection = "comments")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Comments extends BaseEntity {
    @Id
    private String commentId;

    private String content;

    private Member member;

    @DBRef
    private Post post;

    public static Comments createComment(Member member, CommentRequest commentRequest, Post post) {
        return Comments.builder()
                .content(commentRequest.content())
                .post(post)
                .member(member)
                .build();
    }
}
