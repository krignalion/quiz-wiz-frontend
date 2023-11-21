<template>
  <div>
    <HeaderSection />
    <h1>User Registration</h1>
    <RegistrationForm />
  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue';
import RegistrationForm from '@/components/RegistrationForm.vue';

export default {
  components: {
    HeaderSection,
    RegistrationForm,
  }
}
</script>
