<template>
  <div class="header-section">
    <nav>
      <router-link to="/">{{$t('home')}}</router-link>
      <router-link to="/list-of-users">{{$t('List of users')}}</router-link>
      <router-link to="/user-profile">{{$t('user profile')}}</router-link>
      <router-link to="/list-of-companies">{{$t('List of companies')}}</router-link>
      
      <div v-if="!isAuthenticated">
        <router-link to="/user-authorization">{{$t('Authorization')}}</router-link>
        <span> | </span>
        <router-link to="/user-registration">{{$t('Registration')}}</router-link>
      </div>
      
      <div v-else>
        {{ currentUser.username }} <button @click="logout">{{$t('Logout')}}</button>
      </div>
    </nav>
  </div>
</template>



<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'HeaderSection',
  computed: {
    ...mapGetters(['currentUser', 'isAuthenticated']),
  },
  methods: {
    ...mapMutations('user', ['setIsAuthenticated']),
    
    logout() {
      localStorage.removeItem('jwtToken');
      this.$store.dispatch('clearCurrentUser'); 
      this.$store.commit('setIsAuthenticated', false); 
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
