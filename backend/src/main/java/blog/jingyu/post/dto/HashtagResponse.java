package blog.jingyu.post.dto;

import blog.jingyu.post.domain.Hashtag;

public record HashtagResponse(Long hashtagId, String content) {
    public HashtagResponse(Hashtag hashtag) {
        this(hashtag.getHashtagId(), hashtag.getContent());
    }
}
