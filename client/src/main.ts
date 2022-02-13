import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios.create({
    baseURL: 'http://alexcristea.sytes.net:8081/',
    timeout: 1000,
}))
app.mount('#app')
