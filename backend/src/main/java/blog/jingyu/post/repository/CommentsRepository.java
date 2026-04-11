package blog.jingyu.post.repository;

import blog.jingyu.post.domain.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommentsRepository extends JpaRepository<Comments, Long> {
    Optional<Comments> findByCommentIdAndMember_MemberId(Long commentId, Long memberId);
}
