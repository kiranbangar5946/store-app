<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <h1>Crud App</h1>
    <sidenav msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import sidenav from "@/components/sidenav.vue";

export default {
  name: "Home",
  components: {
    sidenav
  }
};
</script>
