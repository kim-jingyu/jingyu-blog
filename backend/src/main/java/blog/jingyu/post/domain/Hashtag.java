package blog.jingyu.post.domain;

import blog.jingyu.global.entity.BaseEntity;
import blog.jingyu.post.dto.HashtagRequest;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import static lombok.AccessLevel.PROTECTED;

@Document(collection = "hashtag")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Hashtag extends BaseEntity {
    @Id
    private String hashtagId;
    private String content;

    @Setter
    @DBRef
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
