import Vue from 'vue';
import Vuetify from 'vuetify';
import store from 'store';
import router from 'router';
import App from 'App.vue';

import '@mdi/font/scss/materialdesignicons.scss';
import 'assets/scss/ui.scss';

Vue.use(Vuetify);

const vuetify = new Vuetify({});
const app = new Vue({
  el: '#app',
  render: (h) => h(App),
  vuetify,
  store,
  router,
});