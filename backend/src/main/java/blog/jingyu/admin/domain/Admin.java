package blog.jingyu.admin.domain;

import blog.jingyu.global.entity.BaseEntity;
import blog.jingyu.post.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Document(collection = "admin")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
public class Admin extends BaseEntity {
    @Id
    private String adminId;

    private String loginId;
    private String password;

    private List<Post> post;

    @Builder
    public Admin(String loginId, String password) {
        this(null, loginId, password, null);
    }

    public static Admin createAdmin(String loginId, String password) {
        return Admin.builder()
                .loginId(loginId)
                .password(password)
                .build();
    }

    public void updatePassword(String password) {
        this.password = password;
    }
}
