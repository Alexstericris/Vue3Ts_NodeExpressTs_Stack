import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {useStore} from "@/stores/store";
import "bootstrap"
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

const store=useStore()
store.getCsrf().then(() => {
    store.getAuthenticatedUser().then(() => {
        app.use(router)
        app.mount('#app');
    })
})

// const io = ioclient;

// send a message to the server
// io.emit("hello from client", 5, "6", {7: Uint8Array.from([8])});
//
// // receive a message from the server
// io.on("hello from server", (arg: any) => {
//     console.log('banana')
// });
