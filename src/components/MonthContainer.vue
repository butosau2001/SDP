<template>
  <v-card class="month-card">
    <v-card-title class="card-field card-title">
      <span>{{ month }}</span>
      <span>{{ monthCost }}</span>
    </v-card-title>
    <v-card-text class="no-padding">
      <ExpenseContainer v-for="item in expenses" :key="item.id" :item="item" />
    </v-card-text>
  </v-card>
</template>

<script>
import ExpenseContainer from "../components/ExpenseContainer";

export default {
  name: "MonthCard",
  props: {
    month: String,
    expenses: Array
  },
  components: {
    ExpenseContainer
  },
  computed: {
    monthCost: function() {
      let sum = 0;
      this.expenses.forEach(el => {
        sum += el.value;
      });
      return "R$" + sum.toFixed(2).replace(".", ",");
    }
  }
};
</script>

<style scoped>
.month-card {
  margin: 0.5rem 0;
}
.card-field {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.card-title {
  box-shadow: 0px 5px 15px 0 rgba(0, 0, 0, 0.4);
  z-index: 10;
}
.card-text {
  padding: 1rem;
  margin: 0;
  border-radius: 0;
  align-items: center;
  background-color: white;
  z-index: 0;
}
.no-padding {
  padding: 0;
}
</style>
