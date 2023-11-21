<template>
  <div>
    <div>
      <div v-if="userList && userList.results">
        <div v-for="user in userList.results" :key="user.id">
          <ul>
            <li>{{ user.first_name }} {{ user.last_name }}</li>
          </ul>
        </div>
      </div>
      <UserListContainer />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import UserListContainer from '@/components/UserListContainer.vue';

export default {
  components: {
    UserListContainer,
  },
  computed: {
    ...mapGetters(['userList']),
  },
};
</script>
