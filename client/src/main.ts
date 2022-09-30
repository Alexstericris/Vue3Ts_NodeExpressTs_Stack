import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";
import {key, store} from "@/stores/store";
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const app = createApp(App)

app.use(router)
app.use(store,key)
app.use(VueAxios, axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000,
}))
store.dispatch("getAuthenticatedUser")
app.mount('#app');
// const io = ioclient;

// send a message to the server
// io.emit("hello from client", 5, "6", {7: Uint8Array.from([8])});
//
// // receive a message from the server
// io.on("hello from server", (arg: any) => {
//     console.log('banana')
// });
