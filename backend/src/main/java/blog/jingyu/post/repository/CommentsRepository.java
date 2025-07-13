package blog.jingyu.post.repository;

import blog.jingyu.post.domain.Comments;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CommentsRepository extends MongoRepository<Comments, String> {
    Optional<Comments> findByCommentIdAndMember_MemberId(String commentId, String memberId);
}
