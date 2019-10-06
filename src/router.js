import Vue from 'vue';
import Router from 'vue-router';
import ComingSoon from '@/views/ComingSoon.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ComingSoon',
      component: ComingSoon,
    },
  ],
});
