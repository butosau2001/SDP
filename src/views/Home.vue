<template>
  <div class="home fill">
    <v-col class="home fill">
      <div class="fill" v-if="this.expenses.length > 0">
        <YearContainer
          v-for="i in this.endYear - this.startYear + 1"
          :key="String(startYear + i - 1)"
          :year="String(startYear + i - 1)"
        >
          <MonthCard
            v-for="(month, index) in months"
            :month="month"
            :key="index"
            :expenses="getValidExpanses(startYear + i - 1, index)"
          />
        </YearContainer>
      </div>
      <div v-else>NÃO HÁ INFORMAÇÕES</div>
    </v-col>
    <Popup class="absolute" />
  </div>
</template>

<script>
import MonthCard from "../components/MonthContainer";
import YearContainer from "../components/YearContainer";
import Popup from "../components/Popup";
import moment from "moment";

// import Expanse from "../classes/Expanse";

export default {
  name: "Home",
  data: () => ({
    expenses: [],
    startYear: 0,
    endYear: 0
  }),
  components: {
    MonthCard,
    YearContainer,
    Popup
  },
  methods: {
    getMaxYear() {
      return Math.max.apply(
        Math,
        this.expenses.map(o => moment(o.end).year())
      );
    },
    getMinYear() {
      return Math.min.apply(
        Math,
        this.expenses.map(o => moment(o.start).year())
      );
    },
    setMinMaxYears() {
      this.startYear = this.getMinYear();
      this.endYear = this.getMaxYear();
    },
    getValidExpanses(year, month) {
      const date = moment(new Date(year, month, 1)).format();
      console.log(date);
      return this.expenses.filter(el => this.validDate(date, el.start, el.end));
    },
    validDate(date, start, end) {
      return date >= start && date < end;
    }
  },
  created: function() {
    setInterval(() => {
      this.expenses = this.$store.state.expenses;
      this.setMinMaxYears();
    }, 5000);
  },
  computed: {
    months() {
      return this.$store.state.MONTHS;
    }
  }
};
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
}
.absolute {
  position: absolute;
}
.fill {
  height: 100%;
  width: 100%;
}
</style>
