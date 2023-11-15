<template>
  <div id="app">
    <LanguageSelector />
    <router-view></router-view>
    <universal-modal v-if="isModalOpen" @close="onCloseModal">
      <p>This is the content of the universal modal.</p>
    </universal-modal>
  </div>
</template>

<script>
import UniversalModal from '@/components/ModalWindow.vue';
import LanguageSelector from './components/LanguageSelector.vue';
import jwt_decode from 'jwt-decode';

export default {
  name: 'App',
  components: {
    UniversalModal,
    LanguageSelector,
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    onCloseModal() {
      this.isModalOpen = false;
    },
  },
  created() {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      const decodedToken = jwt_decode(jwtToken);
      const currentUsername = decodedToken.username;
      const currentEmail = decodedToken.email;
      const currentId = decodedToken.user_id;

      this.$store.dispatch('setCurrentUser', { user_id: currentId, username: currentUsername, email: currentEmail });
      this.isAuthenticated = true;
    }
  },
};
</script>
