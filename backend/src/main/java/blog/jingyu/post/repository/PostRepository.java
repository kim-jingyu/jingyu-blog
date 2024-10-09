package blog.jingyu.post.repository;

import blog.jingyu.post.domain.Post;
import blog.jingyu.post.dto.PostResponse;
import blog.jingyu.post.exception.PostNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("SELECT p FROM Post p JOIN FETCH p.hashtags")
    Page<PostResponse> findAllPost(Pageable pageable);

    default Post getById(Long postId) {
        return findById(postId).orElseThrow(PostNotFoundException::new);
    }
}
