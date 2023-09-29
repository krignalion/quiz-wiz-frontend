import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);

// Указание стартового маршрута
router.replace('/');

app.mount('#app');
