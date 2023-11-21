<template>
  <div>
    <form @submit.prevent="createCompany">
      <div class="form-group">
        <label for="name">Company Name:</label>
        <input v-model="name" type="text" id="name" required>
      </div>

      <div class="form-group">
        <label for="description">Company Description:</label>
        <textarea v-model="description" id="description" required></textarea>
      </div>

      <div class="form-group">
        <input v-model="isVisible" type="checkbox" id="isVisible">
        <label for="isVisible">Visible</label>
      </div>

      <button type="submit">Create Company</button>
    </form>
    <div v-if="isSuccess" style="color: green;">{{ isSuccess }}</div>
    <div v-if="isError" style="color: red;">{{ isError }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      description: '',
      isVisible: true,
      isError: null,
      isSuccess: null,
    };
  },
  methods: {
    async createCompany() {
      const isValidToken = await this.checkTokenValidity();

      if (!isValidToken) {
        this.isError = 'Your JWT token is not valid. Please log in again.';
        return;
      }

      const payload = {
        name: this.name,
        description: this.description,
        is_visible: this.isVisible,
      };

      const jwtToken = localStorage.getItem('jwtToken');
      this.$axios.defaults.headers.common['Authorization'] = `JWT ${jwtToken}`;

      this.$axios.post(`/companies/`, payload)
        .then(response => {
          console.log('Company created:', response.data);
          this.name = '';
          this.description = '';
          this.isVisible = true;
          this.isError = null;
          this.isSuccess = 'Company created successfully!'; 
        })  
        .catch(error => {
          this.isError = 'Error creating company. Please try again.';
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

<style scoped>
.form-group {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

textarea,
input {
  padding: 5px;
}
.form-group input {
  margin-right: 5px;
}
</style>
