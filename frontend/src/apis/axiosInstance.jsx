import axios from 'axios'

const BASE_URL = 'http://localhost:8080'
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
                const response = await postRefreshToken();
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

export async function postRefreshToken() {
    const token = localStorage.getItem('accessToken');
    const response = await publicApi.post('/token', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response;
}