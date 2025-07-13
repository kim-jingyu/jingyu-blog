package blog.jingyu.post.repository;

import blog.jingyu.post.domain.Hashtag;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface HashtagRepository extends MongoRepository<Hashtag, String> {
}
