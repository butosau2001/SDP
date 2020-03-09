import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import Expense from "../classes/Expense";

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
    expenses: [],
    selection: []
  },
  mutations: {
    insert(state, expense) {
      state.expenses.push(expense);
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
    },
    set(state, expenses) {
      state.expenses = expenses;
    },
    addSelection(state, id) {
      state.selection.push(id);
    },
    removeSelection(state, id) {
      state.selection = state.selection.filter(el => el !== id);
    },
    deleteDataFromSelection(state) {
      state.expenses = state.expenses.filter(
        el => !state.selection.includes(el.id)
      );
      state.selection = [];
      localStorage.setItem("expenses", JSON.stringify(state.expenses));
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
