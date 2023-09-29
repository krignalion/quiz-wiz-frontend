<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// import Vue from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// Vue.use(VueRouter);

// Подключение макетных страниц
import About from './pages/AboutPage.vue';
import UserRegistration from './pages/UserRegistration.vue';
import UserAuthorization from './pages/UserAuthorization.vue';
import ListOfUsers from './pages/ListOfUsers.vue';
import UserProfile from './pages/UserProfile.vue';
import ListOfCompanies from './pages/ListOfCompanies.vue';
import CompanyProfile from './pages/CompanyProfile.vue';

const routes = [
  { path: '/about', component: About },
  { path: '/user-registration', component: UserRegistration },
  { path: '/user-authorization', component: UserAuthorization },
  { path: '/list-of-users', component: ListOfUsers },
  { path: '/user-profile', component: UserProfile },
  { path: '/list-of-companies', component: ListOfCompanies },
  { path: '/company-profile', component: CompanyProfile },
  // Добавьте другие маршруты здесь
];

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// });

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default {
  name: 'App',
  router,
};
</script>

<style>
/* Стили здесь, если требуется */
</style>
