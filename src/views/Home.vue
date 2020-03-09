<template>
  <div class="home fill">
    <v-col class="home fill">
      <Loader v-if="!loaded" />
      <div class="fill" v-if="expenses.length > 0">
        <YearContainer
          v-for="i in this.endYear - this.startYear + 1"
          :key="String(startYear + i - 1)"
          :year="String(startYear + i - 1)"
        >
          <MonthCard
            v-for="(month, index) in MONTHS"
            :month="month"
            :key="index"
            :expenses="getValidExpanses(startYear + i - 1, index)"
          />
        </YearContainer>
      </div>
      <div v-else>NÃO HÁ INFORMAÇÕES</div>
    </v-col>
    <Popup class="absolute" v-if="loaded" />
  </div>
</template>

<script>
import MonthCard from "../components/MonthContainer";
import YearContainer from "../components/YearContainer";

import Loader from "../components/Loader";

import Popup from "../components/Popup";
import moment from "moment";

import { mapState } from "vuex";

export default {
  name: "Home",
  data: () => ({
    loaded: false,
    startYear: 0,
    endYear: 0
  }),
  components: {
    MonthCard,
    YearContainer,
    Popup,
    Loader
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
      const date = moment(new Date(year, month, 18)).format();
      return this.expenses.filter(el => this.validDate(date, el.start, el.end));
    },
    validDate(date, start, end) {
      return date >= start && date < end;
    }
  },
  created: function() {
    this.loaded = true;
    this.setMinMaxYears();
  },
  computed: mapState(["MONTHS", "expenses"]),
  watch: {
    expenses(newValue) {
      this.setMinMaxYears();
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
