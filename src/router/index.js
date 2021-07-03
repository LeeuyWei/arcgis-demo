import Vue from 'vue';
import VueRouter from 'vue-router';
import Final from "@/views/Final.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Final,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
