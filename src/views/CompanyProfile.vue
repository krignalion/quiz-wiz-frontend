<template>
  <div>
    <HeaderSection />
    <h1>Company Profile</h1>
    <div v-if="company">
      <h2>{{ company.name }}</h2>
      <p>{{ company.description }}</p>
      <button v-if="canEditCompany" @click="onEditCompany">Edit</button>
      <button v-if="canDeleteCompany" @click="onDeleteCompany">Delete</button>
    </div>
    <div v-if="isEditing">
      <div>

        <label for="name">Company Name: </label>
        <input id="name" v-model="editedCompany.name" />
      </div>
      <div>
        <label for="description">Description: </label>
        <input id="description" v-model="editedCompany.description" />
      </div>
      <div>
        <label>
          <input type="checkbox" v-model="editedCompany.isVisible" />
          Is Visible
        </label>
      </div>
      <button @click="saveEditedCompany">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
    <SendInvitation v-if="company" :company="company" />
    <div v-if="error">
      <p class="error">{{ error }}</p>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue';
import SendInvitation from '@/components/SendInvitation.vue';

export default {
  components: {
    HeaderSection,
    SendInvitation,
  },
  data() {
    return {
      company: null,
      error: null,
      isEditing: false,
      editedCompany: {
        name: '',
        description: '',
        isVisible: true,
      },
    };
  },
  created() {
    this.fetchCompanyData();
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
    canEditCompany() {

      return this.company && this.currentUser && this.company.owner === this.currentUser.user_id;
    },
    canDeleteCompany() {
      return this.company && this.currentUser && this.company.owner === this.currentUser.user_id;
    },
  },
  methods: {
    async fetchCompanyData() {
      const jwtToken = localStorage.getItem('jwtToken');

      if (!jwtToken) {
        this.$router.push('/user-authorization');
        return;
      }

      const companyId = this.$route.params.company_id;

      try {
        this.$axios.defaults.headers.common['Authorization'] = `JWT ${jwtToken}`;
        const response = await this.$axios.get(`/companies/${companyId}/`);
        this.company = response.data;
        this.error = null;
      } catch (error) {
        console.error('Error fetching company data:', error);

        if (error.response && error.response.status === 404) {
          this.error = 'Company not found.';
        } else if (error.response && error.response.status === 401) {
          this.$router.push('/user-authorization');
        } else {
          this.error = error.response.data || 'Error fetching company data.';
        }
      }
    },
    onEditCompany() {
      this.isEditing = true;
      this.editedCompany = { ...this.company };
    },
    async saveEditedCompany() {
      try {
        await this.$axios.put(`/companies/${this.company.id}/`, this.editedCompany);

        this.isEditing = false;
        await this.fetchCompanyData();
      } catch (error) {
        this.error = "Error saving edited company data: " + error.message;
      }
    },
    cancelEdit() {
      this.isEditing = false;
    },
    onDeleteCompany() {
      if (confirm("Are you sure you want to delete this company?")) {
        const companyId = this.company.id;

        this.$axios.delete(`/companies/${companyId}/`)
          .then(() => {
            this.$router.push('/list-of-companies');
          })
          .catch((error) => {
            this.error = "Error deleting the company: " + error.message;
          });
      }
    }
  }
};
</script>

<style>
.error {
  color: red;
}
</style>