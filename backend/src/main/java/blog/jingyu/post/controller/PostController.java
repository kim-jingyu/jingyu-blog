package blog.jingyu.post.controller;

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
@RequestMapping(value = "/posts")
public class PostController {
    private final PostService postService;

    @GetMapping
    public ResponseEntity<Page<PostResponse>> getPosts(@RequestParam(value = "page", defaultValue = "0", required = false) int page) {
        return ResponseEntity.ok()
                .body(postService.getPosts(page));
    }

    @PostMapping
    public ResponseEntity<Long> makePost(@RequestBody PostRequest postRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(postService.makePost(postRequest));
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<PostResponse> editPost(@PathVariable("id") Long id, @RequestBody PostRequest postRequest) {
        return ResponseEntity.ok()
                .body(postService.editPost(id, postRequest));
    }
}
