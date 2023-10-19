<template>
  <div class="header-section">
    <nav>
      <router-link to="/">{{$t('home')}}</router-link>
      <router-link to="/about-us">{{$t('about')}}</router-link>
      <router-link to="/user-profile">{{$t('user profile')}}</router-link>
      <div>
        <router-link v-if="!currentUser" to="/user-authorization">{{$t('Authorization')}}</router-link>
        <span v-if="!currentUser"> | </span>
        <router-link v-if="!currentUser" to="/user-registration">Registration</router-link>
      </div>
        <div v-if="currentUser"> 
        {{ currentUser.username }}<button @click="logout">Logout</button>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  computed: {
    ...mapGetters(['currentUser']),
  },
  name: 'HeaderSection',
  methods: {
    logout() {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('currentUser');
      this.$store.dispatch('clearCurrentUser');
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
