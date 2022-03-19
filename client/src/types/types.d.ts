export interface User {
    _id?:string,
    username?:string|undefined,
    email:string,
    password:string,
}

export interface LoginEvent extends  Event{
    target:{
        elements:{
            email:{
                value:string
            },
            password:{
                value:string
            }
        }
    }
}
