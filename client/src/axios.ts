import axios from "axios";

export default axios.create({
    baseURL: 'http://alexcristea.sytes.net:8081/',
    timeout: 1000,
});