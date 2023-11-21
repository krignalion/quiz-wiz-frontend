<template>
  <div>
    <HeaderSection />
    <h1>User Authorization</h1>
    <LoginForm />
  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue';
import LoginForm from '@/components/LoginForm.vue'; 

export default {
  components: {
    HeaderSection,
    LoginForm
  }
}
</script>
