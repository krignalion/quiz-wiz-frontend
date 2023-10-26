<template>
    <div>
      <HeaderSection />
      <UserProfile />
    </div>
  </template>
  
  <script>
  import HeaderSection from '@/components/HeaderSection.vue';
  import UserProfile from '@/components/UserProfile.vue';
  
  export default {
    components: {
      HeaderSection,
      UserProfile,
    }
  }
  </script>
  