package blog.jingyu.post.service;

import blog.jingyu.admin.domain.Admin;
import blog.jingyu.admin.repository.AdminRepository;
import blog.jingyu.member.exception.MemberNotFoundException;
import blog.jingyu.post.domain.Post;
import blog.jingyu.post.dto.PostDetailResponse;
import blog.jingyu.post.dto.PostEditRequest;
import blog.jingyu.post.dto.PostRequest;
import blog.jingyu.post.dto.PostResponse;
import blog.jingyu.post.exception.PostNotFoundException;
import blog.jingyu.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final AdminRepository adminRepository;

    public Page<PostResponse> getPosts(int page) {
        return postRepository.findAllPost(PageRequest.of(page, 5, Sort.Direction.ASC, "postId"));
    }

    public PostDetailResponse getPostDetail(String postId) {
        return new PostDetailResponse(postRepository.findById(postId)
                .orElseThrow(PostNotFoundException::new));
    }

    @Transactional
    public String makePost(String adminId, PostRequest postRequest) {
        Admin admin = adminRepository.findById(adminId).orElseThrow(MemberNotFoundException::new);
        System.out.println("postRequest.contents() = " + postRequest.contents());
        return postRepository.save(Post.createPost(admin, postRequest)).getPostId();
    }

    @Transactional
    public PostResponse editPost(String postId, PostEditRequest postEditRequest) {
        return new PostResponse(postRepository.getById(postId).editPost(postEditRequest));
    }
}
