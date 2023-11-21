<template>
  <div>
    <h2>Create Quiz</h2>
    <form @submit.prevent="createQuiz">
      <label>Title:</label>
      <input v-model="title" required>
      <label>Description:</label>
      <textarea v-model="description" required></textarea>
      <button type="submit">Create Quiz</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    createQuiz() {
      const jwtToken = localStorage.getItem('jwtToken');
      this.$axios.defaults.headers.common['Authorization'] = `JWT ${jwtToken}`;

      const data = {
        title: this.title,
        description: this.description,
      };

      this.$axios.post('api/quizzes/', data)
        .then(response => {
          console.log("Quiz created successfully:", response.data);
        })
        .catch(error => {
          console.error("Error creating quiz:", error.response.data);
        });
    },
  },
};
</script>
