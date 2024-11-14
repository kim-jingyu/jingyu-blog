package blog.jingyu.admin.repository;

import blog.jingyu.admin.domain.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AdminRepository extends MongoRepository<Admin, String> {
    Boolean existsByLoginId(String loginId);
    Optional<Admin> findByLoginId(String loginId);
}
