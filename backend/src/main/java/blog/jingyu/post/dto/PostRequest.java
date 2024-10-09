package blog.jingyu.post.dto;

import blog.jingyu.post.domain.Hashtag;

import java.util.List;

public record PostRequest(String title, String contents, List<Hashtag> hashtags) {
}
