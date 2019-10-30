import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import peerConnect from './mixin/peerConnect';

Vue.mixin({
  methods: {
    peerConnect: peerConnect,
  },
});

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
