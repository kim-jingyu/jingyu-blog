import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { privateApi } from '../../apis/axiosInstance';
import { PostContainer, Title, DateInfo, HashtagList, HashtagItem } from './PostDetail.style';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';  // GFM(Github Flavored Markdown) 플러그인

const PostDetail = () => {
    const { postId } = useParams();  // URL 파라미터에서 postId 가져오기
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const response = await privateApi.get(`/post/${postId}`);
                setPost(response.data);
                setLoading(false);
            } catch (err) {
                setError('글을 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };
        fetchPostDetail();
    }, [postId]);

    if (loading) return <h4>Loading...</h4>;
    if (error) return <p>{error}</p>;

    return (
        <PostContainer>
            <Title>{post.title}</Title>
            <DateInfo>{new Date(post.date).toLocaleString('ko-KR')}</DateInfo>
            {/* Markdown 렌더링 */}
            <ReactMarkdown components={{img: ({ src, alt }) => <img src={src} alt={alt} style={{ maxWidth: '100%' }} />}}>{post.content}</ReactMarkdown>
            <HashtagList>
                {post.hashtags.map((hashtag, index) => (
                    <HashtagItem key={index}>#{hashtag.content}</HashtagItem>
                ))}
            </HashtagList>
        </PostContainer>
    );
};

export default PostDetail;