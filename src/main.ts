import { createApp } from 'vue'
import '@/assets/css/style.css'
import App from './App.vue'
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';
import router from './router';
import { i18n } from './plugins/i18nPlugin';
import { createPinia } from 'pinia';
const pinia = createPinia()
createApp(App)
    .use(i18n)
    .use(pinia)
    .use(Antd)
    .use(router)
    .mount('#app');

