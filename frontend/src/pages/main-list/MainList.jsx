import { useEffect, useState } from "react";
import Header from "../../components/commons/header/Header"
import InfiniteScroll from 'react-infinite-scroll-component'
import Post from "../../components/post/Post";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { fetchPostSelector, hasMoreState, pageState, postState } from "../../recoils/PostAtoms";
import { useNavigate } from "react-router-dom";
import { MainContainer } from "./MainList.style";


function MainList() {
    const [posts, setPosts] = useRecoilState(postState);
    const [page, setPage] = useRecoilState(pageState);
    const [hasMore, setHasMore] = useRecoilState(hasMoreState);
    const navigate = useNavigate();

    const fetchPostsLoadable = useRecoilValueLoadable(fetchPostSelector);

    const loadMorePosts = async () => {
        try {
            if (fetchPostsLoadable.state === 'hasValue') {
                const newPosts = fetchPostsLoadable.contents;
                if (newPosts.length > 0) {
                    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
                    setPage((prevPage) => prevPage + 1);
                } else {
                    setHasMore(false);
                }
            }
        } catch (error) {
            console.error('글 로드에 실패했습니다.', error);
            navigate('/notfound');
        }
    }

    useEffect(() => {
        if (fetchPostsLoadable.state === 'hasValue') {
            loadMorePosts();
        }
    }, [fetchPostsLoadable.state]);

    const clickDetailPost = (postId) => {
        navigate(`/post/${postId}`);
    };

    return (
        <MainContainer>
            <Header />
            <InfiniteScroll
                dataLength={posts.length}
                next={loadMorePosts}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                {posts.map((post) => (
                    <Post 
                        key={post.postId}
                        title={post.title}
                        date={new Date(post.date).toLocaleString('ko-KR', {
                            timeZone: 'Asia/Seoul',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        })}
                        content={post.content}
                        onClick={() => clickDetailPost(post.postId)}
                    />
                ))}
            </InfiniteScroll>
        </MainContainer>
    )
}

export default MainList