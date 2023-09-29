<template>
    <div>
      <p>Count: {{ count }}</p>
      <button @click="increment">Increment</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  function useCounter() {
    const count = ref(0);
  
    const increment = () => {
      count.value++;
    };
  
    return {
      count,
      increment
    };
  }
  
  export default {
    setup() {
      const { count, increment } = useCounter();
  
      return {
        count,
        increment
      };
    }
  };
  </script>
  