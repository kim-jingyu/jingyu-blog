package blog.jingyu.login.repository;

import blog.jingyu.login.domain.token.RefreshToken;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
}
