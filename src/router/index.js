import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage.vue';

const requireComponent = require.context('@/views', true, /\.vue$/);

const routes = requireComponent.keys().map(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = fileName
    .split('/')
    .pop()
    .replace(/\.\w+$/, '');

// Convert PageName to page-name format
  const formattedPath = componentName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();

  return {
    path: `/${formattedPath}`,
    component: componentConfig.default || componentConfig
  };
});

// Add a separate route for the main page
routes.push({ path: '/', component: HomePage });

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;