<template>
  <div>
    <input id="avatarInput" type="file" @change="handleAvatarUpload" />
    <div v-if="avatarPreview || avatarPath">
      <img :src="avatarPreview || avatarPath" alt="Avatar Preview" class="avatar-image" />
    </div>
    <button @click="saveAvatar">Save Avatar</button>
  </div>
</template>

<script>
export default {
  props: {
    avatarPath: String,
  },
  data() {
    return {
      avatarPreview: null,
      selectedAvatarFile: null,
    };
  },
  methods: {
    handleAvatarUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatarPreview = e.target.result;
        };
        reader.readAsDataURL(file);
        this.selectedAvatarFile = file;
      }
    },
    async saveAvatar() {
      if (this.selectedAvatarFile) {
        const formData = new FormData();
        formData.append('avatar', this.selectedAvatarFile);

        try {
          const response = await this.$axios.post(`/upload-avatar/`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data', 
            },
          });

          console.log('Avatar uploaded:', response.data);
        } catch (error) {
          console.error('Error uploading avatar:', error);
        }
      } else {
        console.error('No file selected');
      }
    },
  },
};
</script>

<style>
.avatar-image {
  max-width: 200px; 
  max-height: 200px; 
}
</style>
