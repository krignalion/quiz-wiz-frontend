<template>
  <div>
    <HeaderSection />
    <h1>List of Users</h1>
  </div>
  <UsersList />
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue';
import UsersList from '@/components/UsersList.vue';

export default {
  components: {
    HeaderSection,
    UsersList
  }
}
</script>