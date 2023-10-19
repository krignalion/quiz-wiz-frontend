<template>
  <div>
    <h2>Health Check</h2>
    <p v-if="isBackendHealthy !== null">
      Backend is {{ isBackendHealthy ? 'healthy' : 'not healthy' }}
    </p>
    <p v-if="backendError">Error checking backend health: {{ backendError }}</p>
    <p v-else></p>
  </div>
</template>

<script>
import axiosInstance from '../services/axios-instance.js';

export default {
  data() {
    return {
      isBackendHealthy: null,
      backendError: null
    };
  },
  mounted() {
    // Call the backend health check endpoint
    axiosInstance.get('')
      .then(response => {
        console.log('Response status:', response.status); // Response status
        console.log('Response data:', response.data); // Data returned by the server
        this.isBackendHealthy = true;
      })
      .catch(error => {
        console.error('Error checking backend health:', error);
        this.isBackendHealthy = false;
        this.backendError = error.message;
      });
  }
}
</script>
