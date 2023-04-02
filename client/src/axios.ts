import type {AxiosRequestConfig} from "axios";
import axios from "axios";

const token = localStorage.getItem('token');

const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000,
    headers: {
        'Authorization': `Bearer ${token}`
    }
});

http.interceptors.request.use((config: AxiosRequestConfig) => {
    if (!config) {
        config={
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
    }else{
        if (config.headers) {
            config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        }
    }
    return config
})

export default http;

