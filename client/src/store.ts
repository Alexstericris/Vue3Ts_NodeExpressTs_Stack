import type { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import axios from "./axios";
import type {User} from "@/types/types";
export interface State {
    token:string
    user?: User
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        token: localStorage.getItem('token')||'',
        user: undefined
    },
    mutations: {
        setToken(state:State,token:string) {
            localStorage.setItem('token',token)
            state.token=token
        },
        setUser (state:State,user:User) {
            state.user=user
        }
    },
    actions:{
        getAuthenticatedUser(context:any) {
            return axios.post('/auth/user').then(response=>{
                context.commit('setToken',response.data.token)
                context.commit('setUser',response.data.user)
            }).catch(e=>{
                context.commit('setToken','')
                // console.log(e.response.data.msg)
            })
        },
    }
})

export default store