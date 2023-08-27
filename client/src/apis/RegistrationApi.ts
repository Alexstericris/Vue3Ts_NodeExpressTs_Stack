import type {User} from "@/types/types";
import type {AxiosError, AxiosResponse} from "axios";
import router from "@/router";
import http from "@/axios";
import {useStore} from "@/stores/store";
import {useToastStore} from "@/stores/toastStore";


export default class RegistrationApi {
    static login(user: User): void {
        const store=useStore()
        http.post('/client/login', {
            email: user.email,
            password: user.password
        }).then(response => {
            store.setToken(response.data.token)
            store.user= response.data.user
            router.push('/')
        }).catch(e => {
            console.log(e)
        });
    }

    static register(user: User):void {
        const store=useStore()
        const toast = useToastStore();
        http.post('/client/register', {
            ...user
        }).then((response: AxiosResponse) => {
            store.setToken(response.data.token)
            store.user= response.data.user
            window.location.href = '/';
        }).catch((e: AxiosError) => {
            if (e.response?.data?.errors) {
                console.log(e.response.data.errors)
                e.response.data.errors.forEach((e:any) => {
                    toast.error(e?.msg)
                });
            }

        });
    }

    static logout() {
        const store=useStore()
        store.setToken('')
        store.user = {} as User;
    }
}