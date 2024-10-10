package blog.jingyu.post.domain;

import blog.jingyu.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.SEQUENCE;
import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
public class Hashtag extends BaseEntity {
    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = "hashtag_seq_gen")
    @SequenceGenerator(name = "hashtag_seq_gen", sequenceName = "hashtag_seq", allocationSize = 1)
    private Long hashtagId;
    private String content;

    @Setter
    @ManyToOne(fetch = LAZY)
    private Post post;

    public void editContent(String content) {
        this.content = content;
    }
}
