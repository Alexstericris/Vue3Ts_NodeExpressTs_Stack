import type {Module} from "vuex";
import type {State} from "@/stores/store";

export interface toastState {
    show:boolean,
    message:string,
    class:string,
}
export const toast :  Module<toastState,State> ={
    namespaced:true,
    state: {
        show:false,
        message:'',
        class:'',
    },
    mutations:{
        success(state:toastState,message:string) {
            state.message=message
            state.show=true
            setTimeout(() => {
                state.show = false
            }, 5000)
        },
        error(state:toastState,message:string) {
            state.message=message
            state.show=true
            state.class='text-white bg-danger'
            setTimeout(() => {
                state.show = false
            }, 5000)
        },
    }
}