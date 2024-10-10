package blog.jingyu.member.repository;

import blog.jingyu.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByName(String name);
    Optional<Member> findBySocialLoginId(String socialLoginId);
}
