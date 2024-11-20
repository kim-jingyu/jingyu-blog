import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { privateApi } from '../../apis/axiosInstance';
import { PostContainer, Title, DateInfo, HashtagList, HashtagItem } from './PostDetail.style';
import { StyledMDEditor } from './Post.style';

const extractHeadings = (markdown) => {
    const headings = [];
    const regex = /^(#{1,6})\s*(.*)/gm;
    let match;
  
    while ((match = regex.exec(markdown)) !== null) {
      const level = match[1].length;
      const text = match[2];
      const id = text.toLowerCase().replace(/\s+/g, '-');
      headings.push({ text, level, id });
    }
  
    return headings;
  };

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [headings, setHeadings] = useState([]);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await privateApi.get(`/post/${postId}`);
                setPost(response.data);
                setLoading(false);
                const extractedHeadings = extractHeadings(response.data.content);
                setHeadings(extractedHeadings);
            } catch (err) {
                setError('글을 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };
        fetchPostDetail();
    }, [postId]);

    if (loading) return <h4>Loading...</h4>;
    if (error) return <p>{error}</p>;

    const handleClick = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div style={{ display: 'flex', position: 'relative' }}>
            {/* PostContainer와 콘텐츠 */}
            <PostContainer style={{ flex: 1 }}>
                <div>
                    <Title>{post.title}</Title>
                    <DateInfo>{new Date(post.date).toLocaleString('ko-KR')}</DateInfo>
                    <StyledMDEditor.Markdown source={post.content} />
                </div>
                <HashtagList>
                    {post.hashtags.map((hashtag, index) => (
                        <HashtagItem key={index}>#{hashtag.content}</HashtagItem>
                    ))}
                </HashtagList>
            </PostContainer>

            {/* 네비게이션 바 */}
            <nav style={{
                position: 'sticky',
                top: '50px',
                right: '20px',
                width: '250px',
                maxHeight: '20vh',
                overflowY: 'auto',
                padding: '10px',
                backgroundColor: 'white',
                marginLeft: '10px'
            }}>
                <ul style={{ listStyle: 'none', paddingLeft: '0px' }}>
                    {headings.map((heading, index) => (
                        <li
                            key={index}
                            style={{
                                marginLeft: `${(heading.level - 1) * 10}px`,
                                cursor: 'pointer',
                                marginBottom: '8px',
                            }}
                            onClick={() => handleClick(heading.id)}
                        >
                            {heading.text}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default PostDetail;