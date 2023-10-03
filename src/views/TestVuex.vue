<template>
  <div>
    <p>Text string from storage: {{ testString }}</p>
    <button @click="changeTestString">Change line</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['testString'])
  },
  methods: {
    ...mapActions(['updateTestString']),
    changeTestString() {
      const newString = '>> New test line from state!<<';
      this.$store.dispatch('updateTestString', newString);
    }
  }
};
</script>
