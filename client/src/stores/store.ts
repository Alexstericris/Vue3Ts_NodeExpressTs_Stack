import type {User} from "@/types/types";
import {ioclient} from "@/ioclient";
import type {Socket} from "socket.io-client";
import http from "@/fetchWrapper";
import {defineStore} from "pinia";

export interface State {
    token: string
    user?: User,
    socket:Socket,
    loading:boolean,
}

export const useStore= defineStore('store',{
    state:():State=>({
        loading:false,
        token: localStorage.getItem('token') || '',
        user: {} as User,
        socket:{} as Socket,
    }),
    actions:{
        setToken(token:string) {
            this.token=token
            localStorage.setItem('token', token);
            this.socket= ioclient(this.token)
        },
        setUser(user) {
            this.user=user
        },
        getAuthenticatedUser() {
            this.loading = true;
            return http.post('/auth/user').then((responseData) => {
                if (!this.token) {
                    this.setToken(responseData.token)
                }
                this.user= responseData.user
                this.socket=ioclient(this.token)
            }).catch(() => {
                this.token=''
            }).finally(()=>{
                this.loading = false;
            })
        },
    }
})