import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostContainer, InputField, Button, HashtagInput, HashtagList, HashtagItem } from './Post.style';
import { privateApi } from '../../apis/axiosInstance';
import MDEditor from '@uiw/react-md-editor';

const Post = () => {
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [hashtags, setHashtags] = useState([]);
    const [hashtag, setHashtag] = useState('');
    const navigate = useNavigate();

    const handleFileUpload = async (file) => {
        const partSize = 5 * 1024 * 1024;
        const totalParts = Math.ceil(file.size / partSize);
        let uploadId = null;
        const objectName = `post/${crypto.randomUUID()}_${file.name}`;

        try {
            const initResponse = await privateApi.post('/post/initiate-upload', 
                {
                    objectName: objectName,
                    originalFileName: file.name,
                    fileType: file.type,
                    fileSize: file.size
                }
            );
            uploadId = initResponse.data.uploadId;

            const parts = [];

            for (let partNum = 1; partNum <= totalParts; partNum++) {
                const start = (partNum - 1) * partSize;
                const end = Math.min(partNum * partSize, file.size);
                const filePart = file.slice(start, end);

                const presignedUrlResponse = await privateApi.post('/post/presigned-url',
                    {
                        objectName,
                        uploadId,
                        partNum
                    }
                );

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
                    objectName,
                    uploadId,
                    parts
                }
            )

            return `https://jingyulog.s3.amazonaws.com/${completeResponse.data.key}`;
        } catch (error) {
            console.log('이미지 업로드 에러: ', error);

            if (uploadId) {
                try {
                    await privateApi.post('/post/abort-upload', {
                        objectName,
                        uploadId
                     });
                } catch (error) {
                    console.error('업로드 취소 실패: ', error);
                }
            }

            return null;
        }
    }

    const handlePaste = async (e) => {
        const items = e.clipBoardData.items;
        for (const item in items) {
            if (item.type.indexOf('image') !== -1) {
                const file = item.getAsFile();
                if (file) {
                    const imageUrl = await handleFileUpload(file);
                    if (imageUrl) {
                        setContents((prev) => `${prev}\n![Image](${imageUrl})\n`);
                    }
                }
            }
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
                <MDEditor
                    value={contents}
                    onChange={setContents}
                    onDrop={async (e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0]; // 드래그한 파일 가져오기
                
                        if (file && file.type.startsWith('image/')) {
                            const imageUrl = await handleFileUpload(file); // AWS Multipart Presigned URL 방식 업로드
                            if (imageUrl) {
                                // 성공 시 Markdown에 이미지 삽입
                                setContents((prevContents) => `${prevContents}\n![Image](${imageUrl})\n`);
                            } else {
                                alert('이미지 업로드 실패');
                            }
                        } else {
                            alert('이미지 파일만 업로드할 수 있습니다.');
                        }
                    }}
                    onPaste={handlePaste}
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