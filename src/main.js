import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css';
import axios from "axios";
axios.defaults.baseURL ="http://"+ process.env.VUE_APP_URL




createApp(App).use(store).use(Vant).use(router).mount('#app')
