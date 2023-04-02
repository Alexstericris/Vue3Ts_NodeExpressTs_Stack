import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {key, store} from "@/stores/store";
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const app = createApp(App)
app.use(store,key)
store.dispatch("getAuthenticatedUser").finally(()=>{
    app.use(router)
    app.mount('#app');
})
// const io = ioclient;

// send a message to the server
// io.emit("hello from client", 5, "6", {7: Uint8Array.from([8])});
//
// // receive a message from the server
// io.on("hello from server", (arg: any) => {
//     console.log('banana')
// });
