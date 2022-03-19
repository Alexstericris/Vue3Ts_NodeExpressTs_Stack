import type {InjectionKey} from 'vue'
import {createStore, Store} from 'vuex'
import axios from "../axios";
import type {User} from "@/types/types";
import {ioclient} from "@/ioclient";
import type {Socket} from "socket.io-client";
import {toast} from "@/stores/toastStore";

export interface State {
    token: string
    user?: User,
    socket:Socket
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        token: localStorage.getItem('token') || '',
        user: undefined,
        socket:{} as Socket,
    },
    mutations: {
        setToken(state: State, token: string) {
            localStorage.setItem('token', token)
            state.token = token
        },
        setUser(state: State, user: User) {
            state.user = user
        },
        setIoClient(state: State, token: string) {
            // console.log('ey')
            state.socket = ioclient(token)
        },
    },
    actions: {
        getAuthenticatedUser(context: any) {
            return axios.post('/auth/user').then(response => {
                if (!context.state.token) {
                    context.commit('setToken', response.data.token);
                }
                context.commit('setUser', response.data.user)
                context.commit('setIoClient', context.state.token)

            }).catch(e => {
                context.commit('setToken', '')
                // console.log(e.response.data.msg)
            });
        },
    },
    modules:{
        toast
    }
})