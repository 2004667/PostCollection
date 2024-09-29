import './assets/main.css'

import { createApp } from 'vue'
import App from './components/Main.vue'
import router from './router';

createApp(App).use(router).mount('#app')
