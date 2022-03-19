import {io} from "socket.io-client";


export const ioclient = (token:string) => {
    return io("ws://alexcristea.sytes.net:8081", {
        auth:{
            token:`Bearer ${token}`
        }
    });
}

