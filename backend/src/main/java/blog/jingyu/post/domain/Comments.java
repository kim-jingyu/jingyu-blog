package blog.jingyu.post.domain;

import blog.jingyu.global.entity.BaseEntity;
import blog.jingyu.member.domain.Member;
import blog.jingyu.post.dto.CommentRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "comments")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Comments extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    @Column(name = "content")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    public static Comments createComment(Member member, CommentRequest commentRequest, Post post) {
        return Comments.builder()
                .content(commentRequest.content())
                .post(post)
                .member(member)
                .build();
    }
}
