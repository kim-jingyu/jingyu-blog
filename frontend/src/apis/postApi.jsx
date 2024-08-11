import { privateApi, publicApi } from "./axiosInstance";

export async function fetchPosts(page) {
    try {
        const response = await publicApi.get(`/posts?page=${page}`)
        return response.data;
    } catch (error) {
        console.error("글 가져오기에 실패했습니다.", error)
        throw error;
    }
}

export async function createPost(data) {
    try {
        const response = await privateApi.post('/posts', data);
        return response.data;
    } catch (error) {
        console.error("글 작성에 실패했습니다.", error);
        throw error;
    }
}