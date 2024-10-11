package blog.jingyu.admin.domain;

import blog.jingyu.global.entity.BaseEntity;
import blog.jingyu.post.domain.Post;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

import static jakarta.persistence.GenerationType.*;
import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
public class Admin extends BaseEntity {
    @Id
    @GeneratedValue(strategy = SEQUENCE, generator = "admin_seq_gen")
    @SequenceGenerator(name = "admin_seq_gen", sequenceName = "admin_seq", allocationSize = 1)
    private Long adminId;

    private String loginId;
    private String password;

    @OneToMany(mappedBy = "admin", cascade = CascadeType.ALL, orphanRemoval = true)
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
