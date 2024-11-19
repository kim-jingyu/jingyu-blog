package blog.jingyu.post.domain;

import blog.jingyu.global.entity.BaseEntity;
import blog.jingyu.member.domain.Member;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.springframework.data.annotation.Id;
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

    @Setter
    @JsonIgnore
    private Post post;
}
