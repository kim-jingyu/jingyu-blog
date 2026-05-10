import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { privateApi } from '../../apis/axiosInstance';
import {
    PostContainer,
    Title,
    DateInfo,
    HashtagList,
    HashtagItem,
    StyledMarkdown,
    CommentSection,
    CommentList,
    CommentItem,
    AddCommentButton,
    NavContainer, PostDetailContainer, AdminEditButton
} from './PostDetail.style';
import { useRecoilValue } from 'recoil';
import { themeState } from '../../recoils/Theme';
import CommentModal from '../../components/post/CommentModal';
import {jwtDecode} from "jwt-decode";
import {HttpStatusCode} from "axios";

const slugify = (text) => {
    return text
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-가-힣]/g, ''); // 한글, 영문, 숫자, 하이픈만 허용
};

const extractHeadings = (markdown) => {
    const headings = [];
    const regex = /^(#{1,6})\s*(.*)/gm;
    let match;

    while ((match = regex.exec(markdown)) !== null) {
        const level = match[1].length;
        const text = match[2].trim();
        headings.push({ text, level, id: slugify(text) });
    }
    return headings;
};

const PostDetail = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [headings, setHeadings] = useState([]);
    const [comments, setComments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const theme = useRecoilValue(themeState);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUserRole = () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    setUserRole(decodedToken.role);
                } catch (error) {
                    console.error("Invalid token", error);
                    setUserRole(null);
                }
            }
        }

        checkUserRole()

        const fetchPostDetail = async () => {
            try {
                const response = await privateApi.get(`/post/${postId}`);
                console.log(response);
                setPost(response.data);
                setLoading(false);
                const extractedHeadings = extractHeadings(response.data.content);
                setComments(response.data.comments);
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


    const handleAddComment = async (newComment) => {
        try {
            const response = await privateApi.post(`/post/${postId}/comments`, {
                content: newComment,
            });
            setComments((prev) => [...prev, response.data]);
            setIsModalOpen(false);
        } catch (error) {
            console.error("댓글 작성 실패:", error);
        }
    };

    const handleEditPost = async () => {
        try {
            navigate(`/post/${postId}/edit`);
        } catch (error) {
            console.error('포스트 수정 실패:', error);
            alert('포스트 수정에 실패했습니다.');
        }
    };

    const handleDeletePost = async () => {
        try {
            const response = await privateApi.delete(`/post/${postId}`);
            if (response.status === HttpStatusCode.Ok) {
                alert(`${postId}번 글이 삭제되었습니다.`);
            }
        } catch (e) {
            console.error(`${postId}번 글 삭제 실패. ${e}`);
            alert(`${postId}번 글이 삭제되었습니다.`);
        }
    }

    const MarkdownComponents = {
        h1: ({node, ...props}) => <h1 id={slugify(props?.children?.toString() || '')} {...props} />,
        h2: ({node, ...props}) => <h2 id={slugify(props?.children?.toString() || '')} {...props} />,
        h3: ({node, ...props}) => <h3 id={slugify(props?.children?.toString() || '')} {...props} />,
        h4: ({node, ...props}) => <h4 id={slugify(props?.children?.toString() || '')} {...props} />,
    };

    return (
        <PostDetailContainer>
            <PostContainer style={{ flex: 1 }}>
                <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '10px' }}>
                        <Title>{post.title}</Title>
                        {userRole === 'ADMIN' && (
                            <div>
                                <AdminEditButton onClick={handleEditPost} style={{ marginLeft: '10px' }}>
                                    ️ ✏️
                                </AdminEditButton>
                                <AdminEditButton onClick={handleDeletePost} style={{ marginLeft: '10px' }}>
                                    ️ ❌
                                </AdminEditButton>
                            </div>
                        )}
                    </div>
                    <DateInfo>{new Date(post.date).toLocaleString('ko-KR')}</DateInfo>

                    {headings.length > 0 && (
                        <nav style={{
                            margin: '20px 0 40px 0',
                            padding: '16px 20px',
                            backgroundColor: theme === 'dark' ? '#2d2d2d' : '#f9f9f9',
                            borderRadius: '8px',
                            borderLeft: `4px solid ${theme === 'dark' ? '#444' : '#eee'}`
                        }}>
                            <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#888', marginBottom: '12px' }}>목차</div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {headings.map((heading, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleClick(heading.id)}
                                        style={{
                                            marginLeft: `${(heading.level - 1) * 16}px`,
                                            padding: '4px 0',
                                            fontSize: '14px',
                                            cursor: 'pointer',
                                            color: theme === 'dark' ? '#bbb' : '#555',
                                            transition: 'color 0.2s',
                                            textDecoration: 'underline transparent',
                                            textUnderlineOffset: '4px'
                                        }}
                                        onMouseEnter={(e) => e.target.style.color = theme === 'dark' ? '#fff' : '#000'}
                                        onMouseLeave={(e) => e.target.style.color = theme === 'dark' ? '#bbb' : '#555'}
                                    >
                                        {heading.text}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}

                    <StyledMarkdown source={post.content} components={MarkdownComponents} />
                </div>
                <HashtagList>
                    {post.hashtags.map((hashtag, index) => (
                        <HashtagItem key={index}>#{hashtag.content}</HashtagItem>
                    ))}
                </HashtagList>
                <CommentSection>
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                        <h3 style={{ margin: 0 }}>댓글</h3>
                        {(userRole === 'MEMBER' || userRole === 'ADMIN') && (
                            <AddCommentButton onClick={() => setIsModalOpen(true)} style={{ marginLeft: '10px' }}>
                                ✏️
                            </AddCommentButton>
                        )}
                    </div>
                    <CommentList>
                        {comments.map((comment) => (
                            <CommentItem key={comment.commentId}>
                                <p>
                                    <span style={{ fontSize: '15px' }}>{comment.memberName}</span>
                                    <span style={{ marginLeft: '10px', color: '#888', fontSize: '12px' }}>
                                        . {new Date(comment.date).toLocaleString('ko-KR')}
                                    </span>
                                </p>
                                <p style={{ marginTop: '10px' }}>{comment.content}</p>
                                {(userRole === 'ADMIN' || userRole === 'MEMBER') && (
                                    <button
                                        onClick={async () => {
                                            try {
                                                const url = userRole === 'ADMIN'
                                                    ? `/post/${postId}/comments/${comment.commentId}/by-admin`
                                                    : `/post/${postId}/comments/${comment.commentId}/by-member`;
                                                await privateApi.delete(url);
                                                setComments((prev) => prev.filter((c) => c.commentId !== comment.commentId));
                                                alert('댓글이 삭제되었습니다.')
                                            } catch (err) {
                                                console.error("댓글 삭제 실패", err);
                                                alert('댓글 삭제에 실패했습니다.');
                                            }
                                        }}
                                        style={{
                                            marginTop: '5px',
                                            fontSize: '12px',
                                            color: 'red',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        ❌ 댓글 삭제
                                    </button>
                                )}
                            </CommentItem>
                        ))}
                    </CommentList>
                </CommentSection>
            </PostContainer>

            {/*<NavContainer>*/}
            {/*    <ul>*/}
            {/*        {headings.map((heading, index) => (*/}
            {/*            <li*/}
            {/*                key={index}*/}
            {/*                style={{ marginLeft: `${(heading.level - 1) * 10}px` }}*/}
            {/*                onClick={() => handleClick(heading.id)}*/}
            {/*            >*/}
            {/*                {heading.text}*/}
            {/*            </li>*/}
            {/*        ))}*/}
            {/*    </ul>*/}
            {/*</NavContainer>*/}

            {isModalOpen && (
                <CommentModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddComment}
                />
            )}
        </PostDetailContainer>
    );
};

export default PostDetail;