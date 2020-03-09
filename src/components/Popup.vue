<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark fab fixed bottom right @click="dialog = true" v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Nova Despesa</v-card-title>
        <v-card-text>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field label="Descrição" v-model="description" :value="description"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="8" sm="8" md="8">
                <v-currency-field label="Preço" prefix="R$" v-model="preco" />
              </v-col>
              <v-col cols="4" sm="4" md="4">
                <v-text-field label="Parcela" v-model="parcela" suffix="x" type="number"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="7" sm="7" md="7">
                <Datepicker :disabled="!radioGroup" v-model="date"></Datepicker>
              </v-col>
              <v-col cols="5" sm="5" md="5">
                <v-radio-group v-model="radioGroup" row>
                  <v-radio key="1" label="Hoje" :value="false"></v-radio>
                  <v-radio key="2" label="Outro" :value="true"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Fechar</v-btn>
          <v-btn color="blue darken-1" text @click="saveData">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Datepicker from "../components/Datepicker";
import moment from "moment";

export default {
  data: () => ({
    dialog: false,
    description: "",
    preco: "0,00",
    parcela: "1",
    date: moment().format("YYYY-MM-DD"),
    radioGroup: false
  }),
  watch: {
    radioGroup: function(value) {
      if (!value) this.date = moment().format("YYYY-MM-DD");
    }
  },
  components: {
    Datepicker
  },
  methods: {
    saveData: function() {
      this.$store.dispatch("addExpense", {
        description: this.descriptionValue,
        value: this.priceValue,
        installments: this.installmentValue,
        date: this.dateValue
      });
      this.clearData();
      this.dialog = false;
    },
    clearData: function() {
      this.description = "";
      this.preco = "0,00";
      this.parcela = "1";
      this.date = moment().format("YYYY-MM-DD");
      this.radioGroup = false;
    }
  },
  computed: {
    descriptionValue: function() {
      return this.description;
    },
    priceValue: function() {
      return parseFloat(this.preco);
    },
    installmentValue: function() {
      return parseInt(this.parcela);
    },
    dateValue: function() {
      return moment(this.date);
    }
  }
};
</script>
