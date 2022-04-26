import {io} from "socket.io-client";


export const ioclient = (token:string) => {
    return io("ws://"+import.meta.env.VITE_SOCKET_IO, {
        auth:{
            token:`Bearer ${token}`
        }
    });
}

