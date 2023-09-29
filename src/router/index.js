import Vue from 'vue';
import App from '@/App.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Import your page components
import AboutPage from '../pages/AboutPage.vue';
import UserRegistration from '../pages/UserRegistration.vue';
import UserAuthorization from '../pages/UserAuthorization.vue';
import ListOfUsers from '../pages/ListOfUsers.vue';
import UserProfile from '../pages/UserProfile.vue';
import ListOfCompanies from '../pages/ListOfCompanies.vue';
import CompanyProfile from '../pages/CompanyProfile.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/about', component: AboutPage },
  { path: '/user-registration', component: UserRegistration },
  { path: '/user-authorization', component: UserAuthorization },
  { path: '/list-of-users', component: ListOfUsers },
  { path: '/user-profile', component: UserProfile },
  { path: '/list-of-companies', component: ListOfCompanies },
  { path: '/company-profile', component: CompanyProfile },
];

const router = new VueRouter({
  routes,
  mode: 'history' // This enables clean URLs without hashes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
