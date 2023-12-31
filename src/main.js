import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import messages from './locales';
import store from './store/store.js';
import axiosInstance from './services/axiosInstance.js';


const defaultLanguage = 'en';
const savedLanguage = localStorage.getItem('language');
const i18n = createI18n({
  legacy: false,
  locale: savedLanguage || defaultLanguage,
  globalInjection: true,
  messages
});

const app = createApp(App);
app.use(store);
app.use(i18n);
app.use(router);

app.config.globalProperties.$axios = axiosInstance;

app.config.globalProperties.$selectedLanguage = savedLanguage || defaultLanguage;

app.mount('#app');
