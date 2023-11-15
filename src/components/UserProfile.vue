<template>
  <div>
    <h1>User Profile</h1>
    <div>
      <label for="userIdInput">User ID: </label>
      <input id="userIdInput" v-model="userId" type="number" :disabled="isEditing" />
      <button @click="loadUserInfo" :disabled="isEditing">Load User Info</button>
    </div>
    <div v-if="error">
      <p class="error">{{ error }} </p>
    </div>
    <div v-else-if="userInfo && !isEditing && userInfo.id">
      <user-avatar :avatarPath="userInfo.image_path" @avatar-selected="handleAvatarSelected" />
      <h2>{{ userInfo.username }}</h2>
      <p>Email: {{ userInfo.email }}</p>
      <p>First Name: {{ userInfo.first_name }}</p>
      <p>Last Name: {{ userInfo.last_name }}</p>
      <button @click="editUserInfo">Edit profile</button>
      <button v-if="onDeleteProfile" @click="deleteUserProfile">Delete profile</button>
    </div>
    <div v-else-if="userInfo && isEditing">
      <div>
        <label for="editedUsernameInput">Username: </label>
        <input id="editedUsernameInput" v-model="editedUserInfo.username" />
      </div>
      <div>
        <label for="editedEmailInput">Email: </label>
        <input id="editedEmailInput" v-model="editedUserInfo.email" />
      </div>
      <div>
        <label for="editedFirstNameInput">First Name: </label>
        <input id="editedFirstNameInput" v-model="editedUserInfo.first_name" />
      </div>
      <div>
        <label for="editedLastNameInput">Last Name: </label>
        <input id="editedLastNameInput" v-model="editedUserInfo.last_name" />
      </div>
      <div>
        <label for="editedPasswordInput">Password: </label>
        <input id="editedPasswordInput" type="password" v-model="editedUserInfo.password" />
      </div>
      <button @click="saveEditedUserInfo">save</button>
      <button @click="cancelEdit">cancel</button>
      <div v-if="saveError" class="error">{{ saveError }}</div>
      <div v-else></div>
    </div>
    <div v-else class="error">
      <p>enter user id</p>
    </div>
  </div>
</template>
  

<script>
import UserAvatar from '@/components/UserAvatar.vue';

export default {
  components: {
    'user-avatar': UserAvatar, 
  },
  data() {
    return {
      userId: null,
      error: null,
      isEditing: false,
      avatarPreview: null,
      editedUserInfo: {
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        avatar: null,
      },
      saveError: null,
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
    onDeleteProfile() {
      return (
        this.$store.getters.isAuthenticated &&
        this.$store.getters.currentUser.user_id === this.userInfo.id
      );
    },
  },
  methods: {
    handleAvatarSelected(avatar) {
      this.editedUserInfo.avatar = avatar;
    },
    async loadUserInfo() {
      try {
        await this.$store.dispatch('fetchUserInfo', this.userId);
        this.error = null;
      } catch (error) {
        this.error = error.message;
      }
    },
    editUserInfo() {
      this.isEditing = true;
      this.userId = this.userInfo.id;
      this.editedUserInfo = { ...this.userInfo };
    },
    async saveEditedUserInfo() {
      try {
        await this.$store.dispatch('updateUserInfo', this.editedUserInfo);
        this.isEditing = false;
        this.saveError = null;
      } catch (error) {
        this.saveError = error.response.data;
      }
    },
    async deleteUserProfile() {
      if (!this.$store.getters.isAuthenticated) {
        this.saveError = "You must be logged in to delete your profile.";
        return;
      }
      if (this.$store.getters.currentUser.user_id !== this.userInfo.id) {
        this.saveError = "You can only delete your own profile.";
        return;
      }

      try {
        const jwtToken = localStorage.getItem('jwtToken');
        this.$axios.defaults.headers.common['Authorization'] = `JWT ${jwtToken}`;
        await this.$axios.delete(`/users/${this.userInfo.id}/`);
        localStorage.removeItem('jwtToken');
        this.$store.dispatch('clearCurrentUser');
        this.$store.dispatch('clearUserInfo');         
        this.$store.commit('setIsAuthenticated', false); 
        this.$router.push('/');
      } catch (error) {
        this.saveError = "Error deleting the profile: " + error.message;
      }
    },
    cancelEdit() {
      this.isEditing = false;
    },
  },
};
</script>

<style>
.error {
  color: red;
}
</style>
  