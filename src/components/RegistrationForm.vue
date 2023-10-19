<template>
  <div class="registration-form">
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">Username:</label>
        <input v-model="username" type="text" id="username" @blur="validateUsername" />
        <span v-if="usernameTouched && !isUsernameValid" class="error">
          minimum 4 letters, then you can use numbers and letters up to 20 characters
        </span>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" @blur="validateEmail" />
        <span v-if="emailTouched && !isEmailValid" class="error">Invalid email</span>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" />
        <span v-if="!validatePassword(password)" class="error">
          Password must contain at least 8 characters with at least one digit,
          one uppercase and one lowercase letter
        </span>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input v-model="confirmPassword" type="password" id="confirmPassword" />
        <span v-if="confirmPassword !== password" class="error">Passwords do not match</span>
      </div>

      <button type="submit" :disabled="!isFormValid">Register</button>
    </form>

    <div v-if="registrationError" class="error" style="color: red;">{{ registrationError }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      first_name: '', 
      last_name: '',
      registrationError: null,
      usernameTouched: false,
      emailTouched: false,
    };
  },
  computed: {
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,254}$/;
      return emailRegex.test(this.email);
    },
    isUsernameValid() {
      const usernameRegex = /^[a-zA-Z]{4,}[a-zA-Z0-9]{4,20}$/;
      return usernameRegex.test(this.username);
    },
    isFormValid() {
      return (
        this.isEmailValid &&
        this.validatePassword(this.password) &&
        this.confirmPassword === this.password
      );
    }
  },
  methods: {
    validateEmail() {
      this.emailTouched = true;
    },
    validateUsername() {
      this.usernameTouched = true;
    },
    validatePassword(password) {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,128}$/;
      return passwordRegex.test(password);
    },
    register() {
      if (!this.isFormValid) {
        console.log('Form is invalid');
        return;
      }

      const payload = {
        username: this.username,
        email: this.email,
        password: this.password      
      };

      const apiUrl = process.env.API_BASE_URL + '/auth/users/';

      axios.post(apiUrl, payload)
        .then(response => {
          console.log('Registration successful:', response.data);
          this.$router.push('/user-authorization');
        })
        .catch(error => {
          console.error('Registration failed:', error.response ? error.response.data : error.message);
          this.registrationError = error.response ? error.response.data : error.message;
        });
    },
  },
};
</script>

<style scoped>
.registration-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-group {
  margin-bottom: 10px;
  width: 100%;
  max-width: 300px;
}

.form-group label {
  display: block;
}

.form-group input {
  width: 100%;
  height: 30px;
}

.error {
  color: red;
  height: 20px;
}
</style>
