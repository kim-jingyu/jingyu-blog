import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { privateApi } from '../../apis/axiosInstance';
import {
    PostContainer,
    PostDetailContainer,
    PostHeader,
    BackLink,
    Title,
    MetaRow,
    DateInfo,
    AdminActions,
    AdminEditButton,
    HashtagList,
    HashtagItem,
    TocBox,
    TocTitle,
    TocItem,
    StyledMarkdown,
    CommentSection,
    CommentHeader,
    CommentCount,
    CommentList,
    CommentItem,
    CommentMeta,
    CommentBody,
    CommentDeleteButton,
    EmptyComment,
    AddCommentButton,
    StatusText,
} from './PostDetail.style';
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

    if (loading) return <StatusText>불러오는 중…</StatusText>;
    if (error) return <StatusText>{error}</StatusText>;

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

    const handleDeleteComment = async (commentId) => {
        if (!window.confirm('댓글을 삭제할까요?')) return;
        try {
            const url = userRole === 'ADMIN'
                ? `/post/${postId}/comments/${commentId}/by-admin`
                : `/post/${postId}/comments/${commentId}/by-member`;
            await privateApi.delete(url);
            setComments((prev) => prev.filter((c) => c.commentId !== commentId));
            alert('댓글이 삭제되었습니다.')
        } catch (err) {
            console.error("댓글 삭제 실패", err);
            alert('댓글 삭제에 실패했습니다.');
        }
    };

    const formatDate = (date) => new Date(date).toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const canComment = userRole === 'MEMBER' || userRole === 'ADMIN';

    return (
        <PostDetailContainer>
            <PostContainer>
                <BackLink href="/">← 전체 글</BackLink>

                <PostHeader>
                    <Title>{post.title}</Title>
                    <MetaRow>
                        <DateInfo>{formatDate(post.date)}</DateInfo>
                        {userRole === 'ADMIN' && (
                            <AdminActions>
                                <AdminEditButton onClick={handleEditPost}>수정</AdminEditButton>
                                <AdminEditButton
                                    $danger
                                    onClick={() => {
                                        if (window.confirm('이 글을 삭제할까요?')) handleDeletePost();
                                    }}
                                >
                                    삭제
                                </AdminEditButton>
                            </AdminActions>
                        )}
                    </MetaRow>
                    {post.hashtags?.length > 0 && (
                        <HashtagList>
                            {post.hashtags.map((hashtag, index) => (
                                <HashtagItem key={index}>#{hashtag.content}</HashtagItem>
                            ))}
                        </HashtagList>
                    )}
                </PostHeader>

                {headings.length > 0 && (
                    <TocBox aria-label="목차">
                        <TocTitle>목차</TocTitle>
                        <ul>
                            {headings.map((heading, index) => (
                                <TocItem
                                    key={index}
                                    $level={heading.level}
                                    onClick={() => handleClick(heading.id)}
                                >
                                    {heading.text}
                                </TocItem>
                            ))}
                        </ul>
                    </TocBox>
                )}

                <StyledMarkdown source={post.content} components={MarkdownComponents} />

                <CommentSection>
                    <CommentHeader>
                        <h3>
                            댓글 <CommentCount>{comments.length}</CommentCount>
                        </h3>
                        {canComment && (
                            <AddCommentButton onClick={() => setIsModalOpen(true)}>
                                댓글 쓰기
                            </AddCommentButton>
                        )}
                    </CommentHeader>
                    {comments.length === 0 ? (
                        <EmptyComment>
                            {canComment ? '첫 댓글을 남겨보세요.' : '아직 댓글이 없습니다.'}
                        </EmptyComment>
                    ) : (
                        <CommentList>
                            {comments.map((comment) => (
                                <CommentItem key={comment.commentId}>
                                    <CommentMeta>
                                        <strong>{comment.memberName}</strong>
                                        <small>{new Date(comment.date).toLocaleString('ko-KR')}</small>
                                        {canComment && (
                                            <CommentDeleteButton onClick={() => handleDeleteComment(comment.commentId)}>
                                                삭제
                                            </CommentDeleteButton>
                                        )}
                                    </CommentMeta>
                                    <CommentBody>{comment.content}</CommentBody>
                                </CommentItem>
                            ))}
                        </CommentList>
                    )}
                </CommentSection>
            </PostContainer>

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