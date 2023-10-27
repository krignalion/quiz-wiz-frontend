<template>
  <div>
    <ul>
      <li v-for="user in userList" :key="user.username">
        {{ user && user.username ? user.username : 'N/A' }}
      </li>
    </ul>
    <div>
      <button @click="loadPreviousPage" :disabled="currentPage === 1">Previous page</button>
      <span>page {{ currentPage }} из {{ paginationTotalPages }} </span>
      <button @click="loadNextPage" :disabled="currentPage === totalPages">Next page</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalPages: 1,
      currentPage: 1,
    };
  },
  created() {
    this.loadPage(1);
  },
  computed: {
    paginationTotalPages() {
      return this.$store.getters.paginationTotalPages;
    },
    userList() {
      if (this.$store.getters.userList && this.$store.getters.userList.results) {
        return this.$store.getters.userList.results;
      } else {
        return [];
      }
    },
  },
  methods: {
    async loadPage(page) {
      await this.$store.dispatch('fetchAndSetUserList', page);
      this.currentPage = page;
      this.totalPages = this.$store.getters.paginationTotalPages;
    },
    loadPreviousPage() {
      if (this.currentPage > 1) {
        this.loadPage(this.currentPage - 1);
      }
    },
    loadNextPage() {
      if (this.currentPage < this.totalPages) {
        this.loadPage(this.currentPage + 1);
      }
    },
  },
};
</script>
