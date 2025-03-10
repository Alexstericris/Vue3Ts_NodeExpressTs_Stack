import type {User} from "@/types/types";
import {ioclient} from "@/ioclient";
import type {Socket} from "socket.io-client";
import http from "@/fetchWrapper";
import {defineStore} from "pinia";

export interface State {
    token: string
    csrf: string
    user?: User,
    socket: Socket,
    loading: boolean,
}

export const useStore = defineStore('store', {
    state: (): State => ({
        loading: false,
        token: localStorage.getItem('token') || '',
        csrf: localStorage.getItem('csrf') || '',
        user: {} as User,
        socket: {} as Socket,
    }),
    actions: {
        setCsrf(token: string) {
            this.csrf = token
            localStorage.setItem('csrf', token);
        },
        getCsrf() {
            this.loading = true;
            return http.get('/csrf-token').then((responseData) => {
                this.setCsrf(responseData.csrf_token)
            }).catch(() => {
                this.csrf = ''
            }).finally(() => {
                this.loading = false;
            })
        },
        setToken(token: string) {
            this.token = token
            localStorage.setItem('token', token);
            this.socket = ioclient(this.token)
        },
        setUser(user) {
            this.user = user
        },
        getAuthenticatedUser() {
            this.loading = true;
            return http.post('/auth/user').then((responseData) => {
                this.user = responseData
                this.socket = ioclient(this.token)
            }).catch(() => {
                this.token = ''
            }).finally(() => {
                this.loading = false;
            })
        },
    }
})