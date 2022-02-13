import axios from "axios";
import type {AxiosInstance} from "axios";
export default class AbstractApi {
    static axios:AxiosInstance=axios.create({
        baseURL: 'http://alexcristea.sytes.net:8081/',
        timeout: 1000,
    });
}