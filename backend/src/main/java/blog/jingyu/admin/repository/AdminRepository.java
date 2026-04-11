package blog.jingyu.admin.repository;

import blog.jingyu.admin.domain.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Boolean existsByLoginId(String loginId);
    Optional<Admin> findByLoginId(String loginId);
}
