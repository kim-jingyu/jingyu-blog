package blog.jingyu.post.domain;

import blog.jingyu.global.entity.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;
import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
public class Hashtag extends BaseEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long hashtagId;
    private String content;

    @Setter
    @ManyToOne(fetch = LAZY)
    private Post post;

    public void editContent(String content) {
        this.content = content;
    }
}
