package blog.jingyu.post.repository;

import blog.jingyu.post.domain.Post;
import blog.jingyu.post.exception.PostNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends MongoRepository<Post, String> {
    Page<Post> findAll(Pageable pageable);
    Optional<Post> findByPostIdAndAdmin_AdminId(String postId, String adminId);
    List<Post> findByTitleContainingOrContentsContaining(String titleKeyword, String contentsKeyword);
    default Post getById(String postId) {
        return findById(postId).orElseThrow(PostNotFoundException::new);
    }
}
