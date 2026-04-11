package blog.jingyu.post.domain;

import blog.jingyu.admin.domain.Admin;
import blog.jingyu.global.entity.BaseEntity;
import blog.jingyu.post.dto.HashtagEditRequest;
import blog.jingyu.post.dto.HashtagRequest;
import blog.jingyu.post.dto.PostEditRequest;
import blog.jingyu.post.dto.PostRequest;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "post")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Post extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;

    @Column(name = "title")
    private String title;

    @Lob
    private String contents;

    @Setter
    @Builder.Default
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Hashtag> hashtags = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id")
    private Admin admin;

    @Builder.Default
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comments> comments = new ArrayList<>();

    public static Post createPost(Admin admin, PostRequest postRequest) {
        return Post.builder()
                .title(postRequest.title())
                .contents(postRequest.contents())
                .admin(admin)
                .build();
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
                    .collect(Collectors.toMap(Hashtag::getContent, hashtag -> hashtag));
            for (HashtagEditRequest requestEditHashtag : postEditRequest.hashtags()) {
                Hashtag postHashtag = hashtagMap.get(requestEditHashtag.content());
                if (postHashtag != null) {
                    continue;
                }
                postHashtag = Hashtag.createHashtag(new HashtagRequest(requestEditHashtag.content()));
                postHashtag.setPost(this);
                this.hashtags.add(postHashtag);
            }
        }
        return this;
    }
}
