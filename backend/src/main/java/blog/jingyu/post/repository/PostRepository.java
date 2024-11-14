package blog.jingyu.post.repository;

import blog.jingyu.post.domain.Post;
import blog.jingyu.post.dto.PostResponse;
import blog.jingyu.post.exception.PostNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface PostRepository extends MongoRepository<Post, String> {
    @Query("SELECT p FROM Post p LEFT JOIN FETCH p.hashtags")
    Page<PostResponse> findAllPost(Pageable pageable);

    default Post getById(String postId) {
        return findById(postId).orElseThrow(PostNotFoundException::new);
    }
}
