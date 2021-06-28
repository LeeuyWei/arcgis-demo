import Vue from 'vue';
import VueRouter from 'vue-router';
import Final from "@/views/Final.vue";
import Home from '../views/Home.vue';
import Map from "../views/Map.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/map',
    name: 'Map',
    component: Map,
  },
  {
    path: '/final',
    name: 'Final',
    component: Final,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
