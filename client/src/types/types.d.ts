export interface User {
    _id?:string,
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
