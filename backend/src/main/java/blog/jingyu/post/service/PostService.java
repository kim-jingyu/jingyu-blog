package blog.jingyu.post.service;

import blog.jingyu.post.domain.Post;
import blog.jingyu.post.dto.PostRequest;
import blog.jingyu.post.dto.PostResponse;
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

    public Page<PostResponse> getPosts(int page) {
        return postRepository.findAllPost(PageRequest.of(page, 5, Sort.Direction.ASC, "postId"));
    }

    @Transactional
    public Long makePost(PostRequest postRequest) {
        return postRepository.save(Post.createPost(postRequest)).getPostId();
    }

    @Transactional
    public PostResponse editPost(Long postId, PostRequest postRequest) {
        return new PostResponse(postRepository.getById(postId).editPost(postRequest));
    }
}
