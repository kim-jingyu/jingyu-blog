package blog.jingyu.post.service;

import blog.jingyu.admin.domain.Admin;
import blog.jingyu.admin.dto.AdminRequest;
import blog.jingyu.admin.service.AdminService;
import blog.jingyu.post.domain.Post;
import blog.jingyu.post.dto.*;
import blog.jingyu.post.repository.PostRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

@Disabled
@SpringBootTest
@Transactional
class PostServiceTest {
    @Autowired
    private PostService postService;
    @Autowired
    private AdminService adminService;
    @Autowired
    private PostRepository postRepository;

    @DisplayName("글 작성")
    @Test
    public void writeTest () throws Exception {
        // given
        Long adminId = adminService.createAdmin(new AdminRequest("tester", "test123"));
        PostRequest postRequest = new PostRequest("타이틀", "내용", List.of(new HashtagRequest("해시태그1"), new HashtagRequest("해시태그2")));

        // when
        postService.makePost(adminId, postRequest);

        // then
        Assertions.assertEquals(1, postRepository.count());

        Post post = postRepository.findAll().get(0);
        assertThat(post.getTitle()).isEqualTo("타이틀");
        assertThat(post.getContents()).isEqualTo("내용");
    }

    @DisplayName("글 목록 조회")
    @Test
    public void getPostsTest () throws Exception {
        // given
        List<Post> givenPosts = IntStream.range(1, 11)
                .mapToObj(i -> Post.createPost(
                                    Admin.createAdmin("tester", "test123")
                                    ,new PostRequest("타이틀" + i, "내용" + i, IntStream.range(1, 3)
                                        .mapToObj(j -> new HashtagRequest("해시태그" + j))
                                        .toList())
                        )
                )
                .toList();
        postRepository.saveAll(givenPosts);

        // when
        Page<PostResponse> foundPosts = postService.getPosts(0);

        // then
        assertThat(foundPosts.getSize()).isEqualTo(5);
        assertThat(foundPosts.getContent().get(0).title()).isEqualTo("타이틀1");
        assertThat(foundPosts.getContent().get(0).content()).isEqualTo("내용1");
        assertThat(foundPosts.getContent().get(0).content()).isEqualTo("내용1");
        assertThat(foundPosts.getContent().get(1).title()).isEqualTo("타이틀2");
        assertThat(foundPosts.getContent().get(1).content()).isEqualTo("내용2");
    }

    @DisplayName("글 상세 조회")
    @Test
    public void getPostDetail() throws Exception {
        // given
        Post post = Post.createPost(
                Admin.createAdmin("tester", "test123")
                , new PostRequest("타이틀", "내용", IntStream.range(1, 3)
                        .mapToObj(j -> new HashtagRequest("해시태그" + j))
                        .toList())
        );
        postRepository.save(post);

        // when
        PostDetailResponse postDetail = postService.getPostDetail(post.getPostId());
        System.out.println("postDetail = " + postDetail);

        // then
        assertThat(postDetail.title()).isEqualTo("타이틀");
        assertThat(postDetail.content()).isEqualTo("내용");
        assertThat(postDetail.hashtags().size()).isEqualTo(2);
        assertThat(postDetail.hashtags().get(1).content()).isEqualTo("해시태그2");
    }

    @DisplayName("글 내용 수정")
    @Test
    public void editPost() throws Exception {
        // given
        Post post = Post.createPost(
                Admin.createAdmin("tester", "test123")
                , new PostRequest("타이틀", "내용", IntStream.range(1, 3)
                        .mapToObj(j -> new HashtagRequest("해시태그" + j))
                        .toList())
        );
        postRepository.save(post);

        // when
        PostResponse postResponse = postService.editPost(post.getPostId(), new PostEditRequest("변경된 타이틀", "변경된 내용", List.of(new HashtagEditRequest(post.getHashtags().get(0).getHashtagId(), "변경된 해시태그1"))));

        // then
        assertThat(postResponse.title()).isEqualTo("변경된 타이틀");
        assertThat(postResponse.content()).isEqualTo("변경된 내용");
        assertThat(postResponse.hashtags().size()).isEqualTo(2);
        assertThat(postResponse.hashtags().get(0).content()).isEqualTo("변경된 해시태그1");
    }

}