<template>
  <v-app>
    <Header />

    <v-content class="main-container">
      <Home />
    </v-content>
  </v-app>
</template>

<script>
import Home from "./views/Home";
import Header from "./components/Header";

import store from "./store";

export default {
  name: "App",
  store,
  components: {
    Home,
    Header
  },

  data: () => ({
    //
  }),
  beforeCreate: function() {
    this.$store.commit(
      "set",
      JSON.parse(localStorage.getItem("expenses") || "[]")
    );
  }
};
</script>

<style>
.v-application {
  user-select: none;
}
.main-container {
  width: 100%;

  overflow: hidden;
  position: relative;
}
</style>
