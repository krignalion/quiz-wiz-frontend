<template>
    <div>
    <select v-model="$i18n.locale" @change="changeLanguage">
      <option value="en">English</option>
      <option value="uk">Українська</option>
    </select>
  </div>
  </template>
  
  <script>
export default {
  methods: {
    changeLanguage() {
      localStorage.setItem('language', this.$i18n.locale);
    }
  }
};
</script>
  
  <style scoped>
  .language-selector {
    margin-bottom: 20px;
  }
  
  select {
    padding: 0.5rem;
  }
  </style>
  