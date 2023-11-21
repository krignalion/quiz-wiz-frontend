<template>
  <div>
    <HeaderSection />
  </div>
  <UsersList />
  <CreateQuiz/>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue';
import CreateQuiz from "@/components/CreateQuiz.vue";

export default {
  components: {
    HeaderSection,
    CreateQuiz
  }
}
</script>