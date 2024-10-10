package blog.jingyu.member.domain;

import blog.jingyu.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static lombok.AccessLevel.PROTECTED;

@Entity
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "member_seq_gen")
    @SequenceGenerator(name = "member_seq_gen", sequenceName = "member_seq", allocationSize = 1)
    private Long memberId;
    private String socialLoginId;
    private String name;
    private String profileImg;

    public static Member createMember(String socialLoginId, String nickname, String profileImg) {
        return Member.builder()
                .socialLoginId(socialLoginId)
                .name(nickname)
                .profileImg(profileImg)
                .build();
    }
}
