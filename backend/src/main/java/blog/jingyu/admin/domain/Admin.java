package blog.jingyu.admin.domain;

import blog.jingyu.global.entity.BaseEntity;
import blog.jingyu.post.domain.Post;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "admin")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
public class Admin extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Long adminId;

    @Column(name = "login_id")
    private String loginId;

    @Column(name = "password")
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
