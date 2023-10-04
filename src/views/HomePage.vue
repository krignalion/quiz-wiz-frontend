<!-- Home.vue -->
<template>
  <div>
    <HeaderSection />
    <h1>{{$t('welcomeMessage')}}</h1>
    <p>Hello there, this is the start page of my project.</p>
  </div>
  
  <div class="page">
    <button сlass="show-modal-button" @click="showModal">Show modal window</button>
    <modal-window ref="modal"></modal-window>
  </div>
  <p></p>
  <div>
    <nav>
      <router-link to="/test-vuex">Test Vuex</router-link>
    </nav>
  </div>
    <button сlass="show-modal-button" @click="showModal">Show modal window</button>
    <modal-window ref="modal"></modal-window>
  </div>
  <p></p>
  <div>
    <nav>
      <router-link to="/test-vuex">Test Vuex</router-link>
    </nav>
  </div>
  <p></p>
  <div>
    <HealthCheck />
  </div>
</template>

<script>
import HeaderSection from "@/components/HeaderSection.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import HealthCheck from '@/components/HealthCheck.vue';

export default {
  components: {
    HeaderSection,
    ModalWindow,
    HealthCheck
      },
      methods: {
          showModal: function () {
              this.$refs.modal.show = true
          }
      },
  }
</script>



<style scoped>
/* Style your home page if needed */
</style>
