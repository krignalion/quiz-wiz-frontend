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
    setAuthorizationHeader() {
      const jwtToken = localStorage.getItem('jwtToken');
      if (jwtToken) {
        return `JWT ${jwtToken}`;
      } else {
        this.$router.push('/user-authorization');
        return null;
      }
    },
    async fetchCompanyList() {
      const token = this.setAuthorizationHeader();
      if (!token) return;

      this.$axios.defaults.headers.common['Authorization'] = token;

      try {
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
        const token = this.setAuthorizationHeader();
        if (token) {
          this.$axios.defaults.headers.common['Authorization'] = token;
          this.$router.push({ name: 'CompanyProfile', params: { company_id: this.companyId } });
        }
      }
    },
  },
};
</script>
