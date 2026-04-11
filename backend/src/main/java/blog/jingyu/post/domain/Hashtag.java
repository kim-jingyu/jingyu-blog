package blog.jingyu.post.domain;

import blog.jingyu.global.entity.BaseEntity;
import blog.jingyu.post.dto.HashtagRequest;
import jakarta.persistence.*;
import lombok.*;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "hashtag")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Hashtag extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hashtag_id")
    private Long hashtagId;

    @Column(name = "content")
    private String content;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    public static Hashtag createHashtag(HashtagRequest request) {
        return Hashtag.builder()
                .content(request.content())
                .build();
    }

    public void editContent(String content) {
        this.content = content;
    }
}
