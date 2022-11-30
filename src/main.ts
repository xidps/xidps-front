import Vue from "vue";
import VueRouter from "vue-router";

import { createPinia, PiniaVuePlugin } from "pinia";

import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

import { useLoggerStore } from "@/store/logger/useLoggerStore";

const pinia = createPinia();

Vue.use(PiniaVuePlugin);
Vue.use(VueRouter);

Vue.config.productionTip = true;
Vue.config.errorHandler = function (err) {
  const useLogger = useLoggerStore();

  console.error(err);
  useLogger.error({
    exception: err,
    message: err.message,
  });
};

new Vue({
  router,
  vuetify,
  pinia,
  render: (h) => h(App),
}).$mount("#app");
