package blog.jingyu.post.domain;

import blog.jingyu.global.entity.BaseEntity;
import blog.jingyu.member.domain.Member;
import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.FetchType.*;
import static jakarta.persistence.GenerationType.SEQUENCE;
import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Comments extends BaseEntity {
    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = "comment_seq_gen")
    @SequenceGenerator(name = "comment_seq_gen", sequenceName = "comment_seq", allocationSize = 1)
    private Long commentId;

    private String content;

    @OneToOne(fetch = LAZY)
    private Member member;

    @Setter
    @ManyToOne(fetch = LAZY)
    private Post post;
}
