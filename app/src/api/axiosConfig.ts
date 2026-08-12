import axios from 'axios'

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8086/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response)=>response,
    (error) => {
        const status = error.response?.status;
        const hadToken = !!localStorage.getItem('authToken');
        const isLoginRequest = error.config?.url?.includes('/users/login');

        if(status == 401 && hadToken && !isLoginRequest){
            localStorage.removeItem('authToken');
            localStorage.removeItem('username');
            localStorage.removeItem('userId');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    });