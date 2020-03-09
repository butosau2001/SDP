import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import Expense from "../classes/Expense";
import moment from "moment";

export default new Vuex.Store({
  state: {
    MONTHS: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro"
    ],
    expenses: []
  },
  mutations: {
    insert(state, expense) {
      state.expenses.push(expense);
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
    },
    set(state, expenses) {
      state.expenses = expenses;
    }
  },
  actions: {
    addExpense({ commit }, { description, value, installments, date }) {
      const expense = new Expense(
        new Date().toISOString(),
        description,
        value,
        installments,
        date
      );
      commit("insert", expense);
    }
  },
  getters: {},
  modules: {}
});
