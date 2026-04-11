package blog.jingyu.post.repository;

import blog.jingyu.post.domain.Post;
import blog.jingyu.post.exception.PostNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    Page<Post> findAll(Pageable pageable);
    Optional<Post> findByPostIdAndAdmin_AdminId(Long postId, Long adminId);
    List<Post> findByTitleContainingOrContentsContaining(String titleKeyword, String contentsKeyword);
    default Post getById(Long postId) {
        return findById(postId).orElseThrow(PostNotFoundException::new);
    }
}
