package blog.jingyu.global.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
public class S3Config {
    @Value("${aws.s3.credentials.accessKey}")
    private String accessKey;
    @Value("${aws.s3.credentials.secretKey}")
    private String secretKey;
    @Value("${aws.s3.bucket}")
    private String bucket;

    @Bean
    public AmazonS3 amazonS3Client() {
        return AmazonS3ClientBuilder.standard()
                .withCredentials(
                        new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey))
                )
                .withRegion(Regions.AP_NORTHEAST_2)
                .build();
    }
}