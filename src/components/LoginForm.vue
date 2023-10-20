<template>
  <div>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input v-model="username" type="text" id="username" />

      <label for="password">Password:</label>
      <input v-model="password" type="password" id="password" />

      <button type="submit">Login</button>
    </form>
    <div v-if="loginError" style="color: red;">{{ loginError }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      isAuthenticated: false,
      loginError: null,
    };
  },
  created() {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      this.isAuthenticated = true;
      const currentUsername = localStorage.getItem('currentUsername');
      if (currentUsername) {
        this.$store.dispatch('setCurrentUsername', currentUsername);
      }
    }
  },
  methods: {
    login() {
      const payload = {
        username: this.username,
        password: this.password
      };

      const apiUrl = `${process.env.API_BASE_URL}/auth/jwt/create/`;

      axios.post(apiUrl, payload)
        .then(response => {
          console.log('Login successful:', response.data);
          const token = response.data.access;
          localStorage.setItem('jwtToken', token);
          this.isAuthenticated = true;
          this.loginError = null;
          this.$router.push('/');

          const currentUsername = this.username; 
          this.$store.dispatch('setCurrentUsername', currentUsername); 
          localStorage.setItem('currentUsername', currentUsername);
        })
        .catch(error => {
          console.error('Login failed:', error.response ? error.response.data : error.message);
          this.loginError = error.response ? error.response.data : error.message;
        });
    },
  }
};
</script>

<style>
/* Add your styles here */
</style>
