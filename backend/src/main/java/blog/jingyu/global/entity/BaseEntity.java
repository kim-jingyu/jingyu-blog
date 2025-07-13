package blog.jingyu.global.entity;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Document
@Getter
public abstract class BaseEntity {
    @CreatedDate
    private Instant createdAt;
    @LastModifiedDate
    private Instant modifiedAt;
}
