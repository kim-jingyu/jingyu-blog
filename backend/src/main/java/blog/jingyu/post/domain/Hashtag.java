package blog.jingyu.post.domain;

import blog.jingyu.global.entity.BaseEntity;
import blog.jingyu.post.dto.HashtagRequest;
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

    private Hashtag(HashtagRequest request) {
        this(null, request.content(), null);
    }

    public static Hashtag createHashtag(HashtagRequest request) {
        return new Hashtag(request);
    }

    public void editContent(String content) {
        this.content = content;
    }
}
