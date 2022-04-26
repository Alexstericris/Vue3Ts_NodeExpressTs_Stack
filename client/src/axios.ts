import axios from "axios";

const token = localStorage.getItem('token');

export default axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000,
    headers:{
        'Authorization':`Bearer ${token}`
    }
});