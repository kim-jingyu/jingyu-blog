package blog.jingyu.member.domain;

import blog.jingyu.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Entity
@Table(name = "member")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    @Column(name = "social_login_id")
    private String socialLoginId;

    @Column(name = "name")
    private String name;

    @Column(name = "profile_img")
    private String profileImg;

    public static Member createMember(String socialLoginId, String name, String profileImg) {
        return Member.builder()
                .socialLoginId(socialLoginId)
                .name(name)
                .profileImg(profileImg)
                .build();
    }
}
