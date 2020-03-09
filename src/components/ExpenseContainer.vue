<template>
  <v-btn
    class="container"
    tile
    block
    v-quickpress="
      () =>
        this.$store.state.selection.length > 0
          ? handleLongPress()
          : handleQuickPress()
    "
    v-long-press="1000"
    @long-press-start="handleLongPress"
    v-bind:class="{ active: this.$store.state.selection.includes(item.id) }"
  >
    <span>{{ item.description }}</span>
    <span>{{ parseValue(item.value) }}</span>
  </v-btn>
</template>

<script>
export default {
  name: "ExpenseContainer",
  props: {
    item: Object
  },
  methods: {
    parseValue: function(value) {
      return value.toFixed(2).replace(".", ",");
    },
    handleQuickPress: function() {},
    handleLongPress: function() {
      this.$store.commit(
        this.$store.state.selection.includes(this.item.id)
          ? "removeSelection"
          : "addSelection",
        this.item.id
      );
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  margin: 0;
  border-radius: 0;
  align-items: center;
  background-color: white;
  z-index: 0;
}

.active {
  background: rgba(255, 20, 40, 0.5) !important;
}
</style>
