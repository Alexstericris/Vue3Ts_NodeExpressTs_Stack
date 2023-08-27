import {defineStore} from "pinia";

export interface toastState {
    show:boolean,
    message:string,
    class:string,
}

export const useToastStore= defineStore('toast',{
    state:():toastState=>({
        show:false,
        message:'',
        class:'',
    }),
    actions:{
        success(message:string) {
            this.message=message
            this.show=true
            setTimeout(() => {
                this.show = false
            }, 5000)
        },
        error(message:string) {
            this.message=message
            this.show=true
            this.class='text-white bg-danger'
            setTimeout(() => {
                this.show = false
            }, 5000)
        },
    }
})