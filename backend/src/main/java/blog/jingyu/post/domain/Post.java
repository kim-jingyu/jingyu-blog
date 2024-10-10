package blog.jingyu.post.domain;

import blog.jingyu.global.entity.BaseEntity;
import blog.jingyu.member.domain.Member;
import blog.jingyu.post.dto.PostRequest;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static jakarta.persistence.FetchType.*;
import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Post extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "post_seq_gen")
    @SequenceGenerator(name = "post_seq_gen", sequenceName = "post_seq", allocationSize = 1)
    private Long postId;

    @Column(nullable = false)
    private String title;

    @Lob
    private String contents;

    @Builder.Default
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Hashtag> hashtags = new ArrayList<>();

    @OneToOne(fetch = LAZY)
    private Member member;

    public static Post createPost(PostRequest postRequest) {
        Post post = Post.builder()
                .title(postRequest.title())
                .contents(postRequest.contents())
                .hashtags(postRequest.hashtags())
                .build();
        post.getHashtags().forEach(hashtag -> hashtag.setPost(post));
        return post;
    }

    public Post editPost(PostRequest postRequest) {
        if (postRequest.title() != null) {
            this.title = postRequest.title();
        }
        if (postRequest.contents() != null) {
            this.contents = postRequest.contents();
        }
        if (postRequest.hashtags() != null) {
            Map<Long, Hashtag> hashtagMap = hashtags.stream()
                    .collect(Collectors.toMap(Hashtag::getHashtagId, hashtag -> hashtag));
            for (Hashtag requestHashtag : postRequest.hashtags()) {
                Hashtag postHashtag = hashtagMap.get(requestHashtag.getHashtagId());

                if (postHashtag != null) {
                    postHashtag.editContent(requestHashtag.getContent());
                } else {
                    requestHashtag.setPost(this);
                    this.hashtags.add(requestHashtag);
                }
            }
        }
        return this;
    }
}
