import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostContainer, InputField, Button, HashtagInput, HashtagList, HashtagItem, StyledMDEditor } from './Post.style';
import { privateApi } from '../../apis/axiosInstance';
import MDEditor, { commands } from '@uiw/react-md-editor';

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

    const uploadImageCommand = {
        name: "imageUpload",
        keyCommand: "imageUpload",
        buttonProps: { "aria-label": "이미지 업로드" },
        icon: (
          <span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 1024 1024"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zM512 896c-212.1 0-384-171.9-384-384S299.9 128 512 128 896 299.9 896 512 724.1 896 512 896zM672 416c0-88.4-71.6-160-160-160s-160 71.6-160 160 71.6 160 160 160 160-71.6 160-160z"
                fill="currentColor"
              />
            </svg>
          </span>
        ),
        execute: async (state, api) => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = async (e) => {
            const file = e.target.files[0];
            if (file) {
              const imageUrl = await handleFileUpload(file);
              if (imageUrl) {
                api.replaceSelection(`![Image](${imageUrl})\n`);
              } else {
                alert("이미지 업로드 실패");
              }
            }
          };
          input.click();
        },
      };

    const handleSubmit = async (e) => {
        if (e.key !== 'Enter') {
            e.preventDefault();

            const hashtagObjects = hashtags.map(tag => ({ content: tag }));

            try {
                const response = await privateApi.post('/post', {
                    title,
                    contents,
                    hashtags: hashtagObjects
                });
                if (response.status === 201) {
                    navigate('/');
                }
            } catch (error) {
                console.error('글 작성 에러:', error);
            }
        }
    };

    const handleAddHashtag = (e) => {
        if (e.key === ' ' && hashtag.trim()) {
            if (!hashtags.includes(hashtag.trim())) {
                setHashtags((prevHashtags) => [...prevHashtags, hashtag.trim()]);
            }
            setHashtag('');
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
                <StyledMDEditor
                    value={contents}
                    onChange={setContents}
                    theme="dark"
                    commands={[...commands.getCommands(), uploadImageCommand]}
                    onDrop={async (e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files[0];
                
                        if (file && file.type.startsWith('image/')) {
                            const imageUrl = await handleFileUpload(file);
                            if (imageUrl) {
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
                    placeholder="해시태그를 입력하고 Space를 누르세요" 
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