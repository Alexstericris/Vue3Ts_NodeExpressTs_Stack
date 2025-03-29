import type {User} from "@/types/types";
// import {ioclient} from "@/ioclient";
import type {Socket} from "socket.io-client";
import http from "@/fetchWrapper";
import {defineStore} from "pinia";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import type {Broadcaster} from "laravel-echo";

export interface State {
    token: string
    csrf: string
    user?: User,
    socket: Socket,
    loading: boolean,
    echo: Echo<any>,
    room: Broadcaster['reverb']['presence']|null
}

export const useStore = defineStore('store', {
    state: (): State => ({
        loading: false,
        token: localStorage.getItem('token') || '',
        csrf: localStorage.getItem('csrf') || '',
        user: {} as User,
        socket: {} as Socket,
        echo: new Echo({
            authEndpoint: import.meta.env.VITE_API_URL + '/api/broadcasting/auth',
            broadcaster: 'reverb',
            key: import.meta.env.VITE_REVERB_APP_KEY,
            wsHost: import.meta.env.VITE_REVERB_HOST,
            wsPort: import.meta.env.VITE_REVERB_PORT,
            wssPort: import.meta.env.VITE_REVERB_PORT,
            forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
            auth: {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                    'X-CSRF-TOKEN': localStorage.getItem('csrf')??'',

                },
            },
        }),
        room: null
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
            // this.socket = ioclient(this.token)
        },
        setUser(user) {
            this.user = user
        },
        getAuthenticatedUser() {
            this.loading = true;
            return http.get('/api/user').then((responseData) => {
                this.user = responseData
                // this.socket = ioclient(this.token)
            }).catch(() => {
                this.token = ''
            }).finally(() => {
                this.loading = false;
            })
        },
    }
})