import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//Bootstrap
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

//Vue notification
import Notifications from "vue-notification";
Vue.use(Notifications);

//Validation
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

//toaster
import Toaster from "v-toaster";
import "v-toaster/dist/v-toaster.css";
Vue.use(Toaster, { timeout: 1500 });

//Fontawsome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCoffee);
library.add(faEdit);
library.add(faPlus);
library.add(faTrash);

Vue.component("font-awesome-icon", FontAwesomeIcon);

//Modal
import VModal from "vue-js-modal";
Vue.use(VModal);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
