import Vue from 'vue';
import Meta from 'vue-meta';
import Router from 'vue-router';
import UserRoom from '@/views/UserRoom.vue';
import EnterRoom from '@/views/EnterRoom.vue';

Vue.use(Router);
Vue.use(Meta);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'UserRoom',
      component: UserRoom,
    },
    {
      path: '/room/:id',
      component: EnterRoom,
    },
  ],
});
