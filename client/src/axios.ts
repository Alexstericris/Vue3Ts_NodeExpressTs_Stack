import axios from "axios";

const token = localStorage.getItem('token');

export default axios.create({
    baseURL: 'http://alexcristea.sytes.net:8081/',
    timeout: 1000,
    headers:{
        'Authorization':`Bearer ${token}`
    }
});