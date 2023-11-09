<template>
    <div>
      <HeaderSection />
      <CompanyList />
    </div>
  </template>
  
  <script>
  import HeaderSection from '@/components/HeaderSection.vue';
  import CompanyList from '@/components/CompanyList.vue';
  
  export default {
    components: {
      HeaderSection,
      CompanyList,
    },
    data() {
      return {
        companies: [],
        company: null,
      };
    },
  }
  </script>
  