import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostContainer, InputField, Button, HashtagInput, HashtagList, HashtagItem } from './Post.style';
import { privateApi } from '../../apis/axiosInstance';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const Post = () => {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');  // Markdown content
    const [hashtags, setHashtags] = useState([]);
    const [hashtag, setHashtag] = useState('');
    const navigate = useNavigate();

    const handleFileUpload = async (file) => {
        const partSize = 5 * 1024 * 1024;
        const totalParts = Math.ceil(file.size / partSize);
        let uploadId = null;
        const objectKey = `post/${crypto.randomUUID()}_${file.name}`;

        try {
            const initResponse = await privateApi.post('/post/initiate-upload', 
                {
                    originalFileName: file.name,
                    fileType: file.type,
                    fileSize: file.size
                }
            );
            uploadId = initResponse.data.uploadId;

            console.log('uploadId: ', uploadId);

            const parts = [];

            for (let partNum = 1; partNum <= totalParts; partNum++) {
                const start = (partNum - 1) * partSize;
                const end = Math.min(partNum * partSize, file.size);
                const filePart = file.slice(start, end);

                const presignedUrlResponse = await privateApi.post('/post/presigned-url',
                    {
                        objectKey: objectKey,
                        uploadId,
                        partNum
                    }
                );

                console.log('Presigned URL:', presignedUrlResponse.data);

                const uploadResponse = await fetch(presignedUrlResponse.data, 
                    {
                        method: 'PUT',
                        headers: { 'Content-Type': file.type },
                        body: filePart
                    }
                );
                
                if (!uploadResponse.ok) {
                    throw new Error(`파일 ${partNum} 업로드 실패`);
                }

                const eTag = uploadResponse.headers.get('ETag');
                parts.push({ partNum, eTag });
            }

            const completeResponse = await privateApi.post('/post/complete-upload',
                {
                    objectKey: objectKey,
                    uploadId,
                    parts
                }
            )

            const imageUrl = `https://jingyulog.s3.amazonaws.com/${completeResponse.data.objectKey}`;
            return imageUrl;
        } catch (error) {
            console.log('이미지 업로드 에러: ', error);

            if (uploadId) {
                try {
                    await privateApi.post('/post/abort-upload', {
                        objectKey: objectKey,
                        uploadId
                     });
                } catch (error) {
                    console.error('업로드 취소 실패: ', error);
                }
            }

            return null;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hashtagObjects = hashtags.map(tag => ({ content: tag }));

        try {
            const response = await privateApi.post('/post', {
                title,
                contents,  // Markdown 내용 전송
                hashtags: hashtagObjects
            });
            if (response.status === 201) {
                navigate('/');  // 게시글 작성 후 홈으로 이동
            }
        } catch (error) {
            console.error('글 작성 에러:', error);
        }
    };

    const handleAddHashtag = (e) => {
        if (e.key === 'Enter' && hashtag.trim()) {
            setHashtags([...hashtags, hashtag.trim()]);
            setHashtag('');  // 입력창 초기화
        }
    };

    const handleRemoveHashtag = (tagToRemove) => {
        setHashtags(hashtags.filter(tag => tag !== tagToRemove));
    };

    return (
        <PostContainer>
            <form onSubmit={handleSubmit}>
                <InputField 
                    placeholder="제목을 입력하세요" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                {/* 마크다운 에디터 */}
                <MarkdownEditor
                    style={{ height: '400px' }}
                    value={contents}
                    onChange={({ text }) => setContents(text)}
                    onImageUpload={handleFileUpload}
                />
                <HashtagInput 
                    placeholder="해시태그를 입력하고 Enter를 누르세요" 
                    value={hashtag} 
                    onChange={(e) => setHashtag(e.target.value)} 
                    onKeyDown={handleAddHashtag} 
                />
                <HashtagList>
                    {hashtags.map((tag, index) => (
                        <HashtagItem key={index} onClick={() => handleRemoveHashtag(tag)}>
                            #{tag}
                        </HashtagItem>
                    ))}
                </HashtagList>
                <Button type="submit">글 작성</Button>
            </form>
        </PostContainer>
    );
};

export default Post;