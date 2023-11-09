<template>
  <div>
    <h1>List of Companies</h1>
    <div>
      <label for="companyIdInput">Enter Company ID: </label>
      <input id="companyIdInput" v-model="companyId" type="number" />
      <button @click="goToCompany">Go to Company</button>
    </div>
    <ul>
      <li v-for="company in companies" :key="company.id">
        <router-link :to="{ name: 'CompanyProfile', params: { company_id: company.id } }">{{ company.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      companies: [],
      companyId: null,
    };
  },
  created() {
    this.fetchCompanyList();
  },
  methods: {
    async fetchCompanyList() {
      const jwtToken = localStorage.getItem('jwtToken');

      if (!jwtToken) {
        this.$router.push('/user-authorization');
        return;
      }

      try {
        this.$axios.defaults.headers.common['Authorization'] = `JWT ${jwtToken}`;
        const response = await this.$axios.get('/companies/');
        this.companies = response.data;
      } catch (error) {
        console.error('Error fetching company list:', error);

        if (error.response && error.response.status === 401) {
          this.$router.push('/user-authorization');
        }
      }
    },
    goToCompany() {
      if (this.companyId) {
        this.$router.push({ name: 'CompanyProfile', params: { company_id: this.companyId } });
      }
    },
  },
};
</script>
