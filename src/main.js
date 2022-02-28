import Vue from "vue";
import App from "@/App.vue";
import i18n from "@/i18n";
import router from "@/router";
import { store } from "@/store/index";

// plugins
import "@/plugins/veevalidate";
import "@/plugins/sweetAlert";
import "@/plugins/fontAwesome";

// animate css
import 'animate.css';

// custom styles with tailwind css
import "./assets/index.css";

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  render: (h) => h(App),
}).$mount("#app");
