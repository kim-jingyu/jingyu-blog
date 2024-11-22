package blog.jingyu.post.service;

import blog.jingyu.admin.domain.Admin;
import blog.jingyu.admin.repository.AdminRepository;
import blog.jingyu.global.config.S3Config;
import blog.jingyu.member.exception.MemberNotFoundException;
import blog.jingyu.post.domain.Post;
import blog.jingyu.post.dto.*;
import blog.jingyu.post.exception.PostNotFoundException;
import blog.jingyu.post.repository.PostRepository;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.net.URL;
import java.util.Date;
import java.util.List;

import static com.amazonaws.HttpMethod.PUT;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PostService {
    public static final String POST = "post";
    private final PostRepository postRepository;
    private final AdminRepository adminRepository;
    private final S3Config s3Config;

    public Page<PostResponse> getPosts(int page) {
        Page<Post> allPost = postRepository.findAll(PageRequest.of(page, 5, Sort.Direction.ASC, "postId"));
        return allPost.map(PostResponse::new);
    }

    public PostDetailResponse getPostDetail(String postId) {
        return new PostDetailResponse(postRepository.findById(postId)
                .orElseThrow(PostNotFoundException::new));
    }

    @Transactional
    public String makePost(String adminId, PostRequest postRequest) {
        Admin admin = adminRepository.findById(adminId).orElseThrow(MemberNotFoundException::new);
        return postRepository.save(Post.createPost(admin, postRequest)).getPostId();
    }

    @Transactional
    public PostResponse editPost(String postId, PostEditRequest postEditRequest) {
        return new PostResponse(postRepository.getById(postId).editPost(postEditRequest));
    }

    public InitiateMultipartUploadResult initiateMultipartUpload(PreSignedUploadInitiateRequest request) {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(request.fileSize());
        objectMetadata.setContentType(request.fileType());

        return s3Config.amazonS3Client().initiateMultipartUpload(new InitiateMultipartUploadRequest(
                s3Config.getBucket(),
                request.objectName(),
                objectMetadata
        ));
    }


    public URL generatePresignedUrl(PreSignedUrlCreateRequest request) {
        GeneratePresignedUrlRequest presignedUrlRequest = new GeneratePresignedUrlRequest(s3Config.getBucket(), request.objectName())
                .withMethod(PUT)
                .withExpiration(new Date(System.currentTimeMillis() + 10 * 60 * 1000));

        presignedUrlRequest.addRequestParameter("uploadId", request.uploadId());
        presignedUrlRequest.addRequestParameter("partNumber", String.valueOf(request.partNum()));

        return s3Config.amazonS3Client().generatePresignedUrl(presignedUrlRequest);
    }


    public CompleteMultipartUploadResult completeMultipartUpload(CompleteUploadRequest request) {
        List<PartETag> partETags = request.parts()
                .stream()
                .map(part -> new PartETag(part.partNum(), part.eTag()))
                .toList();

        return s3Config.amazonS3Client().completeMultipartUpload(new CompleteMultipartUploadRequest(
                s3Config.getBucket(),
                request.objectName(),
                request.uploadId(),
                partETags
        ));
    }


    public void abortMultipartUpload(PreSignedUrlAbortRequest request) {
        s3Config.amazonS3Client().abortMultipartUpload(new AbortMultipartUploadRequest(
                s3Config.getBucket(),
                request.objectKey(),
                request.uploadId()
        ));
    }

    public List<PostResponse> searchPosts(String keyword) {
        List<Post> postList = postRepository.findByTitleContainingOrContentsContaining(keyword, keyword);
        return postList.stream()
                .map(PostResponse::new)
                .toList();
    }
}
