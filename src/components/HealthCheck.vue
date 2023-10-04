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
    // Вызов эндпоинта проверки здоровья бэкенда
    axiosInstance.get('/health-check-view/')
      .then(response => {
        console.log('Response status:', response.status); // Статус ответа
        console.log('Response data:', response.data); // Данные, возвращенные сервером
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
