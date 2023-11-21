<template>
  <div>
    <HeaderSection />
  </div>
  <UsersList />
  <CreateQuiz/>
  <SendInvitation/>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue';
import CreateQuiz from "@/components/CreateQuiz.vue";
import SendInvitation from "@/components/SendInvitation.vue";

export default {
  components: {
    HeaderSection,
    CreateQuiz,
    SendInvitation,
  }
}
</script>