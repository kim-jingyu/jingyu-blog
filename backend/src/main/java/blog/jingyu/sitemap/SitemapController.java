package blog.jingyu.sitemap;

import blog.jingyu.post.domain.Post;
import blog.jingyu.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class SitemapController {
    private final PostService postService;

    @GetMapping(value = "/sitemap.xml", produces = MediaType.APPLICATION_XML_VALUE)
    public ResponseEntity<String> getSitemap() {
        List<Post> posts = postService.getPosts();

        ZoneId seoulZone = ZoneId.of("Asia/Seoul");
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE;

        StringBuilder sb = new StringBuilder();
        sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        sb.append("<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");

        for (Post post : posts) {
            Instant modifiedAt = post.getModifiedAt();
            String formattedDate = formatter.format(ZonedDateTime.ofInstant(modifiedAt, seoulZone));

            sb.append("  <url>\n");
            sb.append("    <loc>https://www.jingyulog.store/post/").append(post.getPostId()).append("</loc>\n");
            sb.append("    <lastmod>").append(formattedDate).append("</lastmod>\n");
            sb.append("    <changefreq>weekly</changefreq>\n");
            sb.append("    <priority>0.8</priority>\n");
            sb.append("  </url>\n");
        }

        sb.append("</urlset>\n");
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_XML)
                .body(sb.toString());
    }
}
