<!-- HeaderSection.vue -->
<template>
  <div class="header-section">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/user-profile">User Profile</router-link>
      <router-link to="/user-authorization">Authorization</router-link>
     <!--Add links to other pages here -->
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HeaderSection'
// You can add logic here if necessary
}
</script>

<style scoped>
/* Styles for your header */
.header-section {
  background-color: #f0f0f0;
  padding: 10px;
}

nav {
  display: flex;
  justify-content: space-around;
}

nav router-link {
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
}

nav router-link:hover {
  background-color: #ccc;
  border-radius: 5px;
}
</style>
