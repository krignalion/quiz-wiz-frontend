import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '@/views/HomePage.vue';
import AboutPage from '@/views/AboutPage.vue';
import UserRegistration from '@/views/UserRegistration.vue';
import UserAuthorization from '@/views/UserAuthorization.vue';
import ListOfUsers from '@/views/ListOfUsers.vue';
import UserProfile from '@/views/UserProfile.vue';
import ListOfCompanies from '@/views/ListOfCompanies.vue';
import CompanyProfile from '@/views/CompanyProfile.vue';
import TestVuex from '@/views/TestVuex.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/user-registration', component: UserRegistration },
  { path: '/user-authorization', component: UserAuthorization },
  { path: '/list-of-users', component: ListOfUsers },
  { path: '/user-profile', component: UserProfile },
  { path: '/list-of-companies', component: ListOfCompanies },
  { path: '/company-profile', component: CompanyProfile },
  { path: '/test-vuex', component: TestVuex },
  // You can add more routes for other pages here
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
