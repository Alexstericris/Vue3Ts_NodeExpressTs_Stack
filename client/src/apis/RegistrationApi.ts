import type {User} from "@/types/types";
import router from "@/router";
import http from "@/fetchWrapper";
import {useStore} from "@/stores/store";
import {useToastStore} from "@/stores/toastStore";

export default class RegistrationApi {
    static login(user: User): void {
        const store=useStore()
        const toast = useToastStore();
        http.post('/client/login', {
            email: user.email,
            password: user.password
        }).then(responseData => {
            store.setToken(responseData.token)
            store.setUser(responseData.user)
            window.location.href = '/';
        }).catch(e => {
            if (e.msg) {
                toast.error(e.msg)
            }
            console.log(e);
        });
    }

    static register(user: User):void {
        const store=useStore()
        const toast = useToastStore();
        http.post('/client/register', {
            ...user
        }).then((responseData) => {
            store.setToken(responseData.token)
            store.user= responseData.user
            window.location.href = '/';
        }).catch((e) => {
            if (e.errors) {
                console.log(e.errors)
                e.errors.forEach((e:any) => {
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