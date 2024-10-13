import { publicApi } from "./axiosInstance";

export async function adminLogin(data) {
    try {
        const response = await publicApi.post('/admin/login', data);
        const accessToken = response.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        return accessToken;
    } catch (error) {
        console.error("관리자 로그인에 실패했습니다.", error);
        throw error;
    }
}