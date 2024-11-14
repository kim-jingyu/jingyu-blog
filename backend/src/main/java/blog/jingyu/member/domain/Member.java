package blog.jingyu.member.domain;

import blog.jingyu.global.entity.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import static lombok.AccessLevel.PROTECTED;

@Document(collection = "member")
@NoArgsConstructor(access = PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Member extends BaseEntity {
    @Id
    private String memberId;
    private String socialLoginId;
    private String name;
    private String profileImg;

    public static Member createMember(String socialLoginId, String name, String profileImg) {
        return Member.builder()
                .socialLoginId(socialLoginId)
                .name(name)
                .profileImg(profileImg)
                .build();
    }
}
