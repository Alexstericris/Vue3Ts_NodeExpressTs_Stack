import type {User} from "@/types/types";
import type {AxiosError, AxiosResponse} from "axios";
import axios from "../axios";
import store from "@/store";
import router from "@/router";

export default class RegistrationApi {
    static login(user:User):void {
        axios.post('/client/login',{
            email:user.email,
            password:user.password
        }).then(response=>{
            store.commit('setToken',response.data.token);
            store.commit('setUser',response.data.user);
            router.push('/')
        }).catch(e=>{
            console.log(e)
        });
    }
    static register(user: User): void {
        axios.post('/client/register', {
            ...user
        }).then((response:AxiosResponse)=>{
            store.commit('setToken',response.data.token);
            store.commit('setUser',response.data.user);
            router.push('/')
        }).catch((e:AxiosError)=>{
           console.log(e.response)
        });
    }

    static logout() {
        store.commit('setToken','')
        store.commit('setUser', undefined);
    }
}