<template>
  <div id="app">
    <router-view></router-view>
    <universal-modal v-if="isModalOpen" @close="closeModal">
      <p>This is the content of the universal modal.</p>
    </universal-modal>
  </div>
</template>

<script>
import UniversalModal from '@/components/ModalWindow.vue';

export default {
  data() {
    return {
      isModalOpen: false
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    }
  },
  components: {
    UniversalModal
  }
};
</script>

<style>
/* Add your global CSS styles here */
</style>


<!-- <template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { createRouter, createWebHistory } from 'vue-router';



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
</style> -->
