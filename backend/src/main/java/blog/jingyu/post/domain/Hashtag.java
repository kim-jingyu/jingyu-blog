package blog.jingyu.post.domain;

import blog.jingyu.global.entity.BaseEntity;
import blog.jingyu.post.dto.HashtagRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import static lombok.AccessLevel.PROTECTED;

@Document(collection = "hashtag")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
public class Hashtag extends BaseEntity {
    @Id
    private String hashtagId;
    private String content;

    @Setter
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
