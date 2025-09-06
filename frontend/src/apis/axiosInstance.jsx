import axios from 'axios'
import {jwtDecode} from "jwt-decode";

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}`
axios.defaults.withCredentials = true;

export const publicApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const privateApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

privateApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});

privateApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status == 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const token = localStorage.getItem('accessToken');
                let userRole = null;
                if (token) {
                    try {
                        const decodedToken = jwtDecode(token);
                        userRole = decodedToken.role;
                    } catch (error) {
                        console.error("Invalid token", error);
                    }
                }
                let response = null;
                if (userRole === 'ADMIN') {
                    response = await postAdminRefreshToken(token);
                } else if (userRole === 'MEMBER') {
                    response = await postMemberRefreshToken(token);
                }
                const newAccessToken = response.data.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                console.error("리프레시 토큰 발급 실패", refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)

export async function postMemberRefreshToken(token) {
    return await publicApi.post('/token', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function postAdminRefreshToken(token) {
    return await publicApi.post('/admin/token', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}