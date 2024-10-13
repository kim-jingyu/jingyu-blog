package blog.jingyu.admin.infra;

public interface PasswordEncoder {
    String encode(String password);
    Boolean match(String rawPassword, String encodedPassword);
}
