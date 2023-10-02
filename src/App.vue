<template>
  <div id="app">
    <LanguageSelector />
    <router-view />
    <universal-modal v-if="isModalOpen" @close="closeModal">
      <p>This is the content of the universal modal.</p>
    </universal-modal>
  </div>
</template>

<script>
import UniversalModal from '@/components/ModalWindow.vue';
import LanguageSelector from './components/LanguageSelector.vue';

export default {
  name: 'App',
  data() {
    return {
      isModalOpen: false
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    }
  },
  components: {
    UniversalModal,
    LanguageSelector
  }
};
</script>

<style>
/* Add your global CSS styles here */
</style>
