import { atom, selector } from "recoil";
import { fetchPosts } from "../apis/postApi";

export const postState = atom({
    key: 'postState',
    default: []
})

export const pageState = atom({
    key: 'pageState',
    default: 0
})

export const hasMoreState = atom({
    key: 'hasMoreState',
    default: true
})

export const fetchPostSelector = selector({
    key: 'fetchPostSelector',
    get: async ({get}) => {
        const page = get(pageState);
        try {
            const posts = await fetchPosts(page);
            return posts;
        } catch (error) {
            console.error("글 가져오기에 실패했습니다.", error);
            return [];
        }
    }
})