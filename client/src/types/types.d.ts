import type Echo from "laravel-echo";

declare global {
    interface Window {
        Pusher: typeof Pusher;
        Echo: typeof Echo;
    }
}
export interface User {
    id?:string,
    username?:string|undefined,
    email:string,
    password:string,
}
export interface FetchOptions{
    params?: any
}
export interface LoginFormSubmitTarget {
    elements: {
        email: {
            value: string
        },
        password: {
            value: string
        }
    }
}
