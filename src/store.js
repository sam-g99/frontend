import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    windowHeight: '',
    api: 'https://testing.nachonight.tv/',
    alert: '',
    email: '',
  },
  mutations: {},
  actions: {},
});
