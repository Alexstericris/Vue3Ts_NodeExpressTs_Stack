import type {User} from "@/types/User";
import type {AxiosResponse} from "axios";
import axios from "../axios";

export default class RegistrationApi {
    static register(user: User): Promise<AxiosResponse> {
        return axios.post('register', {
            ...{user}
        });
    }
}