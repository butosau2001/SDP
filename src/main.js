import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VCurrencyField from "v-currency-field";
import { VTextField } from "vuetify/lib"; //Globally import VTextField
import LongPress from "vue-directive-long-press";

Vue.component("v-text-field", VTextField);

Vue.use(VCurrencyField, {
  locale: "pt-BR",
  decimalLength: 2,
  autoDecimalMode: true,
  min: null,
  max: null,
  defaultValue: 0
});

Vue.config.productionTip = false;

Vue.directive("long-press", LongPress);

Vue.directive("quickpress", {
  bind: function(el, binding, vNode) {
    let pressTimer = null;

    let start = e => {
      if (e.type === "click" && e.button !== 0) return;
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          pressTimer = null;
        }, 1000);
      }
    };

    let cancel = e => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    };

    const handler = e => {
      if (pressTimer !== null) {
        binding.value(e);
        pressTimer = null;
      }
    };

    el.addEventListener("mousedown", start);
    el.addEventListener("mouseout", cancel);
    el.addEventListener("mouseup", handler);
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
