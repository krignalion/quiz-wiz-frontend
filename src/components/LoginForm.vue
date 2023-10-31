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
import jwt_decode from 'jwt-decode';

export default {
  data() {
    return {
      username: '',
      password: '',
      isAuthenticated: false,
      loginError: null,
    };
  },
  methods: {
    login() {
      const payload = {
        username: this.username,
        password: this.password
      };

      const apiUrl = `/auth/jwt/create/`;

      this.$axios.post(apiUrl, payload)
        .then(response => {
          console.log('Login successful:', response.data);
          const token = response.data.access;
          localStorage.setItem('jwtToken', token);

          const decodedToken = jwt_decode(token);
          const currentUsername = decodedToken.username;
          const currentEmail = decodedToken.email;
          const currentId = decodedToken.user_id;

          this.$store.dispatch('setCurrentUser', {user_id: currentId, username: currentUsername, email: currentEmail });
          this.$store.commit('setIsAuthenticated', true);
          this.loginError = null;
          this.$router.push('/');
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
