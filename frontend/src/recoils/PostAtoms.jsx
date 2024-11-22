import { atom, selector } from "recoil";
import { fetchPosts, searchPost } from "../apis/postApi";

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

export const searchKeywordState = atom({
    key: 'searchKeywordState',
    default: ""
})

export const searchResultsState = atom({
    key: 'searchResultsState',
    default: []
})

export const fetchPostSelector = selector({
    key: 'fetchPostSelector',
    get: async ({get}) => {
        const page = get(pageState);
        try {
            const posts = await fetchPosts(page);
            return posts.content;
        } catch (error) {
            console.error("글 가져오기에 실패했습니다.", error);
            return [];
        }
    }
})

export const searchPostSelector = selector({
    key: 'searchPostSelector',
    get: async ({ get }) => {
        const keyword = get(searchKeywordState);
        if (!keyword) return [];
        try {
            const results = await searchPost(keyword);
            return results;
        } catch (error) {
            console.error("검색에 실패했습니다.", error);
            return [];
        }
    }
})