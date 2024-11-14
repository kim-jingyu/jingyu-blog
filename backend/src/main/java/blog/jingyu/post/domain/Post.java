package blog.jingyu.post.domain;

import blog.jingyu.admin.domain.Admin;
import blog.jingyu.global.entity.BaseEntity;
import blog.jingyu.post.dto.HashtagEditRequest;
import blog.jingyu.post.dto.HashtagRequest;
import blog.jingyu.post.dto.PostEditRequest;
import blog.jingyu.post.dto.PostRequest;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static lombok.AccessLevel.PROTECTED;

@Document(collection = "post")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Post extends BaseEntity {
    @Id
    private String postId;

    private String title;

    private String contents;

    @Builder.Default
    private List<Hashtag> hashtags = new ArrayList<>();

    private Admin admin;

    @Builder.Default
    private List<Comments> comments = new ArrayList<>();

    public static Post createPost(Admin admin, PostRequest postRequest) {
        Post post = Post.builder()
                .title(postRequest.title())
                .contents(postRequest.contents())
                .hashtags(postRequest.hashtags().stream()
                        .map(Hashtag::createHashtag)
                        .toList())
                .admin(admin)
                .build();
        post.getHashtags().forEach(hashtag -> hashtag.setPost(post));
        return post;
    }

    public Post editPost(PostEditRequest postEditRequest) {
        if (postEditRequest.title() != null) {
            this.title = postEditRequest.title();
        }
        if (postEditRequest.contents() != null) {
            this.contents = postEditRequest.contents();
        }
        if (postEditRequest.hashtags() != null) {
            Map<String, Hashtag> hashtagMap = hashtags.stream()
                    .collect(Collectors.toMap(Hashtag::getHashtagId, hashtag -> hashtag));
            for (HashtagEditRequest requestEditHashtag : postEditRequest.hashtags()) {
                Hashtag postHashtag = hashtagMap.get(requestEditHashtag.hashtagId());
                if (postHashtag == null) {
                    postHashtag = Hashtag.createHashtag(new HashtagRequest(requestEditHashtag.content()));
                    postHashtag.setPost(this);
                    this.hashtags.add(postHashtag);
                    continue;
                }
                postHashtag.editContent(requestEditHashtag.content());
            }
        }
        return this;
    }
}
