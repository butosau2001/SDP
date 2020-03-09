<template>
  <v-card class="year-card">
    <v-card-title>{{ year }}</v-card-title>
    <slot />
  </v-card>
</template>

<script>
export default {
  name: "YearContainer",
  props: {
    year: String
  }
};
</script>

<style scoped>
.year-card {
  width: 100%;
  padding: 0.2rem 1rem;
  margin-bottom: 1rem;
}
</style>
