<template>
  <div class="header-section">
    <nav>
      <router-link to="/">{{$t('home')}}</router-link>
      <router-link to="/about-us">{{$t('about')}}</router-link>
      <router-link to="/user-profile">{{$t('user profile')}}</router-link>
      <div v-if="!currentUsername">
        <router-link to="/user-authorization">{{$t('Authorization')}}</router-link>
        <span> | </span>
        <router-link to="/user-registration">{{$t('Registration')}}</router-link>
      </div>
      <div v-if="currentUsername">
        {{ currentUsername }}<button @click="logout">Logout</button>
      </div>
    </nav>
  </div>
</template>



<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HeaderSection',
  computed: {
    ...mapGetters(['currentUsername']),
  },
  methods: {
    logout() {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('currentUsername');
      this.$store.dispatch('clearCurrentUsername');
      this.isAuthenticated = false;
      this.$router.push('/');
    },
  }
}
</script>

<style scoped>
.header-section {
  background-color: #f0f0f0;
  padding: 10px;
}

nav {
  display: flex;
  justify-content: space-around;
}

nav router-link {
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
}

nav router-link:hover {
  background-color: #ccc;
  border-radius: 5px;
}
</style>
