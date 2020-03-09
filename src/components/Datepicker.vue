<template>
  <v-layout>
    <v-menu
      v-model="fromDateMenu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field label="Data" readonly :value="value" v-on="on" :disabled="disabled"></v-text-field>
      </template>
      <v-date-picker
        locale="pt-br"
        :min="minDate"
        :max="maxDate"
        :value="value"
        no-title
        @input="updateValue"
      ></v-date-picker>
    </v-menu>
  </v-layout>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      fromDateMenu: false,

      minDate: moment()
        .add(-2, "years")
        .month(0)
        .date(1)
        .format("YYYY-MM-DD"),
      maxDate: moment().format("YYYY-MM-DD")
    };
  },
  props: {
    value: String,
    disabled: Boolean
  },
  computed: {
    fromDateDisp: function() {
      return moment(this.value).format("DD/MM/YYYY");
    }
  },
  methods: {
    updateValue: function(value) {
      this.$emit("input", value);
      this.fromDateMenu = false;
    }
  }
};
</script>
