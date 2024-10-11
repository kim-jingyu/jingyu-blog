package blog.jingyu.post.domain;

import blog.jingyu.admin.domain.Admin;
import blog.jingyu.global.entity.BaseEntity;
import blog.jingyu.post.dto.HashtagEditRequest;
import blog.jingyu.post.dto.HashtagRequest;
import blog.jingyu.post.dto.PostEditRequest;
import blog.jingyu.post.dto.PostRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static jakarta.persistence.FetchType.LAZY;
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

    @ManyToOne(fetch = LAZY)
    private Admin admin;

    @Builder.Default
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
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
            Map<Long, Hashtag> hashtagMap = hashtags.stream()
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
