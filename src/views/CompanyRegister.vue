<template>
  <div>
    <h2>Create a New Company</h2>
    <form @submit.prevent="createCompany">
      <label for="name">Company Name:</label>
      <input v-model="name" type="text" id="name" required>

      <label for="description">Company Description:</label>
      <textarea v-model="description" id="description" required></textarea>

      <button type="submit">Create Company</button>
    </form>
    <div v-if="createError" style="color: red;">{{ createError }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      description: '',
      createError: null,
    };
  },
  methods: {
    async createCompany() {
      const isValidToken = await this.checkTokenValidity();

      if (!isValidToken) {
        this.createError = 'Your JWT token is not valid. Please log in again.';
        return;
      }

      const payload = {
        name: this.name,
        description: this.description,
      };

      const jwtToken = localStorage.getItem('jwtToken');
      this.$axios.defaults.headers.common['Authorization'] = `JWT ${jwtToken}`;

      this.$axios.post(`/companies/`, payload)
        .then(response => {
          console.log('Company created:', response.data);
          this.name = '';
          this.description = '';
        })
        .catch(error => {
          this.createError = 'Error creating company. Please try again.';
          console.error('Error creating company:', error);
        });
    },
    async checkTokenValidity() {
      const jwtToken = localStorage.getItem('jwtToken');
      if (!jwtToken) {
        return false;
      }

      try {
        const response = await this.$axios.post(`/auth/jwt/verify/`, {
          token: jwtToken,
        });

        return response.status === 200;
      } catch (error) {
        console.error('Token verification failed:', error);
        return false;
      }
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
