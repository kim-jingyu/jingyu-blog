package blog.jingyu.post.controller;

import blog.jingyu.admin.domain.AdminCheck;
import blog.jingyu.admin.domain.AdminOnly;
import blog.jingyu.login.domain.auth.Accessor;
import blog.jingyu.member.domain.MemberCheck;
import blog.jingyu.member.domain.MemberOnly;
import blog.jingyu.post.dto.*;
import blog.jingyu.post.service.PostService;
import com.amazonaws.services.s3.model.CompleteMultipartUploadResult;
import com.amazonaws.services.s3.model.InitiateMultipartUploadResult;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.net.URL;
import java.util.List;

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

    @PostMapping("/initiate-upload")
    public ResponseEntity<InitiateMultipartUploadResult> initiateUpload(@RequestBody PreSignedUploadInitiateRequest request) {
        return ResponseEntity.ok(postService.initiateMultipartUpload(request));
    }

    @PostMapping("/presigned-url")
    public ResponseEntity<URL> generatePresignedUrl(@Validated @RequestBody PreSignedUrlCreateRequest request) {
        return ResponseEntity.ok(postService.generatePresignedUrl(request));
    }

    @PostMapping("/complete-upload")
    public ResponseEntity<CompleteMultipartUploadResult> completeUpload(@RequestBody CompleteUploadRequest request) {
        return ResponseEntity.ok(postService.completeMultipartUpload(request));
    }

    @PostMapping("/abort-upload")
    public void abortMultipartUpload(@RequestBody PreSignedUrlAbortRequest request) {
        postService.abortMultipartUpload(request);
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<PostResponse> editPost(@PathVariable("id") String id, @RequestBody PostEditRequest postEditRequest) {
        return ResponseEntity.ok()
                .body(postService.editPost(id, postEditRequest));
    }

    @GetMapping(value = "/search")
    public ResponseEntity<List<PostResponse>> searchPost(@RequestParam String keyword) {
        return ResponseEntity.ok()
                .body(postService.searchPosts(keyword));
    }

    @MemberOnly
    @PostMapping(value = "/{id}/comments")
    public ResponseEntity<String> makeComment(@MemberCheck Accessor accessor, @PathVariable("id") String id, @RequestBody CommentRequest commentRequest) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(postService.makeComment(accessor.getMemberId(), commentRequest, id));
    }
}
