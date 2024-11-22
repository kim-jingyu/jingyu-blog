package blog.jingyu.post.repository;

import blog.jingyu.post.domain.Comments;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentsRepository extends MongoRepository<Comments, String> {
}
