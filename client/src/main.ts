import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";
import store, {key} from "@/store";
import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

const app = createApp(App)

app.use(router)
app.use(store,key)
app.use(VueAxios, axios.create({
    baseURL: 'http://alexcristea.sytes.net:8081/',
    timeout: 1000,
}))
await store.dispatch("getAuthenticatedUser")
app.mount('#app')
