package blog.jingyu.post.controller;

import blog.jingyu.admin.domain.AdminCheck;
import blog.jingyu.admin.domain.AdminOnly;
import blog.jingyu.login.domain.auth.Accessor;
import blog.jingyu.post.dto.PostDetailResponse;
import blog.jingyu.post.dto.PostEditRequest;
import blog.jingyu.post.dto.PostRequest;
import blog.jingyu.post.dto.PostResponse;
import blog.jingyu.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/post")
public class PostController {
    private final PostService postService;

    @GetMapping
    public ResponseEntity<Page<PostResponse>> getPosts(@RequestParam(value = "page", defaultValue = "0", required = false) int page) {
        Page<PostResponse> posts = postService.getPosts(page);
        return ResponseEntity.ok()
                .body(posts);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<PostDetailResponse> getPostDetail(@PathVariable("id") String id) {
        return ResponseEntity.ok()
                .body(postService.getPostDetail(id));
    }

    @AdminOnly
    @PostMapping
    public ResponseEntity<String> makePost(@AdminCheck Accessor accessor, @RequestBody PostRequest postRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(postService.makePost(accessor.getMemberId(), postRequest));
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<PostResponse> editPost(@PathVariable("id") String id, @RequestBody PostEditRequest postEditRequest) {
        return ResponseEntity.ok()
                .body(postService.editPost(id, postEditRequest));
    }
}
