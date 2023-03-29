import type {InjectionKey} from 'vue'
import {createStore, Store} from 'vuex'
import axios from "../axios";
import type {User} from "@/types/types";
import {ioclient} from "@/ioclient";
import type {Socket} from "socket.io-client";
import {toast} from "@/stores/toastStore";
import {gameStore} from "@/stores/gameStore";

export interface State {
    token: string
    user?: User,
    socket:Socket,
    loading:boolean,
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        loading:false,
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
            state.socket = ioclient(token)
        },
        setLoading(state: State, loading: boolean) {
            state.loading = loading
        },
    },
    actions: {
        getAuthenticatedUser(context: any) {
            context.commit('setLoading', true)
            return axios.post('/auth/user').then(response => {
                if (!context.state.token) {
                    context.commit('setToken', response.data.token);
                }
                context.commit('setUser', response.data.user)
                context.commit('setIoClient', context.state.token)
                context.commit('setLoading', false)
            }).catch(e => {
                context.commit('setToken', '')
                context.commit('setLoading', false)
            })

        },
    },
    modules:{
        toast,
        gameStore
    }
})