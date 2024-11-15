package blog.jingyu.post.repository;

import blog.jingyu.post.domain.Post;
import blog.jingyu.post.exception.PostNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostRepository extends MongoRepository<Post, String> {
    Page<Post> findAll(Pageable pageable);

    default Post getById(String postId) {
        return findById(postId).orElseThrow(PostNotFoundException::new);
    }
}
