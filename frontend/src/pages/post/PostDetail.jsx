import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { privateApi } from '../../apis/axiosInstance';
import { PostContainer, Title, DateInfo, HashtagList, HashtagItem, StyledMarkdown } from './PostDetail.style';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoils/theme';

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
    const theme = useRecoilValue(themeState);

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

    const backgroundColor = theme === 'dark' ? '#292929' : '#fff';
    const textColor = theme === 'dark' ? '#fff' : '#000';

    return (
        <div style={{ display: 'flex', position: 'relative' }}>
            <PostContainer style={{ flex: 1 }}>
                <div>
                    <Title>{post.title}</Title>
                    <DateInfo>{new Date(post.date).toLocaleString('ko-KR')}</DateInfo>
                    <StyledMarkdown source={post.content} backgroundColor={backgroundColor} textColor={textColor} />
                </div>
                <HashtagList>
                    {post.hashtags.map((hashtag, index) => (
                        <HashtagItem key={index}>#{hashtag.content}</HashtagItem>
                    ))}
                </HashtagList>
            </PostContainer>

            <nav style={{
                position: 'sticky',
                top: '50px',
                right: '20px',
                width: '250px',
                maxHeight: '20vh',
                overflowY: 'auto',
                padding: '10px',
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