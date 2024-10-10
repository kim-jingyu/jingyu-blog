package blog.jingyu.login.domain.userinfo;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class GoogleUserInfo implements OauthUserInfo{
    @JsonProperty("sub")
    private String socialLoginId;
    @JsonProperty("name")
    private String name;
    @JsonProperty("picture")
    private String picture;

    @Override
    public String getSocialLoginId() {
        return socialLoginId;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public String getProfileImg() {
        return picture;
    }
}
