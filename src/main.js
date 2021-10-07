import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css';
import axios from "axios";
import './mock/index'
axios.defaults.baseURL = 'http://localhost:8010/'



createApp(App).use(store).use(Vant).use(router).mount('#app')
