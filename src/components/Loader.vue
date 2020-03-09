<template>
  <div class="loader" />
</template>

<script>
export default {};
</script>

<style scoped>
.loader {
  border-radius: 50%;

  border: solid;
  border-color: lightseagreen;
  border-top-color: teal;
  border-width: 0.8rem;

  height: 8rem;
  width: 8rem;

  animation: spin 2s infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
