import { useEffect, useState } from "react";
import Header from "../../components/commons/header/Header"
import InfiniteScroll from 'react-infinite-scroll-component'
import Post from "../../components/Post/Post";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { fetchPostSelector, hasMoreState, pageState, postState } from "../../recoils/PostAtoms";
import { useNavigate } from "react-router-dom";


function MainList() {
    const [posts, setPosts] = useRecoilState(postState);
    const [page, setPage] = useRecoilState(pageState);
    const [hasMore, setHasMore] = useRecoilState(hasMoreState);
    const navigate = useNavigate();

    const fetchPostsLoadable = useRecoilValueLoadable(fetchPostSelector);

    const loadMorePosts = async () => {
        try {
            const newPosts = await fetchPostsLoadable;
            if (newPosts.length > 0) {
                setPosts((prevPosts) => [...prevPosts, ...newPosts])
                setPage((prevPage) => prevPage + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('글 로드에 실패했습니다.', error);
            navigate('/notfound');
        }
    }

    useEffect(() => {
        loadMorePosts();
    }, []);


    return (
        <>
            <Header />
            <InfiniteScroll
                dataLength={posts.length}
                next={loadMorePosts}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No More Posts</p>}
            >
                {posts.map((post) => (
                    <Post 
                        key={post.id}
                        title={post.title}
                        date={post.date}
                        content={post.content}
                    />
                ))}
            </InfiniteScroll>
        </>
    )
}

export default MainList