import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VCurrencyField from "v-currency-field";
import { VTextField } from "vuetify/lib"; //Globally import VTextField

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

Vue.directive("longpress", {
  bind: function(el, binding, vNode) {
    let pressTimer = null;

    let start = e => {
      if (e.type === "click" && e.button !== 0) return;
      if (pressTimer === null)
        pressTimer = setTimeout(() => {
          handler();
        }, 1000);
    };

    let cancel = e => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
    };

    const handler = e => {
      binding.value(e);
    };

    el.addEventListener("mousedown", start);
    el.addEventListener("click", cancel);
    el.addEventListener("mouseout", cancel);
  }
});

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
