import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createI18n } from 'vue-i18n';
import messages from './locales';

const defaultLanguage = 'en';
const savedLanguage = localStorage.getItem('language');

const i18n = createI18n({
  legacy: false,
  locale: savedLanguage || defaultLanguage,
  globalInjection: true,
  messages
});

const app = createApp(App);
app.use(i18n);
app.use(router);

app.config.globalProperties.$selectedLanguage = savedLanguage || defaultLanguage;

app.mount('#app');
