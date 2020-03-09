<template>
  <v-card class="month-card">
    <v-card-title class="card-title">
      <span>{{ month }}</span>
      <span>{{ monthCost }}</span>
    </v-card-title>
    <v-card-text class="card-title" v-for="item in expenses" :key="item.id">
      <span>{{item.description}}</span>
      <span>{{parseValue(item.value)}}</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "MonthCard",
  props: {
    month: String,
    expenses: Array
  },
  methods: {
    parseValue: function(value) {
      return value.toFixed(2).replace(".", ",");
    }
  },
  computed: {
    monthCost: function() {
      let sum = 0;
      this.expenses.forEach(el => {
        sum += el.value;
      });
      return "R$" + this.parseValue(sum);
    }
  }
};
</script>

<style scoped>
.month-card {
  margin: 0.5rem 0;
}
.card-title {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
