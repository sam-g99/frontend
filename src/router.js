import Vue from 'vue';
import Meta from 'vue-meta';
import Router from 'vue-router';
import ComingSoon from '@/views/ComingSoon.vue';

Vue.use(Router);
Vue.use(Meta);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'ComingSoon',
      component: ComingSoon,
    },
  ],
});
