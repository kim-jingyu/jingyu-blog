package blog.jingyu.member.repository;

import blog.jingyu.member.domain.Member;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MemberRepository extends MongoRepository<Member, String> {
    boolean existsByName(String name);
    Optional<Member> findBySocialLoginId(String socialLoginId);
}
